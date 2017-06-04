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
    success: function(data){
      console.log(data.query.search[0]);
    }
  });
}

  // show results on the pageshowresults
