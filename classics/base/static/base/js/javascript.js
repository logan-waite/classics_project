$(function() {
  /************************/
  /* STUFF FOR EVERYTHING */
  /************************/

  // Setup CSRF token stuff for AJAX
  function getCookie(name) {
      var cookieValue = null;
      if (document.cookie && document.cookie !== '') {
          var cookies = document.cookie.split(';');
          for (var i = 0; i < cookies.length; i++) {
              var cookie = jQuery.trim(cookies[i]);
              // Does this cookie string begin with the name we want?
              if (cookie.substring(0, name.length + 1) === (name + '=')) {
                  cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                  break;
              }
          }
      }
      return cookieValue;
  }

  var csrftoken = getCookie('csrftoken');

  function csrfSafeMethod(method) {
      // these HTTP methods do not require CSRF protection
      return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
  }

  $.ajaxSetup({
      beforeSend: function(xhr, settings) {
          if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
              xhr.setRequestHeader("X-CSRFToken", csrftoken);
          }
      }
  });

  function openPane(object, url, direction, data = {}) {
    object.load(url, data, function() {
      if (direction == "left")
      {
        object.animate({width:"show"}, 350)
      }
    })
  }

  $('.sidebar-item:not(.active)').click(function(e) {
    $('.active').removeClass('active');
    $(this).parent('li').addClass('active');
  })

  function closePane(object, direction) {
    if (direction == "left")
    {
      object.animate({width:"hide"}, 350, function() {
        object.html("");
      })
    }
  }
  /********************/
  /* Stuff for mobile */
  /********************/

  if (window.matchMedia("(min-width: 768px)").matches) {
  // the view port is at least 768 pixels wide
    $('.sidebar-item').click(function(e) {
      e.preventDefault();
      debugger;
      var item = $(this).parent('li');
      if (item.hasClass('active') && $('#SubMenu').css('display') == 'none') {
        openPane($('#SubMenu'), $(this).attr('href'), 'left')
      }
      else if (!item.hasClass('active') && $('#SubMenu').css('display') == 'block') {
        alert("pane opened")
        closePane($('#SubMenu'), 'left');
        var url = $(this).attr('href');
        openPane($('#SubMenu'), url, 'left')
      }
      else if (item.hasClass('active') && $('#SubMenu').css('display') == 'block') {
        closePane($('#SubMenu'), 'left');
      }
    });
  } else {
  // the view port is less than 768 pixels wide
  $('.sidebar-item').click(function(e) {
    e.preventDefault();
    $('#page-wrapper').load($(this).attr('href'))
    $('.collapse').collapse('hide');
  });
}
})
