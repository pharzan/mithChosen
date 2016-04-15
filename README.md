# mithChosen
This code is a simple implementation of a list chooser with a search and sort capability. Intended to be used as a component for [mithril js](http://mithril.js.org). It includes methods to update the list on the fly and also set style in the config file.

[Live od jsFiddle](https://jsfiddle.net/pharzan/hr7vcujL/)

*usage:*

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

inp = new inputBox(config);
// The list may be updated at any time using the update() method.

 inp.update(['Tabriz', 'Istanbul','Karachi',
				    'Shanghai','Mumbai','Newyork',
				    'London','Adelaide','HongKong',
				    'Chicago','Baku','Cairo',
				    'Baghdad','Nairobi','Mexico']);
					
// or it can be provided when instantiating.

```

### Stuff used to make this:

 * [mithril js](http://mithril.js.org) Framework
