console.log('The bot is starting')

var Twit = require('twit');
var config = require('./config');

var T = new Twit(config);

var params = {
	q: 'Man Utd',
	count: 2
}

T.get('search/tweets', params, gotData);

function gotData(err,data,response){
	var tweets = data.statuses;
	for (var i=0;i<tweets.length;i++){
		console.log(tweets[i].text);
	}
}

var tweet = {
	status: 'Life is awesome'
}

T.post('statuses/update', tweet, tweeted);

function tweeted(err,data,response){
	if (err)
		console.log("Something went wrong");
	else
		console.log("Tweet");
}



