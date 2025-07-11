let modInfo = {
	name: "The Dressy Tree",
	author: "Dressyapper",
	pointsName: "Points",
	id : "dressyapper",
	modFiles: ["DressyLayer.js", "tree.js", "components.js","achievements.js","Super.js","Hyper.js","Click.js","money.js","Layerverse.js","layerverse_layers/prestige.js", "layerverse_layers/math.js", "layerverse_layers/time.js"],

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


function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

function getPointBase(){
	let gain = new Decimal(1)
	if (layers.A.effect().gte(1)) gain = gain.add(layers.A.effect())
	return gain
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	////////////////////////////////////////////////////////////////
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
	if (getBuyableAmount('D', '11').gte(1)) mult = mult.times(getBuyableAmount('D', '11').pow(player.D.Dbuyablepower)).add(1)
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
	if (getBuyableAmount("M",11).gte(0)) gain = gain.times(buyableEffect("M",11))
	if (hasUpgrade('D', 34)) gain = gain.times(3)
	if (hasUpgrade('D', 35)) gain = gain.times(1.5)
	if (layers.L.effect().gte(1)) gain = gain.times(layers.L.effect())
	if (hasUpgrade('L', 16)) gain = gain.times(upgradeEffect('L', 16))	
	if (hasUpgrade('L', 12)) gain = gain.times(5)

	//LAYERVERSE
	if (hasChallenge('L',11)) gain = gain.times(challengeEffect('L', 11))
	if (hasChallenge('L',12)) gain = gain.times(challengeEffect('L', 12))

	if (hasUpgrade('P', 11)) gain = gain.times(10)
	
	if (hasUpgrade('Ma', 11)) gain = gain.add(upgradeEffect('Ma', 11))
	if (hasUpgrade('Ma', 15)) gain = gain.pow(upgradeEffect('Ma', 15))	
	if (hasUpgrade('Ma', 22)) gain = gain.times(upgradeEffect('Ma', 22))	
	if (hasUpgrade('Ma', 23)) gain = gain.times(upgradeEffect('Ma', 23))
	if (hasUpgrade('Ma', 24)) gain = gain.times(upgradeEffect('Ma', 24))
	if (hasUpgrade("Ma",31)) gain = gain.times(upgradeEffect("Ma",31))
	if (hasUpgrade("Ma",32)) gain = gain.times(upgradeEffect("Ma",32))
	if (hasUpgrade("Ma",33)) gain = gain.times(upgradeEffect("Ma",33))
	if (hasUpgrade("Ma",34)) gain = gain.times(upgradeEffect("Ma",34))   	   			
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
	layerview: 0,
	endgame: new Decimal("1e100")
}}

// Display extra things at the top of the page
var displayThings = ["3", "Text2"]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal(player.endgame))
}

function randint(min, max) {
	return Math.floor(Math.random() * (max - min) ) + min;
  }

// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return (1) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}

setInterval(function() {addPoints("Mi",new Decimal(player.Mi.clicky.add(player.Mi.clickyadd).times(player.Mi.clickymult).times(buyableEffect("Mi",11)).floor()).times(player.Mi.Pgen).div(50))}, 20)
setInterval(function() {player.T.points = player.T.points.add(new Decimal(0.05).times(player.T.mult).pow(player.T.pow))},50) 