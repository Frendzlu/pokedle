<script lang="ts">
	import Pokemon from "../Pokemon";
	import PokeSelect from "../lib/PokeSelect.svelte";

	export let pokemons: Pokemon[] = []

	let correctPokemon: Pokemon
	let guesses: Pokemon[] = []
	let chosenId: number
	$: selectOptions = pokemons.filter(p => {
		let x = guesses.map(g => g.apiId)
		return !x.includes(p.apiId)
	}).map(p => {return {name: p.name, value: p.apiId, imgURL: p.imageUrl}})

	function onKeyUp(e) {
		if (e.keyCode === 13) {
			console.log("from enter", e)
		}
	}
</script>
<div class="mx-4 h-screen" style="background-color: #eaeaea;">
	<div class="w-64">
		<PokeSelect bind:value={chosenId} options={selectOptions} placeholder="Input pokemon name"/>
	</div>
</div>
