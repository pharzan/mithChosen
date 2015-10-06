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
        this.config = {itemsPerPage: 10, sortByName: false, style: 'none'};
        this.current = m.prop('');
        this.list = m.prop([]);
        this.data = m.prop([{}]);
        this.completed = m.prop(false);
        this.inputCssClass = m.prop('');
        this.init(config);
        this.stylize()


    }

    InputBox.prototype.init = function (param) {
        console.log('this in init function:', this);
        if (param['dataSet']) {
            this.data(param['dataSet']);
            this.completed(true);
        }
        if (param['itemsPerPage']) {
            this.config['itemsPerPage'] = param['itemsPerPage']
        }
        if (param['sortByName']) {
            this.config['sortByName'] = param['sortByName']
        }
        if (param['style']) {
            this.config['style'] = param['style']
        }

        this.updateList()
    };
    InputBox.prototype.stylize = function () {
        console.log('config', this.config);
        switch (this.config["style"]) {
            case "night":
                console.info('Night Theme Selected');
                this.inputCssClass(".inputBoxNight");
                break;

        }

    };
    InputBox.prototype.updateList = function () {
        this.list([]);

        if (this.data()) {
            for (var i = 0; i < this.data().length; i++) {
                var lowerData = this.data()[i].name.toLowerCase();
                var lowerCurrent = this.current().toLowerCase();
                console.log('****', this.data()[i].name, i, lowerData, lowerCurrent);
                var c = lowerData.indexOf(lowerCurrent);
                //console.log("Compare : current", this.current(), "city", this.data[i].city, "returned:", c);
                if (c != -1 && this.list().length < this.config['itemsPerPage']) {

                    this.list().push(this.data()[i].name);
                    console.log('C!=1 and so at [i]teration: ', i, ' data[' + i + '].city:', this.data()[i].name, 'Length of List', this.list().length);

                }
                console.log(this.config);
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
        console.log("--------------------URL has been set--------------------", url);
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
                _this.data(response);
                _this.completed(true);
                console.log('AJAX Response::', response, 'completed::', _this.completed());
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
    dataSet: [
        {name: 'tabriz', selected: false},
        {name: 'istanbul', selected: false},
        {name: 'Ankara', selected: false},
        {name: 'London', selected: false},
        {name: 'newYork', selected: false},
        {name: 'Tehran', selected: false}],
    width: 4464,
    height: 2367238,
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

m.mount(document.body, inp);
