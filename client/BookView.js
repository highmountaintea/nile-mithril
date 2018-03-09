const m = require('mithril');
const TopNavView = require('./TopNavView');
const LeftNavView = require('./LeftNavView');

function drawBook(item) {
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

const BookView = {
    oninit: async function(vnode) {
        try {
            this.isbn = vnode.attrs.isbn;
            this.book = (await m.request({
                method: 'POST',
                url: 'http://localhost:3570/listproducts',
                data: { isbn: [this.isbn] }
            }))[0];
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
                    m('div', { class: 'col-md-7' },
                        this.book ? drawBook(this.book) : ''
                    ),
                    m('div', { class: 'col-md-2' },
                        ''
                    )
                ),
            ),
        ];
    }
};

module.exports = BookView;
