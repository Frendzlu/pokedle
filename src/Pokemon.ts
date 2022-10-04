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

    constructor(data: IPokemon) {
        this.name = data.name
        this.apiId = data.id
        this.id = realId(data.id)
        this.types = data.types.map(type => type.type.name)
        this.evolutionInfo = [data.id]
        this.height = data.height
        this.weight = data.weight
        this.imageUrl = data.sprites.front_default
        this.species = data.species
    }

    async getSpeciesInfo() {
        let speciesInfo = await fetch(this.species.url)
            .then(res => res.json())
            .catch(r => console.log(r)) as ISpecies
        this.color = speciesInfo.color.name
        this.flavorText = processFlavor(speciesInfo.flavor_text_entries)
        this.generation = speciesInfo.generation.name
        this.growthRate = speciesInfo.growth_rate.name
        this.habitat = speciesInfo.habitat.name
        this.hasGenders = speciesInfo.has_gender_differences
        this.rarity = getHighestRarity(speciesInfo)
        this.shape = speciesInfo.shape.name
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

function realId(id: number) {
    let temp = id.toString().split('')
    if (id >= 1000) {
        temp.splice(2 - 1 , 1)
    }
    return parseInt(temp.join(''))
}