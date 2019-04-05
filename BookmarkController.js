'use strict';
/*global $, Store, API*/

const BookmarkController = (function(){

  const initializeHandlers = function (){
    handleBookmarkClick();
    handleSubmit();
    handleAddButtonClicked();
    handleExitFormClicked();
    handleSearching();
    handleFilterRatings()
  };


  //EVENT LISTENERS

  //Form submission sotre variables, validate, APIcreateBookmark, add to store, rerender
  const handleSubmit = function(){
    $('.add-bookmark').submit( (e)=>{
      e.preventDefault();
  
      const enteredURL = $('.url-entry').val();
      const enteredTitle = $('.title-entry').val();
      const enteredDes = $('.add-bookmark-textArea').val();
      const rating = null;
  
      try{
       
        const JSONObj = validateForm(enteredURL, enteredTitle, enteredDes, rating);
        exitForm();
        API.createBookmark(JSONObj)
          .then(newBookmark =>{
            Store.addBookmark(newBookmark);
            BookmarkController.render();
          })
          .catch( e=> BookmarkController.renderError(e));
      } catch (e){
        renderError(e);
      }
    });  
  };

  //Close form when x is clicked
  function handleExitFormClicked(){
    $('.fa-window-close').click( ()=>{
      exitForm();
    });
  
  }
  function exitForm(){
    $('.add-bookmark').css('display', 'none');
  }

  // Display the add bookmark form
  const handleAddButtonClicked = function(){
    $('.add-item').click( function(e) {
      e.preventDefault(); 
      $('.add-bookmark').css('display','block');  
    });
  };

  //Switch to large view of each bookmark
  const handleBookmarkClick = function(){
    $('section').on('click', '.bookmark', function(e) {
      const selected = $(this);
      const unselected = $('.bookmark').not(selected);
  
      if (!selected.hasClass('selected')){
        maximize(selected);
        minimize(unselected);
      }
      
    });
  };

  const handleFilterRatings = function(){
    $('#filter-ratings').change(e=>{
      const value = $( '#filter-ratings option:selected').val();
      Store.setRatingFilter(value);
      BookmarkController.render();
    });
  };

  const handleEditBookmarkClicked = function(){
    $('section').on('click', '.bookmark', function(e) {
      //nothing yet
    });
  };

  const handledeleteBookmarkClick = function (){
    $('section').on('click', '.bookmark', function(e) {
      //nothing yet
    });
  };

  const handleSearching = function (){
    $('#search-box').on('keyup', (e)=>{
      const value = $(e.currentTarget).val();
      Store.setSearchTerm(value);
      render();
    });
  };

  //Below functions manipulate the DOM
  const maximize = function(item){
    item.addClass('js-bookmark-large selected');
    item.find('.small-to-large').addClass('js-small-to-large-large');
    item.find('.js-mini-info').removeClass('mini-info').addClass('js-large-info');
    item.find('.logo-container').addClass('js-logo-container-large');
    item.find('.logo').addClass('js-logo-large');
    item.find('.logo').attr('width', '60px');
    item.find('.name').addClass('js-name-large');
    
    addAdditionalDetails(item);
  };
  
  const minimize = function(item){
    item.removeClass('selected');
    item.removeClass('js-bookmark-large');
    item.find('.js-small-to-large-large').removeClass('js-small-to-large-large').addClass('small-to-large');
    item.find('.js-large-info').addClass('js-mini-info').removeClass('js-large-info');
    item.find('.logo-container').removeClass('js-logo-container-large');
    item.find('.logo').removeClass('js-logo-large');
    item.find('.logo').attr('width', '170px');
    item.find('.name').removeClass('js-name-large');
  
    removeAdditionalDetails(item);
  };
  
  const addAdditionalDetails = function(item){
    item.find('.js-small-to-large-large').append('<span class="interact-btns"><i class="fas fa-trash fa-lg"></i><i class="fas fa-pencil-alt fa-lg"></i></span');
    const id = getId(item);
    item.append(generateAdditionalInfo(id));
  };
  
  const getId = function(item){
    return item.attr('id');
  };
  
  const removeAdditionalDetails = function(item){
    item.find('.interact-btns').remove();
    item.find('.additional-info').remove();
  };
  
  const generateAdditionalInfo = function(id){
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
        <p>${bookmarkDetails.desc}</p>
      </div>
      <div class="go-btn"><a  href="${bookmarkDetails.url}"><i class="fas fa-arrow-circle-right fa-3x"></i></a>
      </div>
    </div>`;
  
    return bookmarkDetails.urlLength > 20 ? shortVersion : longVersion;
  };

  //Input validation
  const validateForm = function(enteredURL, enteredTitle, enteredDes, rating){
    const regex = RegExp('^https?://');
    if (!regex.test(enteredURL)) throw new Error('Please begin your URL with https:// or http://');
    if (enteredTitle < 1) throw new Error('Please check your bookmark entry and ensure the title is valid');

    return  JSON.stringify({
      title: enteredTitle,
      url: enteredURL,
      desc: enteredDes ? enteredDes : '',
      rating: rating ? rating : 1
    });
  };


  //Render errors or store
  const renderError = function(error){
    $('.show-error').append(`<div class="error"> ${error.message} </div>`);
    setTimeout(()=> {$('.error').remove();}, 6000);
  };

  const render = function(){
    let bookmarks = [...Store.bookmarks];

    if (Store.ratingFilter){
      bookmarks = bookmarks.filter( bookmark => bookmark.rating >= Store.ratingFilter);
    }

    if(Store.searchTerm){
      bookmarks = bookmarks.filter( bookmark => bookmark.title.toLowerCase().includes(Store.searchTerm.toLowerCase()));
    }
    $('section').html(createBookmarkString(bookmarks));

  };

  const createBookmarkString = function (bookmarkArray){
    let htmlString =bookmarkArray.map( (bookmark,index) => generateBookmarkHTML(bookmark, index));
  
    return htmlString.join('');

  };

  const generateBookmarkHTML = function (bookmark, index){
    let imgURL = bookmark.url.match(/[\w]*\.com|[\w]*\.edu|[\w]*\.org|[\w]*\.io|[\w]*\.it|[\w]*\.br|[\w]*\.ca|[\w]*\.net|[\w]*\.co\.uk/);
    console.log(imgURL);
    return `<div class="bookmark" id="${bookmark.id}" role="listitem" tabIndex = "0">
    <div class="small-to-large">
      <div class="logo-container">
        <img class= "logo" src="//logo.clearbit.com/${imgURL[0]}" onerror="if (this.src != 'error.jpg') this.src = 'https://placedog.net/170/170'" alt="logo">
      </div>
      <div class="js-mini-info">
        <h4 class="name">${bookmark.title}</h4>
        <span class="star-rating">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
        </span>
      </div>
    </div>
  </div>`;
  };

  return{
    initializeHandlers,
    renderError,
    handleBookmarkClick,
    handleAddButtonClicked,
    handleSubmit,
    handleExitFormClicked,
    handledeleteBookmarkClick,
    handleEditBookmarkClicked,
    render
  };
}() );

