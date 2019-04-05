'use strict';
/*global */

// eslint-disable-next-line no-unused-vars
const API = (function (){
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/kristof-pierre/bookmarks';



  const listAPIFetch = function(...args){
    //We're gonna check for errors in the response
    //if the res.ok isnt ok start building error
    //then check the headers property get to see if key 'content-type'
    //has value 'json' to make sure the response is json
    //if it's not we will add to the error that
    // err.message = res.statustext.
    //either way we return the promise as rejected with the error we built

    let error;
    return fetch(...args)
      .then( res =>{
        if (!res.ok){
          error = {
            code: res.status
          };

          if(!res.headers.get('content-type').includes('json')){
            error.message = 'Server error: ' + res.statusText;
            return Promise.reject(error);
          }  
        }
        return res.json();
      })
      //if we have an error return after all that, lets do something with it.
      //data is either an error or the json response

      //this section handles all returned OBJECT possibilities
      .then(data =>{
        if(error){
          error.message = 'Server error: ' + data.message;
          return Promise.reject(error);
        }
        //if no errors at all we make it here
        return data;

      });
  };

  const getBookmarks = function (){
    return listAPIFetch(BASE_URL);
  };
  //there mightb e a problem with my headres
  const createBookmark = function(newBookmark){
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      //need to stringify for all DONT FORGET
      body: newBookmark,
    };
    return listAPIFetch(BASE_URL, options);
  };

  const updateBookmark = function(id, update){
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'json'
      },
      body: update
    };
    return listAPIFetch(BASE_URL + id, options);
  };

  const deleteBookmark = function(id){
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'json'
      },
    };
    return listAPIFetch(BASE_URL + '/' + id, options);
  };

  return {
    createBookmark,
    updateBookmark,
    deleteBookmark,
    getBookmarks
  };
}() );