// Back End
function Support(){
  this.sources = [new Source("There are currently no sources supporting this claim","https://www.google.com" ,"Mark")];
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

function User(userName, password){
  this.userName = userName;
  this.password = password;
}

// Generic functions and global variables

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
    console.log("Array of sources is empty");
    // return (new Source("There are currently no sources supporting this claim","http://www.google.com" ,"Mark"));
  }
}

function getIndexOfSourceWithMostUpvotes(claim, isPro){
  var indexTracker = undefined;
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
        indexTracker = i;
      }
    }
    return indexTracker;
  } else{
    // console.log("Array of sources is empty");
    return undefined;
  }
}

function testGetIndexOfSourceWithMostUpvotes(){
  var claimOfInterest = claimArray[3];
  var indexOfInterest = getIndexOfSourceWithMostUpvotes(claimOfInterest, false);
  console.log("indexOfInterest is: " + indexOfInterest);
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
}

function displayAllClaims(){
  $("#claim-space").empty();
  for (var i = 0; i<claimArray.length; i++){
    generateHTMLforClaim(claimArray[i]);
  }
  updateAllVoteCountsAndDisplays();
}

function displayAllSources(claimID, claimObj){
  // pro
  $("#claim" + claimID).find(".pro-source-container").empty();
  if(claimObj.pro.sources.length === 0){
    tmpSource = new Source("There are currently no sources supporting this claim","http://www.google.com" ,"Mark")
    $("#claim" + claimID).find(".pro-source-container").append(generateSourceHTML(tmpSource,true, 0));
  } else{
    for (var i = 0; i<claimObj.pro.sources.length; i++){
      $("#claim" + claimID).find(".pro-source-container").append(generateSourceHTML(claimObj.pro.sources[i], true, i));
    }
  }
  // con
  if(claimObj.con.sources.length === 0){
    tmpSource = new Source("There are currently no sources supporting this claim","http://www.google.com" ,"Mark")
    $("#claim" + claimID).find(".con-source-container").append(generateSourceHTML(tmpSource, false, 0));
  } else{
    for (var i = 0; i<claimObj.con.sources.length; i++){
      $("#claim" + claimID).find(".con-source-container").append(generateSourceHTML(claimObj.con.sources[i], false, i));
    }
  }
  updateAllVoteCountsAndDisplays();
}

function getIndexOfClaimThisClickOccurredIn (jQueryObj){
  var claimID = jQueryObj.parents(".claim").attr("id");
  var regExID = /claim(\d+)/;
  var claimIndex = claimID.replace(regExID, '$1');
  return claimIndex;
}

function getIndexOfSupportThisClickOccurredIn (jQueryObj){
  var sourceID = jQueryObj.parents(".capture-me").attr("id");
  console.log("sourceID from function is: " + sourceID);
  var regExID = /source-(\d+)/;
  var sourceIndex = parseInt(sourceID.replace(regExID, '$1'));
  console.log("sourceIndex is: " + sourceIndex);
  // console.log(sourceIndex === NaN);
  if (!sourceIndex){
    console.log("sourceIndex was not a number");
    sourceIndex = 0;
    console.log("Now, it's: " + sourceIndex);
  }
  return sourceIndex;
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
  claim1.upVoteArray.push("Jahan");
  var source1 = new Source("google","http:/www.google.com", "Jahan");
  source1.upVote.push("Mark");
  var source2 = new Source("your mom","http://www.yourmom.com" ,"Jahan");
  source2.upVote.push("Mark");
  source2.upVote.push("Chance");
  var source3 = new Source("I asked an old man","http://www.oldman.com", "Jahan");
  source3.upVote.push("Mark");
  source3.upVote.push("Chance");
  claim4.con.sources.push(source1);
  claim4.con.sources.push(source3);
  claim4.con.sources.push(source2);
  claimArray = [claim1, claim2, claim3, claim4];
  var idx = getIndexInArrayOfClaims(claim4, claimArray);
}


// HTML functions

