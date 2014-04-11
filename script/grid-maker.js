	
	photos = []
	images = [
		"http://img0.chromatic.io/20b47a31-1ded-ec7d-a08d-7cd605189536/small.jpg",
		"http://img0.chromatic.io/7a9f09ad-f19b-95e7-9538-bc049810ec5a/small.jpg",
		"http://img0.chromatic.io/f30bed2b-1888-6f88-20c4-d3870a2a9d62/small.jpg",
		"http://img0.chromatic.io/d8fb8ca6-3b46-d763-9dbf-fd8388402d1d/small.jpg",
		"http://img1.chromatic.io/cb744883-f13a-bf5b-ab9d-5edeafadccc7/small.jpg",
		"http://img2.chromatic.io/cc10fccc-7cf9-04c3-1794-d8ba489d1119/small.jpg",
		"http://img0.chromatic.io/fc5fdcc8-64f1-de56-74bc-e0518edeae5f/small.jpg",
		"http://img0.chromatic.io/0161d247-b64e-16f5-b4f9-27c33ad6451c/small.jpg",
		"http://img2.chromatic.io/3c1618ba-bddb-a51e-4fed-86c549eeb539/small.jpg",
		"http://img3.chromatic.io/1192ce85-5675-46f0-ddfc-6c49b5ccbb44/small.jpg",
		"http://img3.chromatic.io/b25db2e6-c7f8-a5a2-a3da-ab0601458676/small.jpg",
		"http://sarasoueidan.com/demos/s-gallery/images/big-12.jpg",
		"http://sarasoueidan.com/demos/s-gallery/images/big-1.jpg",
		"http://sarasoueidan.com/demos/s-gallery/images/big-2.jpg",
		"http://sarasoueidan.com/demos/s-gallery/images/big-3.jpg",
		"http://images.wookmark.com/393243_wookmark.jpg",
		// "http://images.wookmark.com/394263_wookmark.jpg",
		// "https://www.firebase.com/resources/images/website/logos/angular-shield.png",
		// "https://www.firebase.com/resources/images/website/pictures/avatar-ryan-bubinski.jpg",
		"http://images.wookmark.com/395068_wookmark.jpg",
		"http://images.wookmark.com/394262_wookmark.jpg",
		"http://vnjs.net/www/project/freewall/example/i/photo/22.jpg",
		"http://vnjs.net/www/project/freewall/example/i/photo/14.jpg",
		"http://vnjs.net/www/project/freewall/example/i/photo/7.jpg",
		"http://vnjs.net/www/project/freewall/example/i/photo/3.jpg",
		"http://vnjs.net/www/project/freewall/example/i/photo/9.jpg",
		"http://farm4.static.flickr.com/3647/3435384001_9ed9864bb4.jpg",
		"http://farm4.static.flickr.com/3411/3434069355_7df0d65490.jpg",
		"http://stylehatch.github.io/photoset-grid/img/demo/nyc1-highres.jpg",
		"http://stylehatch.github.io/photoset-grid/img/demo/nyc2-500px.jpg",
		"http://stylehatch.github.io/photoset-grid/img/demo/print3-highres.jpg",
		"http://stylehatch.github.io/photoset-grid/img/demo/print2-500px.jpg",
		"http://stylehatch.github.io/photoset-grid/img/demo/withhearts2-500px.jpg",
		"http://stylehatch.github.io/photoset-grid/img/demo/withhearts3-500px.jpg",
		"http://stylehatch.github.io/photoset-grid/img/demo/withhearts4-500px.jpg",
		"http://stylehatch.github.io/photoset-grid/img/demo/withhearts5-highres.jpg",
		"http://farm8.staticflickr.com/7262/7419245080_bb752ed1d6.jpg",
		"http://farm6.staticflickr.com/5117/7410370290_0935419fc3.jpg",
		"http://farm9.staticflickr.com/8156/7362866426_bf285ebd45.jpg",
		"http://farm8.staticflickr.com/7013/6448917381_0b754e86fb_z.jpg",
		"http://boedesign.com/demos/jsquares/images/wolf-moon.jpg",
		"http://boedesign.com/demos/jsquares/images/sesame-street.jpg"
	]
	imageElements = [];
	for(var i=0; i<images.length; i++){
		imageElements[i] = new Image();
		imageElements[i].setAttribute("class", "image"+i);
		imageElements[i].onload = function(){
			photos.push({src: this.src, ar: this.width / this.height})
			// console.log({src: this.src, ar: this.width / this.height});
		}
		imageElements[i].src = images[i];
	}
	function floodDOM(){
		document.getElementById('workspace').innerHTML = "";
		viewport_width = window.innerWidth - 100;
		ideal_height = parseInt(window.innerHeight / 2);
		summed_width = photos.reduce((function(sum, p) {
		  return sum += p.ar * ideal_height;
		}), 0);
		rows = Math.round(summed_width / viewport_width);

	  weights = photos.map(function(p) {
	    return parseInt(p.ar * 100);
	  });
	  partition = part(weights, rows);

	  index = 0;
	  x = photos.slice(0);
	  row_buffer = [];
	  
	  for (var i = 0; i < partition.length; i++) {
	  	// console.log(partition[i])
	  	var summed_ratios;
	  	row_buffer = [];
	  	for (var j = 0; j<partition[i].length; j++) {
	  		row_buffer.push(photos[index++])
	  	};
	  	summed_ratios = row_buffer.reduce((function(sum, p) {
	      return sum += p.ar;
	    }), 0);
	    for (var k = 0; k<row_buffer.length; k++) {
	    	// console.log(row_buffer[k])
	    	photo = row_buffer[k]
	    	elem = document.createElement("div");
	    	elem.style.backgroundImage="url('"+x.shift().src+"')";
	    	elem.style.width = parseInt(viewport_width / summed_ratios * photo.ar)+"px";
	    	elem.style.height = parseInt(viewport_width / summed_ratios)+"px";
	    	elem.setAttribute("class", "photo");
	    	// console.log(elem, parseInt(viewport_width / summed_ratios * photo.ar) / parseInt(viewport_width / summed_ratios));
	    	document.getElementById('workspace').appendChild(elem)
		  };
		}
		console.log({'viewport_width': viewport_width, 'ideal_height': ideal_height, 'summed_width': summed_width, 'rows': rows, 'weights': weights, 'partition': partition, "row_buffer": row_buffer})
	}
	window.onresize = function(){floodDOM();}