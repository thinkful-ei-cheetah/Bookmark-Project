'use strict';
//logo.clearbit.com/potify.com?size=50
/* global $, Store */

$(initializeHandlers);

function initializeHandlers(){
  handleBookmarkClick();
}

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
  item.addClass('js-bookmark-large selected');
  item.find('.small-to-large').addClass('js-small-to-large-large');
  item.find('.js-mini-info').removeClass('mini-info').addClass('js-large-info');
  item.find('.logo-container').addClass('js-logo-container-large');
  item.find('.logo').addClass('js-logo-large');
  item.find('.logo').attr('width', '60px');
  item.find('.name').addClass('js-name-large');
  
  addAdditionalDetails(item);
  //need to inject html, trash, buttons
}

function minimize(item){
  console.log('ss');
  item.removeClass('js-bookmark-large');
  item.find('.js-small-to-large-large').removeClass('js-small-to-large-large').addClass('js-small-to-large');
  item.find('.js-large-info').addClass('js-mini-info').removeClass('js-large-info');
  item.find('.logo-container').removeClass('js-logo-container-large');
  item.find('.logo').removeClass('js-logo-large');
  item.find('.logo').attr('width', '170px');
  item.find('.name').removeClass('js-name-large');

  removeAdditionalDetails(item);
}

function addAdditionalDetails(item){
  item.find('.js-small-to-large-large').append('<i class="fas fa-trash fa-lg"></i>');
  const id = getId(item);
  item.append(generateAdditionalInfo(id));
}

function getId(item){
  return item.attr('id');
}

function removeAdditionalDetails(item){
  item.find('.fa-trash').remove();
  item.find('.additional-info').remove();

}

function generateAdditionalInfo(id){
  const bookmarkDetails = Store.findBookmarkDetails(id);

  const shortVersion = `
  <div class="additional-info">
    <div class="description-text-full">
      <p>${bookmarkDetails.description}</p>
    </div>
    <div class="go-btn"><a  href="#"><i class="fas fa-arrow-circle-right fa-3x"></i></a>
    </div>
  </div>`;

  const longVersion = `  
  <div class="additional-info">
    <div class="description-text">
      <p>${bookmarkDetails.description}</p>
    </div>
    <div class="url-text">
      <p>${bookmarkDetails.url}</p>
    </div>
    <div class="go-btn"><a  href="#"><i class="fas fa-arrow-circle-right fa-3x"></i></a>
    </div>
  </div>`;

  return bookmarkDetails.urlLength > 20 ? shortVersion : longVersion;
}
