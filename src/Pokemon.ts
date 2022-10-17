import {generationDict} from "./Utils";

export interface IPokemon {
    name: string
    sprites: {
        front_default: string
    }
    types: {
        slot: number
        type: NURI
    }[]
    weight: number
    height: number
    species: NURI
    id: number
}

export interface IFlavorText {
    flavor_text: string
        language: NURI
        version: NURI
}

export interface ISpecies {
    color: NURI
    evolution_chain: {
        url: string
    }
    flavor_text_entries: IFlavorText[]
    generation: NURI
    growth_rate: NURI
    habitat: NURI
    has_gender_differences: boolean
    id: number
    is_baby: boolean
    is_legendary: boolean
    is_mythical: boolean
    name: string
    shape: NURI
    varieties: {
        is_default: boolean
        pokemon: NURI
    }[]
}

export interface NURI {
    name: string
    url: string
}

export interface Generation {
    id: number
    pokemon_species: NURI[]
    main_region: NURI
}

function latinize(str: string) {
    let res = ""
    for (let i of "aeiouy"){
        if (str.endsWith(i)){
            res = str.substring(0, str.length-1)
            break
        }
    }
    return (res ? res : str) + "us";
}

export default class Pokemon {
    name: string
    id: number
    apiId: number
    evolutionInfo: number[]
    types: string[]
    height: number
    weight: number
    imageUrl: string
    species: NURI

    color?: string
    flavorText: string = "Lorem ipsum"
    generation?: string
    growthRate?: string
    habitat?: string
    hasGenders?: boolean
    rarity?: string
    shape?: string

    source: "url" | "localStorage" = "url"

    constructor(data: Pokemon, id: number)
    constructor(data: IPokemon, id: number)
    constructor(data: Pokemon | IPokemon, id?: number) {
        //console.log(id)
        if (typeof (data as Pokemon).shape != "undefined"){
            data = data as Pokemon
            this.imageUrl = data.imageUrl || "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png"
            this.types = data.types
            this.source = "localStorage"
            this.color = data.color
            this.flavorText = data.flavorText
            this.generation = data.generation
            this.growthRate = data.growthRate
            this.habitat = data.habitat
            this.hasGenders = data.hasGenders
            this.rarity = data.rarity
            this.shape = data.shape
            this.species = data.species
        } else {
            data = data as IPokemon
            if (data.sprites) {
                this.imageUrl = data.sprites.front_default || "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png"
            } else this.imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png"
            this.types = data.types.map(type => type.type.name)
            this.species = {
                name: latinize(data.species.name),
                url: data.species.url
            }
        }
        this.name = data.name
        this.apiId = data.id
        this.evolutionInfo = [data.id]
        this.height = data.height
        this.weight = data.weight
        this.id = id
    }

    async getSpeciesInfo() {
        if (this.source == "localStorage") return
        let speciesInfo = await fetch(this.species.url)
            .then(res => res.json())
            .catch(r => console.log(r)) as ISpecies
        this.color = speciesInfo.color.name
        this.flavorText = processFlavor(speciesInfo.flavor_text_entries)
        this.generation = generationDict[speciesInfo.generation.name]
        this.growthRate = speciesInfo.growth_rate.name
        this.habitat = speciesInfo.habitat ? speciesInfo.habitat.name : "unknown"
        this.hasGenders = speciesInfo.has_gender_differences
        this.rarity = getHighestRarity(speciesInfo)
        this.shape = speciesInfo.shape ? speciesInfo.shape.name : "unknown"
    }
}

function getHighestRarity(data: ISpecies) {
    if (data.is_mythical) return "Mythical"
    else if (data.is_legendary) return "Legendary"
    else return "Normal"
}

function processFlavor(flavors: IFlavorText[]) {
    if (flavors.length = 0) return "No description"
    let engFlavors = flavors.filter(flavor => flavor.language.name == "en")
        .map(flavor => flavor.flavor_text)
    let unique = [...new Set(engFlavors)];
    return unique.join(' ')
}