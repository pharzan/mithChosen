var inputBox = (function() {

    function InputBox(config) {
	
        this.config = config || {
            list: [],
            width: 100,
            itemsPerPage: 10,
            sortByName: false
        };

        this.userInput = m.prop('');
        this.selected = '';
        this.init();
	var a='hi';
	
    }
    function _updateList(newList) {
	
        self.list = newList;
	};

    InputBox.prototype.init = function(param) {
        this.updateList(this.config.list);
    };
    
    InputBox.prototype.updateList = function(foundItems) {
        this.list = foundItems;
        var perPage = this.config.itemsPerPage;
        var sort = this.config.sortByName;	
    };
    
    InputBox.prototype.update = function(newList) {
	
        this.list = newList;
        this.config.list = newList;
        var perPage = this.config.itemsPerPage;
        var sort = this.config.sortByName;

	
    };

    InputBox.prototype.find = function() {

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

    InputBox.prototype.getSelected = function() {
        return this.selected;

    };

    InputBox.prototype.view = function() {
        var self = this;
        return m('.mithChosen',
		 m('input', {
                     oninput: m.withAttr('value', this.userInput),
                     onkeyup: this.find()
		     
                },
                this.userInput()),
		 m('ol', {style:{width:self.config.styles.width}},
                this.list.map(
                    function(listItem, i) {
                        if (i >= self.config.itemsPerPage)
                            return;
                        else
                            return m('li', {
                                onclick: function(e) {
                                    self.selected = e.target.innerText;

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
        );
    };

    return InputBox;
})();

var config = {
    list: [],
    itemsPerPage: 10,
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

var inp = new inputBox(config);

var main = {
    view: function() {
        return [
            m('button', {
                onclick: function() {
                    alert(inp.getSelected());
                }
            }, 'selected'),
            m('button', {
                onclick: function() {   
                    inp.update(['banana', 'apple', 'kiwi', 'orange']);
                }
            }, 'newList'),
            m('button', {
                onclick: function() {
                    inp.update(['Tabriz', 'Istanbul','Karachi',
				    'Shanghai','Mumbai','Newyork',
				    'London','Adelaide','HongKong',
				    'Chicago','Baku','Cairo',
				    'Baghdad','Nairobi','Mexico']);
                }
            }, 'oldList'),
            m.component(inp)
        ];
    }
};

m.mount(document.body, main);

