var listeningFirebaseRefs = [];

//JP Var
//Nav buttons
var menuHome = document.getElementById('menu-goHome');
var menuStart = document.getElementById('menu-start');
var menuTeams = document.getElementById('menu-teams');
var menuScores = document.getElementById('menu-scores');
var menuRound = document.getElementById('menu-round');

//screens
var homeScreen = document.getElementById('homeScreen');
var startScreen = document.getElementById('startScreen');
var scoresScreen = document.getElementById('scoresScreen');
var roundScreen = document.getElementById('roundScreen');
var teamsScreen = document.getElementById('teamsScreen');
var infoScreen = document.getElementById('infoScreen');

//home buttons
var homeStartButton = document.getElementById('homeStartButton');
var homeTeamsButton = document.getElementById('homeTeamsButton');
var homeScoresButton = document.getElementById('homeScoresButton');
var homeRoundButton = document.getElementById('homeRoundButton');

//Elements
var selectSession = document.getElementById("selectSession");

// Firstore
var db = firebase.firestore();  
var sessions = db.collection('sessions');
var names = db.collection('names');
var teams = db.collection('teams');
var increaseBy = firebase.firestore.FieldValue.increment(1);


// Selected variables
var activeSessions = [];
var activeTeams = [];
var activePlayers = [];
var roundTime;
var playerPicked;
var teamPicked;
var sessionPicked;
var namesPerPlayer

var activeTeamOne;
var activeTeamTwo;
var activeTeamThree;
var activeTeamFour;
var activeTeamFive;

var t1r1Score = 0;
var t1r2Score = 0;
var t1r3Score = 0;
var t2r1Score = 0;
var t2r2Score = 0;
var t2r3Score = 0;
var t3r1Score = 0;
var t3r2Score = 0;
var t3r3Score = 0;
var t4r1Score = 0;
var t4r2Score = 0;
var t4r3Score = 0;
var t1TotalScore = 0;
var t2TotalScore = 0;
var t3TotalScore = 0;
var t4TotalScore = 0;

var currentOrderNumber;
var currentPlayer;
var currentTeam;
var currentScore;
var currentRound;

var nextRound = currentRound + 1;
var count = 0; 
var nameArrayCount = 0;
var bagNames = [];
var currentBagName = bagNames[nameArrayCount]
var countNamesLeft = bagNames.length;
var latestSession;
var namesGotThisRound = [];
var gameHasPassed = false;
var roundScore;
var timeLeftOver
var countPlayersLeftToEnter
var teamCount;
 var hasEnteredNames;
 var turnActive

var roundProgress

var t1p1; var t1p2;var t1p3;var t1p4;var t1p5;var t1p6;var t1p7;var t1p8;var t1p9;

var t2p1;var t2p2;var t2p3;var t2p4;var t2p5;var t2p6;var t2p7;var t2p8;var t2p9;

var t3p1;var t3p2;var t3p3;var t3p4;var t3p5;var t3p6;var t3p7;var t3p8;var t3p9;

var t4p1;var t4p2;var t4p3;var t4p4;var t4p5;var t4p6;var t4p7;var t4p8;var t4p9;
  
 /* Cleanups the UI and removes all Firebase listeners.
 */
function cleanupUi() {
  // Remove all previously displayed posts.
 
  // Stop all currently listening Firebase listeners.
  listeningFirebaseRefs.forEach(function(ref) {
    ref.off();
  });
  listeningFirebaseRefs = [];
}

/**
 * The ID of the currently signed-in User. We keep track of this to detect Auth state change events that are just
 * programmatic token refresh but not a User status change.
 */
var currentUID;

/**
 * Triggers every time there is a change in the Firebase auth state (i.e. user signed-in or user signed out).
 */
function onAuthStateChanged(user) {
  // We ignore token refresh events.
  if (user && currentUID === user.uid || !user && currentUID === null) {
    return;
  }
  currentUID = user ? user.uid : null;

  /*
  
  cleanupUi();
  if (user) {
    splashPage.style.display = 'none';
    writeUserData(user.uid, user.displayName, user.email, user.photoURL);
    startDatabaseQueries();
  } else {
    // Display the splash page where you can sign-in.
    splashPage.style.display = '';
  }
*/
}

window.addEventListener('load', function() {
  // Bind Sign in button.
 /* signInButton.addEventListener('click', function() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  });
*/
  // Listen for auth state changes
  firebase.auth().onAuthStateChanged(onAuthStateChanged);
  
  firebase.auth().signInAnonymously().catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
  
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    // ...
  } else {
    // User is signed out.
    // ...
  }
  // ...
});

 // Bind menu buttons.
  menuHome.onclick = function() {showSection(homeScreen, menuHome);showHomeScreenDetails();};
  menuStart.onclick = function() {getStartInfo();};
  menuTeams.onclick = function() {showTeamScreen();};
  menuScores.onclick = function() {showScoresScreen();};
  menuRound.onclick = function() {showRoundScreen();};
    
   // Bind home screen buttons.
  homeStartButton.onclick = function() {getStartInfo();};
  homeTeamsButton.onclick = function() {showTeamScreen();};
  homeScoresButton.onclick = function() {showScoresScreen();};
  homeRoundButton.onclick = function()  {showRoundScreen();}; 
  
  
  }, false);

/**
 * Displays the given section element and changes styling of the given button.
 */
function showSection(sectionElement, buttonElement) {
  homeScreen.style.display = 'none';
  startScreen.style.display = 'none';
  teamsScreen.style.display = "none";
  scoresScreen.style.display = 'none';
  roundScreen.style.display = "none";
  menuHome.classList.remove('is-active');
  menuStart.classList.remove('is-active');
  menuTeams.classList.remove('is-active');
  menuScores.classList.remove('is-active');
  menuRound.classList.remove('is-active');
    
  if (sectionElement) {sectionElement.style.display = 'block';}
  if (buttonElement) {buttonElement.classList.add('is-active');}
}
 
  


//*******************************************
// Welcome Screen Functions
//******************************************
function bmLogOut(){
  document.getElementById("waitScreen").style.display = "none";
  document.getElementById("createScreen").style.display = "none";
  document.getElementById("joinScreen").style.display = "none";
  document.getElementById("createScreen").style.display = "none";
  document.getElementById("gameOverScreen").style.display = "none";
  document.getElementById("createSuccess").style.display = "none";
  document.getElementById("roundEnd-splash").style.display = "none";
  document.getElementById("enterScreen").style.display = "none";
  document.getElementById('setupCreateGameSessionButton').disabled = false;
  document.getElementById('submitNamesButton').disabled = true;  
  document.getElementById('enterNameFour').style.display ="block";
    document.getElementById('enterNameFive').style.display ="block";
    document.getElementById('enterNameSix').style.display ="block";
    document.getElementById('enterNameSeven').style.display ="block";
    document.getElementById('enterNameEight').style.display ="block";
    document.getElementById('enterNameNine').style.display ="block";
    document.getElementById('enterNameTen').style.display ="block";
  disableNavBarButtons();
  
  document.getElementById('enterNameOne').value = "";
  document.getElementById('enterNameTwo').value = "";
  document.getElementById('enterNameThree').value = "";
  document.getElementById('enterNameFour').value = "";
  document.getElementById('enterNameFive').value = "";
  document.getElementById('enterNameSix').value = "";
  document.getElementById('enterNameSeven').value = "";
  document.getElementById('enterNameEight').value = "";
  document.getElementById('enterNameNine').value = "";
  document.getElementById('enterNameTen').value = "";

  homeScreen.style.display = 'none';
  startScreen.style.display = 'none';
  teamsScreen.style.display = "none";
  scoresScreen.style.display = 'none';
  roundScreen.style.display = "none";
  
  document.getElementById("teamThree").style.display = "none"; 
  document.getElementById("teamFour").style.display = "none"; 
  document.getElementById("gridThree" ).style.display = "none"; 
  document.getElementById("gridFour" ).style.display = "none"; 
  
  document.getElementById("endGameTrigger").style.display = "none"; 
  
  document.getElementById("page-splash").style.display = "block";
}

function createScreen() {
  document.getElementById("createScreen").style.display = "block";
  document.getElementById("page-splash").style.display = "none";
  document.getElementById("header").style.display = "block";
$('#createSelectTeamNumber').not('.disabled').formSelect();
$('#createNameCount').not('.disabled').formSelect();  
};

function joinScreen(){
getActiveSessions();
document.getElementById("page-splash").style.display = "none";
document.getElementById("joinScreen").style.display = "block";
document.getElementById("header").style.display = "block";  
};

function adjustNameCount(){
   db.collection("sessions").doc(sessionPicked).get().then(function(doc) {
    if (doc.exists) { namesPerPlayer = doc.data().namesPerPlayer;
                      document.getElementById("enterNameCount").innerHTML =  namesPerPlayer;
                     if (namesPerPlayer == 3) {
                        document.getElementById('enterNameFour').style.display ="none";
                        document.getElementById('enterNameFive').style.display ="none";
                        document.getElementById('enterNameSix').style.display ="none";
                        document.getElementById('enterNameSeven').style.display ="none";
                        document.getElementById('enterNameEight').style.display ="none";
                        document.getElementById('enterNameNine').style.display ="none";
                        document.getElementById('enterNameTen').style.display ="none";
                        } else if (namesPerPlayer == 4) {
                        document.getElementById('enterNameFive').style.display ="none";
                        document.getElementById('enterNameSix').style.display ="none";
                        document.getElementById('enterNameSeven').style.display ="none";
                        document.getElementById('enterNameEight').style.display ="none";
                        document.getElementById('enterNameNine').style.display ="none";
                        document.getElementById('enterNameTen').style.display ="none";
                        } else if (namesPerPlayer == 5) {
                        document.getElementById('enterNameSix').style.display ="none";
                        document.getElementById('enterNameSeven').style.display ="none";
                        document.getElementById('enterNameEight').style.display ="none";
                        document.getElementById('enterNameNine').style.display ="none";
                        document.getElementById('enterNameTen').style.display ="none";
                        } else if (namesPerPlayer == 6) {
                        document.getElementById('enterNameSeven').style.display ="none";
                        document.getElementById('enterNameEight').style.display ="none";
                        document.getElementById('enterNameNine').style.display ="none";
                        document.getElementById('enterNameTen').style.display ="none";
                        } else if (namesPerPlayer == 7) {
                        document.getElementById('enterNameEight').style.display ="none";
                        document.getElementById('enterNameNine').style.display ="none";
                        document.getElementById('enterNameTen').style.display ="none";
                        } else if (namesPerPlayer == 8) {
                        document.getElementById('enterNameNine').style.display ="none";
                        document.getElementById('enterNameTen').style.display ="none";
                        } else if (namesPerPlayer == 9) {
                        document.getElementById('enterNameTen').style.display ="none";
                        };

    } else {console.log("No such document!");
    }}).catch(function(error) {console.log("Error getting document:", error);}); 
  
  
}


//********************************************
// Create screen functions
//********************************************
      
