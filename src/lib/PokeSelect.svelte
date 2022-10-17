<script lang="ts">
	import {createEventDispatcher} from 'svelte';
	import { fly } from 'svelte/transition';
	import {titleCase} from "../Utils";
	export let id = '';
	export let value = {};
	export let options: {name: string, value: number, imgURL: string}[] = []
	export let readonly = false;
	export let placeholder = '';

	let input,
		inputValue,
		activeOption = {name: "loading", value: -1, imgURL: ""},
		showOptions = true


	$: filtered = options.filter(o => inputValue ? o.name.toLowerCase().includes(inputValue.toLowerCase()) : o);
	$: if (activeOption && !filtered.includes(activeOption) || !activeOption && inputValue) activeOption = filtered[0];

	const dispatch = createEventDispatcher();

	function submit(id) {
		value = filtered.find(el => id == el.value);
		inputValue = ""
		optionsVisibility(false)
		previousTop = 0
		activeOption = {name: "loading", value: -1, imgURL: ""}
		dispatch('submit', {
			pokemon: value
		});
	}

	function onClick() {
		if (!showOptions) showOptions = true
	}

	function optionsVisibility(show) {
		try {
			if (readonly) return;
			if (typeof show === 'boolean') {
				showOptions = show;
				show && input.focus();
			} else {
				showOptions = !showOptions;
			}
		} catch (e) {
			console.log(e)
		}
	}

	let previousTop = 0

	function handleKeyup(e) {
		if (e.keyCode === 13) {
			submit(activeOption.value)
		} else if ([39,37].includes(e.keyCode)) { // up and down arrows
			const increment = e.keyCode === 37 ? -1 : 1;
			const currentIndex = filtered.indexOf(activeOption) + increment;
			let newIndex = currentIndex < 0 ? filtered.length - 1
				: currentIndex === filtered.length ? 0 : currentIndex;
			activeOption = filtered[newIndex]
			let el = document.querySelector<HTMLImageElement>(`#imgdiv :nth-child(${newIndex + 1})`)

			if (el.parentElement.clientHeight <= el.offsetTop - previousTop) {
				previousTop = el.offsetTop - el.parentElement.clientHeight
				el.parentElement.scrollTop = el.offsetTop - el.parentElement.clientHeight + el.clientHeight
			} else if (previousTop > el.offsetTop) {
				previousTop = el.offsetTop
				el.parentElement.scrollTop = el.offsetTop
			}
		} else if ([38, 40].includes(e.keyCode)) {
			const currentIndex = filtered.indexOf(activeOption)
			let el = document.querySelector<HTMLImageElement>(`#imgdiv :nth-child(${currentIndex + 1})`)
			let elemsPerRow = Math.floor(el.parentElement.clientWidth / el.clientWidth)
			const increment = e.keyCode === 38 ? -elemsPerRow: elemsPerRow;
			let lastRowElems = filtered.length % elemsPerRow
			let indexMod = currentIndex + increment
			let newIndex = indexMod < 0 ? -indexMod > lastRowElems ? filtered.length + (indexMod + lastRowElems) : filtered.length - 1
				: indexMod >= filtered.length ? indexMod < 2 * filtered.length ? indexMod - filtered.length : 0
					: indexMod;
			activeOption = filtered[newIndex]
			let newEl = document.querySelector<HTMLImageElement>(`#imgdiv :nth-child(${newIndex + 1})`)

			if (newEl.parentElement.clientHeight <= newEl.offsetTop - previousTop) {
				previousTop = newEl.offsetTop - newEl.parentElement.clientHeight
				newEl.parentElement.scrollTop = newEl.offsetTop - newEl.parentElement.clientHeight + newEl.clientHeight
			} else if (previousTop > newEl.offsetTop) {
				previousTop = newEl.offsetTop
				newEl.parentElement.scrollTop = newEl.offsetTop
			}
		}
	}

	function handleOptionMousedown(e) {
		submit(e.target.dataset.value)
	}

	let slot;

	// TODO: make both selects scroll responsive to key changes
	// TODO: poke select sideway keys?
	// TODO: show selected pokemon in input box
	// TODO: make it actually work
</script>

<style>
    .multiselect {
        background-color: white;
        border-bottom: 1px solid hsl(0, 0%, 70%);
        position: relative;
        margin-top: 1.2rem;
    }

    .tokens {
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        position: relative;
        min-width: 15rem
    }
    .tokens::after {
        background: none repeat scroll 0 0 transparent;
        bottom: -1px;
        content: "";
        display: block;
        height: 2px;
        left: 50%;
        position: absolute;
        background: hsl(45, 100%, 51%);
        transition: width 0.3s ease 0s, left 0.3s ease 0s;
        width: 0;
    }
    .tokens.showOptions::after {
        width: 100%;
        left: 0;
    }

    .actions {
        align-items: center;
        display: flex;
        flex: 1;
        min-width: 3rem;
    }

    input {
        border: none;
        font-size: 1rem;
        line-height: 1rem;
        margin: 0;
        outline: none;
        padding: 0;
        width: 100%;
    }

    .dropdown-arrow path {
        fill: hsl(0, 0%, 70%);
    }
    .multiselect:hover .dropdown-arrow path {
        fill: hsl(0, 0%, 50%);
    }

    .icon-clear path {
        fill: white;
    }

    .options {
        box-shadow: 0px 2px 4px rgba(0,0,0,.1), 0px -2px 4px rgba(0,0,0,.1);
        left: 0;
        list-style: none;
        margin-block-end: 0;
        margin-block-start: 0;
        max-height: 70vh;
        overflow: auto;
        padding-inline-start: 0;
        position: absolute;
        top: calc(100% + 1px);
        width: 100%;
    }
    li {
        background-color: white;
        cursor: pointer;
        padding: .5rem;
    }
    li:last-child {
        border-bottom-left-radius: .2rem;
        border-bottom-right-radius: .2rem;
    }

    img.active {
        opacity: 1;
    }

    img {
	    opacity: 0.2
    }

    .hidden {
        display: none;
    }

	#imgdiv {
		background-color: #aeaeaeee;
		overflow-x: hidden;
	}

    .tooltip {
        position: relative;
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
        z-index: 10;
    }
    .tooltip:hover .tooltiptext {
        visibility: visible;
	    width: 4rem;
	    font-size: xx-small;
    }
</style>
<p>{activeOption ? titleCase(activeOption.name) : "No pokemon found"}</p>
<div class="multiselect rounded-md" class:readonly>
	<div class="tokens rounded-md" class:showOptions>
		<div class="actions rounded-md">
			{#if !readonly}
				<input class="rounded-md" id={id} autocomplete="off" bind:value={inputValue} bind:this={input} on:click={onClick} on:keydown={handleKeyup} on:focus={()=>optionsVisibility(true)} on:blur={()=>optionsVisibility(false)} placeholder={placeholder}/>
				<svg class="dropdown-arrow" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M5 8l4 4 4-4z"></path></svg>
			{/if}
		</div>
	</div>

	<select bind:this={slot} class="hidden">
		{#each options as o}
			<option value={o.value}>{o.name}</option>
		{/each}
	</select>

	{#if showOptions}
		<div id="imgdiv" class="options flex flex-row flex-wrap rounded-md" transition:fly="{{duration: 200, y: 5}}" on:mousedown|preventDefault={handleOptionMousedown}>
			{#each filtered as option}
				<div class="tooltip">
					<img class="w-14" src={option.imgURL} class:active={activeOption === option} data-value="{option.value}" alt="sus">
					<p class="tooltiptext">{option.name}</p>
				</div>
			{/each}
		</div>
	{/if}
</div>