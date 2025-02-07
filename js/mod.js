let modInfo = {
	name: "The Dressy Tree",
	author: "Dressyapper",
	pointsName: "Points",
	modFiles: ["DressyLayer.js", "tree.js", "components.js","achievements.js","Super.js","Hyper.js","Challengetree.js","money.js","math.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 0,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1",
	name:"No",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Not using this<br>`
		

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]
let Ma_effect = 0.1
let Ma_exponent = 2.5
let Globallayereffectpow = 1
let Globallayereffectmult = 1

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if (hasUpgrade('D', 11)) gain = gain.times(2)
	if (hasUpgrade('D', 12)) gain = gain.times(2)
	if (hasUpgrade('D', 13)) gain = gain.times(2)
	if (hasUpgrade('D', 14)) gain = gain.times(2)
	if (hasUpgrade('D', 15)) gain = gain.times(1.01)
	if (hasUpgrade('D', 16)) gain = gain.pow(1.01)
	if (hasUpgrade('D', 21)) gain = gain.times(1.01)
	if (hasUpgrade('D', 22)) gain = gain.times(1.23)
	if (hasUpgrade('D', 23)) gain = gain.times(2.31)
	if (hasUpgrade('D', 24)) gain = gain.times(3.21)		
	if (hasUpgrade('D', 25)) gain = gain.times(5)
	if (hasUpgrade('D', 26)) gain = gain.times(22)
	if (hasMilestone('S', 1)) gain = gain.times(1.5)
	if (hasUpgrade('S', 11)) gain = gain.times(upgradeEffect('S', 11))	
	if (hasUpgrade('S', 12)) gain = gain.times(upgradeEffect('S', 12))
	if (hasUpgrade('S', 21)) gain = gain.times(1.1)
	if (hasUpgrade('S', 22)) gain = gain.times(2)
	if (hasUpgrade('S', 23)) gain = gain.times(3.33)
	if (hasUpgrade('S', 24)) gain = gain.times(upgradeEffect('S', 24))
	if (hasUpgrade('S', 25)) gain = gain.pow(1.05)
	if (hasUpgrade('S', 31)) gain = gain.times(6)
	if (hasUpgrade('S', 33)) gain = gain.times(upgradeEffect('S', 33))
	if (hasMilestone('H', 1)) gain = gain.pow(1.1)
	if (layers.Ma.effect().gte(1)) gain = gain.times(layers.Ma.effect())
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("1ee100"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}