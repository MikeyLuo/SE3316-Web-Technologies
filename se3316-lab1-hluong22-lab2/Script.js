var FirstTwentyPokemon = [ //Creating an Array to store pokemon id, and number
	Bulbasaur ={
		id: "Bulbasaur",
		number: 1,
		type: "Grass/Poison",
	},
	IvySaur={
		id: "IvySaur",
		number: 2,
		type: "Grass/Poison",
	},
	Venusaur={
		id: "Venusaur",
		number: 3,
		type: "Grass/Poison",
	},
	Charmander={
		id: "Charmander",
		number: 4,
		type: "Fire",
	},
	Charmeleon={
		id: "Charmeleon",
		number: 5,
		type: "Fire",
	},
	Charizard={
		id: "Charizard",
		number: 6,
		type: "Fire/Flying",
	},
	Squirtle={
		id: "Squirtle",
		number: 7,
		type: "Water",
	},
	Wartotle={
		id: "Wartotle",
		number: 8,
		type: "Water",	
	},
	Blastoise={
		id: "Blastoise",
		number: 9,
		type: "Water",
	},
	Caterpie={
		id: "Caterpie",
		number: 10,
		type: "Bug",
	},
	Metapod={
		id: "Metapod",
		number: 11,
		type: "Bug",
	},
	Butterfree={
		id: "Butterfree",
		number: 12,
		type: "Bug/Flying",
	},
	Weedle={
		id: "Weedle",
		number: 13,
		type: "Bug/Poison",
	},
	Kakuna={
		id: "Kakuna",
		number: 14,
		type: "Bug/Poison",
	},
	Beedrill={
		id: "Beedrill",
		number: 15,
		type: "Bug/Poison",
	},
	Pidgey={
		id: "Pidgey",
		number: 16,
		type: "Normal/Flying",
	},
	Pidgeotto={
		id: "Pidgeotto",
		number: 17,
		type: "Normal/Flying",
	},
	Pidgeot={
		id: "Pidgeot",
		number: 18,
		type: "Normal/Flying",
	},
	Rattata={
		id: "Rattata",
		number: 19,
		type: "Normal",
	},
	Raticate={
		id: "Raticate",
		number: 20,
		type: "Normal",
	},	
]

let foundNames, foundNumber = false;
var ul = document.getElementById("FirstTwentyPokemon");
var li = ul.getElementsByTagName("li");

var NumInput = document.getElementById("NumberSearch") //Event listener that functions whenever a number is typed
NumInput.addEventListener("keyup", SearchNumber); 
var NameInput = document.getElementById("NameSearch")  //Event listener that functions whenever a letter is typed
NameInput.addEventListener("keyup", SearchName);

function createDiv(){ //Function to create the parent div
	var pokedex = document.getElementById("pokedex");
	if (!foundNames && !foundNumber){
	var divContainer = document.createElement('div'); 
	divContainer.id = "container";
    //divContainer.textContent = "Title";
	document.body.append(divContainer);
	
	//Creates the header text "Possible Mathces" and appends to parent div 
	var divheader = document.createElement("div");
	divheader.id = "header";
	var headerText = document.createTextNode(" ========== Possible Matches ========== ");
	divheader.appendChild(headerText);
	divContainer.appendChild(divheader);

	//Creates ul list and appends to the parent div
	var ulist = document.createElement("ul");
	ulist.id = "pokeContainer";
	divContainer.appendChild(ulist);

	document.body.insertBefore(divContainer, pokedex); //Moves the newly created div container above "pokedex"
	}
}

