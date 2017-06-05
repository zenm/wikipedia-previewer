$(document).ready(function(){
  getUserSearchTerm;
});

// get wikipedia value
function getUserSearchTerm(){
  $userSearchTerm = $("#wiki-search").val();
  getWikiPediaEntry($userSearchTerm);
}

$("#wiki-submit").on("click", function(){
  getUserSearchTerm();
});

function getWikiPediaEntry(term){
  var wikipediaEndPoint = "https://en.wikipedia.org/w/api.php";
  $.ajax({
    url : wikipediaEndPoint,
    method : "GET",
    data : {
      action : "query",
      format : "json",
      list : "search",
      srsearch : term
    },
    dataType : "jsonp",
    crossDomain : true,
    success: function(json){
      // console.log(data.query.search[0]);
      //used to parse the data
      showData(json);
    }
  });
}

function showData(rawData){
  var listOfResults = rawData.query.search;
  var title;
  var description;
  var link;
  var $blankCard = '<div class="result-card"><div class="result-title"></div><div class="result-description"></div></div>';
  for (var i = 0; i < listOfResults.length; i++ ){
    title = listOfResults[i].title;
    description = listOfResults[i].snippet;
    link = "https://en.wikipedia.org/wiki/" + title;
    console.log(title, description, link);
    $($blankCard).addClass("item" + i).appendTo(".results-area");
    $(".item"+ i + " .result-title" ).html("<h2>"+ title + "</h2>");
    $(".item"+ i + " .result-description").html("<p>" + description +"</p>");
  };
}

  // show results on the pageshowresults
