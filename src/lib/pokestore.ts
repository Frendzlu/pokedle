import Pokemon from '../Pokemon'
import { writable } from 'svelte/store'


const stored = JSON.parse(localStorage.pokemons || "[]")
const dataToProcess = JSON.parse(localStorage.toProcess || "[]")

let processed = stored.map((poke, i) => new Pokemon(poke, i))

export const pokemonDB = writable(processed)
export const toProcess = writable(dataToProcess)

pokemonDB.subscribe(value => localStorage.pokemons = JSON.stringify(value))
toProcess.subscribe(value => localStorage.toProcess = JSON.stringify(value))