function generateSourceHTML(source, isPro, indexInSources){
  // var claimObj = claimArray[claimID];
  // pro
  if(isPro){
    return ("<div class=' row capture-me pro-source-component' id='source-" + indexInSources + "'>" +
    "<div class='col-md-6 counter-col'>" +
    generateCounterHTML() +
    "</div>" +
    "<div class='col-md-6 link-col'>" +
    "<a href='" + source.citationLink +"' target='_blank'>" + source.citationTitle +
    "</a>" +
    "</div>" +
    // "<br>" +
    "</div>");
  } else{
    return ("<div class=' row capture-me con-source-component' id='source-" + indexInSources + "'>" +
    "<div class='col-md-6 counter-col'>" +
    generateCounterHTML() +
    "</div>" +
    "<div class='col-md-6 link-col'>" +
    "<a href='" + source.citationLink +"' target='_blank'>" + source.citationTitle +"</a>" +
    "</div>" +
    // "<br>" +
    "</div>");
  }

}

function generateCounterHTML(){
  return ("<div class='wellVote'>" +
  "<div class='vote circle'>" +
  "<div class='increment up support-vote'>" +
  "</div>" +
  "<div class='increment down support-vote'>" +
  "</div>" +
  "<div class='count'><h4>0</h4></div>" +
  "</div>" +
  "</div>");
}

function generateClaimRowHTML(claimObj){
  return("<div class='row row1'>" +
  "<div class='col-md-offset-1 col-md-1'>" +
  "<div class='row'>" +
  "<div class='vote claim-vote roundrect'>" +
  "<div class='increment up'></div>" +
  "<div class='increment down'></div>" +
  "<div class='count'><h4>0</h4></div>" +
  "</div>" +
  "</div>" +
  "</div>" +
  "<div class='col-md-offset-1 col-md-6 topic'>" +
  "<h2 class='question'><span class='claim-lead'>Claim:</span> " + claimObj.userClaim + "</h2>" +
  "<br><h4 class='original-asker'>Originally asked by: " + claimObj.claimer + "</h4>" +
  "</div>" +
  "</div>"
);
}

function generateSourceHeaderRowHTML(){
  return("<div class='row row-source-header'>" +
  "<div class='col-md-offset-3 col-md-3 topProSourceHeader'>" +
  "<h2 class='evidenceWords'>Evidence in favor</h2>" +
  "</div>" +
  "<div class='col-md-3 topConSourceHeader'>" +
  "<h2 class='evidenceWords'>Evidence in opposition</h2>" +
  "</div>" +
  "</div>");
}

function generateViewAndAddSourceButtonHTML(isPro){
  if(isPro){
    return("<button class='btn btn-info view-all-btn' type='button'>View all sources</button>" +
    "<button class='btn btn-danger dropdown-toggle source-btn' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>Add Source</button>" +
    "<div class='dropdown-menu dropDownSource' aria-labelledby='-source-btn'>" +
    "<form class='dropDownProSourceForm' novalidate>" +
    "<div class='form-group'>" +
    "<label for='sourceTitle-pro'>Source Title</label>" +
    "<input class='form-control sourceTitle-pro' type='text' value='' required>" +
    "</div>" +
    "<div class='form-group'>" +
    "<label for='sourceURL-pro' class='newClaim'>Source URL</label>" +
    "<input class='form-control sourceURL-pro' type='url' value='' required>" +
    "</div>" +
    "<div class='text-center'>" +
    "<button type='submit' name='button' class='btn btn-info submitNewSource'>Submit Source</button>" +
    "</div>" +
    "</form>" +
    "</div>");
  } else{
    return("<button class='btn btn-info view-all-btn' type='button'>View all sources</button>" +
    "<button class='btn btn-danger dropdown-toggle source-btn' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>Add Source</button>" +
    "<div class='dropdown-menu dropDownSource' aria-labelledby='-source-btn'>" +
    "<form class='dropDownConSourceForm' novalidate>" +
    "<div class='form-group'>" +
    "<label for='sourceTitle-con'>Source Title</label>" +
    "<input class='form-control sourceTitle-con' type='text' value='' required>" +
    "</div>" +
    "<div class='form-group'>" +
    "<label for='sourceURL-con' class='newClaim'>Source URL</label>" +
    "<input class='form-control sourceURL-con' type='url' value='' required>" +
    "</div>" +
    "<div class='text-center'>" +
    "<button type='submit' name='button' class='btn btn-info submitNewSource'>Submit Source</button>" +
    "</div>" +
    "</form>" +
    "</div>"
    );
  }
}

