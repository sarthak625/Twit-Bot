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
	var screenName = event.source.screen_name;
	tweetIt('@'+screen_name+' Thanks for following me :)');
}

//Anytime someone tweets me
stream.on('tweet',tweetEvent);

function tweetEvent(eventMsg){
	//var json = JSON.stringify(eventMsg,null,2);
	//fs.writeFile("tweet.json",json);
	var replyTo = eventMsg.in_reply_to_screen_name;
	var from = eventMsg.user.screen_name;
	var text = eventMsg.text;

	console.log(replyTo+ "-----" +from	)

	if (replyTo === 'snTest12345'){
		var auto_reply = "@"+from+" .Thank you for tweeting me. You are awesome :)";
		tweetIt(auto_reply);
	}

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
	console.log("Tweet");

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

//Tweet a random number for testing
setInterval(function(){
	var randNo = Math.random()*1000;
	tweetIt("Hello "+(randNo+9)+" My name is "+(randNo-9));
},10000)
