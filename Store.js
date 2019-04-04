'use strict';
const Store = (function (){
  const bookmarks = [
    {
      title: 'Spotify',
      description: 'Spotify is a Swedish audio streaming platform that provides DRM-protected music and podcasts from record labels and media companies.',
      url: 'www.potify.com',
      rating: 5,
      id: 'a30dk5d',
      urlLength: function() { return this.url.length;}
    },
    {
      title: 'Spotify',
      description: 'Spotify is a Swedish audio streaming platform that provides DRM-protected music and podcasts from record labels and media companies.',
      url: 'www.potify.com',
      rating: 5,
      id: 'b30dk5d',
      urlLength: function() { return this.url.length;}
    },
    {
      title: 'Spotify',
      description: 'Spotify is a Swedish audio streaming platform that provides DRM-protected music and podcasts from record labels and media companies.',
      url: 'www.potify.com',
      rating: 5,
      id: 'c30dk5d',
      urlLength: function() { return this.url.length;}
    }
  ];

  const findBookmarkDetails = function (id){
    return this.bookmarks.find(item => item.id === id);
  };

  return{
    bookmarks,
    findBookmarkDetails
  };
}() );

