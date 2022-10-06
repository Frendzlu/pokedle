	<script lang="ts">
		import MultiSelect from "../lib/MultiSelect.svelte";
		import PokeTile from "../lib/PokeTile.svelte";
		import type Pokemon from "../Pokemon";

		export let pokemons: Pokemon[];

		let name = ""
		let height = 0
		let weight = 0
		let heightMode: string = ">"
		let weightMode: string = ">"
		
		let types: string[] = []
		let shape = ""
		let habitat = ""
		let species = ""
		let color = ""
		let generation = 0

		$: potentialPokes = pokemons.filter(pokemon => {
			let typeFlag = false
			for (let type of pokemon.types) {
				if (types.includes(type)) {
					typeFlag = true
					break
				}
			}
			if (types.length === 0) typeFlag = true
			return pokemon.name.toLowerCase().includes(name.toLowerCase()) && 
				(heightMode == "=" ? pokemon.height == height : heightMode == ">" ? pokemon.height > height : pokemon.height < height) &&
				(weightMode == "=" ? pokemon.weight == weight : weightMode == ">" ? pokemon.weight > weight : pokemon.weight < weight) &&
				pokemon.species.name.includes(species) &&
				(color ? pokemon.color == color : true) &&
				(habitat ? pokemon.habitat == habitat : true) &&
				(shape ? pokemon.shape == shape : true) &&
				(generation < 1 ? true : parseInt(pokemon.generation) == generation) &&
				typeFlag
		})
		$: visible = potentialPokes.slice(currentPage * pokesPerPage, currentPage * pokesPerPage + pokesPerPage)

		let pokesPerPage = 36;
		export let currentPage = 0;
		$: pages = Math.ceil(potentialPokes.length / pokesPerPage);
		let activePageString = "h-10 py-2 px-3 text-blue-600 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
		let pageString = "h-10 py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"

	</script>
	<div style="background-color: #eaeaea; min-height: 100vh">
		<div class="flex justify-between mx-8">
			<div>
				<label for="name" class="block text-sm font-medium text-gray-700">Name</label>
				<div class="relative mt-1 rounded-md shadow-sm">
					<input bind:value={name} on:input={() => currentPage = 0} placeholder="Name..." type="text" id="name" class="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
				</div>
			</div>
			<div>
				<label for="species" class="block text-sm font-medium text-gray-700">Species</label>
				<div class="relative mt-1 rounded-md shadow-sm">
					<input bind:value={species} on:input={() => currentPage = 0} placeholder="Species..." type="text" id="species" class="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
				</div>
			</div>
			<div>
				<label for="height" class="block text-sm font-medium text-gray-700">Height</label>
				<div class="relative mt-1 rounded-md shadow-sm">
					<input bind:value={height} on:input={() => currentPage = 0} type="text" id="height" class="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="0">
					<div class="absolute inset-y-0 right-0 flex items-center">
						<select bind:value={heightMode} on:input={() => currentPage = 0} class="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-0 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
							<option value=">">&gt;</option>
							<option value="=">=</option>
							<option value="<">&lt;</option>
						</select>
					</div>
				</div>
			</div>
			<div>
				<label for="weight" class="block text-sm font-medium text-gray-700">Weight</label>
				<div class="relative mt-1 rounded-md shadow-sm">
					<input bind:value={weight} on:input={() => currentPage = 0} type="text" id="weight" class="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="0">
					<div class="absolute inset-y-0 right-0 flex items-center">
						<select bind:value={weightMode} on:input={() => currentPage = 0} class="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-0 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
							<option value=">">&gt;</option>
							<option value="=">=</option>
							<option value="<">&lt;</option>
						</select>
					</div>
				</div>
			</div>
			<div class="relative" style="min-width: 15rem;">
				<label class="block text-sm font-medium text-gray-700">Types</label>
				<div class="relative mt-1 rounded-md shadow-sm">
					<div class="absolute inset-y-0 right-0 flex items-center">
						<MultiSelect id='types' bind:value={types} inputEvent={() => {currentPage = 0}}>
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
				</div>
			</div>
			<div>
				<label for="shape" class="block text-sm font-medium text-gray-700">Shape</label>
				<div class="relative mt-1 rounded-md shadow-sm">
					<select id="shape" bind:value={shape} on:input={() => currentPage = 0} class="h-full block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white">
						<option value="quadruped">Quadruped</option>
						<option value="upright">Upright</option>
						<option value="armor">Armor</option>
						<option value="squiggle">Squiggle</option>
						<option value="bug-wings">Bug-wings</option>
						<option value="wings">Wings</option>
						<option value="humanoid">Humanoid</option>
						<option value="legs">Legs</option>
						<option value="blob">Blob</option>
						<option value="heads">Heads</option>
						<option value="tentacles">Tentacles</option>
						<option value="arms">Arms</option>
						<option value="fish">Fish</option>
						<option value="ball">Ball</option>
						<option value="unknown">Unknown</option>
					</select>
				</div>
			</div>
			<div>
				<label for="generation" class="block text-sm font-medium text-gray-700">Generation</label>
				<div class="relative mt-1 rounded-md shadow-sm">
					<select id="generation" bind:value={generation} on:input={() => currentPage = 0} class="h-full block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white">
						<option value="1">I</option>
						<option value="2">II</option>
						<option value="3">III</option>
						<option value="4">IV</option>
						<option value="5">V</option>
						<option value="6">VI</option>
						<option value="7">VII</option>
						<option value="8">VIII</option>
						<option value="0">All</option>
					</select>
				</div>
			</div>
			<div>
				<label for="habitat" class="block text-sm font-medium text-gray-700">Habitat</label>
				<div class="relative mt-1 rounded-md shadow-sm">
					<select id="habitat" bind:value={habitat} on:input={() => currentPage = 0} class="h-full block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white">
						<option value="grassland">Grassland</option>
						<option value="mountain">Mountain</option>
						<option value="waters-edge">Waters-edge</option>
						<option value="forest">Forest</option>
						<option value="rough-terrain">Rough-terrain</option>
						<option value="cave">Cave</option>
						<option value="urban">Urban</option>
						<option value="sea">Sea</option>
						<option value="rare">Rare</option>
						<option value="unknown">Unknown</option>
					</select>
				</div>
			</div>
			<div>
				<label for="color" class="block text-sm font-medium text-gray-700">Color</label>
				<div class="relative mt-1 rounded-md shadow-sm">
					<select id="color" bind:value={color} on:input={() => currentPage = 0} class="h-full block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white">
						<option value="green">Green</option>
						<option value="red">Red</option>
						<option value="blue">Blue</option>
						<option value="white">White</option>
						<option value="brown">Brown</option>
						<option value="yellow">Yellow</option>
						<option value="purple">Purple</option>
						<option value="pink">Pink</option>
						<option value="gray">Gray</option>
						<option value="black">Black</option>
					</select>
				</div>
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