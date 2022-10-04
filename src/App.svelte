<script lang="ts">
  	import type { IPokemon, NURI } from "./Pokemon";
  import Pokemon from "./Pokemon";

	function idFromURI(uri: string) {
    	let x = uri.split("/")
    	return parseInt(x[x.length - 2])
	}

	let pokemons: Pokemon[] = []
	let processable = []
  	async function getApiData() {
		const res = await fetch(`https://pokeapi.co/api/v2/pokemon`)
			.then(r => r.json()) as {results: NURI[]}
		processable = res.results.map(result => result.url)
	}

	async function loadPokemons() {
		for (let uri of processable) {
			let pokedata = await fetch(uri) as IPokemon
			pokemons.push(new Pokemon(pokedata))
		}
	}
	let promise = getApiData();
</script>
{#await promise}
	<p>...waiting</p>
{:then}
	{#each pokemons as pokemon}
		<p>{JSON.stringify(pokemon, null, 4)}</p>
	{/each}
<style>
</style>