function mithChosen(config) {

    this.config = config || {
        list: [],
        width: 100,
        itemsPerPage: 10,
        sortByName: false
    };

    this.userInput = m.prop('');
    this.selected = '';
    this.init();
}

mithChosen.prototype.init = function(param) {
    this.updateList(this.config.list);
};

mithChosen.prototype.updateList = function(foundItems) {
    this.list = foundItems;
    var perPage = this.config.itemsPerPage;
    var sort = this.config.sortByName;
};

mithChosen.prototype.update = function(newList) {

    this.list = newList;
    this.config.list = newList;
    var perPage = this.config.itemsPerPage;
    var sort = this.config.sortByName;


};

mithChosen.prototype.find = function() {

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

mithChosen.prototype.getSelected = function() {
    return this.selected;

};

mithChosen.prototype.view = function() {
    var self = this;
    return m('.mithChosen',
        m('input', {
                oninput: m.withAttr('value', this.userInput),
                onkeyup: this.find()

            },
            this.userInput()),
        m('ol', {
                style: {
                    width: self.config.styles.width
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


module.exports = mithChosen;
