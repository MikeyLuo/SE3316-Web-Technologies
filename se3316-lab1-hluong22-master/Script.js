
var FirstTwentyPokemon = [ //Creating an Array to store pokemon id, and number
	Bulbasaur ={
		id: "Bulbasaur",
		number: 1,
		type: "Grass/Poison",
		Height: "2'04(ft)",
		Weight: "15.2(lbs)"
	},
	IvySaur={
		id: "IvySaur",
		number: 2,
		type: "Grass/Poison",
		Height: "3'03(ft)",
		Weight: "28.7(lbs)"
	},
	Venusaur={
		id: "Venusaur",
		number: 3,
		type: "Grass/Poison",
		Height: "6'07(ft)",
		Weight: "220.5(lbs)"
	},
	MegaVenusaur={
		id: "MegaVenusaur",
		number: 3,
		type: "Grass/Poison",
		Height: "7'10(ft)",
		Weight: "342.8(lbs)"
	},
	Charmander={
		id: "Charmander",
		number: 4,
		type: "Fire",
		Height: "2'0(ft)",
		Weight: "18.7(lbs)"
	},
	Charmeleon={
		id: "Charmeleon",
		number: 5,
		type: "Fire",
		Height: "3'07(ft)",
		Weight: "41.9(lbs)"
	},
	Charizard={
		id: "Charizard",
		number: 6,
		type: "Fire/Flying",
		Height: "5'07(ft)",
		Weight: "199.5(lbs)"
	},
	MegaXCharizard={
		id: "MegaXCharizard",
		number: 6,
		type: "Fire/Dragon",
		Height: "5'07(ft)",
		Weight: "243.6(lbs)"
	},
	MegaYCharizard={
		id: "MegaYcharizard",
		number: 6,
		type: "Fire/Flying",
		Height: "5'07(ft)",
		Weight: "221.6(lbs)"
	},
	Squirtle={
		id: "Squirtle",
		number: 7,
		type: "Water",
		Height: "1'08(ft)",
		Weight: "19.8(lbs)"
	},
	Wartotle={
		id: "Wartotle",
		number: 8,
		type: "Water",
		Height: "3'03(ft)",
		Weight: "49.6(lbs)"	
	},
	Blastoise={
		id: "Blastoise",
		number: 9,
		type: "Water",
		Height: "5′03(ft)",
		Weight: "188.5(lbs)"
	},
	MegaBlastoise={
		id: "MegaBlastoise",
		number: 9,
		type: "Water",
		Height: "5′03(ft)",
		Weight: "222.9(lbs)"
	},
	Caterpie={
		id: "Caterpie",
		number: 10,
		type: "Bug",
		Height: "1′00(ft)",
		Weight: "6.4(lbs)"
	},
	Metapod={
		id: "Metapod",
		number: 11,
		type: "Bug",
		Height: "2′04(ft)",
		Weight: "21.8(lbs)"
	},
	Butterfree={
		id: "Butterfree",
		number: 12,
		type: "Bug/Flying",
		Height: "3′07(ft)",
		Weight: "70.5(lbs)"
	},
	Weedle={
		id: "Weedle",
		number: 13,
		type: "Bug/Poison",
		Height: "1′00″(ft)",
		Weight: "7.1(lbs)"
	},
	Kakuna={
		id: "Kakuna",
		number: 14,
		type: "Bug/Poison",
		Height: "2′00″(ft)",
		Weight: "22.0(lbs)"
	},
	Beedrill={
		id: "Beedrill",
		number: 15,
		type: "Bug/Poison",
		Height: "3′03″(ft)",
		Weight: "65.0(lbs)"
	},
	MegaBeedrill={
		id: "MegaBeedrill",
		number: 15,
		type: "Bug/Poison",
		Height: "4′07″(ft)",
		Weight: "89.3(lbs)"
	},
	Pidgey={
		id: "Pidgey",
		number: 16,
		type: "Normal/Flying",
		Height: "1′00″(ft)",
		Weight: "4.0(lbs)"
	},
	Pidgeotto={
		id: "Pidgeotto",
		number: 17,
		type: "Normal/Flying",
		Height: "3′07″(ft)",
		Weight: "66.1(lbs)"
	},
	Pidgeot={
		id: "Pidgeot",
		number: 18,
		type: "Normal/Flying",
		Height: "4′11″(ft)",
		Weight: "87.1(lbs)"
	},
	MegaPidgeot={
		id: "MegaPidgeot",
		number: 18,
		type: "Normal/Flying",
		Height: "7′03″(ft)",
		Weight: "111.3(lbs)"
	},
	Rattata={
		id: "Rattata",
		number: 19,
		type: "Normal",
		Height: "1′00″(ft)",
		Weight: "7.7(lbs)"
	},
	Raticate={
		id: "Raticate",
		number: 20,
		type: "Normal",
		Height: "2′04″(ft)",
		Weight: "40.8(lbs)"
	},	
]

