# Google Maps Categorizable Markers

A very opinionated implementation to display a categorized list of location markers in a Google Map.

### Features

* Group one of more marker together
* Assign custom icon for each category group
* Toggle visibility for all markers in a category
* Add category filter controls
* Auto binds google.maps.Marker clicks to a managed google.maps.InfoWindow instance

### Requirements

* [jQuery 1.8+]
* [Google Maps JavaScript API v3]
* [API key for Google Maps JavaScript API v3]
* moderate ability with HTML5 and JavaScript

### Examples

* _[Uncategorized]_

  Simple zoom and geolocation alignment to focus on one marker without a unique category or icon.

* _[Restaurants]_

  Clown car visualisation of some Asian cuisines available in Melbourne's inner-north suburbs. If you feel insulted by the flag ruthlessly selected for any one location, feel free to direct hate mail to my address listed below. It will be promptly filtered accordingly.
  - uses Bootstrap 3, to ease layout creation and allow additional JavaScript logic to behave differently based on viewport width.
  - ticking those boxes is like a match of Risk playing out. #ukraineisgametoyou

### Usage

Example HTML:

```html
<div class="your-map-canvas"></div>
```

#### Instantiation

Basic use case:

```javascript
var yourMap = new CategorizableMap('.your-map-canvas');
```

More advanced customizing:

```javascript
var YourMap = CategorizableMap.extend({
	init: function(el) {
		this._super(el);
	}

	// override methods or change options here
}

var yourMap = new YourMap('.your-map-canvas');
```

* You _must_ invoke `this._super(el)` or `this._super(el, options)`
  in the `init()` constructor of your child class.

#### Creating Markers

```javascript
var yourMarkerIcon = {
	url: 'your-marker-icon.png',
	size: new google.maps.Size(40, 30),
	origin: new google.maps.Point(0, 0),
	anchor: new google.maps.Point(20, 30)
};

yourMap.addCategory('your-category-name', yourMarkerIcon);
yourMap.addMarker('your-category-name', lat, lng, {name: 'Marker label'});
```

* Analyze JavaScript in the _Restaurants_ example for a clear use case on how to go about adding locations markers to a map.

### _CategorizableMap_ Class Customization

As in the above custom constructor, you may change default map options or
override default functionality through an extending child class. These are
the important `CategorizableMap` class methods to keep in mind:

* `init(el, options)`

  Constructor to instantiate Google Maps on `el`. Properties for `options`:
  + `latLng` - google.maps.LatLng to center map (default: approx visual centre of populated Australia)
  + `scrollwheel` - enable mousewheel on mobile (default: true)
  + `zoom` - level when map first loads (default: 5)
  + `mapOptions` - second parameter of `google.maps.Map` constructor
  + `style` - look-and-feel customisations

* `addCategory(category, icon)`

  Define a new category and its custom icon.
* `addMarker(category, lat, lng, location, visible, animation)`

  Assign a new marker to the category that should be defined before using it.
  Otherwise the marker will display the default Google Maps icon.
  This method supports variable parameters:
  - `addMarker(category, lat, lng, location, visible)`
  - `addMarker(category, lat, lng, location)`
  - `addMarker(lat, lng, location)`
  - `addMarker(lat, lng, location, visible)`
  - `addMarker(lat, lng, location, visible, animation)`
* `initializeEvents()`

  Invoked when each tile in the map has loaded. Useful for binding
  category controller events.
* `zoomToMarkers()`

  Fit map's zoom and alignment to display all markers selected for view.
* `getLocationHtml(location)`

  Form HTML displayed in the google.maps.InfoWindow for a marker.
  `location` parameter is the same object passed into `addMarker()`.
  Currently assumed this object contains attribute `name`
  to use as a default InfoWindow label. String concatenation in place
  is archaic so you may want to instead use a templating system.
* `toggleCategory(category, animation)`

  Change visibility for all markers within the category.
  Also toggles the `active` class on DOM elements where attribute
  `data-location-category` = `category`

### Limitations

* If markers overlap, the first one added to the map will override subsequental markers. In the restaurants example, there are two locations in the Bourke Street Mall however only the Chinese restaurant is displayed. I only hope this not cause an international incident.
* Each marker can be assigned only one category since it has single icon.
* Must know GPS coordinates for each marker as this library doesn't support auto-lookup based on an address string.

### To Do

* implement [OverlappingMarkerSpiderfier] to handle overlapping markers

### Build

If you wish to fork this project to modify the underlying base classes, from
the project root:

* Install [npm]
* move `package.json` out of the project root directory (or else the npm will
  attempt to use it as gulp's local configuration)
* Install [gulp]
  - `npm install --global gulp`
  - `npm install --save-dev gulp`
  - `npm install --save-dev gulp-concat`
  - `npm install --save-dev gulp-header`
  - `npm install --save-dev gulp-uglify`
  - `npm install --save-dev gulp-rename`
* move `package.json` back to the project's root
* From the project root, run `gulp` which will concatenate and minify to
  `dist/categorizable-map.min.js`

If you add new `src/` files to the build process, also add their path to the
`files` property in project root file `package.json`.

### License

MIT


### Credits

* [Derek MacDonald] ([@derekmdcom])
* Uses John Resig's [Simple JavaScript Inheritance model]

[jQuery 1.8+]:https://developers.google.com/speed/libraries/devguide#jquery
[Google Maps JavaScript API v3]:https://developers.google.com/maps/documentation/javascript/
[API key for Google Maps JavaScript API v3]:https://developers.google.com/maps/documentation/javascript/tutorial#api_key
[Uncategorized]:https://github.com/derekmd/google-maps-categorized-markers/tree/master/examples/uncategorized/uncategorized.html
[Restaurants]:https://github.com/derekmd/google-maps-categorized-markers/tree/master/examples/restaurants/restaurants.html
[Simple JavaScript Inheritance model]:http://ejohn.org/blog/simple-javascript-inheritance/
[OverlappingMarkerSpiderfier]:https://github.com/jawj/OverlappingMarkerSpiderfier
[npm]:https://github.com/npm/npm
[gulp]:https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md
[Derek MacDonald]:http://derekmd.com/
[@derekmdcom]:https://twitter.com/derekmdcom