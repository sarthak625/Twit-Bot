console.log('The bot is starting')

var Twit = require('twit');
var config = require('./config');
var fs = require('fs');

var T = new Twit(config);

//Setting up a user stream
var stream = T.stream('user');

//Anytime someone follows me
stream.on('follow',followed);

function followed(event){
	console.log("Follow event")
	var name = event.source.name;
	var screenName = eventMsg.source.screen_name;
	tweetIt('@'+screenName+' ,do you like rainbows?');
}


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

	
}
function tweeted(err,data,response){
	if (err)
		{
			console.log("Something went wrong");
			console.log(err);	
	}
	else
		console.log("Tweet");
}

//Code to upload an image
function tweetImage(filename){
	var params = {
		encoding: 'base64'
	}

	var content = fs.readFileSync(filename,params);
	T.post('media/upload',{media_data: content},uploaded);

	function uploaded(err,data,response){
		var id = data.media_id_string;
		var params ={
			status : 'random pexels photo #coding',
			media_ids: [id]
		}
		T.post('statuses/update', params, tweeted);
	}
}

tweetImage('/home/sarthak/Pictures/ronaldo.jpg')

