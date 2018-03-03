const m = require('mithril');
const TopNavView = require('./TopNavView');
const LeftNavView = require('./LeftNavView');

const HomeView = {
    view: function(vnode) {
        return [
            m(TopNavView),
            m('main', { role: 'main', class: 'container' },
                m('div', { class: 'row' },
                    m('div', { class: 'col-md-3' },
                        m(LeftNavView)
                    ),
                    m('div', { class: 'col-md-9' },
                        m('h1', 'Hot Items'),
                        m('div', { class: 'row' },
                            m('div', { class: 'col-md-auto' },
                                m('img', { src: 'book-clip-art-20.jpg' })
                            ),
                            m('div', { class: 'col' },
                                m('h3', { class: 'row' }, 'Programming This and That'),
                                m('div', { class: 'row' }, 'Albert Einstein'),
                                m('div', { class: 'row' }, '$12.00'),
                            )
                        ),
                        m('div', { class: 'row' },
                            m('div', { class: 'col-md-auto' },
                                m('img', { src: 'book-clip-art-20.jpg' })
                            ),
                            m('div', { class: 'col' },
                                m('h3', { class: 'row' }, 'Programming This and That'),
                                m('div', { class: 'row' }, 'Albert Einstein'),
                                m('div', { class: 'row' }, '$12.00'),
                            )
                        )
                    ),
                ),
            ),
        ];
    }
};

module.exports = HomeView;
