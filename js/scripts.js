// Back End
function Support(){
  this.proSupport = [];
  this.conSupport = [];
  this.source = [];
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
  claim1.pro.source.push(new Source("http://www.google.com",userID))
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

function Source(link, sourcer){
  this.upVote = [];
  this.downVote = [];
  this.link = [];
  this.sourcer = sourcer;
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
    // console.log(validatedUser.userName);
    if(validatedUser.userName === userName){
      // console.log("this truth statement happened");
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


// Front End
$(function(){
  claimArray = [];
  $("#newClaimButton").click(function(){
    event.preventDefault();
    //instead prompt, place ansewrs in initially hidden form
    $("#newClaimForm").show();
    var newClaimSender = $("input#newClaimSender").val();
    var claimText = $("input#claimText").val();
    // var newClaimer = prompt("What is your username?")
    // var claimText =  prompt("Please enter a claim")
    // if (claimText != null && newClaimer!=null)
    //   $("#newClaimArea").append("<h4>" + claimText + "</h4>");

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


});



// test();
//claim1.pro.push(source1)
