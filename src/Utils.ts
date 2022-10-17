export const generationDict = {
	"generation-i": 1,
	"generation-ii": 2,
	"generation-iii": 3,
	"generation-iv": 4,
	"generation-v": 5,
	"generation-vi": 6,
	"generation-vii": 7,
	"generation-viii": 8,
	"generation-ix": 9
}

export const typeColors = {
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

export const rarityColors = {
	"Normal": "#545454",
	"Legendary": "#ff0000",
	"Mythical": "#00ff00"
}

export function titleCase(str: string) {
	let x = str.charAt(0).toUpperCase()
	return x + str.substring(1)
}

export function toRoman(str: string) {
	return ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"][parseInt(str)-1]
}

export function fixHabitat(str: string) {
	switch (str) {
		case "waters-edge": 
			return "Water's edge"
		case "rough-terrain":
			return "Rough terrain"
		default:
			return titleCase(str)
	}
}