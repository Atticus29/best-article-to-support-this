// Back End

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


}

// Front End
$(function(){

});



Claim1.pro.push(source1)
