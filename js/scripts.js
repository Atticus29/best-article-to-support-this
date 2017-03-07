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

//newClaim. must know userID, store a string as a new claim. Dynamically interact with HTML.
//frontEnd: upon click function, store userID.
// function  NewClaim(userID, newclaim){
//   this.userID = userID;
//   this.newClaim = newClaim;

function User(userName, password){
  this.userName = userName;
  this.password = password;
}

validatedUsers = [user1 = new User("Jahan", "Jahan123"), user2 = new User("Chance", "Chance123"), user3 = new User("Oliver", "Oliver123"), user4 = new User("Mark", "Mark123")];

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

// Front End
$(function(){
  $("#newClaimButton").click(function(){
    event.preventDefault();
    //instead prompt, place ansewrs in initially hidden form
    $("#newClaimForm").show();
    var newClaimSender = $("input#newClaimSender").val();
    var newClaim = $("input#newClaim").val();
    // var newClaimer = prompt("What is your username?")
    // var newClaim =  prompt("Please enter a claim")
    // if (newClaim != null && newClaimer!=null)
    //   $("#newClaimArea").append("<h4>" + newClaim + "</h4>");
    var createClaim = new Claim (newClaimer, newClaim);
  });

  $("#newClaimSubmit").click(function(){
    event.preventDefault();
    var newClaimSender = $("input#newClaimSender").val();
    var newClaim = $("input#newClaim").val();
    var createClaim = new Claim (newClaimer, newClaim);
  });



$("#loginForm").submit(function(){
  event.preventDefault();
  console.log("submit happened");
  var userName = $("#userName").val();
  var userPassword = $("#userPassword").val();
  if(validateLogin(userName, userPassword)){
    console.log("Got in");
    $("#signout-form").show();
    $("#loginForm").hide();
    // $("#row1").show();
  }
});


$("#registerBtn").click(function(){
  console.log("Register happened");
  var userName = $("#userName").val();
  var userPassword = $("#userPassword").val();
  // check whether the userName already exists. If it does, make registration unsuccessful and alert the user
  if(isNewUserName(userName)){
    var newUser = new User(userName, userPassword);
    validatedUsers.push(newUser);
  } else{
    // console.log("Was not a new user");
    alert("Username already exists. Please try another username. If your password was valid, we'll log you in anyway.")
  }

});
// $(".dropdown-toggle").dropdown();
});


// test();
//claim1.pro.push(source1)
