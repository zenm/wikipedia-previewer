$(document).ready(function(){
  // alert("works");
  getWikiPediaEntry();
});

// get wikipedia

// an example wikipedia api search entry for 'Peace Corps'
// `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=peace corps`

function getWikiPediaEntry(){
  var wikipediaEndPoint = "https://en.wikipedia.org/w/api.php";
  $.ajax({
    url : wikipediaEndPoint,
    method : "GET",
    // xhrFields : true,
    // cache : false,
    data : {
      action : "query",
      format : "json",
      list : "search",
      srsearch : "Tekken"
    },
    dataType : "jsonp",
    crossDomain : true,
    success: function(data){
      alert("works");
      console.log(data);
    }
  });
}

  // on click of a search, then
  // grab the user's input
  // provide that as a parameter to search on
  // show results on the pageshowresults