function generateCommentRowHTML(){
  return("<div class='row comment-row'>" +
  "<div class='col-md-offset-3 col-md-6 commentColumn'>" +
  "<div class='commentsShow'>" +
  "<h3 class='commentsExpandLink'>Comments</h3>" +
  "</div>" +
  "<div class='commentSection'>" +
  "<div class='userComment'>" +
  "<div class='userInputtedCommentList'>" +
  "</div>" +
  "<hr>" +
  "<form class='commentForm' action='/html/tags/html_form_tag_action.cfm'  method='post'>" +
  "<div>" +
  "<textarea name='comments' class='Comment'>" +
  "</textarea>" +
  "</div>" +
  "<button class='commentSubmit' type='submit' value='Submit'>Submit comment</button>" +
  "</form>" +
  "</div>" +
  "</div>" +
  "</div>" +
  "</div>");
}

function generateHTMLforClaim(claimObj){
  $("#claim-space").prepend(
    "<div class='claim' id='claim" + getIndexInArrayOfClaims(claimObj, claimArray) + "'>" +
    generateClaimRowHTML(claimObj) +
    generateSourceHeaderRowHTML() +

    "<div class='row row-sources'>" +

    "<div class='col-md-offset-3 col-md-3 topProSource'>" +
    "<div class='well'>" +
    "<div class='pro-source-container'>" +
    generateSourceHTML(getSourceWithMostUpvotes(claimObj,true), true, getIndexOfSourceWithMostUpvotes(claimObj, true)) +
    "</div>" +
    "</div>" +
    generateViewAndAddSourceButtonHTML(true) +
    "</div>" +

    "<div class='col-md-3 topConSource'>" +
    "<div class='well'>" +
    "<div class='con-source-container'>" +
    generateSourceHTML(getSourceWithMostUpvotes(claimObj, false), false, getIndexOfSourceWithMostUpvotes(claimObj, false)) +
    "</div>" +
    "</div>" +
    generateViewAndAddSourceButtonHTML(false) +
    "</div>" +

    "</div>" +
    generateCommentRowHTML() +

    "<div>" +
    "</div>");
  }

  function updateVoteCountsAndDisplayForClickedClaim(claimID, jQueryObj){
    // console.log("Got in");
    if($.inArray(userName, claimArray[claimID].upVoteArray)>-1 || $.inArray(userName, claimArray[claimID].downVoteArray)>-1){
      // alert("No double dipping!");
    } else{
      // console.log("Here I am!");
      if(jQueryObj.hasClass("up")){
        // console.log("Hi hi hi");
        claimArray[claimID].upVoteArray.push(userName);
        // claimArray[claimID].updateVotes();
      }
      if(jQueryObj.hasClass("down")){
        claimArray[claimID].downVoteArray.push(userName);
      }
    }
    claimArray[claimID].updateVotes();
    jQueryObj.parents(".claim").find(".row1").find(".count").empty();
    jQueryObj.parents(".claim").find(".row1").find(".count").append("<h4>" + (claimArray[claimID].upCount - claimArray[claimID].downCount) + "</h4>");
  }

  function updateVoteCountsAndDisplayForClickedSource(claimID, sourceID, isPro, jQueryObj){

    if(isPro){
      // pro
      if($.inArray(userName,claimArray[claimID].pro.sources[sourceID].upVote)>-1 || $.inArray(userName, claimArray[claimID].pro.sources[sourceID].downVote)>-1){
        // alert("No double dipping!");
      } else{
        if(jQueryObj.hasClass("up")){
          claimArray[claimID].pro.sources[sourceID].upVote.push(userName);
          // claimArray[claimID].pro.sources[sourceID].updateVotes();
        }
        if(jQueryObj.hasClass("down")){
          claimArray[claimID].pro.sources[sourceID].downVote.push(userName);
        }
      }
      claimArray[claimID].pro.sources[sourceID].updateVotes();
      jQueryObj.parents(".capture-me").find(".count").empty();
      jQueryObj.parents(".capture-me").find(".count").append("<h4>" + (claimArray[claimID].pro.sources[sourceID].upCount - claimArray[claimID].pro.sources[sourceID].downCount) + "</h4>");

    } else{
      if($.inArray(userName,claimArray[claimID].con.sources[sourceID].upVote)>-1 || $.inArray(userName, claimArray[claimID].con.sources[sourceID].downVote)>-1){
        // alert("No double dipping!");
      } else{
        if(jQueryObj.hasClass("up")){
          claimArray[claimID].con.sources[sourceID].upVote.push(userName);
          // claimArray[claimID].con.sources[sourceID].updateVotes();
        }
        if(jQueryObj.hasClass("down")){
          claimArray[claimID].con.sources[sourceID].downVote.push(userName);
        }
      }
      claimArray[claimID].con.sources[sourceID].updateVotes();
      jQueryObj.parents(".capture-me").find(".count").empty();
      jQueryObj.parents(".capture-me").find(".count").append("<h4>" + (claimArray[claimID].con.sources[sourceID].upCount - claimArray[claimID].con.sources[sourceID].downCount) + "</h4>");
    }
  }

  function updateAllVoteCountsAndDisplays(){
    for (var i = 0; i<claimArray.length; i++){
        claimArray[i].updateVotes();
        console.log(claimArray[i]);
        var jQueryObj = $("#claim" + i).find(".claim-vote").find(".up");
        var classStrings = jQueryObj.attr("class");
        if(classStrings){
          updateVoteCountsAndDisplayForClickedClaim(i,jQueryObj);
        }
      for(var jPro = 0; jPro<claimArray[i].pro.sources.length; jPro++){
        claimArray[i].pro.sources[jPro].updateVotes();
        var jQueryObj = $("#claim" + i).find(".pro-source-component").find(".up");
        var classStrings = jQueryObj.attr("class");
        if(classStrings){
          updateVoteCountsAndDisplayForClickedSource(i, jPro, true, jQueryObj);
        }
      }
      for(var jCon = 0; jCon<claimArray[i].con.sources.length; jCon++){
        claimArray[i].con.sources[jCon].updateVotes();
        var jQueryObj = $("#claim" + i).find(".con-source-component").find(".up");
        var classStrings = jQueryObj.attr("class");
        if(classStrings){
          updateVoteCountsAndDisplayForClickedSource(i, jCon, false, jQueryObj);
        }
      }
    }
  }

  function refresh(){
    var topClaim = getClaimWithMostUpvotes(claimArray);
    // var topSource =;
    $("#claim-space").empty();
    generateHTMLforClaim(topClaim);
    updateAllVoteCountsAndDisplays();
  }

  function repopulate(){
    $("#claim-space").empty();
    displayAllClaims();

  }


  // Front End
  $(function(){
    claimArray = [];
    testGetIndexInArrayOfClaims();
    userName = $("#userName").val();
    userPassword = $("#userPassword").val();
    refresh();


    $("#dropDownForm").submit(function(){
      event.preventDefault();
      if(!isMissingUsernameOrPassword(userName, userPassword)){
        var newClaimSender = userName;
        var claimText = $("input#claimQuestion").val();
        var optionalDigitalOriginOfClaim = $("input#claimLink").val();
        newestClaim = new Claim (newClaimSender, claimText);
        newestClaim.pro.sources
        claimArray.push(newestClaim);
        $("#claim-space").empty();
        generateHTMLforClaim(newestClaim);
      } else{
        console.log("You forgot to log in");
      }
    });

    $("#claim-space").first().on("click", ".support-vote", function(){
      event.preventDefault();
      if(!isMissingUsernameOrPassword(userName, userPassword)){
        var sourceID = parseInt(getIndexOfSupportThisClickOccurredIn($(this)));
        var claimID = getIndexOfClaimThisClickOccurredIn($(this));
        var isPro = $(this).parents(".capture-me").hasClass("pro-source-component");
        var jQueryObj = $(this);
        updateVoteCountsAndDisplayForClickedSource(claimID, sourceID, isPro, jQueryObj);
      } else{
        console.log("You forgot to log in");
      }
    });

    $("#claim-space").first().on("click", ".increment", function(){
      event.preventDefault();
      if(!isMissingUsernameOrPassword(userName, userPassword)){
        console.log("this happens");
        var claimID = getIndexOfClaimThisClickOccurredIn($(this));
        console.log("claimID is: " + claimID);
        var jQueryObj = $(this);
        updateVoteCountsAndDisplayForClickedClaim(claimID, jQueryObj);
      } else{
        console.log("You forgot to log in");
      }
    });

    $("#claim-space").first().on("submit", ".dropDownProSourceForm", function(){
      event.preventDefault();
      // console.log("Got here");
      if(!isMissingUsernameOrPassword(userName, userPassword)){
        var claimID = getIndexOfClaimThisClickOccurredIn($(this));
        // console.log("claimID is " + claimID);
        var sourceTitleInput = $("#claim" + claimID).find(".sourceTitle-pro").val();
        // console.log("sourceTitleInput is " + sourceTitleInput);
        var sourceURLinput = $("#claim" + claimID).find(".sourceURL-pro").val() ;
        var newSource = new Source(sourceTitleInput, sourceURLinput, userName);
        var claimThisRefersTo = claimArray[getIndexOfClaimThisClickOccurredIn($(this))];
        console.log(claimThisRefersTo);
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

    $("#claim-space").first().on("submit", ".dropDownConSourceForm", function(){
      event.preventDefault();
      console.log("Got in here. Hi!");
      if(!isMissingUsernameOrPassword(userName, userPassword)){
        var claimID = getIndexOfClaimThisClickOccurredIn($(this));
        var sourceTitleInput = $("#claim" + claimID).find(".sourceTitle-con").val();
        var sourceURLinput = $("#claim" + claimID).find(".sourceURL-con").val() ;
        var newSource = new Source(sourceTitleInput, sourceURLinput, userName);
        var claimThisRefersTo = claimArray[getIndexOfClaimThisClickOccurredIn($(this))];
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


    $("#loginForm").submit(function(){
      event.preventDefault();
      userName = $("#userName").val();
      userPassword = $("#userPassword").val();
      if(validateLogin(userName, userPassword) && !isMissingUsernameOrPassword(userName, userPassword)){
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
      userName = $("#userName").val();
      userPassword = $("#userPassword").val();
      if(!isMissingUsernameOrPassword(userName, userPassword)){
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
    $("#claim-space").on('click', '.commentsShow', function(){
      event.preventDefault();
      var claimID = getIndexOfClaimThisClickOccurredIn($(this));
      $("#claim" + claimID).find(".commentSection").slideToggle();
    });

    //claimComments
    $(".commentForm").submit(function(){
      event.preventDefault();
      console.log("Got into comment form");
      var claimID = getIndexOfClaimThisClickOccurredIn($(this));
      console.log(claimID);
      var userInputtedComment = $("#claim" + claimID).find(".commentForm textarea");
      console.log(userInputtedComment);
      if (validateLogin(userName, userPassword) && !isMissingUsernameOrPassword(userName, userPassword)) {
        if (userInputtedComment.val() === '') {
          alert("comment input field is empty")
        } else{ $(".userInputtedCommentList").append("<p><span class= 'userSaid'>" + userName + " commented: </span>" + $(".commentForm textarea").val() + "</p>");
        $('.commentForm textarea').val('');}
      } else {
        alert("You must be logged in to comment")
      }
    });

      $("#all-claims-btn").click(function(){
      displayAllClaims();
    });

    $("#claim-space").first().on("click",".view-all-btn", function(){
      event.preventDefault();
      console.log("Got in!!!!");
      var claimID = getIndexOfClaimThisClickOccurredIn($(this));
      var currentClaim = claimArray[claimID];
      console.log("Got here");
      console.log(claimID);
      displayAllSources(claimID, currentClaim);
    });

    // $(".con-view-all-btn").click(function(){
    //   event.preventDefault();
    //   var claimID = getIndexOfClaimThisClickOccurredIn($(this));
    //   var currentClaim = claimArray[claimID];
    //   displayAllSources(claimID, currentClaim);
    // });

    $("#myBtn").click(function(){
      $("#bodyBackground").addClass("modalBackground");
    })

    $(".close").click(function(){
      $("#bodyBackground").removeClass();
    })

  });
