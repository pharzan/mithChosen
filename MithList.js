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
        this.config = m.prop({});
        this.config.data = m.prop([]);
        this.config.width = m.prop(100);
        this.config.itemsPerPage = m.prop(10);
        this.config.sortByName = m.prop(false);
        this.config.style = m.prop('none');
        this.config.url = m.prop('');
        // the var for userInput value in the input box
        this.userInput = m.prop('');
        // the var for list shown in the view part
        this.list = m.prop([]);
        // if set to true data in the config exists
        //
        this.completed = m.prop(false);
        this.inputCssClass = m.prop('');
        this.init(config);
        this.stylize()


    }

    InputBox.prototype.init = function (param) {

        for (var key in param) {
            this.config[key](param[key])
        }
        if (this.config.url() != '') {
            this.getData()
        } else {
            this.completed(true)
        }

        this.updateList()
    };
    InputBox.prototype.stylize = function () {

        switch (this.config["style"]()) {
            case "night":
                this.inputCssClass(".inputBoxNight");
                break;

        }

    };

    InputBox.prototype.updateList = function () {
        this.list([]);

        var theList = this.list(),
            theData = this.config.data();

        if (theData.length) {

            for (var i = 0; i < theData.length; i++) {

                var dataElement = theData[i],
                    lowerCaseName = dataElement.name.toLowerCase(),
                    lowerInputBoxValue = this.userInput().toLowerCase(),
                    nameIdx = lowerCaseName.indexOf(lowerInputBoxValue);

                if (nameIdx != -1 && theList.length < this.config.itemsPerPage()) {
                    theList.push(theData[i].name);
                }

            }
            if (this.config.sortByName()) {
                theList.sort();
            }
        }
    };

    //GET DATA Later Will be AJAX
    InputBox.prototype.getData = function () {
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
                IB.completed(true);
                IB.updateList();
                m.endComputation();
            })
    };

    InputBox.prototype.view = function () {
        return [m('input' + this.inputCssClass(), {
                oninput: m.withAttr('value', this.userInput),
                onchange: this.completed() ? this.updateList() : ""
            },
            this.userInput()),
            m('ul',
                this.list().map(
                    function (e) {
                        return m('li', e)
                    }
                )
            )]
    };
    return InputBox;
})();

config = {
    data: [],
    width: 4464,
    itemsPerPage: 6,
    sortByName: true,
    style: 'night',
    url: 'URL'
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
