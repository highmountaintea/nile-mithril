const m = require('mithril');
const TopNavView = require('./TopNavView');
const LeftNavView = require('./LeftNavView');

function drawHotItem(item) {
    return m('div', { class: 'row' },
        m('div', { class: 'col-md-auto' },
            m('img', { src: 'book-clip-art-20.jpg' })
        ),
        m('div', { class: 'col' },
            m('h3', { class: 'row' }, item.title),
            m('div', { class: 'row' }, item.author),
            m('div', { class: 'row' }, '$' + item.price),
        )
    );
}

const HomeView = {
    oninit: async function(vnode) {
        try {
            this.hotitems = [];
            this.hotitems = await m.request({
                method: 'GET',
                url: 'http://localhost:3570/listhotitems',
            });
        } catch(e) {
        }
    },
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
                        ...this.hotitems.map(drawHotItem)
                    ),
                ),
            ),
        ];
    }
};

module.exports = HomeView;
