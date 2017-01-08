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