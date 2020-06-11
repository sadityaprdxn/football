'use strict';

window.onload = function () {

	var page_class = this.document.querySelector(".container");

	// function for preventing the back button
	function preventBack() { window.history.forward(); }

	if (page_class.classList.contains("loginPage")) {
		console.log("hii");

		preventBack();

		var signUpButton = this.document.querySelector(".sign-up-modal");
		var signInButton = this.document.querySelector(".sign-in-modal");
		var modal = document.querySelector(".modal");
		var formDivision = this.document.querySelector(".form-modal");
		var closeModalButton = this.document.querySelector('.close');
		var switchFormArray = this.Array.from(this.document.querySelectorAll('.pannel-background a'))
		var signUpFieldsArray = this.Array.from(this.document.querySelectorAll('.sign-up-form input'));
		var signInFieldsArray = this.Array.from(this.document.querySelectorAll('.sign-in-form input'));
		var submitForm = this.Array.from(this.document.querySelectorAll(".form-controls a"));

		var staticData = {
			username: 'addi',
			email: 'testresult@prdxn.com',
			password: 'success123@prdxn',
			userLogin: true,
			welcomeUser: true,
			uniqueId: 'eplUser1000'
		}

		window.localStorage.setItem(staticData['uniqueId'], JSON.stringify(staticData));

		var RegexExpression = {
			username_regex: /^([a-zA-Z]){2,10}$/,
			email_regex: /^([0-9a-zA-Z\_\.\-]+)@([0-9a-zA-Z\_\.\-]+)\.([a-zA-Z]+)$/,
			password_regex: /((?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-zA-Z])){4,15}/
		}

		signUpButton.addEventListener("click", function () { displayModal(this); });
		signInButton.addEventListener("click", function () { displayModal(this); });

		function displayModal(element) {
			modal.classList.add('block');
			formDivision.classList.add('block');
			if (element.classList.contains('sign-in-modal')) {
				formDivision.classList.add('active');
			}

			document.querySelector('html').classList.add('no-scroll');
		}

		closeModalButton.addEventListener('click', closeModal);

		function closeModal() {
			formReset();
			modal.classList.remove('block');
			formDivision.classList.remove('block', 'active');
			document.querySelector('html').classList.remove('no-scroll');
		}

		switchFormArray.forEach(function (element) {
			element.addEventListener('click', function () {
				if (this.id === "sign-in-form") {
					formDivision.classList.add('active');
				} else {
					formDivision.classList.remove('active');
				}
			})
		});

		window.addEventListener('click' , function (e){
			if( e.target == modal.querySelector('.wrapper') && e.target !== closeModalButton && e.target !== signUpButton && e.target !== signInButton){
				closeModal();
			}
		}); 

		// function form validate sign up input fields
		signUpFieldsArray.forEach(function (element) {
			element.addEventListener('keyup', function () {
				var regexForThis = RegexExpression[element.getAttribute('data-regex')];
				validate(regexForThis, this);
			});
		});

		// function for sign in form validation
		signInFieldsArray.forEach(function (element) {
			element.addEventListener("keyup", function () {
				element.parentElement.classList = "form-group";
			})
		});

		// function for form validate the regex
		function validate(RegularExpression, input) {
			var parent = input.parentNode;
			if (input.value == "") {
				parent.classList = "form-group";
			}
			else if (RegularExpression.test(input.value)) {
				parent.classList = "form-group success"
			} else {
				parent.classList = "form-group error"
			}
		}

		submitForm.forEach(function (element) {
			element.addEventListener('click', function () {
				if (element.classList.contains('sign-up')) {
					storeData();
				} else if (element.classList.contains('sign-in')) {
					varifyData();
				}
			})
		});

		// function for storing the data
		function storeData() {

			var allFieldsCorrect = null;
			var newEmail = document.querySelector('.sign-up-email');

			for (var i = 0; i < signUpFieldsArray.length; i++) {
				var parent = signUpFieldsArray[i].parentNode;
				if (parent.classList.contains('error') || parent.classList == 'form-group') {

					allFieldsCorrect = false;

					signUpFieldsArray.forEach(function (element) {
						if (element.value === "") { element.parentNode.classList.add('error'); }
					});

					break;
				} else { allFieldsCorrect = true; }
			}

			// checking the email-id already registered or not
			var UserAlreadyExist = checkUser(newEmail);

			if (allFieldsCorrect && !UserAlreadyExist) {
				var Data = {};
				signUpFieldsArray.forEach(function (element) {
					Data[element.getAttribute('data-regex').split('_')[0]] = element.value;
				});

				var uniqueId = "eplUser" + window.localStorage.length;
				Data['uniqueId'] = uniqueId;
				Data['userLogin'] = true;
				Data['welcomeUser'] = true;

				var data_serialized = JSON.stringify(Data);

				window.localStorage.setItem(uniqueId, data_serialized);

				formReset();
				window.location.assign("home.html?userid=" + uniqueId);
			} else { newEmail.parentElement.classList = "form-group error" }
		}

		// function for verify Data
		function varifyData() {
			var Email = document.querySelector('.sign-in-email');

			var UserAlreadyExist = checkUser(Email);

			if (UserAlreadyExist) {
				var password = document.querySelector('.sign-in-password').value;

				if (UserAlreadyExist['password'] === password) {
					formReset();

					UserAlreadyExist['userLogin'] = true;
					UserAlreadyExist['welcomeUser'] = true;
					window.localStorage.setItem(UserAlreadyExist['uniqueId'], JSON.stringify(UserAlreadyExist));


					window.location.assign("home.html?userid=" + UserAlreadyExist['uniqueId']);
				} else { password.parentNode.classList.add('error'); }
			} else { Email.parentNode.classList.add('error'); }
		}

		// function for checking the user-is exist or not
		function checkUser(Email) {
			if (localStorage.length !== 0) {
				for (var key in localStorage) {
					if (key === "length") { break; }
					else if (key.includes("eplUser")) {
						var parseData = JSON.parse(localStorage[key]);

						if (Email.value === parseData.email) {
							return parseData;
						}
					}
				} return false;
			} else { return false; }
		}

		// function for resetting the form
		function formReset() {
			var forms = Array.from(document.querySelectorAll("form"));

			forms.forEach(function (element) {
				element.reset();

				var formGroups = Array.from(element.querySelectorAll(".form-group"));
				formGroups.forEach(function (element) {
					element.classList = "form-group";
				});
			});
		}
	} else {


		var header = this.document.querySelector('header');
		var ellipsis = this.document.querySelector('.ellipsis');
		var hamburger = this.document.querySelector('.hamburger');
		var signOut = this.document.querySelector('.sign-out');
		var socialLinks = document.querySelector('.social-links');
		var currentUrl = new URL(window.location.href);
		var loggedInUser = currentUrl.searchParams.get("userid");
		var userData = this.JSON.parse(window.localStorage.getItem(loggedInUser));

		// prevention for direct redirection on page
		if( loggedInUser == null){ window.location.assign('index.html')	}

		// function for passing values through url
		function passValues(classes, page) {
			var pageArray = Array.from(window.document.querySelectorAll(classes));
			pageArray.forEach(function (element) {
				element.setAttribute("href", page + "?userid=" + loggedInUser)
			});
		}

		passValues('.home-page', 'home.html');
		passValues('.clublist-page', 'clublist.html');
		passValues('.matchdetail-page', 'matchdetail.html');
		passValues('.logo','home.html');

		// function for header activation 
		window.addEventListener('scroll', function () {
			var pageTop = window.scrollY;

			if (!header.classList.contains('active') && pageTop > 0) {
				header.classList.add('active');
			} else if (header.classList.contains('active') && pageTop == 0) {
				header.classList.remove('active');
			}
		});

		// function for hamburger activation
		hamburger.addEventListener('click', function () {
			document.querySelector('html').classList.toggle('no-scroll');
			document.querySelector('.navbar').classList.toggle('active-navbar');
			hamburger.classList.toggle('active-hamburger');
		});

		// function for social links display
		ellipsis.addEventListener('click', function () {

			ellipsis.parentNode.classList.toggle('active');
			socialLinks.classList.toggle('block');
		});

		window.addEventListener('click' , function (e){
			if(e.target !== ellipsis && e.target !== socialLinks){
				ellipsis.parentNode.classList.remove('active');
				socialLinks.classList.remove('block');
			}
		});

		// function for sign out
		signOut.addEventListener('click', function () {
			userData.welcomeUser = true;
			userData.userLogin = false;
			window.localStorage.setItem(userData.uniqueId, JSON.stringify(userData));

			window.location.assign('index.html');
		});

		if (page_class.classList.contains("homePage")) {

			preventBack();

			var welcomeDivision = document.querySelector('.welcome');

			// condition for welcome division
			if (userData.welcomeUser == true) {
				userData.welcomeUser = false;
				window.localStorage.setItem(userData.uniqueId, JSON.stringify(userData));

				welcomeDivision.querySelector('.user').innerText = userData.username;
				welcomeDivision.classList.add('block');
			}

			// function for slider
			var slides = document.querySelector(".slides");
			var slide = document.querySelectorAll(".slides li");

			// buttons manipulation
			var prevBtn = document.querySelector(".slider-left-button");
			var nxtBtn = document.querySelector(".slider-right-button");

			// events
			slides.addEventListener("transitionend", backtoOrigin);
			nxtBtn.addEventListener("click", next);
			prevBtn.addEventListener("click", prev);

			// pre-styling
			let count = 1;

			slides.style.transform = 'translateX(' + (-100 * count) + '%)';

			// function for next slide
			function next() {
				if (count >= slide.length - 1) {
					return;
				}
				else {
					slides.classList.remove("active-slide");
					count++;
					slides.style.transform = 'translateX(' + (-100 * count) + '%)';
				}
			}

			// function for previous slide
			function prev() {
				if (count <= 0) {
					return;
				}
				else {
					slides.classList.remove("active-slide");
					count--;
					slides.style.transform = 'translateX(' + (-100 * count) + '%)';
				}
			}

			// function for backtoOrigin
			function backtoOrigin() {
				if (slide[count].id === "lastClone") {
					slides.classList.add("active-slide")
					count = slide.length - 2;
					slides.style.transform = 'translateX(' + (-100 * count) + '%)';
				}

				if (slide[count].id === "firstClone") {
					slides.classList.add("active-slide")
					count = slide.length - count;
					slides.style.transform = 'translateX(' + (-100 * count) + '%)';
				}
			}

			// function for animating slides
			function animate() {
				if (count >= slide.length - 1) {
					return;
				}
				else {
					slides.classList.remove("active-slide");
					count++;
					slides.style.transform = 'translateX(' + (-100 * count) + '%)';
				}
			}
			setInterval(animate, 7000);

			// tab functionality added
			var tabControlsArray = this.document.querySelectorAll('.tab-controls li');
			var tabContentArray = this.document.querySelectorAll('.tab-content li');

			tabControlsArray.forEach(function (element) {
				element.addEventListener('click', function () {

					document.querySelector('.tab-controls li.active').classList.remove('active');
					element.classList.add('active');

					if (this.firstElementChild.getAttribute('data-category') === 'allMemories') {
						tabContentArray.forEach(function (liNode) {
							liNode.classList = 'active';
						});
					} else {
						var category = this.firstElementChild.getAttribute('data-category');
						tabContentArray.forEach(function (liNode) {
							if (liNode.getAttribute('data-category') === category) {
								liNode.classList = 'active';
							} else { liNode.classList = 'none' }
						});
					}


				});
			});

		} else {

			// some confidential information
			var base_url = "https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.clubs.json";
			var contractual_url = "https://raw.githubusercontent.com/openfootball/football.json/master/2019-20/en.1.json";

			// some common functions which will required at both the pages
			// function for creating card
			function createCard(matchData, appendHere) {
				var liNode = createNode('li', appendHere, '');
				var overlayDiv = createNode('div', liNode, '');
				var teamOneDiv = createNode('div', overlayDiv, '');
				var figureNode = createNode('figure', teamOneDiv, '');
				var imageNodeFirst = createNode('img', figureNode, '');
				var teamTwoDiv = createNode('div', overlayDiv, '');
				var figureNode = createNode('figure', teamTwoDiv, '');
				var imageNodeTwo = createNode('img', figureNode, '');

				if (matchData['score1'] == null) {
					var spanNodeScore = createNode('span', overlayDiv, 'V / S');
				} else {
					var spanNodeScore = createNode('span', overlayDiv, matchData['score1'] + ' - ' + matchData['score2']);
				}

				var divNode = createNode('div', overlayDiv, '');
				var spanNodeVenue = createNode('span', divNode, 'at england');
				var spanNodeDate = createNode('span', divNode, matchData['date']);

				teamOneDiv.setAttribute('class', 'team-one');
				teamTwoDiv.setAttribute('class', 'team-two');
				imageNodeFirst.setAttribute('src', 'https://via.placeholder.com/115x115');
				imageNodeTwo.setAttribute('src', 'https://via.placeholder.com/115x115');
				overlayDiv.setAttribute('class', 'overlay');
				spanNodeScore.setAttribute('class', 'score');
				divNode.setAttribute('class', 'match-detail');

				if (resultSection.parentElement.parentElement.classList.contains('matchday-results')) {

					var headingNodeFirst = createNode('h4', teamOneDiv, '');
					var anchorNodeFirst = createNode('a', headingNodeFirst, matchData['team1']['name'].split(' ')[0]);
					var headingNodeTwo = createNode('h4', teamTwoDiv, '');
					var anchorNodeTwo = createNode('a', headingNodeTwo, matchData['team2']['name'].split(' ')[0]);

					anchorNodeFirst.setAttribute('data-key', matchData['team1']['key']);
					anchorNodeFirst.setAttribute('title', matchData['team1']['name'].split(' ')[0]);
					anchorNodeTwo.setAttribute('data-key', matchData['team2']['key']);
					anchorNodeTwo.setAttribute('title', matchData['team2']['name'].split(' ')[0]);

					anchorNodeFirst.addEventListener('click', function () { redirectToClubPage(anchorNodeFirst); });
					anchorNodeTwo.addEventListener('click', function () { redirectToClubPage(anchorNodeTwo); });

				} else {

					var headingNodeFirst = createNode('h4', teamOneDiv, matchData['team1']['name'].split(' ')[0]);
					var headingNodeTwo = createNode('h4', teamTwoDiv, matchData['team2']['name'].split(' ')[0]);

				}

				return liNode;
			}

			//function for redirection to club page
			function redirectToClubPage(element) {
				var key = element.getAttribute('data-key');

				window.location.assign("clublist.html?userid=" + loggedInUser + "&keyName=" + key);
			}


			// function for getting data
			function getData(url, callback) {

				var xhr = new XMLHttpRequest();

				var data = null;

				xhr.open('GET', url);
				xhr.onload = function () {

					if (this.status === 200) {
						data = JSON.parse(this.responseText);
						callback(data);
					}
				}

				xhr.onerror = function () {
					var ErrorNode = document.createElement("h1");
					ErrorNode.innerText = "something went wrong ! please refresh the page or try after some time :)"
					document.querySelector(".container").innerHTML = "";
					document.querySelector(".container").appendChild(ErrorNode);
				}
				xhr.send();
			}

			// function for creating elements
			function createNode(node, place, text) {
				var elementNode = document.createElement(node);
				elementNode.innerHTML = text;
				place.appendChild(elementNode);

				return elementNode;
			}


			if (page_class.classList.contains("clubListPage")) {

				// dom element manipulation
				var counter = document.querySelector('.counters');
				var counterAt = (counter.offsetTop + counter.offsetHeight * 0.75);
				var awardsArray = this.Array.from(this.document.querySelectorAll('.award li'));
				var searchClublist = this.document.querySelector('.search-clublist-form #clublist');
				var searchButton = this.document.querySelector('.search-clublist-form button');
				var resultSection = document.querySelector('.results ul');
				var previousSearch = null;
				var individualTeamData = [];
				var count = null;
				var onlyOnce = true;
				var passedKeyName = currentUrl.searchParams.get("keyName");

				// event for start the counter
				window.addEventListener('scroll', function () {
					var pageAt = (window.scrollY + window.innerHeight);

					if (pageAt > counterAt) { runCounter(counter); }
				});

				// function for running the counter
				function runCounter(div) {
					var counters = div.querySelectorAll('.counter');

					if (!div.classList.contains("started")) {
						div.classList.add("started");
						counters.forEach(function (counter) {

							var updateCounter = function () {

								var target = +counter.getAttribute('data-target');
								var count = +counter.getAttribute('data-current');

								var increment = target / 100;

								if (count < target) {
									var currentVal = count + increment;
									counter.setAttribute("data-current", currentVal);
									counter.innerText = Math.floor(currentVal);
									setTimeout(updateCounter, 50);
								} else {
									counter.innerText = target;
								}
							};
							updateCounter();
						});
					}
				}


				awardsArray.forEach(function (element) {
					element.addEventListener('click', function () {
						element.classList.toggle('active');
					});
				});

				// function for get options
				function getOptions() {
					getData(base_url, callback);

					function callback(data) {

						var keyValidation = false;

						data.clubs.forEach(function (element) {
							createNode('option', searchClublist, element.key);
							if (element.key == passedKeyName) {
								searchClublist.selectedIndex = parseInt(data.clubs.indexOf(element)) + 1;
								keyValidation = true;
							}
						});

						if (passedKeyName !== null && keyValidation == false) {
							createNode('option', searchClublist, passedKeyName);
							searchClublist.selectedIndex = parseInt(data.clubs.length) + 1;
						}
					}
				}

				getOptions();


				// function for displaying data if we redirctly come on this page
				if (passedKeyName) {
					previousSearch = passedKeyName;
					displayCard(passedKeyName);
				}

				// event for initiating the getting data process
				searchButton.addEventListener('click', function (e) {
					e.preventDefault();
					if (previousSearch !== searchClublist.value) {
						previousSearch = searchClublist.value;
						var keyName = searchClublist.value;
						displayCard(keyName);
					}
				});

				// function for getting indivual team data
				function displayCard(keyName) {
					getData(contractual_url, callback);

					individualTeamData = [];
					function callback(data) {
						data.rounds.forEach(function (round) {
							round.matches.forEach(function (match) {
								if (match.team1.key == keyName || match.team2.key == keyName) {
									individualTeamData.push(match);
								}
							});
						});

						console.log(individualTeamData);
						count = 0;
						resultSection.innerHTML = '';
						displaySixCard();
					}
				}

				function displayError() {
					var warningNode = createNode('h5', resultSection, '');
					createNode('span', warningNode, 'sorry !');
					warningNode.innerHTML += ' no data found';
				}

				// function for display six cards
				function displaySixCard() {
					var i = null;

					if (individualTeamData.length === 0) { displayError(); }

					for (i = count; i < count + 6 && i < individualTeamData.length; i++) {
						var card = createCard(individualTeamData[i], resultSection);
					}

					count += 6;

					if (onlyOnce) {
						onlyOnce = false;

						var loadMore = createNode('a', resultSection.parentNode, 'load more');
						loadMore.setAttribute('class', 'load-more');
						loadMore.addEventListener('click', displaySixCard);

						resultSection.classList.add('active');
					}

					if (i >= individualTeamData.length) {
						document.querySelector('.load-more').classList.add('none');
					} else {
						document.querySelector('.load-more').classList.remove('none');
					}
				}
			} else if (page_class.classList.contains("matchDetailPage")) {

				var searchMatchDay = this.document.querySelector('.search-matchday-form #matchday');
				var searchButton = this.document.querySelector('.search-matchday-form button');
				var resultSection = this.document.querySelector('.matchday-results ul');
				var previousSearch = null;

				// function for get options
				function getOptions() {
					getData(contractual_url, callback);

					function callback(data) {
						data.rounds.forEach(function (element) {
							createNode('option', searchMatchDay, element.name);
						});
					}
				}

				getOptions();

				// event for initiating the getting data process
				searchButton.addEventListener('click', function (e) {
					e.preventDefault();
					if (previousSearch !== searchMatchDay.value) {
						previousSearch = searchMatchDay.value;
						var keyDay = searchMatchDay.value;
						resultSection.innerHTML = "";
						displayCard(keyDay);
					}
				});

				// function for getting indivual team data
				function displayCard(keyDay) {
					getData(contractual_url, callback);

					function callback(data) {
						data.rounds.forEach(function (round) {
							if (round.name == keyDay) {
								console.log(round);
								round.matches.forEach(function (element) {
									createCard(element, resultSection);
								});
							}
						});
					}

					resultSection.classList.add('active');
				}

			}
		}
	}
}























