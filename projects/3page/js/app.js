/*global res*/
/*global $*/
/*global gapi*/

function tpldankmemes(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}
//NAILED IT *Spoilers: Makes a 2d array*

$(function() {
    $("form").on("submit", function(e) {
       e.preventDefault();
       
       
       
       var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
            maxResults: 3,
            order: "viewCount",
            
       }); 
       
       request.execute(function(response) {
          var results = response.result;
          $("#results").html("");
          $.each(results.items, function(index, item) {
            $.get("tpl/item.html", function(data) {
                $("#results").append(tpldankmemes(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
            });
          });
          resetVideoHeight();
       });
    });
    
    $(window).on("resize", resetVideoHeight);
});

        
    

function resetVideoHeight() {
    $(".video").css("height", $("#results").width() * 9/16);
}

//IGNORE THE ERROR BELOW THIS
function init() {
    gapi.client.setApiKey("AIzaSyBCewPmix-R_Cv3RTysFVYXoHZmCnjTfOc");
    gapi.client.load("youtube", "v3", function() {
        
    });
}

/*    WE'VE GOT TROUBLE!
function loadComments(id) {
    
    var request = gapi.client.youtube.commentThreads.list({      
        videoid:id
            
    });
    
    request.execute(function(response) {
          var results = response.comments;
          $("#" + id).html("");
          $.each(results.comments, function(index, item) {
            $.get("tpl/comment.html", function(data) {
                $("#auspicious").append(tpldankmemes(data, [{"text":item.snippet.textOriginal}]));
            });
          });
    });
}
*/
