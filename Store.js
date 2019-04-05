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

  const findBookmarkDetails = function (id){
    return this.bookmarks.find(item => item.id === id);
  };

  const addBookmark = function(newBookmark){
    console.log(newBookmark)
    Store.bookmarks.unshift(newBookmark);
  };

  const setSearchTerm = function(term){
    Store.searchTerm = term;
  };

  const setRatingFilter = function (value){
    Store.ratingFilter = value;
  };

  let isExpanded = null

  return{
    bookmarks,
    findBookmarkDetails,
    addBookmark,
    setSearchTerm,
    searchTerm,
    setRatingFilter,
    ratingFilter,
  };
}() );


console.log('Spotify is a Swedish audio streaming platform that provides DRM-protected music and podcasts from record labels and media companies. DRM-protected music and podcasts from record labels and media.'.length);