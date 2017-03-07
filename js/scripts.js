// Back End
function Support(){
  this.sources = [];
  this.supportcomments = [];
}

function Reply(replier, userReply){
  this.replier = replier;
  this.userReply= userReply;
}

function Claim (claimer, userClaim){
  this.claimer = claimer;
  this.userClaim = userClaim;
  this.upVoteArray = [];
  this.downVoteArray = [];
  this.upCount = 0;
  this.downCount = 0;
  this.pro = new Support();
  this.con = new Support();
  this.claimComments = [];
}

Claim.prototype.updateVotes = function() {
  this.upCount = this.upVoteArray.length;
  this.downCount = this.downVoteArray.length;
}

function Comment(commenter, userComment){
  this.commenter = commenter;
  this.userComment = userComment;
  this.replies = [];
}

function test(){
  var userID = "Jahan";
  var claim1 = new Claim(userID, "The ninth floor bathroom is better than the eighth floor bathroom");
  console.log(claim1);
  claim1.pro.sources.push(new Source("http://www.google.com",userID))
  var user2 = "Oliver";
  var obnoxiousComment = new Comment (user2, "You suck, Jahan!");
  var user3 = "Chance";
  var irrelevantReply = new Reply (user3, "check out my new rap album!");
  obnoxiousComment.replies.push(irrelevantReply);
  claim1.claimComments.push(obnoxiousComment);
  var user4 = "Mark";
  claim1.upVoteArray.push(user4);
  console.log(claim1.upCount);
  console.log(claim1.downCount);
  console.log(claim1);
  claim1.updateVotes();
  console.log(claim1);
}

function Source(citationLink, sourcer){
  this.upVote = [];
  this.downVote = [];
  this.upCount = this.upVote.length;
  this.downCount = this.downVote.length;
  this.citationLink = citationLink;
  this.sourcer = sourcer;
}

Source.prototype.updateVotes = function() {
  this.upCount = this.upVote.length;
  this.downCount = this.downVote.length;
}


//claimText. must know userID, store a string as a new claim. Dynamically interact with HTML.
//frontEnd: upon click function, store userID.
// function  NewClaim(userID, newclaim){
//   this.userID = userID;
//   this.claimText = claimText;

function User(userName, password){
  this.userName = userName;
  this.password = password;
}

validatedUsers = [user1 = new User("Jahan", "Jahan123"), user2 = new User("Chance", "Chance123"), user3 = new User("Oliver", "Oliver123"), user4 = new User("Mark", "Mark123")];

function isMissingUsernameOrPassword(userName, password){
  if(!userName || !password){
    alert("Please enter a valid Username and password");
    return true;
  } else{
    return false;
  }
}

function validateLogin (userName, password){
  var truthCounter = 0;
  validatedUsers.forEach(function(validatedUser){
    if(validatedUser.userName === userName && validatedUser.password === password){
      truthCounter ++;
    }
  });
  return truthCounter;
}

function isNewUserName (userName){
  var returnVal = true;
  validatedUsers.forEach(function(validatedUser){
    if(validatedUser.userName === userName){

      returnVal = false;
    }
  });
  return returnVal;
}

function getClaimWithMostUpvotes(arrayOfClaims){
  // if there's a tie, will return the latest one in the array
  if(arrayOfClaims.length >0){
    var currentMaxUpvoteCount = 0;
    var currentMostPopularClaim = arrayOfClaims[0];
    for (var i = 0; i<arrayOfClaims.length; i++){
      arrayOfClaims[i].updateVotes();
      if(arrayOfClaims[i].upCount >=  currentMaxUpvoteCount){
        currentMaxUpvoteCount = arrayOfClaims[i].upCount;
        currentMostPopularClaim = arrayOfClaims[i];
      }
    }
    return currentMostPopularClaim;
  } else{
    console.log("Array of claims is empty");
    return undefined;
  }
}

function testGetClaimWithMostUpvotes(){
  var claim1 = new Claim("Mark", "Water is weird");
  claim1.upVoteArray.push("Jahan");
  var claim2 = new Claim("Mark", "Water is delicious");
  claim2.upVoteArray.push("Jahan");
  claim2.upVoteArray.push("Oliver");
  var claim3 = new Claim("Mark", "Water is delicious");
  claim3.upVoteArray.push("Jahan");
  claim3.upVoteArray.push("Oliver");
  claim3.upVoteArray.push("Chance");
  var claim4 = new Claim("Mark", "Water is a drug");
  claim4.upVoteArray.push("Jahan");
  claim4.upVoteArray.push("Oliver");
  claim4.upVoteArray.push("Mark");
  var testClaims = [claim1, claim2, claim3, claim4];
  console.log(testClaims);
  var mostPopularClaim = getClaimWithMostUpvotes(testClaims);
  console.log(mostPopularClaim);
}

