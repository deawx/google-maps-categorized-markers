/*

Copyright (c) 2015 Derek MacDonald

Permission to use, copy, modify, and/or distribute this software
for any purpose with or without fee is hereby granted, provided
that the above copyright notice and this permission notice appear
in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL
WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE
AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR
CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT,
NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN
CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

*/

/**
 * Customize UI components for Google Map and pre-define marker categories to use.
 */
var RestaurantMap = CategorizableMap.extend({
	init: function(el, templateDirectory) {
		// simple map controls on bottom right w/ category legend on top left
		var options = {
			mapOptions: {
				mapTypeControl: false,
				panControl: true,
				panControlOptions: {
					position: google.maps.ControlPosition.RIGHT_BOTTOM
				},
				zoomControl: true,
				zoomControlOptions: {
					style: google.maps.ZoomControlStyle.LARGE,
					position: google.maps.ControlPosition.RIGHT_BOTTOM
				},
				streetViewControl: true,
				streetViewControlOptions: {
					position: google.maps.ControlPosition.RIGHT_BOTTOM
				},
			},
			// grab JSON from https://snazzymaps.com/ or
			// http://www.mapstylr.com/ for the below 'style' attribute
			// style: []
		};

		if (this.isMobile()) {
			// zoom to Carlton North, VIC on mobile
			options.latLng = new google.maps.LatLng(-37.7845911,144.97288300000002),
			options.zoom = 9;
		}

		this._super(el, options);

		this.addCategory('thai', {
			url: templateDirectory + 'google-icon-thai.png',
			size: new google.maps.Size(50, 33),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(25, 33)
		});

		this.addCategory('chinese', {
			url: templateDirectory + 'google-icon-chinese.png',
			size: new google.maps.Size(50, 33),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(25, 33)
		});

		this.addCategory('indian', {
			url: templateDirectory + 'google-icon-indian.png',
			size: new google.maps.Size(50, 33),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(25, 33)
		});

		this.addCategory('japanese', {
			url: templateDirectory + 'google-icon-japanese.png',
			size: new google.maps.Size(50, 33),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(25, 33)
		});

		this.addCategory('korean', {
			url: templateDirectory + 'google-icon-korean.png',
			size: new google.maps.Size(50, 33),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(25, 33)
		});

		this.addCategory('sri-lankan', {
			url: templateDirectory + 'google-icon-sri-lankan.png',
			size: new google.maps.Size(50, 33),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(25, 33)
		});

		this.addCategory('vietnamese', {
			url: templateDirectory + 'google-icon-vietnamese.png',
			size: new google.maps.Size(50, 33),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(25, 33)
		});

		this.initializeEvents();

		return this;
	},

	/**
	 * Bind events for handling map legend for category selection.
	 */
	initializeEvents: function() {
		var this_ = this;

		$('.google-map-categories li').on('click', function() {
			var locationCategory = $(this).data('location-category');

			this_.toggleCategory(locationCategory);
		});

		return this;
	},

	/**
	 * Fit all markers on screen for desktop and tablet devices.
	 */
	finalize: function() {
		if (!this.isMobile()) {
			this.zoomToMarkers();
		}
	},

	/**
	 * Make an estimate on whether current viewport is on mobile.
	 * e.g., reduced width
	 *
	 * @return True if the viewport width is less than Bootstrap's xs-min-width.
	 */
	isMobile: function() {
		return $('.google-map-legend').is(':hidden');
	},

	/**
	 * Override parent method to change HTML that appears in the InfoWindow
	 * that pops when clicking a marker.
	 *
	getLocationHtml: function(location) {
	},
	*/
});
