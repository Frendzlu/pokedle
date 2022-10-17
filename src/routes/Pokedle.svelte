<script lang="ts">
	import { gameData, type GameData } from './../lib/pokestore';
	import type Pokemon from "../Pokemon";
	import PokeSelect from "../lib/PokeSelect.svelte";
	import GuessRow from "../lib/GuessRow.svelte";
	import {titleCase} from "../Utils";

	export let pokemons: Pokemon[] = []

	let gData: GameData
	gameData.subscribe(v => gData = v)

	let correctPokemon: Pokemon = pokemons[Math.floor(Math.random()*pokemons.length)]

	if (gData.answer) {
		correctPokemon = gData.answer
	} else {
		gData.answer = correctPokemon
		gameData.update(() => gData)
	}
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

	function resetPokedle() {
		guesses = []
		correctPokemon = pokemons[Math.floor(Math.random()*pokemons.length)]
		gData = {
			answer: correctPokemon,
			guesses: guesses
		}
		gameData.update(() => gData)
	}
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
    .vitext {
        color: #fff;
        text-shadow: 2px 0 0 #000, 0 -2px 0 #000, 0 2px 0 #000, -2px 0 0 #000;
    }
</style>

<div style="background-color: #aeaeae; min-height: 100vh" class="pb-12">
	{#if !hasWon}
		<div class="flex justify-center pt-4">
			<div class="w-64">
				<PokeSelect on:submit={handleSubmit} options={selectOptions} placeholder="Input pokemon name"/>
			</div>
		</div>
	{:else}
		<div class="pt-4">
			<p class="text-xl">You got it! It was <b class="vitext">{titleCase(correctPokemon.name)}</b></p>
			<span class="text-xs">You managed to solve the pokedle in {guesses.length} {guesses.length == 1 ? "try" : "tries"}!</span><br>
			<button on:click={resetPokedle}>I wanna go again!</button>
		</div>
	{/if}

	<div class="flex flex-col justify-center">
		{#if showheader}
			<div id="#header" class="flex flex-row justify-center sus">
				<span class="vitext">Pokemon</span>
				<p class="vitext">Species</p>
				<p class="vitext">Generation</p>
				<p class="vitext">Types</p>
				<p class="vitext">Habitat</p>
				<p class="vitext">Shape</p>
				<p class="vitext">Height</p>
				<p class="vitext">Weight</p>
			</div>
		{/if}
		{#each guesses as guess}
			<GuessRow guess={guess} correct={correctPokemon}/>
		{/each}
	</div>
	
</div>
