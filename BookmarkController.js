'use strict';
/*global $, Store, API*/

const BookmarkController = (function(){

  const initializeHandlers = function (){
    handleBookmarkClick();
    handleAddButtonClicked();
    handleSearching();
    handleFilterRatings();
    handleKeyboard();
    handledeleteBookmarkClick();
    handleEditBookmarkClicked();
  };


  //EVENT LISTENERS

  //Form submission sotre variables, validate, APIcreateBookmark, add to store, rerender
  const handleSubmit = function(){
    $('.add-bookmark').submit( (e)=>{
      e.preventDefault();
  
      const enteredURL = $('.url-entry').val();
      const enteredTitle = $('.title-entry').val();
      const enteredDes = $('.add-bookmark-textArea').val();
      const rating = $('#ratings option:selected').val();

      $('.url-entry').val('');
      $('.title-entry').val('');
      $('.add-bookmark-textArea').val('');
      $('#ratings option:selected').val('');
  
      try{
       
        const JSONObj = validateForm(enteredURL, enteredTitle, enteredDes, rating);
        API.createBookmark(JSONObj)
          .then(newBookmark =>{
            Store.addBookmark(newBookmark);
            BookmarkController.render();
          })
          .catch( e=> {
            Store.setError(e);
            BookmarkController.render(e);
          });
      } catch (e){
        Store.setError(e);
        BookmarkController.render();
      }
    });  
  };

  const handleUpdateSubmit = function(){
    $('.edit-bookmark').submit( (e)=>{
      e.preventDefault();
  
      const enteredURL = $('.url-entry').val();
      const enteredTitle = $('.title-entry').val();
      const enteredDes = $('.add-bookmark-textArea').val();
      const rating = $('#ratings option:selected').val();

      $('.url-entry').val('');
      $('.title-entry').val('');
      $('.add-bookmark-textArea').val('');
      $('#ratings option:selected').val('');
  
      try{
       
        const JSONObj = validateForm(enteredURL, enteredTitle, enteredDes, rating);
        API.updateBookmark(Store.updateId, JSONObj)
          .then(newBookmark =>{
            Store.updateBookmark(newBookmark);
            Store.updateId = null;
            BookmarkController.render();
          })
          .catch( e=> {
            Store.setError(e);
            BookmarkController.render(e);
          });
      } catch (e){
        Store.setError(e);
        BookmarkController.render();
      }
    });  
  };

  const handleKeyboard = function(){
    $('section').on('keyup', '.bookmark', function (e){
      console.log(e);
      if (e.originalEvent.keyCode === 32 || e.originalEvent.keyCode === 13){
        bookmarkEngaged(this);
      }
    });
  };

  //Close form when x is clicked
  function handleExitFormClicked(){
    $('.fa-window-close').click( ()=>{
      BookmarkController.render();
    });

  
  }

  // Display the add bookmark form
  const handleAddButtonClicked = function(){
    $('.add-item').click( function(e) {
      e.preventDefault(); 
      Store.addButtonPressed = true;
      BookmarkController.render();
      // $('.add-bookmark').css('display','block');  
    });
  };

  //Switch to large view of each bookmark
  const handleBookmarkClick = function(){
    $('section').on('click', '.bookmark', function(e) {
      bookmarkEngaged(this);
    });
  };

  function bookmarkEngaged(bookmark){
    const selected = $(bookmark);
    const selectedId = getId(selected);
    if(Store.currentExpanded !== selectedId){

      Store.setExpand(selectedId);
      BookmarkController.render();      
    }
  }

  const handleFilterRatings = function(){
    $('#filter-ratings').change(e=>{
      const value = $( '#filter-ratings option:selected').val();
      Store.setRatingFilter(value);
      BookmarkController.render();
    });
  };

  const handleEditBookmarkClicked = function(){
    $('section').on('click', '.edit-btn', function(e) {
      
      const itemId = $(this).closest('.bookmark').attr('id');
      Store.setUpdate(itemId);
      console.log(Store.updateButtonPressed);
      BookmarkController.render();
    });
  };

  const handledeleteBookmarkClick = function (){
    $('section').on('click', '.delete-btn', function(e) {
      const itemId = $(this).closest('.bookmark').attr('id');
      API.deleteBookmark(itemId)
        .then(()=>{
          Store.deleteBookmark(itemId);
          BookmarkController.render();
        })
        .catch( e => {
          Store.setError(e);
          BookmarkController.render();
        });
    });
  };

  const handleSearching = function (){
    $('#search-box').on('keyup', (e)=>{
      const value = $(e.currentTarget).val();
      Store.setSearchTerm(value);
      render();
    });
  };
  
  const getId = function(item){
    return item.attr('id');
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


  //Render errors or store NEED TO FIX

  const render = function(){
    if(Store.error){
      
      $('.show-error').append(`<div class="error"> ${Store.error.message} </div>`);
      Store.error = null;
      setTimeout(()=> {$('.error').remove();}, 6000);
    } 
    
    else if (Store.addButtonPressed){
     
      $('.add-form-container').html(generateAddBookmarkForm());
      Store.addButtonPressed = false;
      handleSubmit();
      handleExitFormClicked();
    } 
    
    else if(Store.updateButtonPressed){
      
      $('.add-form-container').html(generateEditBookmarkForm(Store.updateButtonPressed));
      handleExitFormClicked();
      handleUpdateSubmit();
      Store.updateButtonPressed = null;
      
    } 
    
    
    else{
      let bookmarks = [...Store.bookmarks];

      if (Store.ratingFilter){
        bookmarks = bookmarks.filter( bookmark => bookmark.rating >= Store.ratingFilter);
      }

      if(Store.searchTerm){
        bookmarks = bookmarks.filter( bookmark => bookmark.title.toLowerCase().includes(Store.searchTerm.toLowerCase()));
      }
      
      $('.add-form-container').html('');
      $('section').html(createBookmarkString(bookmarks));

    }
  };

  const createBookmarkString = function (bookmarkArray){
    
    let htmlString =bookmarkArray.map( bookmark => generateBookmarkHTML(bookmark)
    );
    console.log(htmlString);
    return htmlString.join('');
  };

  const generateAddBookmarkForm = function(){
    return `<form class="add-bookmark" role="form">
    <input type="button" value="&#xf410; " class="fa-window-close fa fa-input">
    <label for="url-entry">URL</label>
    <br>
    <input type= "text" class="url-entry" placeholder="http://....">
    <br>
    <label for="rating-box"></label>
    <br>
    <div class="select-rating">
        <label for="ratings">Rating:</label>
        <select name="-selectratings" id="ratings">
          <option value="">⭐</option>
          <option value="2">⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="5">⭐⭐⭐⭐⭐</option>
        </select>
      </div>
    <div class="additional-info-form">
        <label for="text-entry"></label>
        <br>
        <input aria-label="Title" type= "text" class="title-entry" placeholder="Title..." maxlength="22">
        <br>
        <textarea class="add-bookmark-textArea" maxlength="130" rows="5" name="description" placeholder="This webiste is for..." cols="35"></textarea>
    </div>
    <div class="go-btn">
      <button><a  href="#" tabindex="-1"><i class="add-new-item-btn fas fa-arrow-right fa-3x"></i></a></button>
    </div>
  </form>`;
  };


  const generateEditBookmarkForm = function(bookmark){

    return `<form class="edit-bookmark" role="form">
    <input type="button" value="&#xf410; " class="fa-window-close fa fa-input">
    <label for="url-entry">URL</label>
    <br>
    <input type= "text" class="url-entry" value="${bookmark.url}" placeholder="http://....">
    <br>
    <label for="rating-box"></label>
    <br>
    <div class="select-rating">
        <label for="ratings">Rating:</label>
        <select name="-selectratings" id="ratings" value="${bookmark.rating}">
          <option value="">⭐</option>
          <option value="2">⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="5">⭐⭐⭐⭐⭐</option>
        </select>
      </div>
    <div class="additional-info-form">
        <label for="text-entry"></label>
        <br>
        <input aria-label="Title" value="${bookmark.title}" type= "text" class="title-entry" placeholder="Title..." maxlength="22">
        <br>
        <textarea class="add-bookmark-textArea"  maxlength="130" rows="5" name="description" placeholder="This webiste is for..." cols="35">${bookmark.desc}</textarea>
    </div>
    <div class="go-btn-edit">
      <button><a  href="#" tabindex="-1"><i class="add-new-item-btn fas fa-arrow-right fa-3x"></i></a></button>
    </div>
  </form>`;
  };


  const generateBookmarkHTML = function (bookmark){
    console.log(bookmark);
    let imgURL = bookmark.url.match(/[\w]*\.com|[\w]*\.edu|[\w]*\.org|[\w]*\.io|[\w]*\.it|[\w]*\.br|[\w]*\.ca|[\w]*\.net|[\w]*\.co\.uk/);
    
    let rating = '';
    switch(bookmark.rating){
    case 1: 
      rating = '⭐★★★★';
      break;
    case 2: 
      rating = '⭐⭐★★★';
      break;
    case 3: 
      rating = '⭐⭐⭐★★';
      break;
    case 4: 
      rating = '⭐⭐⭐⭐★';
      break;
    case 5: 
      rating = '⭐⭐⭐⭐⭐';
      break;
    }
  
    if (!bookmark.isExpanded){
      return `<div class="bookmark" id="${bookmark.id}" role="listitem" tabIndex = "0">
    <div class="small-to-large">
      <div class="logo-container">
        <img class= "logo" src="//logo.clearbit.com/${imgURL[0]}" onerror="if (this.src != 'error.jpg') this.src = 'https://placedog.net/170/170'" alt="logo">
      </div>
      <div class="js-mini-info">
        <h4 class="name">${bookmark.title}</h4>
        <span class="star-rating">
          ${rating}
        </span>
      </div>
    </div>
    </div>`;
    }

    return `
  <div class="bookmark js-bookmark-large selected" id="${bookmark.id}" role="listitem" tabIndex="0">
    <div class="small-to-large js-small-to-large-large">
      <div class="logo-container js-logo-container-large">
        <img class="logo js-logo-large" src="//logo.clearbit.com/${imgURL[0]}" onerror="if (this.src != 'error.jpg') this.src = 'https://placedog.net/170/170'" alt="logo">
      </div>
      <div class="js-mini-info js-large-info">
        <h4 class="name js-name-large">${bookmark.title}</h4>
        <span class="star-rating">
          ${rating}
        </span>
      </div>
      <span class="interact-btns">
        <input type="button" value="&#xf303; " class="edit-btn more-btns fa fa-input">
        <input type="button" value="&#xf2ed; " class="delete-btn more-btns fa fa-input">
      </span>
    </div>
    <div class="additional-info">
      <div class="description-text">
        <p>${bookmark.desc}</p>
      </div>
      <div class="go-btn">
        <a href="${bookmark.url}"><i class="fas fa-arrow-circle-right fa-3x"></i></a>
      </div>
    </div>
  </div>`;   

  };

  return{
    initializeHandlers,
    handleBookmarkClick,
    handleAddButtonClicked,
    handleSubmit,
    handleExitFormClicked,
    handledeleteBookmarkClick,
    handleEditBookmarkClicked,
    render
  };
}() );

