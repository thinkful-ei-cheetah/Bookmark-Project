'use strict';
const Store = (function (){
  const bookmarks = [
    {
      title: 'Spotify',
      description: 'Spotify is a Swedish audio streaming platform that provides DRM-protected music and podcasts from record labels and media companies.',
      url: 'www.potify.com',
      rating: 5,,
      id: 'c30dk5d',
      urlRating: function(){ return this.url.length;}
      
    }
  ];

  return{
    bookmarks,
  };
}() );

Store.bookmarks.forEach(item=> console.log(item.urlRating));
