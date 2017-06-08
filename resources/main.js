$(document).ready(function(){

  //Gets user's search term on click
  $(".wiki-submit").on("click", function(){
    onUserSubmit();
  });

  function onUserSubmit(){
    var $button = $(".wiki-submit").attr("value");
    if ($button == "Submit" && $("#wiki-search").val()) {
      $(".result-card, .result-link").remove();
      getUserSearchTerm();
      changeButton();
    }
    else if ($button == "Clear"){
      changeButton();
      $(".result-card, .result-link").remove();
      $("#wiki-search").val("");
    } else {
      $(".results-area").append(function(){
        // $(this).html("<h2>You'll need to search for something.</h2>");
        $(".results-area h2").addClass("result-card");
        $("#wiki-search").addClass("error-search");
      });
    }
  }
  //Gets user's search term on enter
  $("#wiki-search").on("keypress", function(e){
    $(".result-card, .result-link").remove();
    $("#wiki-search").removeClass("error-search")
    console.log("keypress");
    var key = e.which;
    if(key == 13){//Enter key pressed
      onUserSubmit();
    }
  });

  // Changes the button from Submit to Clear
  function changeButton() {
    var $button = $(".wiki-submit").attr("value");
    $(".wiki-submit").attr("value", function(){
      return $button == "Submit" ? "Clear" : "Submit";
    });
  }

  // Used to get the user's Search Term
  function getUserSearchTerm(){
    var $userSearchTerm = $("#wiki-search").val();
    getWikiPediaEntry($userSearchTerm);
  }

  $("#wiki-search").on("keyup", function() {
    var $userSearchValue = $("#wiki-search").val();
    if ( $userSearchValue ) {
    } else {
      $(".wiki-submit").attr("value", "Submit");
    }
  });

  // get wikipedia value
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
        showData(json);
      }
    });
  }

  // show results on page
  function showData(rawData){
    var listOfResults = rawData.query.search;
    var title;
    var description;
    var link;
    var $blankCard;
    if (listOfResults.length == 0){
      $(".results-area").append(function(){
        $(this).html("<h2>No results found</h2>");
        $(".results-area h2").addClass("result-card");
      });
    } else {
      for (var i = 0; i < listOfResults.length; i++ ){
        title = listOfResults[i].title;
        description = listOfResults[i].snippet;
        link = "https://en.wikipedia.org/wiki/" + title;
        $blankCard = '<a class="result-link" href="'+ link + '"target="_blank"><div class="result-card"><div class="result-title"></div><div class="result-description"></div></div></a>';
        $($blankCard).addClass("item" + i).appendTo(".results-area");
        $(".item"+ i + " .result-title" ).html("<h2>"+ title + "</h2>");
        $(".item"+ i + " .result-description").html("<p>" + description +"</p>");
      };
    }
  }
});
