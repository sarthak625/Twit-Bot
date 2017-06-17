console.log('The bot is starting')

var Twit = require('twit');
var config = require('./config');

var T = new Twit(config);

//Code to search for a tweet
function searchIt(searchString, tweetCount){
T.get('search/tweets', params, gotData);
	
	var params = {
		q: searchString,
		count: tweetCount
	}

	function gotData(err,data,response){
		var tweets = data.statuses;
		for (var i=0;i<tweets.length;i++){
			console.log(tweets[i].text);
		}
	}
}

//Code to post a tweet
function tweetIt(update){
	var tweet = {
		status: update
	}



	T.post('statuses/update', tweet, tweeted);

	function tweeted(err,data,response){
		if (err)
			console.log("Something went wrong");
		else
			console.log("Tweet");
	}
}

tweetIt("Node bot worrrkkkiinnngggg............");

