$(document).ready(function(){
	console.log('the document is ready');

	var apiKey = 'ddc302afc7b9d0da8c25d6dd6d818220';
	//var apiSecret = 'f238ec093089acbc';
	var userID = '148738223@N02';
	albums = [];
	//var newArray = [];
	var pageTitle = document.title;
	//var photosets = [];

	/*{
		"bestiary":
		{
			"filterTemplate": "./templates/creatureFilters.handlebars",
			"contentTemplate": "./templates/creatures.handlebars",
			"filterId": "filterDiv",
			"contentId": "contentWrap",
			"dataUrl": "./data/bestiaryData.json"
		},
		"spells":
		{
			"filterTemplate": "./templates/spellFilters.handlebars",
			"contentTemplate": "./templates/spells.handlebars",
			"filterId": "filterDiv",
			"contentId": "contentWrap",
			"dataUrl": "./data/spellData.json"
		},
		"items":
		{
			"filterTemplate": "./templates/itemsFilters.handlebars",
			"contentTemplate": "./templates/items.handlebars",
			"filterId": "filterDiv",
			"contentId": "contentWrap",
			"dataUrl": "./data/itemData.json"
		}
	}*/
	// var albumID = '72157675825558066';
	//var thumbnailData = [];
	var imageData = [];
	var albumsEndpoint = 'https://api.flickr.com/services/rest/?&method=flickr.photosets.getList&api_key=' + apiKey + '&user_id=' + userID + '&format=json&nojsoncallback=1';

	function init (){
		getAllAlbums();
	};

	function getAllAlbums(){
		$.getJSON(albumsEndpoint)
		.done(function(data){
			$.each(data.photosets.photoset, function(i, photoset){

				var albumTitle = photoset.title._content;
				var albumID = photoset.id;
				var endpoint = 'https://api.flickr.com/services/rest/?&method=flickr.photosets.getPhotos&api_key=' + apiKey + '&photoset_id=' + albumID + '&user_id=' + userID + '&format=json&nojsoncallback=1';

				//albums[albumTitle] = {"id" : albumID, 'endpoint' : endpoint, 'photos' : []};

				albums.push({"title" : albumTitle, "id" : albumID, 'endpoint' : endpoint, 'photos' : []})
				//MAY NOT BE NECESSARY

				/*if (albumTitle.toLowerCase().indexOf('thumbnails') >= 0) {
					albums[albumTitle] = {"id" : albumID, 'endpoint' : endpoint, 'photos' : []};
				} else {
					albums[albumTitle] = {"id" : albumID, 'endpoint' : endpoint, 'photos' : [], 'thumbnails': []};
				};*/

				

				//albums[albumTitle].push({"id" : albumID, 'endpoint' : endpoint, 'photos' : []});
				
				//getPhotoData(albumTitle);
			});
		})
		.complete(function(){
			console.log(albums);
			console.log('getAllAlbums is done');
			//reorderData();
			//findThumbnails();
		});

		
	};

	function getPhotoData (i){
		var albumPath = albums[i].photos;
		var albumTitle 
		var albumID = albums[i].id;

		for (var i in albums){
			albumTitle = i;
		};

		//console.log(albumTitle);

		$.getJSON(albums[i].endpoint)
		.done(function(data){
			//console.log(data)
			$.each(data.photoset.photo, function(j, photo){


				var imgUrl = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg';
				var photoTitle

				

				if (albumTitle.toLowerCase().indexOf('thumbnails') >= 0) {
					//albumPath.push({'title' : photo.title, 'thumbnail' : imgUrl});
					photoTitle = "thumb_" + photo.title ;
					albums[i].photos[photoTitle] = {"url" : imgUrl};
					// console.log(albumTitle);
					//thumbnailUrl = imgUrl;
				} else {
					photoTitle = "main_" + photo.title ;
					//albumPath.push({'id' : photo.id, 'title' : photo.title, 'farm' : photo.farm, 'server' : photo.server, 'secret': photo.secret, "url" : imgUrl, "thumbnail": ''});
					albums[i].photos[photoTitle] = {'id' : photo.id, 'title' : photo.title, 'farm' : photo.farm, 'server' : photo.server, 'secret': photo.secret, "url" : imgUrl, 'thumbnail': ''};
				}

				//console.log(albums[i].photos[j].title);
				
				
				//albumPath = [{'id' : photo.id, 'title' : photo.title, 'farm' : photo.farm, 'server' : photo.server, 'secret': photo.secret, "url" : imgUrl}];

				
			});
		})
		.complete(function(){
			//console.log('getPhotoData for ' + albums[i].title + ' is done.');
			//console.log(albums);
			//insertPhotos(albumTitle);




			//THIS IS TO TRY AND INSERT THE THUMBNAILS INTO THE MAIN FOLDER FOR EACH ALBUM
			/*var thumbnails = albums['Music Thumbnails'];
			//albums.music
			albums['Music'].thumbnails.push(thumbnails);
			console.log(albums);*/
			
		});			
	};

	function reorderData(){
		console.log('start reorder data');
		
		var photoPath = albums.Music.photos;
		var albumTitle
		//console.log(Object.keys(photoPath));
		for (var main1m in albums.Music.photos) {
			albumTitle = photos;
			console.log(albumTitle);
		};

		/*for (var i in albums){
			albumTitle = i;
			//console.log(albums[albumTitle].photos);
			for (var i in albums[albumTitle].photos) {
				console.log(i)
			};
			//if (albumTitle.toLowerCase().indexOf('thumbnails') >= 0) {
				//console.log(albumTitle + ' contains "thumbnail"');

				
				//console.log(albums[albumTitle].photos);
				
				

			};
		};*/
		//console.log(albums.length);
		/*  

		Here is what I need to do:

		-- Construct all of the thumbnail image URLs, and make sure to get the title. 
		-- Match thumbnail title with Album picture title (ex albums.Music.photos[i].title should eqaul albums['Music Thumbnails'].photos[i].title)
		-- Add 

		*/
		// for (var i = 0; i < albums.length; i++) {
		// 	//if (true) {};
			
		// 	console.log(i)
		// 	if ((albums[i].toLowerCase().indexOf('thumbnails') >= 0)) {
		// 		console.log(albums[i])
		// 	};
		// };


		/*albums.Music.thumbnails.push(albums['Music Thumbnails']);
		console.log(albums);
		for (var i = 0; i < albums.length; i++) {
			//if (true) {};
			if ((albumTitle.toLowerCase().indexOf('thumbnails') >= 0) && (albumTitle.toLowerCase().indexOf(pageTitle.toLowerCase()) >= 0)) {

			};
			console.log(i)
			// if ((albums[i].toLowerCase().indexOf('thumbnails') >= 0)) {
			// 	console.log(albums[i])
			// };
		};*/
	}

	function insertPhotos(albumTitle){
		//console.log(albumTitle);
		//console.log(albums[albumTitle].photos)
		var photoArray = albums[albumTitle].photos;

		/*for (var i = 0; i < photoArray.length; i++) {
			console.log(albumTitle, photoArray[i].title, photoArray[i].url);
		};*/

			//var imgUrl = albums[albumTitle].photos.imgUrl;

			if ((albumTitle.toLowerCase().indexOf('thumbnails') >= 0) && (albumTitle.toLowerCase().indexOf(pageTitle.toLowerCase()) >= 0)) {

				var mainAlbum = albumTitle.split(' ');

				mainAlbum.pop();
				mainAlbum = mainAlbum.toString();
				console.log(mainAlbum);

				//console.log(albums[mainAlbum].photos);
				for (var i = 0; i < albums[mainAlbum].photos.length; i++) {
					console.log(albums[mainAlbum].photos[i].url);
				};

				//console.log(albumTitle);
				for (var i = 0; i < photoArray.length; i++) {
					//console.log(albumTitle, photoArray[i].title, photoArray[i].url);
					$('#images').append('<div class="col-md-3 col-lg-2 col-sm-6 col-xs-12 thumb"><a class="" href="#"><img class="" src="' + photoArray[i].url + '" alt=""></a></div>');
				};

				
				//console.log(albums[pageTitle].photos[0].id);

			} else {
				//console.log('nope');
			};
		
	};

	init();

});