var MithChosen=function mithChosen(config) {

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




var config = {
    list: [],
    itemsPerPage: 999,
    sortByName: true,
    styles: {
	width: "200px",
        selectedBackground: 'black',
        selectedForeground: 'white',
        background: 'white',
        foreground: 'black'
    }
};


config.list = ['Tabriz', 'Istanbul','Karachi','Shanghai','Mumbai','Newyork','London','Adelaide','HongKong','Chicago','Baku','Cairo','Baghdad','Nairobi','Mexico'];

var mchosen = new MithChosen(config);

var main = {
    view: function() {
        return [
            m('button', {
                onclick: function() {
                    alert(mchosen.getSelected());
                }
            }, 'selected'),
            m('button', {
                onclick: function() {   
                    mchosen.update(['banana', 'apple', 'kiwi', 'orange']);
                }
            }, 'newList'),
            m('button', {
                onclick: function() {
                    mchosen.update(['Tabriz', 'Istanbul','Karachi',
				    'Shanghai','Mumbai','Newyork',
				    'London','Adelaide','HongKong',
				    'Chicago','Baku','Cairo',
				    'Baghdad','Nairobi','Mexico']);
                }
            }, 'oldList'),
            m.component(mchosen)
        ];
    }
};
var mdiv=document.querySelector('#mithchoser');
console.log(mdiv)
m.mount(mdiv, main);




