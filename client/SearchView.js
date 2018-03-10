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
                m('a', { href: '/book/' + item.isbn, oncreate: m.route.link }, item.title)
            ),
            m('div', { class: 'row' }, item.author),
            m('div', { class: 'row' }, '$' + item.price.toFixed(2)),
        )
    );
}


const SearchView = {
    oninit: async function(vnode) {
        // console.log(args, requestPath);
        try {
            // console.log(vnode);
            this.term = decodeURIComponent(vnode.attrs.term);
            this.books = [];
            this.books = await m.request({
                method: 'POST',
                url: 'http://localhost:3570/listproducts',
                data: { textContent: this.term }
            });
        } catch(e) {
            console.log(e);
        }        
    },
    view: function(vnode) {
        // console.log(vnode);
        return [
            m(TopNavView),
            m('main', { role: 'main', class: 'container' },
                m('div', { class: 'row' },
                    m('div', { class: 'col-md-3' },
                        m(LeftNavView)
                    ),
                    m('div', { class: 'col-md-9' },
                        m('h1', this.term),
                        ...this.books.map(drawBook)
                    ),
                ),
            ),
        ];
    }
};

module.exports = SearchView;