function createGameSession(){
  
var sessName = document.getElementById('setupSessionName').value;
var teamOne = document.getElementById('setupTeamOne').value
var teamTwo = document.getElementById('setupTeamTwo').value
var teamThree = document.getElementById('setupTeamThree').value
var teamFour = document.getElementById('setupTeamFour').value
var teamFive = document.getElementById('setupTeamFive').value
var timePicked = document.getElementById('timePicked').value
var playerChips = M.Chips.getInstance($('.chips')).chipsData;
let playerNames = playerChips.map(a => a.tag);
var orderNumber = 1 
var t1number = 1
var t2number = 1
var t3number = 1
var t4number = 1
var t5number = 1
var countNumberPlayers = playerNames.length
var currentPlayerNumber
namesPerPlayer = document.getElementById("createNameCount").value;

activePlayers = playerNames
sessionPicked = sessName
shuffle(playerNames);
var teamsSelected = document.getElementById("createSelectTeamNumber").value  
teamCount = parseInt(teamsSelected,10)
  
// decide which player starts
      if (playerNames.length % teamCount == 0){
      currentPlayer = playerNames[0]
      currentTeam = teamOne
      currentPlayerNumber = 1
      } else if (playerNames.length % teamCount == 1){
      currentPlayer = playerNames[1]
      currentTeam = teamTwo
      currentPlayerNumber = 2
      } else if (playerNames.length % teamCount == 2){
      currentPlayer = playerNames[2]
      currentTeam = teamThree
      currentPlayerNumber = 3
      } else if (playerNames.length % teamCount == 3){
      currentPlayer = playerNames[3]
      currentTeam = teamFour
      currentPlayerNumber = 4
      }
    
// Create team 1
db.collection("teams").doc(teamOne).set({tpNumber: 1, sessionName: sessName, r1Score: 0, r2Score: 0, r3Score: 0 , lastRoundScore: 0, teamSize: 0, p01:"", p02:"",p03:"",p04:"",p05:"",p06:"",p07:"",p08:"",p09:""}).then(function() {console.log("Team one successfully created!");
}).catch(function(error) {console.error("Error writing document: ", error);});
// Create team 2
db.collection("teams").doc(teamTwo).set({tpNumber: 1, sessionName: sessName, r1Score: 0, r2Score: 0, r3Score: 0 , lastRoundScore: 0, teamSize: 0, p01:"", p02:"",p03:"",p04:"",p05:"",p06:"",p07:"",p08:"",p09:""}).then(function() {console.log("Team two successfully created!");
}).catch(function(error) {console.error("Error writing document: ", error);});

   if (teamCount == 3) {
      
      db.collection("sessions").doc(sessName).set({active: true, turnActive: false, namesPerPlayer: namesPerPlayer, numberOfPlayers: countNumberPlayers, numberOfPlayersEntered: 0, numberOfTeams: 3, lastNameGuessed: "None guessed yet" , currentRound: 1, currentTeam: currentTeam, currentPlayer: currentPlayer, currentPlayerNumber : currentPlayerNumber, currentScore: 0, roundTimeDefault: timePicked, roundTime: timePicked, p01:"", p02:"", p03:"", p04:"", p05:"", p06:"", p07:"", p08:"", p09:"", p10:"", p11:"", p12:"", p13:"", p14:"", p15:"", p16:"", p17:"", p18:"", p19:"", p20:""}).then(function() {console.log("Session successfully created!");
      }).catch(function(error) {console.error("Error writing document: ", error);}); 
      
      // create team 3
      db.collection("teams").doc(teamThree).set({tpNumber: 1, sessionName: sessName, r1Score: 0, r2Score: 0, r3Score: 0 , lastRoundScore: 0, teamSize: 0, p01:"", p02:"",p03:"",p04:"",p05:"",p06:"",p07:"",p08:"",p09:""}).then(function() {console.log("Team two successfully created!");
      }).catch(function(error) {console.error("Error writing document: ", error);});  
    
    for (var i = 0, len = playerNames.length; i < len; i++) { 
            
   if (orderNumber == 1){  db.collection("players").doc(playerNames[i]).set({score: 0, sessionName: sessName, hasEnteredNames: false, team:teamOne, teamOrderNumber: 1, orderNumber: orderNumber}).then(function() {console.log("Player created: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); 
                           db.collection("teams").doc(teamOne).update({currentPlayer:playerNames[i], p01:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t1p1: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);});
                           db.collection("sessions").doc(sessName).update({p01:playerNames[i]}).then(function() {console.log("t1p1: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); }
      else if (orderNumber == 2){ db.collection("players").doc(playerNames[i]).set({score: 0, sessionName: sessName, hasEnteredNames: false, team:teamTwo, teamOrderNumber: 1, orderNumber: orderNumber}).then(function() {console.log("Player created: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); 
                                  db.collection("teams").doc(teamTwo).update({currentPlayer:playerNames[i], p01:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t2p1: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);});
                                  db.collection("sessions").doc(sessName).update({p02:playerNames[i]}).then(function() {console.log("t3p1: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (orderNumber == 3){ db.collection("players").doc(playerNames[i]).set({score: 0, sessionName: sessName, hasEnteredNames: false, team:teamThree, teamOrderNumber: 1, orderNumber: orderNumber}).then(function() {console.log("Player created: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); 
                                  db.collection("teams").doc(teamThree).update({currentPlayer:playerNames[i], p01:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t3p1: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);});
                                  db.collection("sessions").doc(sessName).update({p03:playerNames[i]}).then(function() {console.log("t1p2: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (orderNumber == 4){ db.collection("players").doc(playerNames[i]).set({score: 0, sessionName: sessName, hasEnteredNames: false, team:teamOne, teamOrderNumber: 2, orderNumber: orderNumber}).then(function() {console.log("Player created: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); 
                                  db.collection("teams").doc(teamOne).update({p02:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t1p2: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);});
                                  db.collection("sessions").doc(sessName).update({p04:playerNames[i]}).then(function() {console.log("t2p2: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (orderNumber == 5){ db.collection("players").doc(playerNames[i]).set({score: 0, sessionName: sessName, hasEnteredNames: false, team:teamTwo, teamOrderNumber: 2, orderNumber: orderNumber}).then(function() {console.log("Player created: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); 
                                  db.collection("teams").doc(teamTwo).update({p02:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t2p2: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);});
                                  db.collection("sessions").doc(sessName).update({p05:playerNames[i]}).then(function() {console.log("t2p2: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (orderNumber == 6){ db.collection("players").doc(playerNames[i]).set({score: 0, sessionName: sessName, hasEnteredNames: false, team:teamThree, teamOrderNumber: 2, orderNumber: orderNumber}).then(function() {console.log("Player created: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); 
                                  db.collection("teams").doc(teamThree).update({p02:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t3p2: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);});
                                  db.collection("sessions").doc(sessName).update({p06:playerNames[i]}).then(function() {console.log("t3p2: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (orderNumber == 7){ db.collection("players").doc(playerNames[i]).set({score: 0, sessionName: sessName, hasEnteredNames: false, team:teamOne, teamOrderNumber: 3, orderNumber: orderNumber}).then(function() {console.log("Player created: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); 
                                  db.collection("teams").doc(teamOne).update({p03:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t1p3: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);});
                                  db.collection("sessions").doc(sessName).update({p07:playerNames[i]}).then(function() {console.log("t1p3: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (orderNumber == 8){ db.collection("players").doc(playerNames[i]).set({score: 0, sessionName: sessName, hasEnteredNames: false, team:teamTwo, teamOrderNumber: 3, orderNumber: orderNumber}).then(function() {console.log("Player created: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); 
                                  db.collection("teams").doc(teamTwo).update({p03:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t2p3: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);});
                                  db.collection("sessions").doc(sessName).update({p08:playerNames[i]}).then(function() {console.log("t2p3: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (orderNumber == 9){ db.collection("players").doc(playerNames[i]).set({score: 0, sessionName: sessName, hasEnteredNames: false, team:teamThree, teamOrderNumber: 3, orderNumber: orderNumber}).then(function() {console.log("Player created: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); 
                                  db.collection("teams").doc(teamThree).update({p03:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t3p3: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);});
                                  db.collection("sessions").doc(sessName).update({p09:playerNames[i]}).then(function() {console.log("t3p3: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (orderNumber == 10){db.collection("players").doc(playerNames[i]).set({score: 0, sessionName: sessName, hasEnteredNames: false, team:teamOne, teamOrderNumber: 4, orderNumber: orderNumber}).then(function() {console.log("Player created: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); 
                                  db.collection("teams").doc(teamOne).update({p04:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t1p4: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);});
                                  db.collection("sessions").doc(sessName).update({p10:playerNames[i]}).then(function() {console.log("t2p10: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (orderNumber == 11){db.collection("players").doc(playerNames[i]).set({score: 0, sessionName: sessName, hasEnteredNames: false, team:teamTwo, teamOrderNumber: 4, orderNumber: orderNumber}).then(function() {console.log("Player created: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); 
                                  db.collection("teams").doc(teamTwo).update({p04:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t2p4: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);});
                                  db.collection("sessions").doc(sessName).update({p11:playerNames[i]}).then(function() {console.log("t2p2: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (orderNumber == 12){db.collection("players").doc(playerNames[i]).set({score: 0, sessionName: sessName, hasEnteredNames: false, team:teamThree, teamOrderNumber: 4, orderNumber: orderNumber}).then(function() {console.log("Player created: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); 
                                  db.collection("teams").doc(teamThree).update({p04:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t3p4: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);});
                                  db.collection("sessions").doc(sessName).update({p12:playerNames[i]}).then(function() {console.log("t2p3: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (orderNumber == 13){db.collection("players").doc(playerNames[i]).set({score: 0, sessionName: sessName, hasEnteredNames: false, team:teamOne, teamOrderNumber: 5, orderNumber: orderNumber}).then(function() {console.log("Player created: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); 
                                  db.collection("teams").doc(teamOne).update({p05:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t1p5: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);});
                                  db.collection("sessions").doc(sessName).update({p13:playerNames[i]}).then(function() {console.log("t2p4: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (orderNumber == 14){db.collection("players").doc(playerNames[i]).set({score: 0, sessionName: sessName, hasEnteredNames: false, team:teamTwo, teamOrderNumber: 5, orderNumber: orderNumber}).then(function() {console.log("Player created: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); 
                                  db.collection("teams").doc(teamTwo).update({p05:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t2p5: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);});
                                  db.collection("sessions").doc(sessName).update({p14:playerNames[i]}).then(function() {console.log("t2p5: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (orderNumber == 15){db.collection("players").doc(playerNames[i]).set({score: 0, sessionName: sessName, hasEnteredNames: false, team:teamThree, teamOrderNumber: 5, orderNumber: orderNumber}).then(function() {console.log("Player created: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); 
                                  db.collection("teams").doc(teamThree).update({p05:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t3p5: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);});
                                  db.collection("sessions").doc(sessName).update({p15:playerNames[i]}).then(function() {console.log("t2p6: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (orderNumber == 16){db.collection("players").doc(playerNames[i]).set({score: 0, sessionName: sessName, hasEnteredNames: false, team:teamOne, teamOrderNumber: 6, orderNumber: orderNumber}).then(function() {console.log("Player created: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); 
                                  db.collection("teams").doc(teamOne).update({p06:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t1p6: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);});
                                  db.collection("sessions").doc(sessName).update({p16:playerNames[i]}).then(function() {console.log("t2p7: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (orderNumber == 17){db.collection("players").doc(playerNames[i]).set({score: 0, sessionName: sessName, hasEnteredNames: false, team:teamTwo, teamOrderNumber: 6, orderNumber: orderNumber}).then(function() {console.log("Player created: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); 
                                  db.collection("teams").doc(teamTwo).update({p06:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t2p6: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);});
                                  db.collection("sessions").doc(sessName).update({p17:playerNames[i]}).then(function() {console.log("t2p8: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (orderNumber == 18){db.collection("players").doc(playerNames[i]).set({score: 0, sessionName: sessName, hasEnteredNames: false, team:teamThree, teamOrderNumber: 6, orderNumber: orderNumber}).then(function() {console.log("Player created: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); 
                                  db.collection("teams").doc(teamThree).update({p06:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t3p6: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);});
                                  db.collection("sessions").doc(sessName).update({p18:playerNames[i]}).then(function() {console.log("t2p9: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (orderNumber == 19){db.collection("players").doc(playerNames[i]).set({score: 0, sessionName: sessName, hasEnteredNames: false, team:teamOne, teamOrderNumber: 7, orderNumber: orderNumber}).then(function() {console.log("Player created: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); 
                                  db.collection("teams").doc(teamOne).update({p07:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t1p7: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);});
                                  db.collection("sessions").doc(sessName).update({p19:playerNames[i]}).then(function() {console.log("t2p10: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (orderNumber == 20){db.collection("players").doc(playerNames[i]).set({score: 0, sessionName: sessName, hasEnteredNames: false, team:teamTwo, teamOrderNumber: 7, orderNumber: orderNumber}).then(function() {console.log("Player created: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); 
                                  db.collection("teams").doc(teamTwo).update({p07:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t2p7: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);});
                                  db.collection("sessions").doc(sessName).update({p20:playerNames[i]}).then(function() {console.log("t2p10: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); }    
      //increment session player number
    orderNumber++;
      };
    
  }
  else if (teamCount == 4) {
        
      db.collection("sessions").doc(sessName).set({active: true, turnActive: false, namesPerPlayer: namesPerPlayer, numberOfPlayers: countNumberPlayers, numberOfPlayersEntered: 0, numberOfTeams: 4, lastNameGuessed: "None guessed yet" , currentRound: 1, currentTeam: currentTeam, currentPlayer: currentPlayer, currentPlayerNumber : currentPlayerNumber, currentScore: 0, roundTimeDefault: timePicked, roundTime: timePicked, p01:"", p02:"", p03:"", p04:"", p05:"", p06:"", p07:"", p08:"", p09:"", p10:"", p11:"", p12:"", p13:"", p14:"", p15:"", p16:"", p17:"", p18:"", p19:"", p20:""}).then(function() {console.log("Session successfully created!");
      }).catch(function(error) {console.error("Error writing document: ", error);}); 
      
      // create team 3 and 4
      db.collection("teams").doc(teamThree).set({tpNumber: 1, sessionName: sessName, r1Score: 0, r2Score: 0, r3Score: 0 , lastRoundScore: 0, teamSize: 0, p01:"", p02:"",p03:"",p04:"",p05:"",p06:"",p07:"",p08:"",p09:""}).then(function() {console.log("Team two successfully created!");
      }).catch(function(error) {console.error("Error writing document: ", error);});  
    
      db.collection("teams").doc(teamFour).set({tpNumber: 1, sessionName: sessName, r1Score: 0, r2Score: 0, r3Score: 0 , lastRoundScore: 0, teamSize: 0, p01:"", p02:"",p03:"",p04:"",p05:"",p06:"",p07:"",p08:"",p09:""}).then(function() {console.log("Team two successfully created!");
      }).catch(function(error) {console.error("Error writing document: ", error);});  
     
    for (var i = 0, len = playerNames.length; i < len; i++) { 
            
   if (orderNumber == 1){  db.collection("players").doc(playerNames[i]).set({score: 0, sessionName: sessName, hasEnteredNames: false, team:teamOne, teamOrderNumber: 1, orderNumber: orderNumber}).then(function() {console.log("Player created: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); 
                           db.collection("teams").doc(teamOne).update({currentPlayer:playerNames[i], p01:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t1p1: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);});
                           db.collection("sessions").doc(sessName).update({p01:playerNames[i]}).then(function() {console.log("t1p1: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); }
      
      else if (orderNumber == 2){ db.collection("players").doc(playerNames[i]).set({score: 0, sessionName: sessName, hasEnteredNames: false, team:teamTwo, teamOrderNumber: 1, orderNumber: orderNumber}).then(function() {console.log("Player created: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); 
                                  db.collection("teams").doc(teamTwo).update({currentPlayer:playerNames[i], p01:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t2p1: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);});
                                  db.collection("sessions").doc(sessName).update({p02:playerNames[i]}).then(function() {console.log("t2p1: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      
      else if (orderNumber == 3){ db.collection("players").doc(playerNames[i]).set({score: 0, sessionName: sessName, hasEnteredNames: false, team:teamThree, teamOrderNumber: 1, orderNumber: orderNumber}).then(function() {console.log("Player created: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); 
                                  db.collection("teams").doc(teamThree).update({currentPlayer:playerNames[i], p01:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t3p1: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);});
                                  db.collection("sessions").doc(sessName).update({p03:playerNames[i]}).then(function() {console.log("t3p1: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      
      else if (orderNumber == 4){ db.collection("players").doc(playerNames[i]).set({score: 0, sessionName: sessName, hasEnteredNames: false, team:teamFour, teamOrderNumber: 1, orderNumber: orderNumber}).then(function() {console.log("Player created: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); 
                                  db.collection("teams").doc(teamFour).update({currentPlayer:playerNames[i], p01:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t4p1: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);});
                                  db.collection("sessions").doc(sessName).update({p04:playerNames[i]}).then(function() {console.log("t4p1: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      
      else if (orderNumber == 5){ db.collection("players").doc(playerNames[i]).set({score: 0, sessionName: sessName, hasEnteredNames: false, team:teamOne, teamOrderNumber: 2, orderNumber: orderNumber}).then(function() {console.log("Player created: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); 
                                  db.collection("teams").doc(teamOne).update({p02:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t1p2: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);});
                                  db.collection("sessions").doc(sessName).update({p05:playerNames[i]}).then(function() {console.log("t2p2: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      
      else if (orderNumber == 6){ db.collection("players").doc(playerNames[i]).set({score: 0, sessionName: sessName, hasEnteredNames: false, team:teamTwo, teamOrderNumber: 2, orderNumber: orderNumber}).then(function() {console.log("Player created: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); 
                                  db.collection("teams").doc(teamTwo).update({p02:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t2p2: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);});
                                  db.collection("sessions").doc(sessName).update({p06:playerNames[i]}).then(function() {console.log("t2p2: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      
      else if (orderNumber == 7){ db.collection("players").doc(playerNames[i]).set({score: 0, sessionName: sessName, hasEnteredNames: false, team:teamThree, teamOrderNumber: 2, orderNumber: orderNumber}).then(function() {console.log("Player created: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); 
                                  db.collection("teams").doc(teamThree).update({p02:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t3p2: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);});
                                  db.collection("sessions").doc(sessName).update({p07:playerNames[i]}).then(function() {console.log("t3p2: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      
      else if (orderNumber == 8){ db.collection("players").doc(playerNames[i]).set({score: 0, sessionName: sessName, hasEnteredNames: false, team:teamFour, teamOrderNumber: 2, orderNumber: orderNumber}).then(function() {console.log("Player created: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); 
                                  db.collection("teams").doc(teamFour).update({p02:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t4p2: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);});
                                  db.collection("sessions").doc(sessName).update({p08:playerNames[i]}).then(function() {console.log("t4p2: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      
      else if (orderNumber == 9){ db.collection("players").doc(playerNames[i]).set({score: 0, sessionName: sessName, hasEnteredNames: false, team:teamOne, teamOrderNumber: 3, orderNumber: orderNumber}).then(function() {console.log("Player created: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); 
                                  db.collection("teams").doc(teamOne).update({p03:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t1p3: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);});
                                  db.collection("sessions").doc(sessName).update({p09:playerNames[i]}).then(function() {console.log("t1p3: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      
      else if (orderNumber == 10){ db.collection("players").doc(playerNames[i]).set({score: 0, sessionName: sessName, hasEnteredNames: false, team:teamTwo, teamOrderNumber: 3, orderNumber: orderNumber}).then(function() {console.log("Player created: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); 
                                  db.collection("teams").doc(teamTwo).update({p03:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t2p3: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);});
                                  db.collection("sessions").doc(sessName).update({p10:playerNames[i]}).then(function() {console.log("t2p3: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      
      else if (orderNumber == 11){ db.collection("players").doc(playerNames[i]).set({score: 0, sessionName: sessName, hasEnteredNames: false, team:teamThree, teamOrderNumber: 3, orderNumber: orderNumber}).then(function() {console.log("Player created: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); 
                                  db.collection("teams").doc(teamThree).update({p03:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t3p3: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);});
                                  db.collection("sessions").doc(sessName).update({p11:playerNames[i]}).then(function() {console.log("t3p3: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
     
      else if (orderNumber == 12){ db.collection("players").doc(playerNames[i]).set({score: 0, sessionName: sessName, hasEnteredNames: false, team:teamFour, teamOrderNumber: 3, orderNumber: orderNumber}).then(function() {console.log("Player created: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); 
                                  db.collection("teams").doc(teamFour).update({p03:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t4p3: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);});
                                  db.collection("sessions").doc(sessName).update({p12:playerNames[i]}).then(function() {console.log("t4p3: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
     
      else if (orderNumber == 13){db.collection("players").doc(playerNames[i]).set({score: 0, sessionName: sessName, hasEnteredNames: false, team:teamOne, teamOrderNumber: 4,orderNumber: orderNumber}).then(function() {console.log("Player created: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); 
                                  db.collection("teams").doc(teamOne).update({p04:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t1p4 "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);});
                                  db.collection("sessions").doc(sessName).update({p13:playerNames[i]}).then(function() {console.log("t1p4 "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      
      else if (orderNumber == 14){db.collection("players").doc(playerNames[i]).set({score: 0, sessionName: sessName, hasEnteredNames: false, team:teamTwo, teamOrderNumber: 4,orderNumber: orderNumber}).then(function() {console.log("Player created: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); 
                                  db.collection("teams").doc(teamTwo).update({p04:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t2p4 "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);});
                                  db.collection("sessions").doc(sessName).update({p14:playerNames[i]}).then(function() {console.log("t2p4 "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      
      else if (orderNumber == 15){db.collection("players").doc(playerNames[i]).set({score: 0, sessionName: sessName, hasEnteredNames: false, team:teamThree, teamOrderNumber:4,orderNumber: orderNumber}).then(function() {console.log("Player created: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); 
                                  db.collection("teams").doc(teamThree).update({p04:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t3p4 "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);});
                                  db.collection("sessions").doc(sessName).update({p15:playerNames[i]}).then(function() {console.log("t3p4"+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      
      else if (orderNumber == 16){db.collection("players").doc(playerNames[i]).set({score: 0, sessionName: sessName, hasEnteredNames: false, team:teamFour, teamOrderNumber:4,orderNumber: orderNumber}).then(function() {console.log("Player created: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); 
                                  db.collection("teams").doc(teamFour).update({p04:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t4p4 "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);});
                                  db.collection("sessions").doc(sessName).update({p16:playerNames[i]}).then(function() {console.log("t4p4"+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
     
      else if (orderNumber == 17){db.collection("players").doc(playerNames[i]).set({score: 0, sessionName: sessName, hasEnteredNames: false, team:teamOne, teamOrderNumber: 5, orderNumber: orderNumber}).then(function() {console.log("Player created: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); 
                                  db.collection("teams").doc(teamOne).update({p05:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t1p5: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);});
                                  db.collection("sessions").doc(sessName).update({p17:playerNames[i]}).then(function() {console.log("t1p5: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      
      else if (orderNumber == 18){db.collection("players").doc(playerNames[i]).set({score: 0, sessionName: sessName, hasEnteredNames: false, team:teamTwo, teamOrderNumber: 5, orderNumber: orderNumber}).then(function() {console.log("Player created: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); 
                                  db.collection("teams").doc(teamTwo).update({p05:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t2p5: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);});
                                  db.collection("sessions").doc(sessName).update({p18:playerNames[i]}).then(function() {console.log("t2p5: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      
      else if (orderNumber == 19){db.collection("players").doc(playerNames[i]).set({score: 0, sessionName: sessName, hasEnteredNames: false, team:teamThree, teamOrderNumber: 5, orderNumber: orderNumber}).then(function() {console.log("Player created: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); 
                                  db.collection("teams").doc(teamThree).update({p05:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t3p5: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);});
                                  db.collection("sessions").doc(sessName).update({p19:playerNames[i]}).then(function() {console.log("t3p5: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
     
      else if (orderNumber == 20){db.collection("players").doc(playerNames[i]).set({score: 0, sessionName: sessName, hasEnteredNames: false, team:teamFour, teamOrderNumber: 5, orderNumber: orderNumber}).then(function() {console.log("Player created: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); 
                                  db.collection("teams").doc(teamFour).update({p05:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t4p5: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);});
                                  db.collection("sessions").doc(sessName).update({p20:playerNames[i]}).then(function() {console.log("t4p5: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 

      //increment session player number
    orderNumber++;
      };
    }  else {
    //********* 2 team game  ************
      db.collection("sessions").doc(sessName).set({active: true, turnActive: false, namesPerPlayer: namesPerPlayer, numberOfPlayers: countNumberPlayers, numberOfPlayersEntered: 0, numberOfTeams: 2, lastNameGuessed: "None guessed yet" , currentRound: 1, currentTeam: currentTeam, currentPlayer: currentPlayer, currentPlayerNumber : currentPlayerNumber, currentScore: 0, roundTimeDefault: timePicked, roundTime: timePicked, p01:"", p02:"", p03:"", p04:"", p05:"", p06:"", p07:"", p08:"", p09:"", p10:"", p11:"", p12:"", p13:"", p14:"", p15:"", p16:"", p17:"", p18:"", p19:"", p20:""}).then(function() {console.log("Session successfully created!");
    }).catch(function(error) {console.error("Error writing document: ", error);}); 
    //iterate through names and add to players to the DB
      for (var i = 0, len = playerNames.length; i < len; i++) { 
      if (i % 2 == 0){   
      //add new player to players collection
      db.collection("players").doc(playerNames[i]).set({score: 0, sessionName: sessName, hasEnteredNames: false, team:teamOne, teamOrderNumber: t1number, orderNumber: orderNumber}).then(function() {console.log("Player created: "+playerNames[i]);
        }).catch(function(error) {console.error("Error writing document: ", error);}); 
      //add player to team in order
      if (t1number == 1){db.collection("teams").doc(teamOne).update({currentPlayer:playerNames[i], p01:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t1p1: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); }
      else if (t1number == 2){db.collection("teams").doc(teamOne).update({p02:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t1p2: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (t1number == 3){db.collection("teams").doc(teamOne).update({p03:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t1p3: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (t1number == 4){db.collection("teams").doc(teamOne).update({p04:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t1p4: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (t1number == 5){db.collection("teams").doc(teamOne).update({p05:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t1p5: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (t1number == 6){db.collection("teams").doc(teamOne).update({p06:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t1p6: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (t1number == 7){db.collection("teams").doc(teamOne).update({p07:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t1p7: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (t1number == 8){db.collection("teams").doc(teamOne).update({p08:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t1p8: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (t1number == 9){db.collection("teams").doc(teamOne).update({p09:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t1p9: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); }
      //increment team player number
      t1number++;
    } else {
      //add new player to players collection
      db.collection("players").doc(playerNames[i]).set({score: 0, sessionName: sessName, hasEnteredNames: false, team:teamTwo, teamOrderNumber: t2number, orderNumber: orderNumber}).then(function() {console.log("Player created: "+playerNames[i]);
        }).catch(function(error) {console.error("Error writing document: ", error);}); 
      //add player to team in order
            if (t2number == 1){db.collection("teams").doc(teamTwo).update({currentPlayer:playerNames[i], p01:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t2p1: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); }
      else if (t2number == 2){db.collection("teams").doc(teamTwo).update({p02:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t2p2: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (t2number == 3){db.collection("teams").doc(teamTwo).update({p03:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t2p3: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (t2number == 4){db.collection("teams").doc(teamTwo).update({p04:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t2p4: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (t2number == 5){db.collection("teams").doc(teamTwo).update({p05:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t2p5: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (t2number == 6){db.collection("teams").doc(teamTwo).update({p06:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t2p6: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (t2number == 7){db.collection("teams").doc(teamTwo).update({p07:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t2p7: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (t2number == 8){db.collection("teams").doc(teamTwo).update({p08:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t2p8: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (t2number == 9){db.collection("teams").doc(teamTwo).update({p09:playerNames[i], teamSize: increaseBy}).then(function() {console.log("t2p9: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      //increment team player number
        t2number++;
    };
      //add player to session in order
       if (orderNumber == 1){db.collection("sessions").doc(sessName).update({p01:playerNames[i]}).then(function() {console.log("t2p1: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); }
      else if (orderNumber == 2){db.collection("sessions").doc(sessName).update({p02:playerNames[i]}).then(function() {console.log("t2p2: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (orderNumber == 3){db.collection("sessions").doc(sessName).update({p03:playerNames[i]}).then(function() {console.log("t2p3: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (orderNumber == 4){db.collection("sessions").doc(sessName).update({p04:playerNames[i]}).then(function() {console.log("t2p4: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (orderNumber == 5){db.collection("sessions").doc(sessName).update({p05:playerNames[i]}).then(function() {console.log("t2p5: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (orderNumber == 6){db.collection("sessions").doc(sessName).update({p06:playerNames[i]}).then(function() {console.log("t2p6: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (orderNumber == 7){db.collection("sessions").doc(sessName).update({p07:playerNames[i]}).then(function() {console.log("t2p7: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (orderNumber == 8){db.collection("sessions").doc(sessName).update({p08:playerNames[i]}).then(function() {console.log("t2p8: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (orderNumber == 9){db.collection("sessions").doc(sessName).update({p09:playerNames[i]}).then(function() {console.log("t2p9: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (orderNumber == 10){db.collection("sessions").doc(sessName).update({p10:playerNames[i]}).then(function() {console.log("t2p10: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (orderNumber == 11){db.collection("sessions").doc(sessName).update({p11:playerNames[i]}).then(function() {console.log("t2p2: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (orderNumber == 12){db.collection("sessions").doc(sessName).update({p12:playerNames[i]}).then(function() {console.log("t2p3: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (orderNumber == 13){db.collection("sessions").doc(sessName).update({p13:playerNames[i]}).then(function() {console.log("t2p4: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (orderNumber == 14){db.collection("sessions").doc(sessName).update({p14:playerNames[i]}).then(function() {console.log("t2p5: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (orderNumber == 15){db.collection("sessions").doc(sessName).update({p15:playerNames[i]}).then(function() {console.log("t2p6: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (orderNumber == 16){db.collection("sessions").doc(sessName).update({p16:playerNames[i]}).then(function() {console.log("t2p7: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (orderNumber == 17){db.collection("sessions").doc(sessName).update({p17:playerNames[i]}).then(function() {console.log("t2p8: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (orderNumber == 18){db.collection("sessions").doc(sessName).update({p18:playerNames[i]}).then(function() {console.log("t2p9: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (orderNumber == 19){db.collection("sessions").doc(sessName).update({p19:playerNames[i]}).then(function() {console.log("t2p10: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); } 
      else if (orderNumber == 20){db.collection("sessions").doc(sessName).update({p20:playerNames[i]}).then(function() {console.log("t2p10: "+playerNames[i]);}).catch(function(error) {console.error("Error writing document: ", error);}); }    
      //increment session player number
    orderNumber++;
    };
        
  }
 
createPlayerOptions();

document.getElementById('setupCreateGameSessionButton').disabled = true;
document.getElementById("createSuccess").style.display = "block";
document.getElementById("createScreen").style.display = "none";
};

function createPlayerOptions (){
    console.log("Active players: "+ activePlayers);
    var selectPlayer = document.getElementById("createSelectPlayer");
      for(var i = 0; i < activePlayers.length; i++) {
          var opt = activePlayers[i];
          var el = document.createElement("option");
          el.textContent = opt;
          el.value = opt;
          selectPlayer.appendChild(el);
        } 
   $('#createSelectPlayer').not('.disabled').formSelect();
  }; 


function showTeamInputBoxes(){
 
teamCount = document.getElementById("createSelectTeamNumber").value;
console.log(teamCount)

  if (teamCount == 2) {
   document.getElementById("setupTeamThree").style.display = "none" 
   document.getElementById("setupTeamFour").style.display = "none" 
   document.getElementById("setupTeamFive").style.display = "none" 
   } else if (teamCount == 3) {
   document.getElementById("setupTeamThree").style.display = "block" 
   document.getElementById("setupTeamFour").style.display = "none" 
   document.getElementById("setupTeamFive").style.display = "none" 
   } else if (teamCount == 4) {
   document.getElementById("setupTeamThree").style.display = "block" 
   document.getElementById("setupTeamFour").style.display = "block" 
   document.getElementById("setupTeamFive").style.display = "none" 
    } else {
   document.getElementById("setupTeamThree").style.display = "block" 
   document.getElementById("setupTeamFour").style.display = "block" 
   document.getElementById("setupTeamFive").style.display = "block" 
    } 
}

function showCreateJoinButton(){
  document.getElementById("createJoinButton").style.display = "block";
  }

function createJoinGame(){
document.getElementById("createSuccess").style.display = "none";
playerPicked = document.getElementById("createSelectPlayer").value;
joinGame();
}

// create new game back button to start page
function createBack() {
  document.getElementById("page-splash").style.display = "block";
  document.getElementById("createScreen").style.display = "none";
}  

//***************************************
// Join Game Functions
//***************************************

function sessionPick() {
  
  sessionPicked = document.getElementById('selectSession').value;
  getPlayers();
  document.getElementById("player").style.display = "block";
}

function playerPick() {
  playerPicked = document.getElementById('selectPlayer').value;
  document.getElementById("joinGame").style.display = "block";
}

function joinGame(){
  console.log("Session Picked: "+sessionPicked)
  console.log("Player Picked: "+playerPicked)
  document.getElementById("joinScreen").style.display = "none";
  getTeams();
  getTeamPicked();
  console.log("Active teams: "+activeTeams);
  document.getElementById("enterPlayerPicked").innerHTML = playerPicked;
  document.getElementById("enterSessionPicked").innerHTML = sessionPicked;
  document.getElementById('startShowPlayer').innerHTML = playerPicked;
  document.getElementById("loginName").innerHTML = playerPicked;
  hasUserEnteredNames();
}

function showHomeScreenDetails(){
 
  var unsubscribe =  db.collection("sessions").doc(sessionPicked)
    .onSnapshot(function(doc) {
      currentPlayer = doc.data().currentPlayer; 
      currentTeam = doc.data().currentTeam;
      currentRound = doc.data().currentRound;
     turnActive = doc.data().turnActive
        document.getElementById('showNextPlayer').innerHTML =  currentPlayer;    
        document.getElementById('showNextTeam').innerHTML =  currentTeam
        document.getElementById('showRound').innerHTML =  "Round "+currentRound      
       
       if (currentRound == 4){
            homeScreen.style.display = 'none';
            startScreen.style.display = 'none';
            teamsScreen.style.display = "none";
            document.getElementById("gameOverScreen").style.display = 'block';
            document.getElementById("endGameTrigger").style.display = "block";        
            roundScreen.style.display = "none";         
            showScoresScreen();  
            enableNavBarButtons();
            document.getElementById("homeStartButton").style.display = "none";
            document.getElementById("menu-start").style.display = "none";  
            menuRound.style.display = "none"
      } else  if (hasEnteredNames == true && currentPlayer == playerPicked && turnActive == false){
            enableNavBarButtons();
            document.getElementById("homeStartButton").style.display = "block";
            document.getElementById("menu-start").style.display = "block";
     } else if (currentPlayer !== playerPicked) {
            document.getElementById("homeStartButton").style.display = "none";
            document.getElementById("menu-start").style.display = "none";        
     }
    
  });  
  
}


function hasUserEnteredNames() {
 
   db.collection("players").doc(playerPicked).get().then(function(doc) {
    if (doc.exists) { hasEnteredNames = doc.data().hasEnteredNames;
                     console.log("Player has entered names: "+hasEnteredNames)
              if (hasEnteredNames == true) {
                checkForPlayersEnteredNames();
              } else {
                adjustNameCount();
                document.getElementById("enterScreen").style.display = "block"
              };
    } else {console.log("No such document!");
    }}).catch(function(error) {console.log("Error getting document:", error);}); 
};

function checkForPlayersEnteredNames () {
var unsubscribe =  db.collection("players").where("hasEnteredNames", "==", false).where("sessionName", "==", sessionPicked)
    .onSnapshot(function(querySnapshot) {
        var playersLeftToEnter = [];
        querySnapshot.forEach(function(doc) {
            playersLeftToEnter.push(doc.id);
        });
   document.getElementById("playersYetToEnter").innerHTML = "Players left: "+playersLeftToEnter
   console.log("Players left: ", playersLeftToEnter.join(", "))
   console.log("Count players left to enter: "+playersLeftToEnter.length)
      if (playersLeftToEnter.length == 0) {
            document.getElementById("waitScreen").style.display = "none";
            showHomeScreenDetails();
            showSection(homeScreen, menuHome);
            enableNavBarButtons();
      
      } else {
            document.getElementById("waitScreen").style.display = "block";
      }
  });
}

//When user Joins game - populate session and player functions
function getActiveSessions () {
  activeSessions = [];
   removeOptions(document.getElementById("selectSession"));
  db.collection("sessions").where("active","==",true).get().then(function(querySnapshot) {
     querySnapshot.forEach(function(doc) {
    activeSessions.push(doc.id); 
     });
      return activeSessions;
  }).then(function (activeSessions) {
      sessionOptions(activeSessions);
      $('#selectSession').not('.disabled').formSelect();    
    });
};

function sessionOptions (activeSessions){
    console.log("Active sessions: "+ activeSessions);
      //Start Session options set  
     var selectStartSession = document.getElementById("selectSession");
      for(var i = 0; i < activeSessions.length; i++) {
          var opt = activeSessions[i];
          var el = document.createElement("option");
          el.textContent = opt;
          el.value = opt;
          selectStartSession.appendChild(el);
        } 
}; 

function removeOptions(selectbox) {
    var i;
    for(i = selectbox.options.length - 1 ; i >= 0 ; i--)
    {
        selectbox.remove(i);
    }
}

function getPlayers () {
    activePlayers = [];
    
    removeOptions(document.getElementById("selectPlayer"));
  
    db.collection("players").where("sessionName","==",sessionPicked).get().then(function(querySnapshot) {
     querySnapshot.forEach(function(doc) {
    activePlayers.push(doc.id); 
     });
      return activePlayers;
  }).then(function (activePlayers) {
      playerOptions(activePlayers);
      $('#selectPlayer').not('.disabled').formSelect();
    });
};

function playerOptions (activeSessions){
    console.log("Active players: "+ activePlayers);
  
      //Start Session options set  
     var selectPlayer = document.getElementById("selectPlayer");
          for(var i = 0; i < activePlayers.length; i++) {
          var opt = activePlayers[i];
          var el = document.createElement("option");
          el.textContent = opt;
          el.value = opt;
          selectPlayer.appendChild(el);
        } 
}; 
      
function getTeams () {
    activeTeams = [];
    db.collection("teams").where("sessionName","==",sessionPicked).get().then(function(querySnapshot) {
     querySnapshot.forEach(function(doc) {
      activeTeams.push(doc.id); 
     });
      return activeTeams;
    }).then(function (activeTeams){
     activeTeamOne = activeTeams[0];
      document.getElementById('showTeamOneName').innerHTML = activeTeamOne
      activeTeamTwo = activeTeams[1];
      document.getElementById('showTeamTwoName').innerHTML = activeTeamTwo
      if (activeTeams.length == 3){
        activeTeamThree = activeTeams[2];
        document.getElementById('showTeamThreeName').innerHTML = activeTeamThree
      } else if (activeTeams.length == 4){
        activeTeamThree = activeTeams[2];
        activeTeamFour = activeTeams[3];  
        document.getElementById('showTeamThreeName').innerHTML = activeTeamThree
        document.getElementById('showTeamFourName').innerHTML = activeTeamFour
      } else if (activeTeams.length == 5){
        activeTeamFive = activeTeams[4];  
      };
    populateTeams(activeTeams);
    });
};

function getTeamPicked() {
    teamPicked = "";
    db.collection("players").doc(playerPicked).get().then(function(doc) {
    if (doc.exists) { teamPicked = doc.data().team;
                     console.log("Team picked: "+teamPicked)
    } else {console.log("No such document!");
    }}).catch(function(error) {console.log("Error getting document:", error);}); 
};

function getCurrentRound() {
     db.collection("sessions").doc(sessionPicked).get().then(function(doc) {
    if (doc.exists) { currentRound = doc.data().currentRound;
                     console.log("Current Round: "+currentRound);
                   } else {console.log("No such document!");
    }}).catch(function(error) {console.log("Error getting document:", error);}); 
};

function populateTeams() {
$('li').filter(function(){return $.trim($(this).html()) == '';}).show()
  //get Team 1 as JS Object
   activeTeamOne = activeTeams[0];
   activeTeamTwo = activeTeams[1];
  activeTeamThree = activeTeams[2];
  activeTeamFour = activeTeams[3];
db.collection("teams").doc(activeTeamOne).get().then(function(doc) {if (doc.exists) { 
  t1p1 = doc.data().p01
  t1p2 = doc.data().p02
  t1p3 = doc.data().p03
  t1p4 = doc.data().p04
  t1p5 = doc.data().p05
  t1p6 = doc.data().p06
  t1p7 = doc.data().p07
  t1p8 = doc.data().p08
  t1p9 = doc.data().p09
  
document.getElementById('t1p1').innerHTML = t1p1
document.getElementById('t1p2').innerHTML = t1p2
document.getElementById('t1p3').innerHTML = t1p3
document.getElementById('t1p4').innerHTML = t1p4
document.getElementById('t1p5').innerHTML = t1p5
document.getElementById('t1p6').innerHTML = t1p6
document.getElementById('t1p7').innerHTML = t1p7
document.getElementById('t1p8').innerHTML = t1p8
document.getElementById('t1p9').innerHTML = t1p9
   
} else {console.log("No such document!");}}).catch(function(error) {console.log("Error getting document:", error);}); 

  //get Team 2 as JS Object
db.collection("teams").doc(activeTeamTwo).get().then(function(doc) {if (doc.exists) { 
  t2p1 = doc.data().p01
  t2p2 = doc.data().p02
  t2p3 = doc.data().p03
  t2p4 = doc.data().p04
  t2p5 = doc.data().p05
  t2p6 = doc.data().p06
  t2p7 = doc.data().p07
  t2p8 = doc.data().p08
  t2p9 = doc.data().p09
  
document.getElementById('t2p1').innerHTML = t2p1
document.getElementById('t2p2').innerHTML = t2p2
document.getElementById('t2p3').innerHTML = t2p3
document.getElementById('t2p4').innerHTML = t2p4
document.getElementById('t2p5').innerHTML = t2p5
document.getElementById('t2p6').innerHTML = t2p6
document.getElementById('t2p7').innerHTML = t2p7
document.getElementById('t2p8').innerHTML = t2p8
document.getElementById('t2p9').innerHTML = t2p9

  if (activeTeams.length == 2) { 
      $('li').filter(function(){return $.trim($(this).html()) == '';}).hide()  
  }
  
} else {console.log("No such document!");}}).catch(function(error) {console.log("Error getting document:", error);}); 

if (activeTeams.length == 3){

db.collection("teams").doc(activeTeamThree).get().then(function(doc) {if (doc.exists) { 
  t3p1 = doc.data().p01
  t3p2 = doc.data().p02
  t3p3 = doc.data().p03
  t3p4 = doc.data().p04
  t3p5 = doc.data().p05
  t3p6 = doc.data().p06
  t3p7 = doc.data().p07
  t3p8 = doc.data().p08
  t3p9 = doc.data().p09
  
document.getElementById('t3p1').innerHTML = t3p1
document.getElementById('t3p2').innerHTML = t3p2
document.getElementById('t3p3').innerHTML = t3p3
document.getElementById('t3p4').innerHTML = t3p4
document.getElementById('t3p5').innerHTML = t3p5
document.getElementById('t3p6').innerHTML = t3p6
document.getElementById('t3p7').innerHTML = t3p7
document.getElementById('t3p8').innerHTML = t3p8
document.getElementById('t3p9').innerHTML = t3p9
        $('li').filter(function(){return $.trim($(this).html()) == '';}).hide()  
      document.getElementById("teamThree").style.display = "block"; 
} else {console.log("No such document!");}}).catch(function(error) {console.log("Error getting document:", error);}); 

  }
    if (activeTeams.length == 4){
$('li').filter(function(){return $.trim($(this).html()) == '';}).show()
  db.collection("teams").doc(activeTeamThree).get().then(function(doc) {if (doc.exists) { 
  t3p1 = doc.data().p01
  t3p2 = doc.data().p02
  t3p3 = doc.data().p03
  t3p4 = doc.data().p04
  t3p5 = doc.data().p05
  t3p6 = doc.data().p06
  t3p7 = doc.data().p07
  t3p8 = doc.data().p08
  t3p9 = doc.data().p09
  
document.getElementById('t3p1').innerHTML = t3p1
document.getElementById('t3p2').innerHTML = t3p2
document.getElementById('t3p3').innerHTML = t3p3
document.getElementById('t3p4').innerHTML = t3p4
document.getElementById('t3p5').innerHTML = t3p5
document.getElementById('t3p6').innerHTML = t3p6
document.getElementById('t3p7').innerHTML = t3p7
document.getElementById('t3p8').innerHTML = t3p8
document.getElementById('t3p9').innerHTML = t3p9
document.getElementById("teamThree").style.display = "block"; 
} else {console.log("No such document!");}}).catch(function(error) {console.log("Error getting document:", error);}); 

    db.collection("teams").doc(activeTeamFour).get().then(function(doc) {if (doc.exists) { 
  t4p1 = doc.data().p01
  t4p2 = doc.data().p02
  t4p3 = doc.data().p03
  t4p4 = doc.data().p04
  t4p5 = doc.data().p05
  t4p6 = doc.data().p06
  t4p7 = doc.data().p07
  t4p8 = doc.data().p08
  t4p9 = doc.data().p09
  
document.getElementById('t4p1').innerHTML = t4p1
document.getElementById('t4p2').innerHTML = t4p2
document.getElementById('t4p3').innerHTML = t4p3
document.getElementById('t4p4').innerHTML = t4p4
document.getElementById('t4p5').innerHTML = t4p5
document.getElementById('t4p6').innerHTML = t4p6
document.getElementById('t4p7').innerHTML = t4p7
document.getElementById('t4p8').innerHTML = t4p8
document.getElementById('t4p9').innerHTML = t4p9
        document.getElementById("teamFour").style.display = "block"; 
          $('li').filter(function(){return $.trim($(this).html()) == '';}).hide()  
} else {console.log("No such document!");}}).catch(function(error) {console.log("Error getting document:", error);}); 
}

 updateScores();
 
};


//**********************************
// Enter Names Functions
//**********************************
var targetName
var wikiName
var wikiLink

var bagName1 = document.getElementById('enterNameOne').value;
var bagName2 = document.getElementById('enterNameTwo').value;
var bagName3 = document.getElementById('enterNameThree').value;
var bagName4 = document.getElementById('enterNameFour').value;
var bagName5 = document.getElementById('enterNameFive').value;
var bagName6 = document.getElementById('enterNameSix').value;
var bagName7 = document.getElementById('enterNameSeven').value;
var bagName8 = document.getElementById('enterNameEight').value;
var bagName9 = document.getElementById('enterNameNine').value;
var bagName10 = document.getElementById('enterNameTen').value;

function enterSubmitNames() {

var bagNamesEntered= [bagName1,bagName2,bagName3,bagName4,bagName5,bagName6,bagName7,bagName8,bagName9,bagName10]  
var nameId


//get current count of names
     db.collection("names").doc("ID").get().then(function(doc) {
if (doc.exists) {  } else {
  db.collection("names").doc("ID").set({count: 1}).then(function() {console.log("ID Updated");
}).catch(function(error) {console.error("Error writing document: ", error);});   
}
       
  nameId = doc.data().count;
  document.getElementById('submitNamesButton').disabled = true;   
var newId = parseInt(namesPerPlayer,10)
var increaseByNPP = firebase.firestore.FieldValue.increment(newId);
var nameId1 = nameId + 1
var nameId2 = nameId + 2
var nameId3 = nameId + 3
var nameId4 = nameId + 4
var nameId5 = nameId + 5
var nameId6 = nameId + 6
var nameId7 = nameId + 7
var nameId8 = nameId + 8
var nameId9 = nameId + 9
var nameId10 = nameId + 10    
       
db.collection("names").doc("ID").update({count: increaseByNPP}).then(function() {console.log("ID Updated");
}).catch(function(error) {console.error("Error writing document: ", error);});      
       
db.collection("names").doc(nameId1.toString()).set({bagName: bagName1,submittedBy: playerPicked, sessionName: sessionPicked, round: 1}).then(function() {console.log("Name 1 successfully written: "+bagName1);
}).catch(function(error) {console.error("Error writing document: ", error);});

  
db.collection("names").doc(nameId2.toString()).set({bagName: bagName2, submittedBy: playerPicked, sessionName: sessionPicked, round: 1}).then(function() {console.log("Name 2 successfully written: "+bagName2);
}).catch(function(error) {console.error("Error writing document: ", error);});

db.collection("names").doc(nameId3.toString()).set({bagName: bagName3,submittedBy: playerPicked, sessionName: sessionPicked, round: 1}).then(function() {console.log("Name 3 successfully written: "+bagName3);
}).catch(function(error) {console.error("Error writing document: ", error);});

if (namesPerPlayer > 3) {
db.collection("names").doc(nameId4.toString()).set({bagName: bagName4, submittedBy: playerPicked, sessionName: sessionPicked, round: 1}).then(function() {console.log("Name 4 successfully written: "+bagName4);
}).catch(function(error) {console.error("Error writing document: ", error);});
}
if (namesPerPlayer > 4) {   
db.collection("names").doc(nameId5.toString()).set({bagName: bagName5, submittedBy: playerPicked, sessionName: sessionPicked, round: 1}).then(function() {console.log("Name 5 successfully written: "+bagName5);
}).catch(function(error) {console.error("Error writing document: ", error);});
}
if (namesPerPlayer > 5) {
db.collection("names").doc(nameId6.toString()).set({bagName: bagName6, submittedBy: playerPicked, sessionName: sessionPicked, round: 1}).then(function() {console.log("Name 5 successfully written: "+bagName6);
}).catch(function(error) {console.error("Error writing document: ", error);});
}
if (namesPerPlayer > 6) {  
db.collection("names").doc(nameId7.toString()).set({bagName: bagName7, submittedBy: playerPicked, sessionName: sessionPicked, round: 1}).then(function() {console.log("Name 5 successfully written: "+bagName7);
}).catch(function(error) {console.error("Error writing document: ", error);});
}
if (namesPerPlayer > 7) {
db.collection("names").doc(nameId8.toString()).set({bagName: bagName8, submittedBy: playerPicked, sessionName: sessionPicked, round: 1}).then(function() {console.log("Name 5 successfully written: "+bagName8);
}).catch(function(error) {console.error("Error writing document: ", error);});
}
if (namesPerPlayer > 8) {
db.collection("names").doc(nameId9.toString()).set({bagName: bagName9, submittedBy: playerPicked, sessionName: sessionPicked, round: 1}).then(function() {console.log("Name 5 successfully written: "+bagName9);
}).catch(function(error) {console.error("Error writing document: ", error);});
}
if (namesPerPlayer > 9) {
db.collection("names").doc(nameId10.toString()).set({bagName: bagName10, submittedBy: playerPicked, sessionName: sessionPicked, round: 1}).then(function() {console.log("Name 5 successfully written: "+bagName10);
}).catch(function(error) {console.error("Error writing document: ", error);});
};
       
db.collection("players").doc(playerPicked).update({hasEnteredNames: true}).then(function() {console.log("Player entered names: True ");
}).catch(function(error) {console.error("Error writing document: ", error);});

db.collection("sessions").doc(sessionPicked).update({numberOfPlayersEntered: increaseBy}).then(function() {console.log("numberOfPlayersEntered: +1");
}).catch(function(error) {console.error("Error writing document: ", error);});
 

  
   });
       
document.getElementById("enterScreen").style.display = "none"
  

checkForPlayersEnteredNames ();
};          


//FORBES 400 API for name inspiration
/*
var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var json = JSON.parse(this.response);
      
// Map json labels  back to values array
var labels = json.map(function (e) {
    return e.name;
});
     console.log(labels)  
// Map json values back to values array
var values = json.map(function (e) {
    return (e.realTimeWorth / 1000); // Divide to billions in units of ten
});
}
 
  };
  xhttp.open("GET", "https://forbes400.herokuapp.com/api/forbes400?limit=50", false);
  xhttp.send();
*/



// WikiData top people based on number of Wiki articles referencing them

function getRandomWikiName(){

function makeSPARQLQuery( endpointUrl, sparqlQuery, doneCallback ) {
	var settings = {
		headers: { Accept: 'application/sparql-results+json' },
		data: { query: sparqlQuery }
	};
	return $.ajax( endpointUrl, settings ).then( doneCallback );
}

var endpointUrl = 'https://query.wikidata.org/sparql',
	  
    sparqlQuery = "SELECT ?person ?name ?linkcount ?wikipedia_article\n" +
        "WHERE\n" +
        "{\n" +
        "  ?person wdt:P31 wd:Q5 ;   # human\n" +
        "     wdt:P569 ?born .\n" +
        "  FILTER (?born >= \"1920-01-01T00:00:00Z\"^^xsd:dateTime) .\n" +
        "  ?person wikibase:sitelinks ?linkcount .\n" +
        "  FILTER (?linkcount > 50) .\n" +
        "  ?person rdfs:label ?name FILTER(lang(?name)=\"en\").\n" +
        "  ?wikipedia_article schema:about ?person .\n" +
        "  ?wikipedia_article schema:isPartOf <https://en.wikiquote.org/> .\n" +
        "}\n" +
        "ORDER BY DESC(?linkcount)\n" +
        "LIMIT 1 OFFSET "+ Math.floor((Math.random() * 100) + 1);

makeSPARQLQuery( endpointUrl, sparqlQuery, function( data ) {
		$( 'body' ).append( $( '<pre>' ).text( JSON.stringify( data ) ) );
    console.log(data.results.bindings[0].name.value)
    console.log(data.results.bindings[0].wikipedia_article.value)
  wikiName = data.results.bindings[0].name.value
  wikiLink = data.results.bindings[0].wikipedia_article.value
}
).then(function(){
   document.getElementById(targetName).value = wikiName
  document.getElementById('wiki').src = wikiLink;
  document.getElementById('wikiFullName').innerhtml = wikiName
  })

}

function oneSelect(){hideAllWiki(); document.getElementById("randomWikiNameButton1").style.display = "block"; targetName = 'enterNameOne';}
function twoSelect(){hideAllWiki(); document.getElementById("randomWikiNameButton2").style.display = "block"; targetName = 'enterNameTwo';}
function threeSelect(){hideAllWiki(); document.getElementById("randomWikiNameButton3").style.display = "block"; targetName = 'enterNameThree';}
function fourSelect(){hideAllWiki(); document.getElementById("randomWikiNameButton4").style.display = "block"; targetName = 'enterNameFour';}
function fiveSelect(){hideAllWiki(); document.getElementById("randomWikiNameButton5").style.display = "block"; targetName = 'enterNameFive';}
function sixSelect(){hideAllWiki(); document.getElementById("randomWikiNameButton6").style.display = "block"; targetName = 'enterNameSix';}
function sevenSelect(){hideAllWiki(); document.getElementById("randomWikiNameButton7").style.display = "block"; targetName = 'enterNameSeven';}
function eightSelect(){hideAllWiki(); document.getElementById("randomWikiNameButton8").style.display = "block"; targetName = 'enterNameEight';}
function nineSelect(){hideAllWiki(); document.getElementById("randomWikiNameButton9").style.display = "block"; targetName = 'enterNameNine';}
function tenSelect(){hideAllWiki(); document.getElementById("randomWikiNameButton10").style.display = "block"; targetName = 'enterNameTen';}

function hideAllWiki(){
  document.getElementById("randomWikiNameButton1").style.display = "none";
  document.getElementById("randomWikiNameButton2").style.display = "none";
  document.getElementById("randomWikiNameButton3").style.display = "none";
  document.getElementById("randomWikiNameButton4").style.display = "none";
  document.getElementById("randomWikiNameButton5").style.display = "none";
  document.getElementById("randomWikiNameButton6").style.display = "none";
  document.getElementById("randomWikiNameButton7").style.display = "none";
  document.getElementById("randomWikiNameButton8").style.display = "none";
  document.getElementById("randomWikiNameButton9").style.display = "none";
  document.getElementById("randomWikiNameButton10").style.display = "none";
  }


var namesInputSoFar
function countNamesEntered(){

if (document.getElementById('enterNameTen').value.length > 0){
  namesInputSoFar = 10 }

else if (document.getElementById('enterNameNine').value.length > 0){
  namesInputSoFar = 9 }

else if (document.getElementById('enterNameEight').value.length > 0){
  namesInputSoFar = 8 }

else if (document.getElementById('enterNameSeven').value.length > 0){
  namesInputSoFar = 7 }

else if (document.getElementById('enterNameSix').value.length > 0){
  namesInputSoFar = 6 }

else if (document.getElementById('enterNameFive').value.length > 0){
  namesInputSoFar = 5 }

else if (document.getElementById('enterNameFour').value.length > 0){
  namesInputSoFar = 4 }

else if (document.getElementById('enterNameThree').value.length > 0){
  namesInputSoFar = 3 }

else if (document.getElementById('enterNameTwo').value.length > 0){
  namesInputSoFar = 2 }

else if (document.getElementById('enterNameOne').value.length > 0){
  namesInputSoFar = 1 }

else {namesInputSoFar = 0}

if (namesInputSoFar == namesPerPlayer){
  document.getElementById('submitNamesButton').disabled = false;
  console.log("YES")
}

  console.log(namesInputSoFar+"input")
    console.log(namesPerPlayer+"req")
}
//************************************************
//GAME SCREEN FUNCTIONs
//*************************************************
function getBagNames(){
 bagNames = [];
 db.collection("names").where("sessionName","==",sessionPicked).where("round","==",currentRound).get().then(function(querySnapshot) {
  querySnapshot.forEach(function(doc) {bagNames.push(doc.data().bagName); });
   console.log([bagNames])
 });
};

function getStartInfo () {
  getRoundTime();   
  showSection(startScreen, menuStart);
  document.getElementById("start-splash").style.display = "block"; 
  db.collection("sessions").doc(sessionPicked).get().then(function(doc) {
    if (doc.exists) {currentRound = doc.data().currentRound;
                     console.log("Current Round: "+currentRound);
                     getBagNames();
                     
                  if (currentRound == 1){
                    document.getElementById('startShowCurrentRound').innerHTML = "<h5>Round 1</h5><hr><p>Articulate the bag name without saying it or a rhyming word</p><p>e.g. for the name James, you can't say 'Rhymes with Games', but you could say 'Rhymes with 'something'-master'!"
                  } else if (currentRound == 2) {
                    document.getElementById('startShowCurrentRound').innerHTML = "<h5>Round 2</h5><p></p><p>Use <strong>1</strong> word to describe the bag name</p><p>hint: the names are the same as they were in round 1"
                  } else if (currentRound == 3) {
                   document.getElementById('startShowCurrentRound').innerHTML = "<h5>Round 3</h5><p></p><p>Act out the bag name</p><p>no pointing, grunting or any other verbal "
                  } else if (currentRound == 4) {
                  document.getElementById('startShowCurrentRound').innerHTML = "<h5>Game Over!</h5>"
                  }
                }
    else {console.log("No such document!");};
    
     }).catch(function(error) {console.log("Error getting document:", error);}); 
  
};

function getRoundTime(){
  
     db.collection("sessions").doc(sessionPicked).get().then(function(doc) {
    if (doc.exists) { roundTime = doc.data().roundTime;
                     console.log("Round time: "+roundTime);
                      document.getElementById('startTimeLeft').innerHTML = "You have "+roundTime+" seconds"
                  } else {console.log("No such document!");
     };
  });
};

function startRound() {
  namesGotThisRound = [];
  disableNavBarButtons();
  enableGotItButton();
  hideGotPassButton();
  gameHasPassed = false;
  nameArrayCount = 0;
  document.getElementById("gameStart").style.display = "block";  
  document.getElementById("start-splash").style.display = "none"; 
  var display = document.querySelector('#gameShowTime');
  startTimer(roundTime, display);
  document.getElementById('gameShowName').innerHTML = bagNames[0]
  
 db.collection('sessions').doc(sessionPicked).update({ turnActive: true, currentPlayer: playerPicked, currentScore: 0 }).then(function() {console.log("Session player logged");
}).catch(function(error) {console.error("Error updating current player and reset score: ", error);});
  
};

//Start Timer
function startTimer(duration, display) {
  shuffle(bagNames);
  console.log(bagNames);
  countNamesLeft = bagNames.length;
    if (countNamesLeft > 1) {
  enablePassButton();
  } else if (countNamesLeft == 1){
  document.getElementById('gameShowNumberLeft').innerHTML = "Last name!"
  } 
  
  document.getElementById('gameShowNumberLeft').innerHTML = countNamesLeft - 1 + " other names left";

var timer = duration, minutes, seconds;
var tickTock = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
 
        display.textContent = seconds;  
    
    if (timer==0){
      clearInterval(tickTock)
      endRoundWithNamesLeft();
         } else if (bagNames.length == 0) {  
          //new screen here for if you guess all names before time's up
          timeLeftOver = timer
          console.log(timeLeftOver)
          clearInterval(tickTock);
          endRoundWithTimeLeft();
         } else {
          --timer 
         roundProgress = ((roundTime-timer)/roundTime)*100
           //document.getElementById("roundProgressBar").style.width = roundProgress+"%"
      document.getElementById("roundProgressBar").setAttribute("style","width: "+roundProgress+"%")
    }   
  }, 1000);
  console.log(timer)
};

// Function to get bag names for the upcoming session
//Shuffle
function shuffle(arra1) {
    var ctr = arra1.length, temp, index;

// While there are elements in the array
    while (ctr > 0) {
// Pick a random index
        index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
        ctr--;
// And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    } return arra1;
};
  
// Buttons when game has started
// notes: passed name will always be [0]
function gameGotItButton () {
gameRemoveName();
  //case - user hasn't passed and there are no names left
if(bagNames.length == 0 && gameHasPassed == false){
noNamesLeft();
} else if (bagNames.length == 1 && gameHasPassed==true) {
//case - user got the name and the passed name is the only one left
document.getElementById('gameGotItButton').disabled = false;
document.getElementById('gamePassButton').disabled = true; 
document.getElementById('gameShowNumberLeft').innerHTML = "Only the passed name is left";
document.getElementById('gameShowNamePassed').innerHTML = "-"
document.getElementById('gameShowName').innerHTML = bagNames[0];
nameArrayCount = 0;
hideGotPassButton();  
} else if (bagNames.length == 1 && gameHasPassed==false) {
//case - user got the name and there is only one left with no passes
document.getElementById('gameGotItButton').disabled = false;
document.getElementById('gamePassButton').disabled = true; 
document.getElementById('gameShowNumberLeft').innerHTML = "Last name!";
document.getElementById('gameShowNamePassed').innerHTML = "-"
document.getElementById('gameShowName').innerHTML = bagNames[0];
nameArrayCount = 0;
hideGotPassButton();  
} else {
//case - user hasn't passed and there is at least one name left
gameUpdateNumberLeft();
currentBagName = bagNames[nameArrayCount]
document.getElementById('gameShowName').innerHTML = currentBagName;
};
};  


function gamePassButton () { 
document.getElementById('gameShowNamePassed').innerHTML = bagNames[0]
console.log("Name passed: "+bagNames[0])
gameHasPassed = true;
nameArrayCount = 1;
currentBagName = bagNames[1];  
document.getElementById('gameShowName').innerHTML = currentBagName
disablePassButton();
showGotPassButton();
};


function gameGotPassButton () {
nameArrayCount = 0
gameRemoveName();
gameHasPassed = false;
hideGotPassButton();
document.getElementById('gameShowNamePassed').innerHTML = "-"
if(bagNames.length == 0){
//case - passed name was the last name
noNamesLeft(); 
} else {
//case - user got the passed name and there is at least one other new name
if (bagNames.length > 1){
  enablePassButton();
}
gameUpdateNumberLeft();
currentBagName = bagNames[0]  
document.getElementById('gameShowName').innerHTML = currentBagName;  
};
};

function disablePassButton() {
 document.getElementById('gamePassButton').disabled = true;
};
  
function enablePassButton(){
 document.getElementById('gamePassButton').disabled = false;
};

function disableGotItButton(){
document.getElementById('gameGotItButton').disabled = true;
};

function enableGotItButton(){
document.getElementById('gameGotItButton').disabled = false;
};

function showGotPassButton(){
document.getElementById('gameGotPassButton').style.display = "block";
};

function hideGotPassButton(){
document.getElementById('gameGotPassButton').style.display = "none";
};

function gameUpdateNumberLeft() {
countNamesLeft = bagNames.length
console.log(bagNames.length + " names left");
document.getElementById('gameShowNumberLeft').innerHTML = countNamesLeft - 1 + " other names left";
};

//run this function when no names are left in the bag
function noNamesLeft(){
document.getElementById('gameGotItButton').disabled = true;
document.getElementById('gamePassButton').disabled = true; 
document.getElementById('gameShowNumberLeft').innerHTML = "No names left!";
document.getElementById('gameShowName').innerHTML = "-";
};


function gameRemoveName (){
var namesRemoved = (bagNames.splice(nameArrayCount, 1 )).toString();
namesGotThisRound.push(namesRemoved);  
var nextRound = currentRound + 1
var updateNameRound = []
// remove name from round bag

db.collection("names").where("sessionName","==",sessionPicked).where("round","==",currentRound).where("bagName","==",namesRemoved).get().then(function(querySnapshot) {
  querySnapshot.forEach(function(doc) {
    updateNameRound.push(doc.id); });
   console.log(updateNameRound[0]);
 
db.collection("names").doc(updateNameRound[0]).update({round: nextRound}).then(function() {console.log(namesRemoved+updateNameRound[0]+" round updated to "+nextRound);
}).catch(function(error) {console.error("Error updating name round: ", error);});
  
});
  
db.collection("sessions").doc(sessionPicked).update({lastNameGuessed: namesRemoved}).then(function() {console.log("Last name guessed updated to: "+namesRemoved);
}).catch(function(error) {console.error("Error updating name round: ", error);});  

 
//add to score of current team in current round  
       if (currentRound == 1){ 
db.collection('teams').doc(teamPicked).update({ r1Score: increaseBy }).then(function() {console.log("r1Score increased");
}).catch(function(error) {console.error("Error updating r1Score: ", error);});
} else if (currentRound == 2) {
db.collection('teams').doc(teamPicked).update({ r2Score: increaseBy }).then(function() {console.log("r2Score increased");
}).catch(function(error) {console.error("Error updating r2Score: ", error);});  
} else {
db.collection('teams').doc(teamPicked).update({ r3Score: increaseBy }).then(function() {console.log("r3Score increased");
}).catch(function(error) {console.error("Error updating r3Score: ", error);});  
};  

db.collection('sessions').doc(sessionPicked).update({ currentScore: increaseBy }).then(function() {console.log("session current score increased");
}).catch(function(error) {console.error("Error updating currentScore: ", error);});
  
db.collection('teams').doc(teamPicked).update({ totalScore: increaseBy }).then(function() {console.log("totalScore increased");
}).catch(function(error) {console.error("Error updating totalScore: ", error);});  
  
db.collection('players').doc(playerPicked).update({ score: increaseBy }).then(function() {console.log("player score increased");
}).catch(function(error) {console.error("Error updating player Score: ", error);});    
  
console.log("Round names guessed: "+namesGotThisRound);
console.log("Name guessed: "+namesRemoved); 
};

var nextWord = (function() {
   return function() {
   return bagNames[++count % bagNames.length];
  }
}());

function endRound(){
  //update last round score
  $('li').filter(function(){return $.trim($(this).html()) == '';}).show()
  $('li').filter(function(){return $.trim($(this).html()) == 'undefined';}).show()
  roundScore = namesGotThisRound.length;
    console.log(roundScore);
    db.collection('teams').doc(teamPicked).update({ lastRoundScore: roundScore }).then(function() {console.log("lastRoundScore updated to "+roundScore);
    }).catch(function(error) {console.error("Error updating lastRoundScore: ", error);});  
  
//show end round splash page
  if (roundScore == 0) {
 document.getElementById('endRoundScore').innerHTML = "You got 0 points! I'd blame your team if I were you..." 
}  else if (roundScore == 1)
      document.getElementById('endRoundScore').innerHTML = "You scored 1 point! Tough luck!"
  else {
      document.getElementById('endRoundScore').innerHTML = "You scored "+roundScore+" points, well done!" 
    }
console.log("Names got this round: "+namesGotThisRound)

document.getElementById('nameGuessed1').innerHTML = namesGotThisRound[0];
document.getElementById('nameGuessed2').innerHTML = namesGotThisRound[1];
document.getElementById('nameGuessed3').innerHTML = namesGotThisRound[2];
document.getElementById('nameGuessed4').innerHTML = namesGotThisRound[3];
document.getElementById('nameGuessed5').innerHTML = namesGotThisRound[4];
document.getElementById('nameGuessed6').innerHTML = namesGotThisRound[5];
document.getElementById('nameGuessed7').innerHTML = namesGotThisRound[6];
document.getElementById('nameGuessed8').innerHTML = namesGotThisRound[7];
document.getElementById('nameGuessed9').innerHTML = namesGotThisRound[8];
document.getElementById('nameGuessed10').innerHTML = namesGotThisRound[9];
document.getElementById('nameGuessed11').innerHTML = namesGotThisRound[10];
document.getElementById('nameGuessed12').innerHTML = namesGotThisRound[11];
document.getElementById('nameGuessed13').innerHTML = namesGotThisRound[12];
document.getElementById('nameGuessed14').innerHTML = namesGotThisRound[13];
$('li').filter(function(){return $.trim($(this).html()) == 'undefined';}).hide()
$('li').filter(function(){return $.trim($(this).html()) == '';}).hide()  
  
document.getElementById("roundEnd-splash").style.display = "block" ;
document.getElementById("gameStart").style.display = "none" ;
disableNavBarButtons();
};

function endRoundWithTimeLeft(){
      //what to do here when there aren't any names left but still time left
      //increment session round
      if (currentRound == 3) {
      document.getElementById('endRoundMessage').innerHTML = "Game over!<br><h6>That's it, no names left in this final round<br>Let's tally up the scores!</h6>"
      } else {
      document.getElementById('endRoundMessage').innerHTML = "End of the round!<br><h6> That's it, no names left for this round but it's still your go!<br>let's tally up the scores, then you go again with the time you had left!</h6>"  
      };  
      db.collection('sessions').doc(sessionPicked).update({ turnActive: false, currentRound: increaseBy, roundTime: timeLeftOver  }).then(function() {console.log("round end: Session round increased");
      }).catch(function(error) {console.error("Error updating r1Score: ", error);});

      endRound();  
      
      };


function endRoundWithNamesLeft(){
    //typical end of turn with names left
    //get default and push to roundTime
    document.getElementById('endRoundMessage').innerHTML = "Time's up!"  


  
     db.collection("sessions").doc(sessionPicked).get().then(function(doc) {
        if (doc.exists) { roundTime = doc.data().roundTimeDefault;
                         console.log("Round time: "+roundTime);
                        db.collection('sessions').doc(sessionPicked).update({ turnActive: false, roundTime: roundTime }).then(function() {console.log("round end: Session round increased");
                        }).catch(function(error) {console.error("Error updating roundTime: ", error);});                     
        } else {console.log("No such document!");
         };
      });
  
       var nextPlayer  
       var nextGamePlayer 
       var nextTeam 
    //get current session details -> total # players, current order number
     db.collection("teams").doc(teamPicked).get().then(function(doc) {
    if (doc.exists) { var currentPlayerNumber = doc.data().tpNumber;
                      var totalPlayers = doc.data().teamSize 
                      
                    if (totalPlayers == currentPlayerNumber) {    
                       db.collection('teams').doc(teamPicked).update({ tpNumber: 1 }).then(function() {console.log("Team player back to 1");
                      }).catch(function(error) {console.error("Error updating currentPlayerNumber back to 1: ", error);});  
                      nextPlayer = doc.data().p01
                    } else {
        
                         if (currentPlayerNumber+1 == 2) { nextPlayer = doc.data().p02
                         } else if (currentPlayerNumber+1 == 3) { nextPlayer = doc.data().p03
                         } else if (currentPlayerNumber+1 == 4) { nextPlayer = doc.data().p04
                         } else if (currentPlayerNumber+1 == 5) { nextPlayer = doc.data().p05
                         } else if (currentPlayerNumber+1 == 6) { nextPlayer = doc.data().p06
                         } else if (currentPlayerNumber+1 == 7) { nextPlayer = doc.data().p07
                         } else if (currentPlayerNumber+1 == 8) { nextPlayer = doc.data().p08
                         } else if (currentPlayerNumber+1 == 9) { nextPlayer = doc.data().p09                                   
                         } else if (currentPlayerNumber+1 == 10) { nextPlayer = doc.data().p10          
                         }                                                         
                      db.collection('teams').doc(teamPicked).update({tpNumber: increaseBy }).then(function() {console.log("team player number increased");
                      }).catch(function(error) {console.error("Error updating currentPlayerNumber: ", error);});  
                    }          
                     
                     
                     db.collection('teams').doc(teamPicked).update({ currentPlayer: nextPlayer }).then(function() {
                    
                          
                        if (teamPicked == activeTeamOne) { 
                                   nextTeam = activeTeamTwo
                       } else if (teamPicked == activeTeamTwo && activeTeams.length == 2) { 
                                   nextTeam = activeTeamOne
                        } else if (teamPicked == activeTeamTwo) { 
                                   nextTeam = activeTeamThree
                        } else if (teamPicked == activeTeamThree && activeTeams.length == 3) { 
                                   nextTeam = activeTeamOne
                        } else if (teamPicked == activeTeamThree) { 
                                   nextTeam = activeTeamFour
                        }  else if (teamPicked == activeTeamFour) { 
                              nextTeam = activeTeamOne   
                        }
                   
                    db.collection("teams").doc(nextTeam).get().then(function(doc) {
                       nextGamePlayer = doc.data().currentPlayer 

                        db.collection('sessions').doc(sessionPicked).update({ currentTeam: nextTeam, currentPlayer: nextGamePlayer }).then(function() {console.log("Session player number increased");
                        }).catch(function(error) {console.error("Error updating currentPlayerNumber: ", error)});
                      });
                    })
                    
                       
                    } else {console.log("No such document!");}
       }).catch(function(error) {console.log("Error getting document:", error);});
                    
      endRound();  
    };


function endRoundNext(){
  showScoresScreen()
  enableNavBarButtons();
  document.getElementById("roundEnd-splash" ).style.display = "none"; 
}


//***********************
// Game details buttons
//***********************

function showTeamScreen() {
showSection(teamsScreen, menuTeams)
};

function showScoresScreen() {
  showSection(scoresScreen, menuScores)
  updateScores();
}

function showRoundScreen() {
  showSection(roundScreen, menuRound)
  liveRoundData();
}

// Game details back buttons
function backToGameDetailsScreen() {
  showSection(homeScreen, menuHome)
 };

//*********************
//Live round screen
//*********************

function liveRoundData() {

var unsubscribe =  db.collection("sessions").doc(sessionPicked)
    .onSnapshot(function(doc) {
        console.log("Current score: "+ doc.data().currentScore)
     if (doc.data().turnActive == true){
       //Round active 
       if (doc.data().currentScore == 0) {
          document.getElementById('roundScoreNow').innerHTML = "No points scored yet";     
        } else if (doc.data().currentScore == 1) {
          document.getElementById('roundScoreNow').innerHTML =  doc.data().currentScore+" point this round";     
        } else {
          document.getElementById('roundScoreNow').innerHTML =  doc.data().currentScore+" points this round";     
        }
          document.getElementById('turnStatus').style.display =  'none';      
          document.getElementById('turnInProgress').style.display =  'block';   
          document.getElementById('turnInProgressNameScore').style.display =  'block';  
          document.getElementById('roundPlayer').innerHTML =  doc.data().currentPlayer;     
          document.getElementById('roundTeam').innerHTML =  doc.data().currentTeam;
          document.getElementById('lastNameGuessed').innerHTML = "Guessed: "+doc.data().lastNameGuessed;           
          document.getElementById('roundNextPlayer').innerHTML =  "";     
          document.getElementById('roundNextTeam').innerHTML =  ""; 
     } else {
       // No round active
         document.getElementById('turnStatus').style.display =  'block';      
         document.getElementById('turnInProgress').style.display =  'none';   
         document.getElementById('turnInProgressNameScore').style.display =  'none'; 
         document.getElementById('roundNextPlayer').innerHTML =  "Next player: "+doc.data().currentPlayer;     
         document.getElementById('roundNextTeam').innerHTML =  "Next team: "+doc.data().currentTeam;      
     }
    });
}

//************************
//Scores screen function
//************************

function updateScores1(){
//  Show teams in list order desc
  
  mVP();
  
  db.collection("teams").where("sessionName", "==", sessionPicked).orderBy("totalScore","desc")
    .onSnapshot(function(querySnapshot) {
    var teamScores= []      
    var teams = []
    querySnapshot.forEach(function(doc) {
          var tName = doc.id
          var tScore = doc.data().totalScore
          teams.push(tName)
          teamScores.push(tScore)
        });
    // first place
       document.getElementById("scoreGridTeamOne").innerHTML = teams[0] 
    if(typeof teamScores[0] !== "undefined"){
       document.getElementById("scoreGridTeamOneScore").innerHTML = teamScores[0] ;          
       }
    // second place
       document.getElementById("scoreGridTeamTwo").innerHTML = teams[1] 
    if(typeof teamScores[1] !== "undefined"){
       document.getElementById("scoreGridTeamTwoScore").innerHTML = teamScores[1] ;          
       }
   
    if (teams.length == 3){ 
            // Third place
             document.getElementById("scoreGridTeamThree").innerHTML = teams[2] 
            if(typeof teamScores[2] !== "undefined"){
             document.getElementById("scoreGridTeamThreeScore").innerHTML = teamScores[2] ;          
             }
       document.getElementById("gridThree" ).style.display = "block"; 
        }
    
    if (teams.length == 4){
             // Third place
             document.getElementById("scoreGridTeamThree").innerHTML = teams[2] 
            if(typeof teamScores[2] !== "undefined"){
             document.getElementById("scoreGridTeamThreeScore").innerHTML = teamScores[2] ;          
             }
            // Fourth place
             document.getElementById("scoreGridTeamFour").innerHTML = teams[4] 
             if(typeof teamScores[3] !== "undefined"){
             document.getElementById("scoreGridTeamFourScore").innerHTML = teamScores[1] ;          
             }
      document.getElementById("gridThree" ).style.display = "block";
       document.getElementById("gridFour" ).style.display = "block";
          
    }
  })
}

function updateScores(){
mVP();

//Team One Scores 
db.collection("teams").doc(activeTeamOne).get().then(function(doc) {if (doc.exists) { 
        t1r1Score = doc.data().r1Score; 
        t1r2Score = doc.data().r2Score;
        t1r3Score = doc.data().r3Score;
        t1TotalScore = doc.data().totalScore;   
        if(typeof t1TotalScore !== "undefined"){
              document.getElementById("scoreGridTeamOneScore").innerHTML = t1TotalScore; 
          }
        document.getElementById("scoreGridTeamOne").innerHTML = activeTeamOne 
     } else {console.log("No such document!");}}).catch(function(error) {console.log("Error getting document:", error);}); 

//Team Two Scores 
db.collection("teams").doc(activeTeamTwo).get().then(function(doc) {if (doc.exists) { 
        t2r1Score = doc.data().r1Score; 
        t2r2Score = doc.data().r2Score;
        t2r3Score = doc.data().r3Score;
        t2TotalScore = doc.data().totalScore;
        if(typeof t2TotalScore !== "undefined"){
        document.getElementById("scoreGridTeamTwoScore").innerHTML = t2TotalScore; 
        }
        document.getElementById("scoreGridTeamTwo").innerHTML = activeTeamTwo 
  
        if(activeTeams.length == 2){initializeScoreChart2();}
  
     } else {console.log("No such document!");}}).catch(function(error) {console.log("Error getting document:", error);});  
  
  if (activeTeams.length == 3) {    
      //Team Three Scores 
        db.collection("teams").doc(activeTeamThree).get().then(function(doc) 
              {if (doc.exists) { 
              t3r1Score = doc.data().r1Score; 
              t3r2Score = doc.data().r2Score;
              t3r3Score = doc.data().r3Score;
              t3TotalScore = doc.data().totalScore;
               
              document.getElementById("scoreGridTeamThree").innerHTML = activeTeamThree
              if(typeof t3TotalScore !== "undefined"){
              document.getElementById("scoreGridTeamThreeScore").innerHTML = t3TotalScore;
              }
              document.getElementById("gridThree" ).style.display = "block"; 
              initializeScoreChart3();
             } else {console.log("No such document!");}}).catch(function(error) {console.log("Error getting document:", error);}); 
      document.getElementById("gridThree" ).style.display = "block"; 
  } else if (activeTeams.length == 4) {
      //Team Three Scores 
        db.collection("teams").doc(activeTeamThree).get().then(function(doc) 
              {if (doc.exists) { 
              t3r1Score = doc.data().r1Score; 
              t3r2Score = doc.data().r2Score;
              t3r3Score = doc.data().r3Score;
              t3TotalScore = doc.data().totalScore;
                if(typeof t3TotalScore !== "undefined"){
              document.getElementById("scoreGridTeamThree").innerHTML = activeTeamThree
                }
              document.getElementById("scoreGridTeamThreeScore").innerHTML = t3TotalScore;
              document.getElementById("gridThree" ).style.display = "block"; 
             } else {console.log("No such document!");}}).catch(function(error) {console.log("Error getting document:", error);}); 
            document.getElementById("gridThree" ).style.display = "block"; 
        //Team Four Scores 
            db.collection("teams").doc(activeTeamFour).get().then(function(doc) {if (doc.exists) { 
              t4r1Score = doc.data().r1Score; 
              t4r2Score = doc.data().r2Score;
              t4r3Score = doc.data().r3Score;
              t4TotalScore = doc.data().totalScore;
              document.getElementById("scoreGridTeamFour").innerHTML = activeTeamFour
              if(typeof t4TotalScore !== "undefined"){
              document.getElementById("scoreGridTeamFourScore").innerHTML = t4TotalScore; 
                  }
              document.getElementById("gridFour" ).style.display = "block"; 
              initializeScoreChart4();
             } else {console.log("No such document!");}}).catch(function(error) {console.log("Error getting document:", error);}); 
      document.getElementById("gridFour" ).style.display = "block";
  } //else { initializeScoreChart2();}
  
};

function initializeScoreChart2 () {
  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    title:{text: "", fontFamily: "Segoe UI", fontColor: "Teal",backgroundColor: "grey-100"},
    axisX: {interval: 1,intervalType: "Teams",},
    axisY:{valueFormatString:"#0",gridColor: "d3d3d3",tickColor: "#B6B1A8",interval: 1},
    data: 
    //round 1
    [{ type: "stackedColumn", showInLegend: true, color: "#00796b", name: "Round 1",
        dataPoints: [
        { y: t1r1Score, x: 1, label: activeTeamOne},
        { y: t2r1Score, x: 2, label:activeTeamTwo}
        ]},
      { //round 2
        type: "stackedColumn",showInLegend: true,	name: "Round 2",color: "#26a69a",
        dataPoints: [
        { y: t1r2Score, x: 1, label: activeTeamOne},
        { y: t2r2Score, x: 2, label: activeTeamTwo}
        ]},
      {  //round 3
        type: "stackedColumn", showInLegend: true, name: "Round 3",	color: "#b2dfdb",
        dataPoints: [
        { y: t1r3Score, x: 1, label: activeTeamOne},
        { y: t2r3Score, x: 2, label: activeTeamTwo}
        ]}
    ]});
  chart.render();

  function toolTipContent(e) {
    var str = "";
    var total = 0;
    var str2, str3;
    for (var i = 0; i < e.entries.length; i++){
      var  str1 = "<span style= \"color:"+e.entries[i].dataSeries.color + "\"> "+e.entries[i].dataSeries.name+"</span>: $<strong>"+e.entries[i].dataPoint.y+"</strong>bn<br/>";
      total = e.entries[i].dataPoint.y + total;
      str = str.concat(str1);
    }
    str2 = "<span style = \"color:DodgerBlue;\"><strong>"+(e.entries[0].dataPoint.x).getFullYear()+"</strong></span><br/>";
    total = Math.round(total * 100) / 100;
    str3 = "<span style = \"color:Tomato\">Total:</span><strong> $"+total+"</strong>bn<br/>";
    return (str2.concat(str)).concat(str3);
  }
}

function initializeScoreChart3 () {
  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    title:{text: "", fontFamily: "Segoe UI", fontColor: "Teal",backgroundColor: "grey-100"},
    axisX: {interval: 1,intervalType: "Teams",},
    axisY:{valueFormatString:"#0",gridColor: "d3d3d3",tickColor: "#B6B1A8",interval: 1},
    data: 
    //round 1
    [{ type: "stackedColumn", showInLegend: true, color: "#00796b", name: "Round 1",
        dataPoints: [
        { y: t1r1Score, x: 1, label: activeTeamOne},
        { y: t2r1Score, x: 2, label:activeTeamTwo},
        { y: t3r1Score, x: 3, label:activeTeamThree}
        ]},
      { //round 2
        type: "stackedColumn",showInLegend: true,	name: "Round 2",color: "#26a69a",
        dataPoints: [
        { y: t1r2Score, x: 1, label: activeTeamOne},
        { y: t2r2Score, x: 2, label: activeTeamTwo},
        { y: t3r2Score, x: 3, label: activeTeamThree}
        ]},
      {  //round 3
        type: "stackedColumn", showInLegend: true, name: "Round 3",	color: "#b2dfdb",
        dataPoints: [
        { y: t1r3Score, x: 1, label: activeTeamOne},
        { y: t2r3Score, x: 2, label: activeTeamTwo},
        { y: t3r3Score, x: 3, label: activeTeamThree}
        ]}
    ]});
  
  chart.render();

  function toolTipContent(e) {
    var str = "";
    var total = 0;
    var str2, str3;
    for (var i = 0; i < e.entries.length; i++){
      var  str1 = "<span style= \"color:"+e.entries[i].dataSeries.color + "\"> "+e.entries[i].dataSeries.name+"</span>: $<strong>"+e.entries[i].dataPoint.y+"</strong>bn<br/>";
      total = e.entries[i].dataPoint.y + total;
      str = str.concat(str1);
    }
    str2 = "<span style = \"color:DodgerBlue;\"><strong>"+(e.entries[0].dataPoint.x).getFullYear()+"</strong></span><br/>";
    total = Math.round(total * 100) / 100;
    str3 = "<span style = \"color:Tomato\">Total:</span><strong> $"+total+"</strong>bn<br/>";
    return (str2.concat(str)).concat(str3);
  }
}

function initializeScoreChart4 () {
  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    title:{text: "", fontFamily: "Segoe UI", fontColor: "Teal",backgroundColor: "grey-100"},
    axisX: {interval: 1,intervalType: "Teams",},
    axisY:{valueFormatString:"#0",gridColor: "d3d3d3",tickColor: "#B6B1A8",interval: 1},
    data: 
    //round 1
    [{ type: "stackedColumn", showInLegend: true, color: "#00796b", name: "Round 1",
        dataPoints: [
        { y: t1r1Score, x: 1, label: activeTeamOne},
        { y: t2r1Score, x: 2, label:activeTeamTwo},
        { y: t3r1Score, x: 3, label:activeTeamThree},
        { y: t4r1Score, x: 4, label:activeTeamFour}
        ]},
      { //round 2
        type: "stackedColumn",showInLegend: true,	name: "Round 2",color: "#26a69a",
        dataPoints: [
        { y: t1r2Score, x: 1, label: activeTeamOne},
        { y: t2r2Score, x: 2, label: activeTeamTwo},
        { y: t3r2Score, x: 3, label: activeTeamThree},
        { y: t4r2Score, x: 4, label: activeTeamFour}
        ]},
      {  //round 3
        type: "stackedColumn", showInLegend: true, name: "Round 3",	color: "#b2dfdb",
        dataPoints: [
        { y: t1r3Score, x: 1, label: activeTeamOne},
        { y: t2r3Score, x: 2, label: activeTeamTwo},
        { y: t3r3Score, x: 3, label: activeTeamThree},
        { y: t4r3Score, x: 4, label: activeTeamFour}
        ]}
    ]});
  
  chart.render();

  function toolTipContent(e) {
    var str = "";
    var total = 0;
    var str2, str3;
    for (var i = 0; i < e.entries.length; i++){
      var  str1 = "<span style= \"color:"+e.entries[i].dataSeries.color + "\"> "+e.entries[i].dataSeries.name+"</span>: $<strong>"+e.entries[i].dataPoint.y+"</strong>bn<br/>";
      total = e.entries[i].dataPoint.y + total;
      str = str.concat(str1);
    }
    str2 = "<span style = \"color:DodgerBlue;\"><strong>"+(e.entries[0].dataPoint.x).getFullYear()+"</strong></span><br/>";
    total = Math.round(total * 100) / 100;
    str3 = "<span style = \"color:Tomato\">Total:</span><strong> $"+total+"</strong>bn<br/>";
    return (str2.concat(str)).concat(str3);
  }
}



function disableNavBarButtons() {
menuHome.style.display = "none"
menuStart.style.display = "none"
menuRound.style.display = "none"
menuScores.style.display = "none"  
menuTeams.style.display = "none"  
}

function enableNavBarButtons() {
menuHome.style.display = "block"
menuRound.style.display = "block"
menuScores.style.display = "block"  
menuTeams.style.display = "block"  
}


function gameOverMessage (){
var t1Score
var t2Score
var t3Score
var t4Score
var winnerTeam
var secondTeam
var thirdTeam
var fourthTeam
var scoresObj = {}

/*db.collection("teams").doc(activeTeamOne).get().then(function(doc) {if (doc.exists) { 
   scoresObj.teamOne= doc.data().totalScore;       
     } else {console.log("No such document!");}}).catch(function(error) {console.log("Error getting document:", error);}); 
  
db.collection("teams").doc(activeTeamTwo).get().then(function(doc) {if (doc.exists) { 
    scoresObj.teamTwo = doc.data().totalScore;       
     } else {console.log("No such document!");}}).catch(function(error) {console.log("Error getting document:", error);}); 

if (activeTeams.length > 2) {
db.collection("teams").doc(activeTeamThree).get().then(function(doc) {if (doc.exists) { 
   scoresObj.teamThree = doc.data().totalScore;        
     } else {console.log("No such document!");}}).catch(function(error) {console.log("Error getting document:", error);});
  }
if (activeTeams.length > 3) {
db.collection("teams").doc(activeTeamFour).get().then(function(doc) {if (doc.exists) { 
   scoresObj.teamFour = doc.data().totalScore;    
     } else {console.log("No such document!");}}).catch(function(error) {console.log("Error getting document:", error);}); 
  }  
  if (winnerTeam == teamPicked){
  document.getElementById('winners').innerHTML = "You won! Congratulations!"
  } else if (secondTeam == teamPicked)  {
   document.getElementById('winners').innerHTML = winnerTeam+" won! Send them your congratulations.<br>You came 2nd, so close!"
  } else if (thirdTeam == teamPicked)  {
   document.getElementById('winners').innerHTML = winnerTeam+" won! Send them your congratulations.<br>You came 3rd, podium finish!"
  } else {
   document.getElementById('winners').innerHTML = winnerTeam+" won! Send them your congratulations.<br>Better luck next time"
  }
  */  
}
    var playerScores= []
    var playerScore
    var orderedPlayerNames = []
    var playerName
    
        
function mVP(){

  db.collection("players").where("sessionName", "==", sessionPicked).orderBy("score","desc")
    .onSnapshot(function(querySnapshot) {
    playerScores= []      
    orderedPlayerNames = []
    querySnapshot.forEach(function(doc) {
          playerName = doc.id
          playerScore = doc.data().score
          orderedPlayerNames.push(playerName)
          playerScores.push(playerScore)
        });
  
    if (playerScores[0]>playerScores[1]){
      document.getElementById('mVP').innerHTML = orderedPlayerNames[0]
      document.getElementById('mVP').innerHTML = orderedPlayerNames[0]
      document.getElementById('mVPScore').innerHTML = playerScores[0]
      console.log("MVP: "+orderedPlayerNames[0]+ " "+playerScores[0]) 
      document.getElementById('mVPTag').style.display = "block"
    }
  })
}

function endGame(){
    
  db.collection("sessions").doc(sessionPicked).update({active: false}).then(function() {
    console.log("Session deactivated");
    alert("Session Ended")
    bmLogOut();
}).catch(function(error) {console.error("Error deactivating session: ", error);});  

}


