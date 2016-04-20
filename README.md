# mithChosen
This code is a simple implementation of a list chooser with a search and sort capability. Intended to be used as a component for [mithril js](http://mithril.js.org). It includes methods to update the list on the fly and also set style in the config file.
Made for mithril it intends to give a similar functionality to of the [chosen](https://harvesthq.github.io/chosen/) plugin made for jquery.

For an example visit the jsFiddle link below or use the example provided in the repository.
to use the component simple add the code in the lib to your js file either by require or using it directly and add it as a component in the main view of the mounted object. see below for more info
[Live od jsFiddle](https://jsfiddle.net/pharzan/hr7vcujL/)

*Usage:*

Create an instance with a config:
```
var config = {
    list: [], //the list
   
    itemsPerPage: 10, //number of items shown in the list
    sortByName: true, //sort
    styles: { 
		width: "200px", //width of the list
        selectedBackground: 'black', 
        selectedForeground: 'white',
        background: 'white',
        foreground: 'black'
    }
};

var chosen = new MithChosen(config);
// The list may be updated at any time using the update() method.

chosen.update(['Tabriz', 'Istanbul','Karachi',
				    'Shanghai','Mumbai','Newyork',
				    'London','Adelaide','HongKong',
				    'Chicago','Baku','Cairo',
				    'Baghdad','Nairobi','Mexico']);
					
// or it can be provided when instantiating.

```
Add the component to your main view using mithrils m.component utilty and mount that object to the DOM.

```JS
var main = {
	view: function(){
		return m.component(chosen)
	}
}
m.mount(document.body,main);
```
### Stuff used to make this:

 * [mithril js](http://mithril.js.org) Framework
 * [chosen](https://harvesthq.github.io/chosen/) plugin for jquery