function matches(pokemonmatched){ //Function that creates the li list and adds elements to it
	//Creates li list elements and appends to the ul list if matched
	var ulist = document.getElementById("pokeContainer");
	var olist = document.createElement("li");
	var idheader = document.createElement("header");
	var pokeimg = document.createElement("img");
	var poketype = document.createElement("header");

	var i;
	for (i=0;i<pokemonmatched.length;i++){ 
		olist.id = "#0"+pokemonmatched[i].number+" "+pokemonmatched[i].id;
		var idtext = document.createTextNode("#0"+pokemonmatched[i].number +" "+ pokemonmatched[i].id);
		var typetext = document.createTextNode("Type: "+pokemonmatched[i].type);
		idheader.textContent = ""; //Deletes search results
		poketype.textContent = "";

		//Append the header pokemon id to the li
		olist.appendChild(idheader);
		idheader.appendChild(idtext);
		
		pokeimg.setAttribute("src", li[pokemonmatched[i].number-1].getElementsByTagName("img")[0].src);
		console.log(li[pokemonmatched[i].number]);
		olist.appendChild(pokeimg);

		//Append the header pokemon type to the li 
		olist.appendChild(poketype);
		poketype.appendChild(typetext);	
	}
	ulist.appendChild(olist);
}

//function that clears everything in the list
function clearMatchedlist(){
	var matchedList = document.getElementById("pokeContainer");
	while(matchedList.firstChild){ //While loops runs aslong as there is anything in the list
		matchedList.firstChild.remove();
	}
}

//Function that clears the parent div container
function clearcontainer(){
	var removeContainer = document.getElementById("container");
	removeContainer.remove();
	foundNames = false;
	foundNumber = false;
}

function SearchNumber(){ //Function that searches by pokemon number
	var i;
	var pokemonmatched = [];
	var pokemonum = document.getElementById("NumberSearch").value;
	var Length = pokemonum.length;
	if(pokemonum>=1 && pokemonum<=20 && Length>=1 && Length<=2){ //Checks to see if number user entered is valid
		createDiv();
		foundNumber = true;
		clearMatchedlist();
		for(i=0;i<FirstTwentyPokemon.length;i++){
			if (FirstTwentyPokemon[i].number.toString().indexOf(pokemonum.toString()) > -1){ //Compares search input to the entire string 
				pokemonmatched.push(FirstTwentyPokemon[i]);
				matches(pokemonmatched);
				if(pokemonmatched.length >20){ //Checks to see if possible matches are greater than 5
					break; //breaks out of for loop once all conditions are met
				}
			}
		}
	}
	else if(pokemonum.length == 0){
		clearcontainer();
	}
	else if (pokemonum<1 || pokemonum>20 || pokemonum.length != 0){ //Checks to see if user input is valid
		alert("Error - Incorrect input");
		}
	else if (/^[a-z]+$/.test(pokemonum) && pokemonum.length != 0){ 
		alert("Error - Incorrect input");
		}
}

function  SearchName(){ //Function that searches by pokemon name
	var i;
	var pokemonmatched = [];
	var pokemoname = document.getElementById("NameSearch").value; // gets element from search box thats id is linked to "NameSearch"
	var Length = pokemoname.length;
	var Substring = pokemoname.toLowerCase().substring(0,Length);
	if(/^[a-z]+$/.test(pokemoname.toLowerCase()) && Length>=1 && Length<=20){ //checks to see if the string has any non letter characters
		createDiv();
		foundNames = true;
		clearMatchedlist();
		for(i=0;i<FirstTwentyPokemon.length;i++){
			if (FirstTwentyPokemon[i].id.toLowerCase().indexOf(pokemoname.toLowerCase())>-1){ //If statement compares the first few letters of the name the user entered to all the names in the FirsTwentyPokemon array
				pokemonmatched.push(FirstTwentyPokemon[i]); //adds found pokemon name to the array 
				matches(pokemonmatched);
				if(pokemonmatched.length >=20){ //Checks to see if possible matches are greater than 5
					break; //breaks out of for loop once all conditions are met
				}
			}	
		}
	}
	else if (pokemoname.length == 0){ //If statement that executes if there are no matches found
		clearcontainer();
	}		
   else if (pokemoname.length != 0){ //checks to see if the user input is valid
    	alert("Error - Incorrect inputs");
   	}
}













