<script lang="ts">
	import type Pokemon from "../Pokemon";
	import {fixHabitat, titleCase, toRoman, typeColors} from "../Utils";

	export let guess: Pokemon
	export let correct: Pokemon

	function compare(guess: any, correct: any) {
		if (guess == correct) return "green"
		return "red"
	}

	function compareTypes(guessTypes: string[], correctTypes: string[]) {
		let counter = 0
		for (let type of guessTypes) {
			if (correctTypes.includes(type)) counter++
		}
		if (counter == correctTypes.length) return "green"
		if (counter > 0) return "yellow"
		return "red"
	}

	function compareNumber(guessNumber: number, correctNumber: number) {
		if (guessNumber < correctNumber) return "red higher"
		else if (guessNumber > correctNumber) return "red lower"
		return "green"
	}
</script>
<style lang="scss">
	.green {
		background-color: green;
	}
	.red {
		background-color: red;
	}
	.yellow {
		background-color: yellow;
	}
	.higher {
	    background-image: url("src/assets/up.png");
	}
	.lower {
	    background-image: url("src/assets/down.png");
	}
	.higher, .lower {
	    background-repeat: no-repeat;
	    background-size: contain;
	    background-position: center;
	}
	.green, .red, .yellow {
		p {
		    line-height: 4rem;
		}
		width: 8rem;
		height: 4rem;
	}

    .vitext {
      color: #fff;
      text-shadow: 2px 0 0 #000, 0 -2px 0 #000, 0 2px 0 #000, -2px 0 0 #000;
    }

    .tooltip {
      position: relative;
      display: inline-block;
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
    .tooltip:hover .tooltiptext {
      visibility: visible;
    }
</style>
<div class="flex flex-row justify-center">
	<div class="tooltip">
		<img src={guess.imageUrl} class="h-16 w-16" alt={guess.name}>
		<p class="tooltiptext">{guess.name}</p>
	</div>
	<div class={compare(guess.species.name, correct.species.name)}>
		<p class="vitext">{titleCase(guess.species.name)}</p>
	</div>
	<div class={compare(guess.generation, correct.generation)}>
		<p class="vitext">{toRoman(guess.generation)}</p>
	</div>
	<div class="{compareTypes(guess.types, correct.types)} flex flex-row justify-center">
		<div class="flex flex-col justify-center">
			{#each guess.types as type}
				<div class="rounded-md w-16 h-6 m-1" style="background-color: {typeColors[type]}">
					<span class="vitext">{type}</span>
				</div>
			{/each}
		</div>
	</div>
	<div class={compare(guess.habitat, correct.habitat)}>
		<p class="vitext">{fixHabitat(guess.habitat)}</p>
	</div>
	<div class={compare(guess.shape, correct.shape)}>
		<p class="vitext">{titleCase(guess.shape)}</p>
	</div>
	<div class={compareNumber(guess.height, correct.height)}>
		<p class="vitext">{guess.height}</p>
	</div>
	<div class={compareNumber(guess.weight, correct.weight)}>
		<p class="vitext">{guess.weight}</p>
	</div>
</div>