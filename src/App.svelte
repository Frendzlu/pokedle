<script lang="ts">
	import "./lib/Tailwind.css";
    import { pokemonDB, toProcess } from "./lib/pokestore";
  	import type { IPokemon, NURI } from "./Pokemon";
	import NotFound from "./routes/404.svelte"
	import {Router, Link, Route} from "svelte-routing"
  	import Pokemon from "./Pokemon";
    import Pokedle from "./routes/Pokedle.svelte";
    import PokeList from "./routes/PokeList.svelte";

	function idFromURI(uri: string) {
    	let x = uri.split("/")
    	return parseInt(x[x.length - 2])
	}

	export let pokemons: Pokemon[]
	let processable: any[] = []
	let pokemonAmount = 1154

	pokemonDB.subscribe((val) => pokemons = val)
	toProcess.subscribe((val) => processable = val)

	let nameSet = new Set(pokemons.map(el => el.name))
	let tempPokes: Pokemon[] = []
	nameSet.forEach(name => tempPokes.push(pokemons.find(el => el.name == name )))
	pokemons = tempPokes
	pokemonDB.set(pokemons)

  	async function getApiData() {
		const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10000`)
			.then(r => r.json()) as {
				count: number
				results: NURI[]
			}
		pokemonAmount = res.count
		processable = res.results.map((result, i)=> {return {url: result.url, id: i}})
		toProcess.update(() => processable)

		loadPokemons()
	}

	export const clearPokes = () => {
		pokemons = []
		processable = []
		localStorage.clear()
		pokemonDB.set([])
		toProcess.set([])
		getApiData()
	}

	async function loadPokemons() {
		let pcopy = JSON.parse(JSON.stringify(processable))
		for (let uriJSON of pcopy) {
			let pokedata = await fetch(uriJSON.url)
				.then(r => r.json()) as IPokemon
			let poke = new Pokemon(pokedata, uriJSON.id)
			await poke.getSpeciesInfo()
			if (!pokemons.find(el => el.name == poke.name)) {
				pokemons.push(poke)
				pokemonDB.update(() => pokemons)
				pokemons = pokemons
			}
			const index = processable.findIndex(el => el.id == uriJSON.id);
			if (index > -1) {
				processable.splice(index, 1);
			}
			toProcess.update(() => processable)
			processable = processable
		}
	}
	if (pokemons.length == 0) {
		getApiData();
	}
	if (processable.length != 0) {
		loadPokemons();
	}

	$: width = (pokemons.length / pokemonAmount) * 100
	$: disableGame = pokemons.length != pokemonAmount

	let url = ""
</script>
<Router {url}>
	<nav class="navbar">
		<ul class="linklist">
			<li class="link">
				<Link to="/">PokeList</Link>
			</li>
			{#if !disableGame}
				<li class="link">
					<Link to="/pokedle">Pokedle</Link>
				</li>
			{:else}
				<li style="font-size: small; color: aqua" class="mx-4">
					<p>Pokedle (please wait, we're catching the pokemons)</p>
				</li>
			{/if}
<!--			<li class="link">-->
<!--				<button on:click={clearPokes}>gotta kill 'em all</button>-->
<!--			</li>-->
			<li class="link">
				<div id="pokemonProgressBar">
					<div style="width: {width}%; height: 2rem; background-color: green"></div>
					<p style="z-index: 1; position:absolute; top: 0rem; left: 0px; width: 100%">Loading: {width.toFixed(2)}%</p>
				</div>
			</li>
		</ul>
	</nav>
	<div>
		<Route path="/"><PokeList pokemons={pokemons}/></Route>
		<Route path="/pokedle"><Pokedle pokemons={pokemons}/></Route>
		<Route path="*" component={NotFound} />
	</div>
</Router>
<style>
.navbar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: auto;
	height: 4rem;
}

.linklist {
	list-style: none;
	display: flex;
	line-height: 4rem;
}

.link {
	width: 10rem;
	color: aqua;
    margin: 0 2rem;
}

#pokemonProgressBar{
	height: 2rem;
	position: relative;
	line-height: 2rem;
	text-align: center;
	margin-top: 1rem;
}
</style>