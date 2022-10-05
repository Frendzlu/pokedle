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
</script>

<style>
    .vitext {
        color: #fff;
        text-shadow: 1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000;
    }
</style>
<div class="container w-48 m-2 shadow-2xl" style="background-color: #fff;">
	<div class="container flex flex-row shadow-xl">
		<div class="w-12 h-8 content-center">
			<p style="color: #555; text-align: center; line-height: 1.75rem">#{pokemon.id}</p>
		</div>
		<b class="h-8 w-36 vitext" style="text-align: center; line-height: 1.75rem">{pokemon.name}</b>
	</div>
	<img
		class="w-48 h-48"
		src={pokemon.imageUrl} alt="{pokemon.name} front image">
</div>