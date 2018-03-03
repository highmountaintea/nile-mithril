const m = require('mithril');

const LeftNavView = {
    view: function(vnode) {
        return m('ul',
            m('li', 'category1'),
            m('li', 'category1'),
            m('li', 'category1'),
        );
    }
};

module.exports = LeftNavView;
