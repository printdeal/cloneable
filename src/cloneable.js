function Cloneable(item, config = {}) {
    this.$item = $(item);
    this.config = {
        addSelector: '.js-cloneable-add',
        removeSelector: '.js-cloneable-remove',
        slideDuration: 200
    };
    this.config = $.extend(this.config, config);
    this.locked = false;
    this.init();
}

Cloneable.prototype = {
    init: function () {
        this.bindAddHandler();
        this.bindRemoveHandler();
    },
    bindAddHandler: function () {
        var self = this;
        this.$item.find(this.config.addSelector).on('click', function (e) {
            if (this.href) {
                e.preventDefault();

                if(!self.locked) {
                    self.locked = true;

                    $.ajax({
                        type: 'GET',
                        url: this.href,
                        success: function (response) {
                            self.add(response);
                            self.locked = false;
                        },
                        dataType: 'html'
                    });
                }

                return;
            }

            self.add(self.$item[0].outerHTML);
        });
    },
    bindRemoveHandler: function () {
        var self = this;
        this.$item.find(this.config.removeSelector).on('click', function (e) {
            if (this.href) {
                e.preventDefault();

                if(!self.locked) {
                    self.locked = true;

                    $.ajax({
                        type: 'DELETE',
                        url: this.href,
                        success: function (response) {
                            self.remove();
                            self.locked = false;
                        },
                        dataType: 'json'
                    });
                }

                return;
            }

            self.remove();
        });
    },
    add: function (html) {
        $newItem = $(html);
        $newItem.hide();
        this.$item.after($newItem);
        $newItem.slideDown(this.config.slideDuration);
        new Cloneable($newItem[0], this.config);
    },
    remove: function () {
        this.$item.slideUp(this.config.slideDuration);
    }
};
