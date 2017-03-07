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
  this. claimer = claimer;
  this. userClaim = userClaim;
  this.upVoteArray = [];
  this.downVoteArray = [];
  this.upCount = this.upVoteArray.length;
  this.downCount = this.downVoteArray.length;
  this.pro = new Support();
  this.con = new Support();
  this.claimComments = [];
}

function Comment(commenter, userComment){
  this.commenter = commenter;
  this.userComment = userComment;
  this.replies = [];
}

function test(){
  var userID = "Jahan";
  var Claim1 = new Claim(userID, "The ninth floor bathroom is better than the eighth floor bathroom");
  console.log(Claim1);
  Claim1.pro.source.push(new Source("http://www.google.com",userID))
  var user2 = "Oliver";
  var obnoxiousComment = new Comment (user2, "You suck, Jahan!");
  var user3 = "Chance";
  var irrelevantReply = new Reply (user3, "check out my new rap album!");
  obnoxiousComment.replies.push(irrelevantReply);
  Claim1.claimComments.push(obnoxiousComment);
  var user4 = "Mark";
  Claim1.upVoteArray.push(user4);
  console.log(Claim1.upCount);
  console.log(Claim1.downCount);
  console.log(Claim1);
  //test newClaim
  var newClaim = new NewClaim("Jahan", "Tap water is safer than bottled water");
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

}

// Front End
$(function(){
  $("#newClaimButton").click(function(){
    //instead prompt, place ansewrs in initially hidden form
    $("#newClaimForm").show();
    var newClaimSender = $("input#newClaimSender").val();
    var newClaim = $("input#newClaim").val();


    // var newClaimer = prompt("What is your username?")
    // var newClaim =  prompt("Please enter a claim")
    // if (newClaim != null && newClaimer!=null)
    //   $("#newClaimArea").append("<h4>" + newClaim + "</h4>");
      var createClaim = new Claim (newClaimer, newClaim);
    }

  $("#newClaimSubmit").click(function(){
    var newClaimSender = $("input#newClaimSender").val();
    var newClaim = $("input#newClaim").val();
    var createClaim = new Claim (newClaimer, newClaim);
  })


  })
});



Claim1.pro.push(source1)
