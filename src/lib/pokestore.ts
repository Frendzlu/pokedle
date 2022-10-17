import Pokemon from '../Pokemon'
import { writable } from 'svelte/store'


const stored = JSON.parse(localStorage.pokemons || "[]")
const dataToProcess = JSON.parse(localStorage.toProcess || "[]")
const gameDataLS = JSON.parse(localStorage.gameData || "{\"guesses\": []}")

let processed = stored.map((poke, i) => new Pokemon(poke, i))

export interface GameData {
    answer?: Pokemon
    guesses: Pokemon[]
}

export const pokemonDB = writable<Pokemon[]>(processed)
export const toProcess = writable(dataToProcess)
export const gameData = writable<GameData>(gameDataLS)

pokemonDB.subscribe(value => localStorage.pokemons = JSON.stringify(value))
toProcess.subscribe(value => localStorage.toProcess = JSON.stringify(value))
gameData.subscribe(value => localStorage.gameData = JSON.stringify(value))