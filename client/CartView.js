const m = require('mithril');
const TopNavView = require('./TopNavView');
const LeftNavView = require('./LeftNavView');
const actions = require('./modelactions');

const CartView = {
    oninit: async function(vnode) {
        // console.log(args, requestPath);
        try {
            // console.log(vnode);
            this.cart = actions.getCart();
            this.books = await m.request({
                method: 'POST',
                url: 'http://localhost:3570/listproducts',
                data: { isbn: this.cart.map(item => item.isbn) }
            });
            this.cart.forEach(item => { item.book = this.books.find(b => b.isbn === item.isbn )});
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
                    this.books != null ?
                        m('div', { class: 'col-md-9' },
                            m('h1', this.category),
                            m('table', { class: 'shoppingcart' },
                                m('tr',
                                    m('th', 'Title'),
                                    m('th', 'Price'),
                                    m('th', 'Quantity'),
                                    m('th', 'Total'),
                                ),
                                this.cart.map(item => m('tr',
                                    m('td', item.book.title),
                                    m('td', item.book.price),
                                    m('td', item.quantity),
                                    m('td', item.book.price * item.quantity)
                                )),
                                m('tr',
                                    m('td', ''),
                                    m('td', ''),
                                    m('td', ''),
                                    m('td', this.cart.reduce((sum, item) => sum + item.book.price * item.quantity, 0)),
                                )
                            )
                        ) :
                        null,
                ),
            ),
        ];
    }
};

module.exports = CartView;
