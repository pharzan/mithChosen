(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.MithChosen=function mithChosen(config) {

    this.config = config || {
        list: [],
        width: 100,
        itemsPerPage: 999,
        sortByName: false
    };
    this.userInput = m.prop('');
    this.selected = '';
    this.showResults=false;

    this.updateList = function(foundItems) {

	this.list = foundItems;
	var perPage = this.config.itemsPerPage;
	var sort = this.config.sortByName;
	
    };

    this.update = function(newList) {
	m.startComputation();
	this.list = newList;
	this.config.list = newList;
	var perPage = this.config.itemsPerPage;
	var sort = this.config.sortByName;
	m.endComputation();
    };

    this.find = function() {

	var self = this;
	var foundItems = [];
	this.config.list.map(function(item) {
            var lowerItem = item.toLowerCase();

            if (lowerItem.indexOf(self.userInput()) > -1) {
		foundItems.push(item);
            }
	});


	this.updateList(foundItems);
    };

    this.getSelected = function() {
	return this.selected;

    };

    this.view = function() {
	var self = this;
	return m('.mithChosen',
		 m('input', {
		     style:{
			 width: self.config.styles.width
		     },
		     config:function(e,isinit){
			 if(isinit)
			     return;
			 self.inputElement=e;
		     },
                     oninput: m.withAttr('value', this.userInput),
                     onkeyup: this.find(),
		     onfocus:function(){
			 
			 self.showResults=true;
		     },
		     onblur:function(){
			 setTimeout(function(){
			     m.startComputation();
			     self.showResults=false;
			     m.endComputation();
			 },150);
		     }
		     
		 },
		   this.userInput()),
		 this.showResults?m('.mithChosenResults',
		   m('ol', {
                       style: {
			   width: self.config.styles.width,
			   maxHeight:'250px',
			   overflowY:'auto',
			   background:'white',
			   position:'absolute',
			   zIndex:'99'
                       }
		   },
		     this.list.map(
			 function(listItem, i) {
			     if (i >= self.config.itemsPerPage)
				 return;
			     else
                               return m('li', {
				   onclick: function(e) {
                                       self.selected = e.target.innerText;
				       self.inputElement.value = self.selected;
				       console.log('aaa',self.inputElement);
				       
				       
				   },
				   onmouseover: function(e) {
                                       var background = self.config.styles.selectedBackground;
                                       var foreground = self.config.styles.selectedForeground;

                                       e.target.style.background = background;
                                       e.target.style.color = foreground;

				   },
				   onmouseout: function(e) {
                                       var background = self.config.styles.background;
                                       var foreground = self.config.styles.foreground;

                                       e.target.style.background = background;
                                       e.target.style.color = foreground;
				   }
                               }, listItem);
			 }))
			      ):null);
		};

    
}





},{}],2:[function(require,module,exports){
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

},{"./lib/mithChosen.js":1}]},{},[2]);
