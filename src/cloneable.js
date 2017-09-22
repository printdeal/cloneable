function Cloneable(item, config = {}) {
    this.$item = $(item);
    this.config = {
        addSelector: '.js-cloneable-add',
        removeSelector: '.js-cloneable-remove',
        slideDuration: 200,
        dataAttribute: 'data-ajax-url',
        addRequest: {
            type: 'GET',
            dataType: 'html'
        },
        removeRequest: {
            type: 'DELETE',
            dataType: 'json'
        },
        onBeforeAddHtml: function (response) {
            return response;
        },
        onBeforeRemove: function (response) {
            return true;
        }
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
            var url = self.getControlUrl(this);
            if (url !== null) {
                e.preventDefault();

                if(!self.locked) {
                    self.locked = true;

                    $.ajax({
                        type: self.config.addRequest.type,
                        dataType: self.config.addRequest.dataType,
                        url: url,
                        success: function (response) {
                            html = self.config.onBeforeAddHtml(response);
                            if (html !== null) {
                                self.add(html);
                            }
                            self.locked = false;
                        }
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
            var url = self.getControlUrl(this);
            if (url !== null) {
                e.preventDefault();

                if(!self.locked) {
                    self.locked = true;

                    $.ajax({
                        type: self.config.removeRequest.type,
                        dataType: self.config.removeRequest.dataType,
                        url: url,
                        success: function (response) {
                            var remove = self.config.onBeforeRemove(response);
                            if(remove) {
                                self.remove();
                            }
                            self.locked = false;
                        }
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
    },
    getControlUrl: function (control) {
        var dataAttributeUrl = $(control).attr(this.config.dataAttribute);

        if (dataAttributeUrl) {
            return dataAttributeUrl;
        }

        if (control.href) {
            return control.href;
        }

        return null;
    }
};