function NumberFunction(){ //Function that searches by pokemon number
	var i;
	var pokemonumber = document.getElementById("NumberSearch").value;
	if (pokemonumber>=1 && pokemonumber<=20){
		for(i=0;i<FirstTwentyPokemon.length;i++){
			if (pokemonumber == FirstTwentyPokemon[i].number){
				alert("Pokemon: " + FirstTwentyPokemon[i].id + "," + "\n" + 
				"Number: " + FirstTwentyPokemon[i].number + "," + "\n" + 
				"Type: " + FirstTwentyPokemon[i].type + "," + "\n" + 
				"Height: " + FirstTwentyPokemon[i].Height + "," + "\n" + 
				"Weight: " + FirstTwentyPokemon[i].Weight);
			}
		}
	}
	else{
		alert("Error - Incorrect input");
	}
}

function  NameFunction(){ //Function that searches by pokemon name
	var i;
	var pokemonmatched = [];
	var pokemoname = document.getElementById("NameSearch").value; // gets element from search box thats id is linked to "NameSearch"
	var Length = pokemoname.length;
	var Substring = pokemoname.toLowerCase().substring(0,Length);
	if(/^[a-z]+$/.test(pokemoname.toLowerCase()) && Length>=1 && Length<=20){ //checks to see if the string has any non letter characters
      for(i=0;i<FirstTwentyPokemon.length;i++){
			if ((Substring === (FirstTwentyPokemon[i].id.toLowerCase().substring(0,Length)))){ //If statement compares the first few letters of the name the user entered to all the names in the FirsTwentyPokemon array
				pokemonmatched.push(FirstTwentyPokemon[i]); //adds found pokemon name to the array 
				if(pokemonmatched.length >=5){ //Checks to see if possible matches are greater than 5
					break; //breaks out of for loop once all conditions are met
				}
			}		
			else if (pokemoname.toLowerCase() === FirstTwentyPokemon[i].id.toLowerCase()){ //If statement compares the name user entered to all the names in the FirsTwentyPokemon array
				pokemonmatched.push(pokemoname.toLowerCase());
				if(pokemonmatched.length >=5){
					break;
				}
			}
		}
		outputname(pokemonmatched); //Passes the array as a parameter to function outputname()
	}
   else{
      alert("Error - Incorrect input");
   }
}

function outputname(pokemonmatched){ // Function that displays the info of the pokemon
	var i=0;
	for(i=0;i<pokemonmatched.length;i++){
		alert("Pokemon: " + pokemonmatched[i].id + "," + "\n" + 
			"Number: " + pokemonmatched[i].number + "," + "\n" + 
			"Type: " + pokemonmatched[i].type + "," + "\n" + 
			"Height: " + pokemonmatched[i].Height + "," + "\n" + 
			"Weight: " + pokemonmatched[i].Weight);
	}
	
	if(pokemonmatched.length == 0){ //If statement that executes if the pokemon name entered does not match anything in the database
		alert("Error - Incorrect input");
	}
	
}














