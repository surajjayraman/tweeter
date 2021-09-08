/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function() {
    
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  };

  // new tweet HTML with data filled
  createTweetElement = function(tweetObj) {
    const time = timeago.format(tweetObj.created_at);
    const $tweet = $(`        
            <article class="tweet">
            <header>
            <div>
            <h3><img src="${tweetObj.user.avatars}"> &ensp; ${tweetObj.user.name}</h3>
            <h3 class="userID">${tweetObj.user.handle}</h3>
            </div>
            </header>
            <p>${tweetObj.content.text}</p>
            <footer>
            <div>${time}</div>
            <div class="icons"><i class="fas fa-flag"></i>  <i class="fas fa-retweet"></i> <i class="fas fa-heart"></i></div>
            </footer>
            </article>`);
    return $tweet;
  };
      
  const $tweet = createTweetElement(tweetData);
  $('#tweets-container').append($tweet);

});
