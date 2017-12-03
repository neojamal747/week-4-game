	// Character object constructor
	function Character(firstName, lastName, health, baseAttack, counterAttack){
		this.firstName = firstName;
		this.lastName = lastName
		this.health = health;
		this.baseAttack = baseAttack;
		this.counterAttack = counterAttack;
		this.name = firstName + " " + lastName
		this.source = "Assets/images/" + this.firstName + ".jpg";
		this.currentAttack = baseAttack;
		this.attackMod = function(){
			this.currentAttack += baseAttack;
		}
	};

	//Character objects.
	var han = new Character("Han", "Solo", 100, 5, 8);
	var rey = new Character("Rey", "", 150, 27, 5);
	var boba = new Character("Boba", "Fett", 190, 7, 20);
	var obi = new Character("Obi", "wan Kenobi", 120, 10, 10)
	var princess = new Character("Princess", "Leia", 135, 9, 15)
	var luke = new Character("Luke", "Skywalker", 170, 13, 20)
	var chewbacca = new Character("Chewbacca", "", 160, 14, 18)
	var jabba = new Character("Jabba", "the Hutt", 210, 9, 20)
	var darth = new Character("Darth", "Vader", 250, 8, 19)

	//An array to hold all available characters.
	// var charArray = [han, rey, boba];

	//A meta-object to hold the character objects
	var charObj = {
		Han: han,
		Rey: rey,
		Boba: boba,
		Obi: obi,
		Princess: princess,
		Luke: luke,
		Chewbacca: chewbacca,
		Jabba: jabba,
		Darth: darth
	}

	//Variables to track the current user character, enemy character, and the remaining pool of enemies.
	var lightSide;
	var darkSide;
	var counter = Object.keys(charObj).length-1;



	//Creates an alert box
	function alertBox(message){
		$("#infoDiv").append(
			"<div class = 'alert alert-warning alert-info' role='alert' id=alertBox>" +
			"<button type='button' class='close' data-dismiss='alert' aria-label='Close'>" +
			"<span aria-hidden='true'>&times;</span></button><p>" +
				message +
			"</p></div>"
		)
		disappear("#alertBox");
	};

	//Makes alert box/image disappear after 5 seconds
	function disappear(id){
		window.setTimeout(function(){
	    	$(id).fadeTo(500, 0).slideUp(500, function(){
	        	$(this).remove();
	    	});
		},5000)
	};

	//This function populates the inital seleciton of characters, and updates the character's thumbnail Divs while in combat
	//targetDiv: Div into which the character's thumbnail should be placed onscreen
	//wrapperDiv: allows the thumbnail to be wrapped in a "sizing" div 
	//char: argument must be a Character object
	//emptyFirst: optionally clears out the targetDiv prior to insertion; leave blank to simply append
	function makeChar(targetDiv, wrapperDiv, char, emptyFirst){
		if (emptyFirst){$(targetDiv).empty()};
		$(targetDiv).append(
			wrapperDiv +
				"<div class='thumbnail' id='" + char.firstName + "'>" + 
					"<a href='#'>" +
						"<h3 class='text-center'>" + char.name + "</h3>" +
						"<img src='" + char.source + "' alt='" + char.name + "' class='img-thumbnail'>" +
						"<p class='text-center' id ='" + char + "health'>" + char.health + "</p>" +
					"</a>" +
	    		"</div>" +
			"</div>"
		)
	};

	//Moves the selected character DIV to the appropriate part of the screen, and reorganizes the underlying character objects.
	function moveChar(){
		$(".thumbnail").on("click", function(){
			var parent = $(this).parent();
			var selectedChar = $(this).attr("id");

			//Moves the enemy character to the appropriate DIV, and adds the corresponding object to combatObj;
			if (lightSide && darkSide == undefined){
				$(this).appendTo("#darkSideDiv");
				darkSide = charObj[selectedChar];
				$(parent).remove();
			}
			//Moves the user's character to the appropriate DIV, and adds the corresponding object to combatObj;
			if (lightSide == undefined){
				$(this).appendTo("#lightSideDiv");
				lightSide = charObj[selectedChar];
				$(parent).remove();
				$("#fightButton").append("<button type='button' class='btn btn-danger btn-block'>Fight!</button>");
				return alertBox("Select an enemy to fight.")
			}
			
		});
	}

	//Handles the FIGHT button
	function fight (){
		$("#fightButton").on("click", function(){
			darkSide.health -= lightSide.currentAttack;
			lightSide.attackMod();
			lightSide.health -= darkSide.counterAttack;
			makeChar("#lightSideDiv", "<div>", lightSide, true)
			makeChar("#darkSideDiv", "<div>", darkSide, true)

			// $("#darkSideDiv").attr("<p>", darkSide.health);
			if (darkSide.health <= 0) {
				counter--;
				if (counter === 0) {
					alertBox("The force is strong with you - you win!");
				}
	
				else {
					darkSide = undefined;
					$("#darkSideDiv").empty();
					alertBox("You are victorious! Select another character to fight.");
				}
			}
	
			if(lightSide.health <= 0){
				alertBox("You are not a Jedi yet - GAME OVER.");
				//Change button to "play again"
			}
		});
	}

//Begin--------------------------------------------------------------------

	//Populates the initial character selection DIV
	for (var i in charObj){
		makeChar("#charactersRow", "<div class='col-xs-4 col-md-2'>", charObj[i]);
	};

	alertBox("Select a character");

	moveChar();

	fight();


	








