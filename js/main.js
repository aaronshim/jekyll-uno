---
layout: null
sitemap:
  exclude: 'yes'
---

function showBlog() {
  $('.about').hide()
  $('.projects').hide()
  $('.main-post-list').show()
}

function showAbout() {
  $('.main-post-list').hide()
  $('.projects').hide()
  $('.about').show()
}

function showProjects() {
  $('.about').hide()
  $('.main-post-list').hide()
  $('.projects').show()
}

var buttonActions = {
  'blog-button': showBlog,
  'about-button': showAbout,
  'projects-button': showProjects
}

$(document).ready(function () {
  for (var buttonClass in buttonActions) {
    $('a.' + buttonClass).click(function (e) {
      // It would be nice if we could find the function during the initial setup and then bind it...
      // But JavaScript scoping... blegh!
      buttonActions[e.target.className]()

      if ($('.panel-cover').hasClass('panel-cover--collapsed') && window.location.hash == e.target.hash) return
      
      currentWidth = $('.panel-cover').width()
      if (currentWidth < 960) {
        $('.panel-cover').addClass('panel-cover--collapsed')
        // Slide in the content stuff if the page is already in a collapsed mode
        var animationName = 'slideInRight'
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'
        $('.content-wrapper').addClass('animated ' + animationName).one(animationEnd, function() {
          $(this).removeClass('animated ' + animationName)
        })
      } else {
        // No slide-in of the main content during the initial panel-cover drawing away to the left
        $('.panel-cover').css('max-width', currentWidth)
        $('.panel-cover').animate({'max-width': '530px', 'width': '40%'}, 400, swing = 'swing', function () {})
        $('.panel-cover').addClass('panel-cover--collapsed')
      }

      // Only resize the particles canvas after we are done with collapsing the navbar
      $(":animated").promise().done(function() {
        var particleCanvas = $('#particles-js>canvas')[0]
        console.log("Foo!")
        console.log(particleCanvas)
        particleCanvas.removeAttribute("style")
        particleCanvas.width = $('header').width()
        particleCanvas.height = $('header').height()
      })
    })

    // For mobile navigation
    $('.navigation-wrapper .' + buttonClass).click(function () {
      $('.navigation-wrapper').toggleClass('visible')
      $('.btn-mobile-menu__icon').toggleClass('icon-list icon-x-circle animated fadeIn')
    })
  }

  // Maybe whitelist our good pages?
  if (window.location.hash) {
    $('.panel-cover').addClass('panel-cover--collapsed')
  }

  if (window.location.hash && window.location.hash == '#blog') {
    showBlog()
  }

  if (window.location.hash && window.location.hash == '#about') {
    showAbout()
  }

  if (window.location.hash && window.location.hash == '#projects') {
    showProjects()
  }

  if (window.location.pathname !== '{{ site.baseurl }}/' && window.location.pathname !== '{{ site.baseurl }}/index.html') {
    $('.panel-cover').addClass('panel-cover--collapsed')
  }

  $('.btn-mobile-menu').click(function () {
    $('.navigation-wrapper').toggleClass('visible animated bounceInDown')
    $('.btn-mobile-menu__icon').toggleClass('icon-list icon-x-circle animated fadeIn')
  })
})
