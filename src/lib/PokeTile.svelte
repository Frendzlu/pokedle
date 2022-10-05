<script lang="ts">
    import type Pokemon from "../Pokemon";

	export let pokemon: Pokemon

	let typeColors = {
		"grass": "#78c850",
		"fire": "#f08030",
		"water": "#6890f0",
		"bug": "#a8b820",
		"normal": "#a8a878",
		"poison": "#a040a0",
		"electric": "#f8d030",
		"ground": "#e0c068",
		"fairy": "#ee99ac",
		"fighting": "#c03028",
		"psychic": "#f85888",
		"rock": "#b8a038",
		"ghost": "#705898",
		"ice": "#98d8d8",
		"dragon": "#7038f8",
		"steel": "#454545",
		"flying": "#5eb9b2",
		"dark": "#2d1c1c",
		"shadow": "#260940",
		"unknown": "#ffffff"
	}

	function titleCase(str: string) {
		let x = str.charAt(0).toUpperCase()
		return x + str.substring(1)
	}

	console.log(pokemon.color)
</script>

<style>
    .idtext {
		font-size: 8px; /* fallback */
  		font-size: clamp(8px, 0.75rem, 16px);
		margin-top: 0.25rem;
    }

	.vitext {
		color: #fff;
        text-shadow: 2px 0 0 #000, 0 -2px 0 #000, 0 2px 0 #000, -2px 0 0 #000;
	}
</style>
<div class="container w-48 m-2 shadow-2xl" style="background-color: #fff;">
	<div class="container flex flex-row shadow-xl">
		<div class="w-12 h-8 content-center" style="background-color: {pokemon.color}; height: 100%">
			<p class="vitext" style="text-align: center; line-height: 2.25rem;">#{pokemon.id}</p>
		</div>
		<b class="h-8 w-36 idtext vitext" style="text-align: center; line-height: 2rem">{titleCase(pokemon.name)}</b>
	</div>
	<img
		class="w-48 h-48"
		src={pokemon.imageUrl} alt="{titleCase(pokemon.name)} front image">
	{pokemon.generation} |
	{pokemon.growthRate} |
	{pokemon.habitat} |
	{pokemon.height} |
	{pokemon.rarity} |
	{pokemon.shape} |
	{pokemon.weight} |
	{pokemon.types} |
	{pokemon.species.name}
</div>