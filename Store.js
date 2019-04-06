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

  let addButtonPressed = false;

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
  };
}() );
