<script lang="ts">
	import { gameData, type GameData } from './../lib/pokestore';
	import type Pokemon from "../Pokemon";
	import PokeSelect from "../lib/PokeSelect.svelte";
	import GuessRow from "../lib/GuessRow.svelte";

	export let pokemons: Pokemon[] = []

	let gData: GameData
	gameData.subscribe(v => gData = v)

	let correctPokemon: Pokemon =  pokemons[Math.floor(Math.random()*pokemons.length)]

	if (gData.answer) {
		correctPokemon = gData.answer
	} else {
		gData.answer = correctPokemon
		gameData.update(() => gData)
	}
	console.log(correctPokemon)
	let guesses: Pokemon[] = []
	let chosenId: Pokemon
	$: selectOptions = pokemons.filter(p => {
		let x = guesses.map(g => g.apiId)
		return !x.includes(p.apiId)
	}).map(p => {return {name: p.name, value: p.apiId, imgURL: p.imageUrl}})

	function handleSubmit(e) {
		let pokemon = pokemons.find(poke => poke.apiId === e.detail.pokemon.value)
		guesses.push(pokemon)
		guesses = guesses
		gData.guesses = guesses
		gameData.update(() => gData)
	}

	$: showheader = guesses.length != 0

	if (gData.guesses.length > 0) {
		guesses = gData.guesses
	} else {
		gData.guesses = []
		gameData.update(() => gData)
	}
	
	$: hasWon = guesses.length > 0 ? correctPokemon.name == guesses[guesses.length - 1].name : false
	console.log(guesses)
	console.log(hasWon)
</script>

<style lang="scss">
	.sus {
		p {
		  	line-height: 4rem;
		  	width: 8rem;
			height: 4rem;
		}
		span {
			line-height: 4rem;
			width: 4rem;
		}
	}
</style>

<div style="background-color: #aeaeae; min-height: 100vh" class="pb-12">
	{#if !hasWon}
		<div class="flex justify-center">
			<div class="w-64">
				<PokeSelect on:submit={handleSubmit} options={selectOptions} placeholder="Input pokemon name"/>
			</div>
		</div>
	{/if}

	<div class="flex flex-col justify-center">
		{#if showheader}
			<div id="#header" class="flex flex-row justify-center sus">
				<span>Pokemon</span>
				<p>Species</p>
				<p>Generation</p>
				<p>Types</p>
				<p>Habitat</p>
				<p>Shape</p>
				<p>Height</p>
				<p>Weight</p>
			</div>
		{/if}
		{#each guesses as guess}
			<GuessRow guess={guess} correct={correctPokemon}/>
		{/each}
	</div>
	
</div>
