$(document).ready(function(){
	console.log('the document is ready');

	albums = [];
	photos = [];
	thumbnails = [];
	var apiKey = 'ddc302afc7b9d0da8c25d6dd6d818220';
	var userID = '148738223@N02';
	var pageTitle = document.title;
	var albumsEndpoint = 'https://api.flickr.com/services/rest/?&method=flickr.photosets.getList&api_key=' + apiKey + '&user_id=' + userID + '&format=json&nojsoncallback=1';

	function init (){
		console.time('getAllAlbums');
		getAllAlbums();
		console.timeEnd('getAllAlbums');
		
	};

	function getAllAlbums(){
		$.getJSON(albumsEndpoint, function(data){
			$.each(data.photosets.photoset, function(i, photoset){

				var albumTitle = photoset.title._content;
				var albumID = photoset.id;
				var endpoint = 'https://api.flickr.com/services/rest/?&method=flickr.photosets.getPhotos&api_key=' + apiKey + '&photoset_id=' + albumID + '&user_id=' + userID + '&format=json&nojsoncallback=1';
				
				albums.push({"title": albumTitle, "id" : albumID, 'endpoint' : endpoint});
				
			});
		})
		.done(function(data){
			
			//console.log(albums);
			console.log('getAllAlbums is done');
			console.time('getPhotoData');

			getPhotoData();

			console.timeEnd('getPhotoData');
		});	
	};

	function getPhotoData (){
		console.log('get photo data fired');
		
		var count = 0;
		
		for (j = 0; j < albums.length; j++) {

			$.getJSON(albums[j].endpoint, function(data){
				if ((data.photoset.title.toLowerCase().indexOf('thumbnails') >= 0)){
					var mainAlbum = data.photoset.title.split(' ');
					mainAlbum.pop();
					mainAlbum = mainAlbum.toString();
					//console.log(mainAlbum);
					//console.log(imgUrl);
					thumbnails.push({"title" : mainAlbum, "photos": data.photoset.photo});
				} else {
					photos.push({"title" : data.photoset.title, "photos": data.photoset.photo});
				};
				
				count ++
				
			}).done(function(){
				if (count === (albums.length)) {
					/*console.log("photos");
					console.log(photos);
					console.log("thumbnails");
					console.log(thumbnails);*/
					//console.log('getPhotoData is done and now we run insertPhotos');
					console.time('insertPhotos');

					insertPhotos();

					console.timeEnd('insertPhotos');
					
				};
			});	
		};
		//console.log(albums);
		

		//FLAG VARIABLE TO TRIGGER insertPhotos;

		//insertPhotos();			
	};

	function insertPhotos(){
		/*console.log('insert photos fires');
		console.log('----------');
		console.log('----------');
		console.log('----------');
		console.log('----------');
		console.log('----------');
		console.log('page tile is: ' + pageTitle);
		console.log('thumbnails length is: ' + thumbnails.length);*/
		var count = 0;
		for (var i = 0; i < thumbnails.length; i++) {
			count ++

			if ((thumbnails[i].title) === pageTitle) {
				/*console.log('----------');
				console.log('----------');
				console.log('----------');
				console.log('title of the thumbnails: ' + thumbnails[i].title);
				console.log('this matches the page title');*/
				for (var j = 0; j < thumbnails[i].photos.length; j++) {
					//console.log(thumbnails[i].photos[j].title);
					
					var imgUrl = matchPhotos(thumbnails[i].photos[j].title);
					//console.log(imgUrl);

					var thumbUrl = 'https://farm' + thumbnails[i].photos[j].farm + '.staticflickr.com/' + thumbnails[i].photos[j].server + '/' + thumbnails[i].photos[j].id + '_' + thumbnails[i].photos[j].secret + '.jpg';
					$('#images').append('<div class="col-md-3 col-lg-2 col-sm-4 col-xs-6 thumb"><a class="" href="#"><img class="" src="' + thumbUrl + '" alt=""></a></div>');

					// ADD THIS LATER: <img src="' + imgUrl + '">//
					//console.log(thumbUrl);
				};
			};
		};
	};

	function matchPhotos(thumbTitle){
		//console.log('matchPhotos fires');
		
		for (var i = 0; i < photos.length; i++) {
			
			for (var j = 0; j < photos[i].photos.length; j++) {

				if (photos[i].photos[j].title == thumbTitle){
					/*console.log('Match!');
					console.log(photos[i].photos[j].title);
					console.log(thumbTitle);*/
					var imgUrl = 'https://farm' + photos[i].photos[j].farm + '.staticflickr.com/' + photos[i].photos[j].server + '/' + photos[i].photos[j].id + '_' + photos[i].photos[j].secret + '.jpg';
					return imgUrl;
				};
			};
		};
	};

	/*var data = {
	    "items": [{
	        "id": 1,
	        "category": "cat1"
	    }, {
	        "id": 2,
	        "category": "cat2"
	    }, {
	        "id": 3,
	        "category": "cat1"
	    }]
	};

	var returnedData = $.grep(data.items, function (element, index) {
	    return element.id == 1;
	});


	alert(returnedData[0].id + "  " + returnedData[0].category);*/


	/*var arr = [ 1, 9, 3, 8, 6, 1, 5, 9, 4, 7, 3, 8, 6, 9, 1 ];
	$( "div" ).text( arr.join( ", " ) );
	 
	arr = jQuery.grep(arr, function( n, i ) {
	  return ( n !== 5 && i > 4 );
	});
	$( "p" ).text( arr.join( ", " ) );
	 
	arr = jQuery.grep(arr, function( a ) {
	  return a !== 9;
	});
	 
	$( "span" ).text( arr.join( ", " ) );*/



	init();

});