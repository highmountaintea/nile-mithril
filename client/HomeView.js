const m = require('mithril');
const TopNavView = require('./TopNavView');
const LeftNavView = require('./LeftNavView');

const HomeView = {
    view: function(vnode) {
        return [
            m(TopNavView),
            m('main', { role: 'main', class: 'container' },
                m('div', { class: 'row' },
                    m('div', { class: 'col-md-4' },
                        m(LeftNavView)
                    ),
                    m('div', { class: 'col-md-8' },
                        m('h1', 'Dummy Cart')
                    ),
                ),
            ),
        ];
    }
};

module.exports = HomeView;
