/**
* Creates elements in DOM
*/

function loopPosts(result) {
  for (i = 0; i < 20; i++) {
    var data = result.data;

    // Data from API
    if (typeof data[i].cover == "undefined") {
      var coverLink = data[i].link
    } else {
      var coverLink = 'http://i.imgur.com/'+data[i].cover+'l'+'.jpg'
    }
    var link = data[i].link
    var title = data[i].title
    var views = data[i].views

    // HTML list item
    var listItem = '<li><a href="'+link+'"><img src="'+coverLink+'" alt="'+title+'"><h2>'+title+'</h2><p>👀  '+views+'</p></a></li>'

    // Add elements
    $(".oc-list").append(listItem);
  }
}

/**
* Fetch JSON from API
*/

function fetch(section) {

  var req = {
   type: 'GET',
   url: 'https://api.imgur.com/3/gallery/'+section+'/top/day/0?showViral=false',
   beforeSend: function(xhr){
    xhr.setRequestHeader('Authorization', 'Client-ID b4746d5cae4ee59');
    }
  }

  $.ajax( req )

  .done(function( result ) {
    loopPosts(result);
  })

  .fail(function() {
    alert( "error" );
  })

}