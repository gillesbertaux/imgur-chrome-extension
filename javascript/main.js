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
    if (data[i].description === null) {
      var description = ""
    } else {
      var description = data[i].description
    }

    // HTML list item
    var listItem = '<li><a href="'+link+'"><img src="'+coverLink+'" alt="'+title+'"><h2>'+title+'</h2><p>'+description+'</p><p>👀  '+views+'</p></a></li>'

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
    $('.oc-loading').remove();
    loopPosts(result);
  })

  .fail(function() {
    alert( "error" );
  })

}

/**
* Reload page
*/

$('.oc-nav-fp').on('click', function() {
  chrome.storage.local.clear(function() {
    var error = chrome.runtime.lastError;
    if (error) {
      console.error(error);
    }
  });
  chrome.storage.local.set({'section': 'hot'}, function() {
    console.log('Settings saved');
    window.location.reload()
  });
});

$('.oc-nav-us').on('click', function() {
  chrome.storage.local.clear(function() {
    var error = chrome.runtime.lastError;
    if (error) {
      console.error(error);
    }
  });
  chrome.storage.local.set({'section': 'user'}, function() {
    console.log('Settings saved');
    window.location.reload()
  });
});

/**
* Set DOM for off
*/

function removeProdEl() {
  $("#oc-box").attr('checked', true)
  $(".oc-nav").remove();
  $(".oc-list").remove();
  $(".oc-loading").remove();
  $(".oc").append('<img src="off.png" class="oc-off" alt="">')
  console.log('el suppr')
}

/**
* Change prod storage
*/

$("#oc-box").click( function(){
   if( $(this).is(':checked') ) {
    chrome.storage.local.set({'productivity': 'on'}, function() {
      console.log('Settings saved');
      removeProdEl()
    });
   } else {
    chrome.storage.local.set({'productivity': 'off'}, function() {
      console.log('Settings saved');
      window.location.reload()
    });
   }
});

/**
* Check storages
*/

function checkSectionStorage() {
  chrome.storage.local.get('section', function(i){
    section = i.section;
    if (section == "user") {
      fetch("user");
      $('.oc-nav-fp').removeClass('active')
      $('.oc-nav-us').addClass('active')
    } else {
      fetch("hot");
      $('.oc-nav-us').removeClass('active')
      $('.oc-nav-fp').addClass('active')
    }
  });
}

function checkProdStorage(){
  chrome.storage.local.get('productivity', function(i){
    prod = i.productivity;
    if (prod == "on") {
      console.log("nothing")
      removeProdEl();
    } else {
      console.log("go for it!")
      checkSectionStorage();
    }
  });
}

/**
* Initialize on ready
*/

$( document ).ready(function() {
  var section  = "";
  checkProdStorage()
  console.log("done")
});