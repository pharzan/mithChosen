var Chosen=require('./lib/mithChosen.js').MithChosen;

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
var chosen=new Chosen(config);

// The list may be updated at any time using the update() method.

chosen.update(['Tabriz', 'Istanbul','Karachi',
                    'Shanghai','Mumbai','Newyork',
                    'London','Adelaide','HongKong',
                    'Chicago','Baku','Cairo',
                    'Baghdad','Nairobi','Mexico']);

var main = {
    view: function(){
        return m.component(chosen)
    }
};

m.mount(document.body,main);
