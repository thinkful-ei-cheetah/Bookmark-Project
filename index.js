'use strict';
//logo.clearbit.com/potify.com?size=50
/* global $, BookmarkController, API, Store */

$(init);


//INITIALZE HANDLERS AND GRAB BOOKMARKS FROM SERVER
function init(){
  BookmarkController.initializeHandlers();

  API.getBookmarks()
    .then(bookmarks => {
      bookmarks.forEach(bookmark => Store.addBookmark(bookmark));
      BookmarkController.render();
    })
    .catch((e)  =>BookmarkController.renderError(e));
}