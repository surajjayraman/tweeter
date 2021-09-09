/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // Page URL
  const pageURL = "http://localhost:8080/tweets";

  // Cross-Site Scripting Prevention
  // Preventing XSS with Escaping
  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
    
  // Tweet management: show a list of tweets //
  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container

    // to eliminate duplicates
    $('#tweets-container').empty();
    // loops through tweets data
    for (let tweet of tweets) {
      // calls createtweet element for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container in order of newest first
      $('#tweets-container').prepend($tweet);
    }

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
            <p>${escape(tweetObj.content.text)}</p>
            <footer>
            <div>${time}</div>
            <div class="icons"><i class="fas fa-flag"></i>  <i class="fas fa-retweet"></i> <i class="fas fa-heart"></i></div>
            </footer>
            </article>`);
    return $tweet;
  };

  // adding New Tweet
  // add an event listener that listens for the submit event
  // prevent the default behaviour of the submit event (data submission and page refresh)
  // create an AJAX POST request that sends the form data to the server.
  $('#new-tweet-form').on("submit", function(event) {
    // stop the form from being submitted
    event.preventDefault();
      
    // new tweet text
    // The server is configured to receive form data formatted as a query string.
    // The jQuery .serialize() function turns a set of form data into a query string.
    // This serialized data should be sent to the server in the data field of the AJAX POST request.
    const $tweet = $(this).children('textarea').serialize();
  
    // form validation for new tweet text
    $('#error').empty();
    const counter = Number($(this).children('div').children('output').val());
    if (counter < 0) {
      const message = "<p class='error'><i class='fas fa-exclamation-triangle'></i> Oops! Your tweet content is too long! <i class='fas fa-exclamation-triangle'></i></p>";
      return $('#error').append(message);
    } else if (counter === 140) {
      const message = "<p class='error'><i class='fas fa-exclamation-triangle'></i> Oops! Your tweet does not have any characters!<i class='fas fa-exclamation-triangle'></i></p>";
      return $('#error').append(message);
    }
      
    // Create AJAX request - for new tweet
    $.ajax({
      method: 'POST',
      url: pageURL,
      data: $tweet
    })
      .done(function() {
        // clear out counter and text area on submission
        $('#new-tweet-form').children('textarea').val('');
        $('#new-tweet-form').children('div').children('output').val('140');

        // loadTweets function makes the AJAX get request
        // and then delegates the work to renderTweets function
        loadTweets();

      })
      .catch((err) => {
        console.log(err);
      });
  });

  // responsible for fetching tweets from the http://localhost:8080/tweets page.
  // The loadtweets function will use jQuery to make a request to /tweets
  // and receive the array of tweets as JSON.
  loadTweets = function() {
    // make request to /tweets and receive array of tweets as JSON
    $.ajax({
      method: 'GET',
      url: pageURL
    })
      // on successful, call the renderTWeets function passing the response
      .then((result) => {
        renderTweets(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  // loadTweets function makes the AJAX get request
  // and then delegates the work to renderTweets function
  loadTweets();

});
