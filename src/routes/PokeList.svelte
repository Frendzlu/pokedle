<script lang="ts">
    import PokeTile from "../lib/PokeTile.svelte";
    import type Pokemon from "../Pokemon";

	export let pokemons: Pokemon[];

	export let typeval

	function titleCase(str: string) {
		let x = str.charAt(0).toUpperCase()
		return x + str.substring(1)
	}

	$: potentialPokes = pokemons.filter(pokemon => {
		let typeFlag = true
		for (let type of pokemon.types) {
			if (!typeval.includes(type)) typeFlag = false
		}
		if (typeval.length === 0) typeFlag = true
		return pokemon.name.toLowerCase().includes(searchStr.toLowerCase()) && typeFlag

	})
	$: visible = potentialPokes.slice(currentPage * pokesPerPage, currentPage * pokesPerPage + pokesPerPage)
	async function onVisibleChanged() {
		console.log(pages)
		for (const poke of visible) {
			if (poke.types.includes("unknown")) {
				poke.types = await getType(poke.apiId)
				let temppoke = pokemons.find(pokes => pokes.id === poke.id)
				temppoke = poke
				content.update(content => pokemons);
			}
		}
	}

	let pokesPerPage = 36;
	export let currentPage = 0;
	$: pages = Math.ceil(potentialPokes.length / pokesPerPage);
	let activePageString = "h-10 py-2 px-3 text-blue-600 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
	let pageString = "h-10 py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"

</script>
<div style="background-color: #eaeaea; min-height: 100vh">
	<div class="flex flex-wrap justify-center">
		{#each visible as pokemon}
			<PokemonTile pokemon={pokemon}/>
		{/each}
	</div>
	<ul class="flex w-screen justify-center m-2 mb-4">
		<li>
			<button on:click={() => {currentPage = (currentPage !== 0 ? currentPage - 1 : currentPage); onVisibleChanged()}} class="h-10 py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</button>
		</li>
		{#each Array(pages) as _, i}
			<button on:click={() => {currentPage = i; onVisibleChanged()}} class={currentPage === i ? activePageString : pageString}>{i+1}</button>
		{/each}
		<li>
			<button on:click={() => {console.log(currentPage, pages); currentPage = (currentPage !== pages - 1 ? currentPage + 1 : currentPage); onVisibleChanged()}} class="h-10 py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</button>
		</li>
	</ul>
</div>