function getSourceWithMostUpvotes(claim, isPro){
  if(isPro){
    var arrayOfSources = claim.pro.sources;
  } else{
    var arrayOfSources = claim.con.sources;
  }
  if(arrayOfSources.length>0){
    var currentMaxUpvoteCount = 0;
    var currentMostPopularSource = arrayOfSources[0];
    for (var i = 0; i<arrayOfSources.length; i++){
      arrayOfSources[i].updateVotes();
      if(arrayOfSources[i].upCount >=  currentMaxUpvoteCount){
        currentMaxUpvoteCount = arrayOfSources[i].upCount;
        currentMostPopularSource = arrayOfSources[i];
      }
    }
    return currentMostPopularSource;
  } else{
    console.log("Array of sources is empty");
    return undefined;
  }
}

function testGetSourceWithMostUpvotes(){
  var claim1 = new Claim("Mark", "Water is weird");
  claim1.upVoteArray.push("Jahan");
  var source1 = new Source("google", "Jahan");
  console.log(source1);
  source1.upVote.push("Mark");
  var source2 = new Source("your mom", "Jahan");
  console.log(source2);
  source2.upVote.push("Mark");
  source2.upVote.push("Chance");
  var source3 = new Source("I asked an old man", "Jahan");
  source3.upVote.push("Mark");
  source3.upVote.push("Chance");
  claim1.con.sources.push(source1);
  claim1.con.sources.push(source3);
  claim1.con.sources.push(source2);
  console.log(claim1);
  var mostPopularSource = getSourceWithMostUpvotes(claim1, false);
  console.log(mostPopularSource);
}

function generateHTMLforSource (citationLink, sourcer){

}


// Front End
$(function(){
  claimArray = [];
  // testGetClaimWithMostUpvotes();
  testGetSourceWithMostUpvotes();
  $("#newClaimButton").click(function(){
    event.preventDefault();
    $("#newClaimForm").show();
    var newClaimSender = $("input#newClaimSender").val();
    var claimText = $("input#claimText").val();
    var newestClaim = new Claim (newClaimer, claimText);
    claimArray.push(newestClaim);
  });

  $("#newClaimSubmit").click(function(){
    event.preventDefault();
    var newClaimSender = $("input#newClaimSender").val();
    var claimText = $("input#claimText").val();
    var newestClaim = new Claim (newClaimer, claimText);
  });


$("#loginForm").submit(function(){
  event.preventDefault();
  console.log("submit happened");
  userName = $("#userName").val();
  userPassword = $("#userPassword").val();
  if(validateLogin(userName, userPassword) && !isMissingUsernameOrPassword(userName, userPassword)){
    console.log("Got in");
    $("#signout-form").show();
    $("#loginForm").hide();
    $("#welcome-user-name").text(userName);
    $("#existing-user-welcome").show();
  }
});

$("#loginBtn").click(function(){
  userName = $("#userName").val();
  userPassword = $("#userPassword").val();
  var dummyVariable = isMissingUsernameOrPassword(userName, userPassword);
  console.log(dummyVariable);
});

$("#registerBtn").click(function(){
  // Do not add an event.preventDefault(); here
  console.log("Register happened");
  userName = $("#userName").val();
  userPassword = $("#userPassword").val();
  if(!isMissingUsernameOrPassword(userName, userPassword)){
    // check whether the userName already exists. If it does, make registration unsuccessful and alert the user
    if(isNewUserName(userName)){
      var newUser = new User(userName, userPassword);
      validatedUsers.push(newUser);
      console.log("added to validated users");
    } else{
      alert("Username already exists. Please try another username. If your password was valid, we'll log you in anyway.")
    }
  }
});

$("#signout-btn").click(function(){
  event.preventDefault();
  $("#signout-form").hide();
  $("#loginForm").show();
  $("#existing-user-welcome").hide();
  userName = undefined;
  userPassword = undefined;
  $("#userName").val("");
  $("#userPassword").val("");

  });


  //claimComments
  $("#commentForm").submit(function(){
    event.preventDefault();
      if (userName.length > 1) {
        $("#commentSection").append("<p>" + userName + " commented" + $("#comments").val() + "</p>");
      } else {
        alert("You must be logged in to comment")
      }
  });
});



// test();
//claim1.pro.push(source1)
