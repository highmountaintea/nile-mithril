const m = require('mithril');
const TopNavView = require('./TopNavView');

const CartView = {
    view: function(vnode) {
        return [
            m(TopNavView),
            m('main', { role: 'main', class: 'container' },
                m('div', { class: 'starter-template' },
                    m('h1', 'Dummy Cart')
                ),
            ),
        ];
    }
};

module.exports = CartView;
