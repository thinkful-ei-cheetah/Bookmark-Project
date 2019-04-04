'use strict';
//logo.clearbit.com/potify.com?size=50
/* global $*/

$(handleBookmarkClick);

function handleBookmarkClick(){
  $('section').on('click', '.bookmark', function(e) {
    const selected = $(this);
    const unselected = $('.bookmark').not(selected);

    console.log(unselected);
    maximize(selected);
    minimize(unselected);
    
  });
}

function maximize(item){
  item.addClass('js-bookmark-large');
  item.find('.small-to-large').addClass('js-small-to-large-large');
  item.find('.js-mini-info').removeClass('mini-info').addClass('js-large-info');
  item.find('.logo-container').addClass('js-logo-container-large');
  item.find('.logo').addClass('js-logo-large');
  item.find('.logo').attr('width', '60px');
  item.find('.name').addClass('js-name-large');

  //need to inject html, trash, buttons
}

function minimize(item){
  item.removeClass('js-bookmark-large');
  item.find('.small-to-large').removeClass('js-small-to-large-large');
  item.find('.js-large-info').addClass('js-mini-info').removeClass('js-large-info');
  item.find('.logo-container').removeClass('js-logo-container-large');
  item.find('.logo').removeClass('js-logo-large');
  item.find('.logo').attr('width', '170px');
  item.find('.name').removeClass('js-name-large');
}

