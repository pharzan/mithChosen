var InputBox = (function () {
    function inputBox() {
        this.current = m.prop('');
        this.list = m.prop([]);
        this.getData()
    }

    inputBox.prototype.updateList = function () {
        this.list([]);
        for (var i = 0; i < this.data.length; i++) {
            var lowerData = this.data[i].city.toLowerCase();
            var lowerCurrent = this.current().toLowerCase();
            var c = lowerData.indexOf(lowerCurrent);
            console.log("Compare : current", this.current(), "city", this.data[i].city, "returned:", c);
            if (c != -1) {
                console.log('C!=1 and so i :', i, 'data[i].city:', this.data[i].city);
                this.list().push(this.data[i].city)
            }

        }
        console.log('The List is:', this.list())

    };

    //GET DATA Later Will be AJAX
    inputBox.prototype.getData = function () {
        this.data = [
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

    };
    inputBox.prototype.view = function () {
        return [m('input', {
                oninput: m.withAttr('value', this.current),
                onchang: this.updateList()
            },
            this.current()),

            m('ul',
                this.list().map(
                    function (e) {
                        return m('li', e)
                    }
                )
            )
        ]


    };
    return inputBox;
})();

m.mount(document.body, new InputBox);
