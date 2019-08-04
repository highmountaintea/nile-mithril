const m = require('mithril');
const TopNavView = require('./TopNavView');
const LeftNavView = require('./LeftNavView');

function drawBook(item) {
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


function SearchView({ attrs }) {
    let term = decodeURIComponent(attrs.term);
    let books = [];

    async function oninit({ attrs }) {
        try {
            books = await m.request({
                method: 'POST',
                url: MITHRIL_SERVER_URL + '/listproducts',
                body: { textContent: term.replace(/\s+/g, '[^]+') }
            });
        } catch (e) {
            console.log(e);
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
                        m('h1', term),
                        ...books.map(drawBook)
                    ),
                ),
            ),
        ];
    }

    return { oninit, view };
};

module.exports = SearchView;
