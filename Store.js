'use strict';
const Store = (function (){
  const bookmarks = [
    {
      title: 'Spotify',
      description: 'Spotify is a Swedish audio streaming platform that provides DRM-protected music and podcasts from record labels and media companies. DRM-protected music and podcasts from record labels and media.',
      url: 'www.Spotify.com',
      rating: 5,
      id: 'a30dk5d',
      
    },
  ];
  let searchTerm = '';
  let ratingFilter = null;
  let error = null;

  const findBookmarkDetails = function (id){
    return this.bookmarks.find(item => item.id === id);
  };

  const addBookmark = function(newBookmark){
    Store.bookmarks.unshift(newBookmark);
  };

  const setSearchTerm = function(term){
    Store.searchTerm = term;
  };

  const setRatingFilter = function (value){
    Store.ratingFilter = value;
  };

  const setExpand = function (id){
    Store.currentExpanded = id;
    Store.bookmarks.forEach(bookmark => {
      
      if (bookmark.id === id){
        bookmark.isExpanded = true;
      } else bookmark.isExpanded = false;
    });
  };

  let currentExpanded = '6';

  const setError = function (error){
    Store.error = error;
  };

  const deleteBookmark = function (id){
    const bookmarkIndex= Store.bookmarks.findIndex(bookmark => bookmark.id === id);
    Store.bookmarks.splice(bookmarkIndex,1);
  };

  const setUpdate = function(id){
    const bookmark= Store.bookmarks.find(bookmark => bookmark.id === id);
    Store.updateId = id;
    Store.updateButtonPressed = bookmark;
  };

  const updateBookmark = function(id =updateId, obj){
    const bookmark= Store.bookmarks.find(bookmark => bookmark.id === id);
    Object.assign(bookmark, obj);
  };

  let addButtonPressed = false;
  let updateButtonPressed = null;
  let updateId = null;

  return{
    bookmarks,
    findBookmarkDetails,
    addBookmark,
    setSearchTerm,
    searchTerm,
    setRatingFilter,
    ratingFilter,
    setExpand,
    error,
    setError,
    deleteBookmark,
    addButtonPressed,
    currentExpanded,
    updateButtonPressed,
    setUpdate,
    updateBookmark,
    updateId

  };
}() );
