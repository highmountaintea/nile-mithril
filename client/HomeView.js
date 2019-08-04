const m = require('mithril');
const TopNavView = require('./TopNavView');
const LeftNavView = require('./LeftNavView');

function drawHotItem(item) {
    return m('div', { class: 'row' },
        m('div', { class: 'col-md-auto' },
            m('img', { src: 'book-clip-art-20.jpg' })
        ),
        m('div', { class: 'col' },
            m('h3', { class: 'row' },
                m(m.route.Link, { href: '/book/' + item.isbn }, item.title)
            ),
            m('div', { class: 'row' }, item.author),
            m('div', { class: 'row' }, '$' + item.price.toFixed(2)),
        )
    );
}

function HomeView({ attrs }) {
    let hotitems = [];

    async function oninit({ attrs }) {
        try {
            hotitems = await m.request({
                method: 'GET',
                url: MITHRIL_SERVER_URL + '/listhotitems',
            });
        } catch (e) {
        }    
    }

    function view({ attrs }) {
        return [
            m(TopNavView),
            m('main', { role: 'main', class: 'container' },
                m('div', { class: 'row' },
                    m('div', { class: 'col-md-3' },
                        m(LeftNavView)
                    ),
                    m('div', { class: 'col-md-9' },
                        m('h1', 'Hot Items'),
                        ...hotitems.map(drawHotItem)
                    ),
                ),
            ),
        ];
    }

    return { oninit, view };
}

module.exports = HomeView;
