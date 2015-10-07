var inputBox = (function () {
    /*
     inputbox chooser with Mithril
     Created By: Farzan Tinati
     Date: 10/5/2015
     Version: 0.4
     ********************************
     Usage:
     you can provide your data directly while creating the object
     inp = new inputBox([{city:'CityName1',selected:false},{city:'CityName2',selected:false}])
     or you may provide a url for an AJAX request
     inp = new inputBox('/somewhere/somehow');
     the AJAX call must return an OBJECT as a response.
     */

    function InputBox(config) {
        this.config = {};
        this.config.data = m.prop([]);
        this.config.width = m.prop(100);
        this.config.itemsPerPage = m.prop(10);
        this.config.sortByName = m.prop(false);
        this.config.style = m.prop('none');
        this.current = m.prop('');
        this.list = m.prop([]);
        //this.data = m.prop([{}]);
        this.completed = m.prop(false);
        this.inputCssClass = m.prop('');
        this.init(config);
        this.stylize()


    }

    InputBox.prototype.init = function (param) {

        for (var key in param) {
            //   console.log('key::',key,'*** this.config[key]::',this.config[key](),'*** param[key]::',param[key]);
            this.config[key](param[key])
        }
        if (typeof(this.config['data'])=='string'){
            this.getData()
        }else{
            this.completed(true)
        }
       // console.warn(this.config)

        this.updateList()
    };
    InputBox.prototype.stylize = function () {
        // console.log('config', this.config);
        switch (this.config["style"]) {
            case "night":
                console.info('Night Theme Selected');
                this.inputCssClass(".inputBoxNight");
                break;

        }

    };
    InputBox.prototype.updateList = function () {
        this.list([]);

        if (this.config.data()) {
            for (var i = 0; i < this.config.data().length; i++) {
          //      console.info(this.config.data())
                var lowerData = this.config.data()[i].name.toLowerCase();
                var lowerCurrent = this.current().toLowerCase();
                   console.log('****', this.config.data()[i].name, i, lowerData, lowerCurrent);
                var c = lowerData.indexOf(lowerCurrent);
                console.log("Compare : current", this.current(), "city", this.config.data()[i].name, "returned:", c,"items Per Page::",this.config.itemsPerPage());
                if (c != -1 && this.list().length<=this.config.itemsPerPage()) {
                    this.list().push(this.config.data()[i].name);
                        console.log('C!=1 and so at [i]teration: ', i, ' data[' + i + '].city:', this.config.data()[i].name, 'Length of List', this.list().length);

                }
                //   console.log(this.config);
                if (this.config['sortByName'] == true) {
                    this.list().sort();
                }

            }
              console.log('The List is:', this.list());
            m.redraw()
        }
    };
    //GET DATA Later Will be AJAX
    InputBox.prototype.getData = function (url) {
       // console.log("--------------------URL has been set--------------------", url);
        var _this = this;

        var greetAsync = function () {
            var deferred = m.deferred();
            setTimeout(function () {
                deferred.resolve([{city: 'Tabriz', selected: false}, {city: 'Istanbul', selected: false}]);
            }, 1000);
            return deferred.promise;
        };

        greetAsync()
            .then(function (response) {
                _this.config.data(response);
                _this.completed(true);
             //   console.log('AJAX Response::', response, 'completed::', _this.completed());
                m.redraw();
                _this.updateList();
                return _this

            })
    };
    InputBox.prototype.view = function () {

        return [m('input' + this.inputCssClass(), {
                oninput: m.withAttr('value', this.current),
                onchange: this.completed() ? this.updateList() : ""
            },
            this.current()),
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
    data: [
        {name: 'tabriz', selected: false},
        {name: 'istanbul', selected: false},
        {name: 'Ankara', selected: false},
        {name: 'London', selected: false},
        {name: 'newYork', selected: false},
        {name: 'Tehran', selected: false},
        {name: 'Shanghai', selected: false},
        {name: 'Mambai', selected: false},
        {name: 'Adelaide', selected: false},
        {name: 'Chicago', selected: false},
        {name: 'Baku', selected: false},
        {name: 'Karachi', selected: false}
    ],
    width: 4464,
    itemsPerPage: 5,
    sortByName: true,
    style: 'night'
};


dummyDataObj = [

    {
        city: 'Tabriz',
        selected: false
    },
    {
        city: 'Istanbul',
        selected: false
    },
    {
        city: 'Karachi',
        selected: false
    },
    {
        city: 'Shanghai',
        selected: false
    },
    {
        city: 'Mumbai',
        selected: false
    },
    {
        city: 'Newyork',
        selected: false
    },
    {
        city: 'London',
        selected: false
    },
    {
        city: 'Adelaide',
        selected: false
    },
    {
        city: 'HongKong',
        selected: false
    },
    {
        city: 'Chicago',
        selected: false
    },
    {
        city: 'Baku',
        selected: false
    },
    {
        city: 'Cairo',
        selected: false
    },
    {
        city: 'Baghdad',
        selected: false
    },
    {
        city: 'Nairobi',
        selected: false
    },
    {
        city: 'Mexico',
        selected: false
    }
];
//inp = new inputBox([{city:'Config',selected:false},{city:'Test',selected:false}]);
inp = new inputBox(config);
//inp = new inputBox();

m.mount(document.getElementById('inputBox'), inp);
