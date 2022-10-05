<script lang="ts">
    import MultiSelect from "../lib/MultiSelect.svelte";
    import PokeTile from "../lib/PokeTile.svelte";
    import type Pokemon from "../Pokemon";

	export let pokemons: Pokemon[];
	export let searchStr = ""
	export let typeval: string[] = []

	$: potentialPokes = pokemons.filter(pokemon => {
		let typeFlag = true
		for (let type of pokemon.types) {
			if (!typeval.includes(type)) typeFlag = false
		}
		if (typeval.length === 0) typeFlag = true
		return pokemon.name.toLowerCase().includes(searchStr.toLowerCase()) && typeFlag
	})
	$: visible = potentialPokes.slice(currentPage * pokesPerPage, currentPage * pokesPerPage + pokesPerPage)

	let pokesPerPage = 36;
	export let currentPage = 0;
	$: pages = Math.ceil(potentialPokes.length / pokesPerPage);
	let activePageString = "h-10 py-2 px-3 text-blue-600 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
	let pageString = "h-10 py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"

</script>
<div style="background-color: #eaeaea; min-height: 100vh">
	<div class="flex justify-between mx-4">
		<input class="mt-2 h-7 indent-1" placeholder="Name..." type="text" bind:value={name} on:input={() => {currentPage = 0}}>
		<input class="mt-2 h-7 indent-1" placeholder="Name..." type="text" bind:value={height} on:input={() => {currentPage = 0}}>
		<input class="mt-2 h-7 indent-1" placeholder="Name..." type="text" bind:value={width} on:input={() => {currentPage = 0}}>
		<div class="mt-2">
			<MultiSelect id='lang' bind:value={typeval} inputEvent={() => {currentPage = 0}}>
				<option style="color: #78c850" value="grass">Grass</option>
				<option style="color: #f08030" value="fire">Fire</option>
				<option style="color: #6890f0" value="water">Water</option>
				<option style="color: #a8b820" value="bug">Bug</option>
				<option style="color: #a8a878" value="normal">Normal</option>
				<option style="color: #a040a0" value="poison">Poison</option>
				<option style="color: #f8d030" value="electric">Electric</option>
				<option style="color: #e0c068" value="ground">Ground</option>
				<option style="color: #ee99ac" value="fairy">Fairy</option>
				<option style="color: #c03028" value="fighting">Fighting</option>
				<option style="color: #f85888" value="psychic">Psychic</option>
				<option style="color: #b8a038" value="rock">Rock</option>
				<option style="color: #705898" value="ghost">Ghost</option>
				<option style="color: #98d8d8" value="ice">Ice</option>
				<option style="color: #7038f8" value="dragon">Dragon</option>
				<option style="color: #454545" value="steel">Steel</option>
				<option style="color: #5eb9b2" value="flying">Flying</option>
				<option style="color: #2d1c1c" value="dark">Dark</option>
			</MultiSelect>
		</div>
		<div class="mt-2">
			<MultiSelect id='lang' bind:value={typeval} inputEvent={() => {currentPage = 0}}>
				<option style="color: #cecece" value="grass">Grass</option>
				<option style="color: #f08030" value="fire">Fire</option>
				<option style="color: #6890f0" value="water">Water</option>
			</MultiSelect>
		</div>
	</div>
	<div class="flex flex-wrap justify-center">
		{#each visible as pokemon}
			<PokeTile pokemon={pokemon}/>
		{/each}
	</div>
	<ul class="flex w-screen flex-wrap justify-center m-2 mb-4">
		<li>
			<button on:click={() => currentPage = (currentPage !== 0 ? currentPage - 1 : currentPage)} class="h-10 py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</button>
		</li>
		{#each Array(pages) as _, i}
			<button on:click={() => currentPage = i} class={currentPage === i ? activePageString : pageString}>{i+1}</button>
		{/each}
		<li>
			<button on:click={() => currentPage = (currentPage !== pages - 1 ? currentPage + 1 : currentPage)} class="h-10 py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</button>
		</li>
	</ul>
</div>