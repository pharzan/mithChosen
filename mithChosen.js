var inputBox = (function () {
    /*
     inputbox chooser with Mithril
     ********************************
     Usage:
     create an object with the configuration as followed

     config = {
     data: [],           // The data goes here
     width: 4464,        // width
     itemsPerPage: 6,    // Items to show in the list
     sortByName: true,   // sort alphabetically or not
     style: 'night',     // you can provide a theme, the themes are set in the css file and set the classes according night
     url: 'URL'          // The URL for the AJAX request
     };

     If a URL is provided and also a data is set at the data part, the AJAX response overwrites the old data
     */

    function InputBox(config) {
        this.config = config || {
            list: [],
            width: 100,
            itemsPerPage: 10,
            sortByName: false
        };

        // the var for userInput value in the input box
        this.userInput = m.prop('');
        // the var for list shown in the view part
        // this.list = m.prop([]);
        this.init()
        


    }

    InputBox.prototype.init = function (param) {

        // for (var key in param) {
        //     this.config()[key] = param[key]
        // }
	this.list=this.config.list;
        this.updateList();
    };


    InputBox.prototype.updateList = function (newList) {
        //this.list([]);
        
        var perPage = this.config.itemsPerPage;
        var sort = this.config.sortByName;
        this.list=newList;    
	
    };

    InputBox.prototype.find=function(){
	
	var self=this;
	var foundItems=[];
	this.config.list.map(function(item){
	    
	    var lowerItem = item.name.toLowerCase();
	
	    if(lowerItem.indexOf(self.userInput())>-1){
		foundItems.push(item);
	    } 	    
	});
	this.updateList(foundItems)
    };
    InputBox.prototype.view = function () {
        return [m('input' ,
            {
                oninput: m.withAttr('value', this.userInput),
                onkeyup: this.find()
                
            },
            this.userInput()),
            m('ul',
                this.list.map(
                    function (listItem) {
                        return m('li', listItem.name)
                    }
                )
            )]
    };
    return InputBox;
})();

config = {
    list: [],
    width: 4464,
    itemsPerPage: 8,
    sortByName: true
};


config.list = [

    {
        name: 'Tabriz',
        selected: false
    },
    {
        name: 'Istanbul',
        selected: false
    },
    {
        name: 'Karachi',
        selected: false
    },
    {
        name: 'Shanghai',
        selected: false
    },
    {
        name: 'Mumbai',
        selected: false
    },
    {
        name: 'Newyork',
        selected: false
    },
    {
        name: 'London',
        selected: false
    },
    {
        name: 'Adelaide',
        selected: false
    },
    {
        name: 'HongKong',
        selected: false
    },
    {
        name: 'Chicago',
        selected: false
    },
    {
        name: 'Baku',
        selected: false
    },
    {
        name: 'Cairo',
        selected: false
    },
    {
        name: 'Baghdad',
        selected: false
    },
    {
        name: 'Nairobi',
        selected: false
    },
    {
        name: 'Mexico',
        selected: false
    }
];
var inp = new inputBox(config);
m.mount(document.body, inp);
