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
	.green, .red, .yellow {
		p {
		  line-height: 4rem;
		}
		width: 8rem;
		height: 4rem;
	}
</style>
<div class="flex flex-row justify-center">
	<div>
		<img src={guess.imageUrl} class="h-16 w-16">
	</div>
	<div class={compare(guess.species.name, correct.species.name)}>
		<p>{titleCase(guess.species.name)}</p>
	</div>
	<div class={compare(guess.generation, correct.generation)}>
		<p>{toRoman(guess.generation)}</p>
	</div>
	<div class="{compareTypes(guess.types, correct.types)} flex flex-row justify-center">
		<div class="flex flex-col justify-center">
			{#each guess.types as type}
				<div class="rounded-md w-16 h-6 m-1" style="background-color: {typeColors[type]}">
					<span class="">{type}</span>
				</div>
			{/each}
		</div>
	</div>
	<div class={compare(guess.habitat, correct.habitat)}>
		<p>{fixHabitat(guess.habitat)}</p>
	</div>
	<div class={compare(guess.shape, correct.shape)}>
		<p>{titleCase(guess.shape)}</p>
	</div>
	<div class={compare(guess.height, correct.height)}>
		<p>{guess.height}</p>
	</div>
	<div class={compare(guess.weight, correct.weight)}>
		<p>{guess.weight}</p>
	</div>
</div>