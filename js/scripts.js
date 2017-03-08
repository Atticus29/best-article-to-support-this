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

function Source(citationTitle, citationLink, sourcer){
  this.upVote = [];
  this.downVote = [];
  this.upCount = this.upVote.length;
  this.downCount = this.downVote.length;
  this.citationTitle = citationTitle;
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
    // console.log("Array of claims is empty");
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
    // console.log("Array of sources is empty");
    return (new Source("There are currently no sources supporting this claim","http://www.google.com" ,"Mark"));
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

function getIndexInArrayOfClaims(claimObj, arrayOfClaimObjs){
  for (var i = 0; i<arrayOfClaimObjs.length; i++){
    if(claimObj.userClaim === arrayOfClaimObjs[i].userClaim){
      return i;
    }
  }
  return -1;
  // var index = claimArray.findIndex(x => x.userClaim==claimObj.userClaim);
  // console.log(index);
  // return index;
}

function displayAllClaims(){
  $("#claim-space").empty();
  for (var i = 0; i<claimArray.length; i++){
    generateHTMLforClaim(claimArray[i]);
  }
}

function getIndexOfClaimThisClickOccurredIn (jQueryObj){
  var claimID = jQueryObj.parents(".claim").attr("id");
  var regExID = /claim(\d+)/;
  var claimIndex = claimID.replace(regExID, '$1');
  return claimIndex;
}

function testGetIndexInArrayOfClaims(){
  var claim1 = new Claim("Mark", "Water is weird");
  claim1.upVoteArray.push("Jahan");
  var claim2 = new Claim("Chance", "Water is delicious");
  claim2.upVoteArray.push("Jahan");
  claim2.upVoteArray.push("Oliver");
  var claim3 = new Claim("Oliver", "Water is suspicious");
  claim3.upVoteArray.push("Jahan");
  claim3.upVoteArray.push("Oliver");
  claim3.upVoteArray.push("Chance");
  var claim4 = new Claim("Jahan", "Water is a drug");
  claim4.upVoteArray.push("Jahan");
  claim4.upVoteArray.push("Oliver");
  claim4.upVoteArray.push("Mark");
  claimArray = [claim1, claim2, claim3, claim4];
  var idx = getIndexInArrayOfClaims(claim4, claimArray);
  // console.log(idx);
}

function generateHTMLforClaim(claimObj){
  $("#claim-space").prepend(
    "<div class='claim' id='claim" + getIndexInArrayOfClaims(claimObj, claimArray) + "'>" +
    "<div class='row' id='row1'>" +
    "<div class='col-md-offset-1 col-md-1'>" +
    "<div class='row' id='topicVoteUp'>" +
    "<h4>" +
    "Vote up" +
    "</h4>" +
    "</div>" +
    "<div class='topicVoteUpCount'>" +
    "</div>" +
    "<div class='row' id='topicVoteDown'>" +
    "<h4>" +
    "Vote Down" +
    "</h4>" +
    "</div>" +
    "<div class='topicVoteDownCount'>" +
    "</div>" +
    "</div>" +
    "<div class='col-md-offset-1 col-md-6' id='topic'>" +
    "<h2 id='question'><span class='claim-lead'>Claim:</span> " + claimObj.userClaim + "</h2>" +
    "<br><h4 class='original-asker'>Originally asked by: " + claimObj.claimer + "</h4>" +
    "</div>" +
    "</div>" +
    "<div class='row' id='row2'>" +
    "<div class='col-md-offset-3 col-md-3' id='topProSource'>" +
    "<div class='row'>" +
    "<div class='well'>" +
    "<div class='row' id='proVoteUp'>" +
    "<h4>Vote Pro Up</h4>" +
    "</div>" +
    "<div class='proVoteUpCount'>" +
    "</div>" +
    "<div class='row' id='proVoteDown'>" +
    "<h4>Vote Pro Down</h4>" +
    "</div>" +
    "<div class='proVoteDownCount'>" +
    "</div>" +
    "</div>" +
    "<h2>Evidence in favor</h2>" +
    "</div>" +
    "<button class='btn btn-success dropdown-toggle' type='button' id='pro-source-btn' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>Add Source</button>" +
    "<div class='dropdown-menu' aria-labelledby='pro-source-btn' id='dropDownProSource'>" +
    "<form id='dropDownProSourceForm' novalidate>" +
    "<div class='form-group'>" +
    "<label for='sourceTitle'>Source Title</label>" +
    "<input class='form-control' type='text' value='' id='sourceTitle-pro' required>" +
    "</div>" +
    "<div class='form-group'>" +
    "<label for='sourceURL' class='newClaim'>Source URL</label>" +
    "<input class='form-control' type='url' value='' id='sourceURL-pro' required>" +
    "</div>" +
    "<div class='text-center'>" +
    "<button id='submitNewProSource' type='submit' name='button' class='btn btn-info'>Submit Source</button>" +
    "</div>" +
    "</form>" +
    "</div>" +
    "<a href='" + getSourceWithMostUpvotes(claimObj, true).citationLink +"' target='_blank'>" + getSourceWithMostUpvotes(claimObj, true).citationTitle + "</a>" +
    "</div>" +
    "<div class='col-md-3' id='topProSource'>" +
    "<div class='row'>" +
    "<div class='well'>" +
    "<div class='row' id='proVoteUp'>" +
    "<h4>Vote Pro Up</h4>" +
    "</div>" +
    "<div class='proVoteUpCount'>" +
    "</div>" +
    "<div class='row' id='proVoteDown'>" +
    "<h4>Vote Pro Down</h4>" +
    "</div>" +
    "<div class='proVoteDownCount'>" +
    "</div>" +
    "</div>" +
    "<h2>Evidence in opposition</h2>" +
    "</div>" +
    "<button class='btn btn-success dropdown-toggle' type='button' id='con-source-btn' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>Add Source</button>" +
    "<div class='dropdown-menu' aria-labelledby='con-source-btn' id='dropDownConSource'>" +
    "<form id='dropDownConSourceForm' novalidate>" +
    "<div class='form-group'>" +
    "<label for='sourceTitle'>Source Title</label>" +
    "<input class='form-control' type='text' value='' id='sourceTitle-con' required>" +
    "</div>" +
    "<div class='form-group'>" +
    "<label for='sourceURL' class='newClaim'>Source URL</label>" +
    "<input class='form-control' type='url' value='' id='sourceURL-con' required>" +
    "</div>" +
    // "<div class='text-center'>" +
    "<button id='submitNewConSource' type='submit' name='button' class='btn btn-info'>Submit Source</button>" +
    "</div>" +
    "</form>" +
    "<a href='" + getSourceWithMostUpvotes(claimObj, false).citationLink +"' target='_blank'>" + getSourceWithMostUpvotes(claimObj, false).citationTitle + "</a>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "<div class='row' id='comment-row'>" +
    "<div class='col-md-offset-3 col-md-6' id='commentColumn'>" +
    "<div id='commentsShow'>" +
    "<h3 id='commentsExpandLink'>Comments</h3>" +
    "</div>" +
    "<div id='commentSection'>" +
    "<div id='userComment'>" +
    "<div id='userInputtedCommentList'>" +
    // "<!-- //user comments here -->" +
    "</div>" +
    "<hr>" +
    "<form id='commentForm' action='/html/tags/html_form_tag_action.cfm'  method='post'>" +
    "<div>" +
    "<textarea name='comments' id='Comment'>" +
    "</textarea>" +
    "</div>" +
    "<button id='commentSubmit' type='submit' value='Submit'>Submit comment</button>" +
    "</form>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "<div>" +
    "</div>");
  }
// >>>>>>> origin

  function refresh(){
    var topClaim = getClaimWithMostUpvotes(claimArray);
    console.log("Top ranking claim is: ", topClaim.userClaim);
    $("#claim-space").empty();
    generateHTMLforClaim(topClaim);
  }


  // Front End
  $(function(){
    claimArray = [];
    userName = $("#userName").val();
    userPassword = $("#userPassword").val();
    testGetIndexInArrayOfClaims();
    refresh();
    console.log(claimArray);
    // testGetClaimWithMostUpvotes();
    // testGetSourceWithMostUpvotes();
    // $("#dropDownForm").submit(function(){
    //   event.preventDefault();
    //   $("#newClaimForm").show();
    // });
    $("#dropDownForm").submit(function(){
      event.preventDefault();
      if(!isMissingUsernameOrPassword(userName, userPassword)){
        var newClaimSender = userName;
        var claimText = $("input#claimQuestion").val();
        var optionalDigitalOriginOfClaim = $("input#claimLink").val();
        newestClaim = new Claim (newClaimSender, claimText);
        claimArray.push(newestClaim);
        console.log("got here");
        $("#claim-space").empty();
        generateHTMLforClaim(newestClaim);
      } else{
        console.log("You forgot to log in");
      }
    });

    $("#claim-space").first().on("submit", "#dropDownConSourceForm", function(){
      event.preventDefault();
      if(!isMissingUsernameOrPassword(userName, userPassword)){
        var sourceTitleInput = $("#sourceTitle-con").val();
        var sourceURLinput = $("#sourceURL-con").val() ;
        var newSource = new Source(sourceTitleInput, sourceURLinput, userName);
        var claimThisRefersTo = claimArray[getIndexOfClaimThisClickOccurredIn($(this))];
        console.log(claimThisRefersTo);
        if(claimThisRefersTo){
          claimThisRefersTo.con.sources.push(newSource);
        }
        // $("#claim-space").empty();
        // generateHTMLforClaim(newestClaim);
        refresh();
      } else{
        console.log("You forgot to log in");
      }
    });

    $("#claim-space").first().on("submit", "#dropDownProSourceForm", function(){
      event.preventDefault();
      if(!isMissingUsernameOrPassword(userName, userPassword)){
        console.log("got into the submission event");
        var sourceTitleInput = $("#sourceTitle-pro").val();
        var sourceURLinput = $("#sourceURL-pro").val() ;
        var newSource = new Source(sourceTitleInput, sourceURLinput, userName);
        var claimThisRefersTo = claimArray[getIndexOfClaimThisClickOccurredIn($(this))];
        if(claimThisRefersTo){
          claimThisRefersTo.pro.sources.push(newSource);
        }
        // $("#claim-space").empty();
        // generateHTMLforClaim(newestClaim);
        refresh();
      } else{
        console.log("You forgot to log in");
      }
    });


    $("#loginForm").submit(function(){
      event.preventDefault();
      // console.log("submit happened");
      userName = $("#userName").val();
      userPassword = $("#userPassword").val();
      if(validateLogin(userName, userPassword) && !isMissingUsernameOrPassword(userName, userPassword)){
        // console.log("Got in");
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
    });


    $("#registerBtn").click(function(){
      // Do not add an event.preventDefault(); here
      // console.log("Register happened");
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

    //for showing comment section
    $("#commentsShow").click(function(){
      event.preventDefault();
      $("#commentSection").slideToggle();
    });

    $(".down").click(function(){
      var idOfDownVote = $(this).attr("id");
      console.log(thing);
      var newidOfDownVote = new CountVotes(/*userName,*/ thing);
      //push to this.variables.
    });

    $(".up").click(function(){
      var thing = $(this).attr("id");
      console.log(thing);
    });

    //claimComments
    $("#commentForm").submit(function(){
      event.preventDefault();
      var userInputtedComment = $("#commentForm textarea");
      if (validateLogin(userName, userPassword) && !isMissingUsernameOrPassword(userName, userPassword)) {
        if (userInputtedComment.val() === '') {
          alert("comment input field is empty")
        } else{ $("#userInputtedCommentList").append("<p><span class= 'userSaid'>" + userName + " commented: </span>" + $("#commentForm textarea").val() + "</p>");
        $('#commentForm textarea').val('');}
      } else {
        alert("You must be logged in to comment")
      }
    });
    //voting buttons
    //topic/claim votes
    var startTopicVote = 0;
    $("#topicVoteUp").click(function(){
      if (validateLogin(userName, userPassword) && !isMissingUsernameOrPassword(userName, userPassword)){
        var voteUp = startTopicVote +=1;
        $('.topicVoteUpCount').text(voteUp);
      } else {
        alert("Please sign in to vote")
      }

    });
    $("#topicVoteDown").click(function(){

      if (validateLogin(userName, userPassword) && !isMissingUsernameOrPassword(userName, userPassword)){
        var voteDown = startTopicVote -=1;
        $('.topicVoteUpCount').text(voteDown);
      } else {
        alert("Please sign in to vote")
      }
    });
    //end topic/claim votes

    //con source votes
    var startConVote = 0;
    $("#conVoteUp").click(function(){
      if (validateLogin(userName, userPassword) && !isMissingUsernameOrPassword(userName, userPassword)){
        var voteUp = startConVote +=1;
        $('.conVoteUpCount').text(voteUp);
      } else {
        alert("Please sign in to vote")
      }

    });
    $("#conVoteDown").click(function(){

      if (validateLogin(userName, userPassword) && !isMissingUsernameOrPassword(userName, userPassword)){
        var voteDown = startConVote -=1;
        $('.conVoteUpCount').text(voteDown);
      } else {
        alert("Please sign in to vote")
      }
    });
    // pro source votes
    var startProVote = 0;
    $("#proVoteUp").click(function(){
      if (validateLogin(userName, userPassword) && !isMissingUsernameOrPassword(userName, userPassword)){
        var voteUp = startProVote +=1;
        $('.proVoteUpCount').text(voteUp);
      } else {
        alert("Please sign in to vote")
      }

    });
    $("#proVoteDown").click(function(){
      if (validateLogin(userName, userPassword) && !isMissingUsernameOrPassword(userName, userPassword)){
        var voteDown = startProVote -=1;
        $('.proVoteUpCount').text(voteDown);
      } else {
        alert("Please sign in to vote")
      }
    });

    $("#all-claims-btn").click(function(){
      displayAllClaims();
    });

  });
