<script lang="ts">
	import Pokemon from "../Pokemon";
	import PokeSelect from "../lib/PokeSelect.svelte";
	import GuessRow from "../lib/GuessRow.svelte";

	export let pokemons: Pokemon[] = []

	let correctPokemon: Pokemon =  pokemons[Math.floor(Math.random()*pokemons.length)]
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
	}
</script>
<div style="background-color: #aeaeae; min-height: 100vh" class="pb-12">
	<div class="w-64">
		<PokeSelect on:submit={handleSubmit} options={selectOptions} placeholder="Input pokemon name"/>
	</div>
	{#each guesses as guess}
		<GuessRow guess={guess} correct={correctPokemon}/>
	{/each}
</div>
