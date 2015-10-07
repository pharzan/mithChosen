var inputBox = (function () {
    /*
     inputbox chooser with Mithril
     Created By: Farzan Tinati
     Date: 10/5/2015
     Version: 0.4
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
        this.config = m.prop({
            data: [],
            width: 100,
            itemsPerPage: 10,
            sortByName: false,
            url: ''
        });

        // the var for userInput value in the input box
        this.userInput = m.prop('');
        // the var for list shown in the view part
        this.list = m.prop([]);
        // if set to true data in the config exists
        //

        this.inputCssClass = m.prop('');
        this.init(config);


    }

    InputBox.prototype.init = function (param) {

        for (var key in param) {
            this.config()[key] = param[key]
        }
        if (this.config.url) {
            this.getAjaxData()
        }
        this.updateList()
    };


    InputBox.prototype.updateList = function () {
        this.list([]);

        var theList = this.list(),
            config = this.config(),
            theData = config.data;


        for (var i = 0; i < theData.length; i++) {
            var dataElement = theData[i],
                lowerCaseName = dataElement.name.toLowerCase(),
                lowerInputBoxValue = this.userInput().toLowerCase(),
                nameIdx = lowerCaseName.indexOf(lowerInputBoxValue);

            if (nameIdx != -1 && theList.length < config.itemsPerPage) {
                theList.push(dataElement);
            }
        }

        if (theList.length && config.sortByName) {
            theList.sort();
        }
    };

    //GET DATA Later Will be AJAX
    InputBox.prototype.getAjaxData = function () {
        var IB = this,
            greetAsync = function () {
                var deferred = m.deferred();
                setTimeout(function () {
                    deferred.resolve([
                        {name: 'Tabriz', selected: false},
                        {name: 'Istanbul', selected: false}
                    ]);
                }, 1000);
                return deferred.promise;
            };

        greetAsync()
            .then(function (response) {
                m.startComputation();
                IB.config.data(response);
                IB.updateList();
                m.endComputation();
            })
    };

    InputBox.prototype.view = function () {
        return [m('input' ,
            {
                oninput: m.withAttr('value', this.userInput),
                onkeyup: this.updateList.bind(this),
                class:'ChMithInputBoxClass'
            },
            this.userInput()),
            m('ul',
                this.list().map(
                    function (listItem) {
                        return m('li', listItem.name)
                    }
                )
            )]
    };
    return InputBox;
})();

config = {
    data: [],
    width: 4464,
    itemsPerPage: 3,
    sortByName: true,
    url: ''
};


config.data = [

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
inp = new inputBox(config);
m.mount(document.body, inp);
