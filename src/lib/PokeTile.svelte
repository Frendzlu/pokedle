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

	let rarityColors = {
		"Normal": "#545454",
		"Legendary": "#ff0000",
		"Mythical": "#00ff00"
	}

	function titleCase(str: string) {
		let x = str.charAt(0).toUpperCase()
		return x + str.substring(1)
	}

	function toRoman(str: string) {
		return ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"][parseInt(str)-1]
	}

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

	/* Tooltip container */
    .tooltip {
      position: relative;
      display: inline-block;
      border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
    }
    
    /* Tooltip text */
    .tooltip .tooltiptext {
      visibility: hidden;
      width: 120px;
      background-color: black;
      color: #fff;
      text-align: center;
      padding: 5px 0;
      border-radius: 6px;
     
      /* Position the tooltip text - see examples below! */
      position: absolute;
      z-index: 1;
    }
    
    /* Show the tooltip text when you mouse over the tooltip container */
    .tooltip:hover .tooltiptext {
      visibility: visible;
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
	<table style="width: 100%">
		<tr>
			<td colspan="2"><span>Generation: {toRoman(pokemon.generation)}</span></td>
		</tr>
		<tr>
			<td colspan="2"><span>Species: {pokemon.species.name}</span></td>
		</tr>
		<tr>
			<td width=100>
				<span>
					{#each pokemon.types as type}
						<div class="rounded-md w-3 h-3 tooltip" style="background-color: {typeColors[type]}">
							<span class="tooltiptext">{type}</span>
						</div>
					{/each}
				</span>
			</td>
			<td>
				<span style="color: {rarityColors[pokemon.rarity]}">{pokemon.rarity}</span>
			</td>
		</tr>
		<tr>
			<td><div class="flex flex-col"><span style="font-size:xx-small">Weight</span><br><span style="margin-top: -0.5rem;">{pokemon.weight}</span></div></td>
			<td><div class="flex flex-col"><span style="font-size:xx-small">Height</span><br><span style="margin-top: -0.5rem;">{pokemon.height}</span></div></td>
		</tr>
		<tr>
			<td><div class="flex flex-col"><span style="font-size:xx-small">Habitat</span><br><span style="margin-top: -0.5rem;">{pokemon.habitat}</span></div></td>
			<td><div class="flex flex-col"><span style="font-size:xx-small">Shape</span><br><span style="margin-top: -0.5rem;">{pokemon.shape}</span></div></td>
		</tr>
	</table>
</div>