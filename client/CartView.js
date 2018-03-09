const m = require('mithril');
const TopNavView = require('./TopNavView');
const LeftNavView = require('./LeftNavView');
const actions = require('./modelactions');

async function getCart() {
    let cart = actions.getCart();
    let books = await m.request({
        method: 'POST',
        url: 'http://localhost:3570/listproducts',
        data: { isbn: cart.map(item => item.isbn) },
    });
    cart.forEach(item => { item.book = books.find(b => b.isbn === item.isbn )});
    return cart;
}

async function updateCart(srcCart) {
    let cart = actions.getCart();
    srcCart.forEach(srcItem => {
        let item = cart.find(it => it.isbn === srcItem.isbn);
        if (!item) cart.push({ isbn: srcItem.isbn, quantity: srcItem.quantity });
        else item.quantity = srcItem.quantity;
    });
    cart = cart.filter(it => it.quantity > 0);
    actions.setCart(cart);
}

const CartView = {
    oninit: async function(vnode) {
        // console.log(args, requestPath);
        try {
            // console.log(vnode);
            this.cart = await getCart();
            this.edited = false;
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
                    this.cart != null ?
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
                                    m('td',
                                        m('input', { type: 'text', size: 3, value: item.quantity,
                                            oninput: m.withAttr('value', (value) => { this.cart.find(it => it.isbn === item.isbn).quantity = value; this.edited = true; })
                                        })
                                    ),
                                    m('td', Math.round(item.book.price * item.quantity * 100) / 100)
                                )),
                                m('tr',
                                    m('td', ''),
                                    m('td', ''),
                                    m('td',
                                        m('button', { class: 'btn btn-outline-success my-2 my-sm-0', type: 'button',
                                            onclick: async () => { await updateCart(this.cart); this.cart = await getCart(); } }, 'Update')
                                    ),
                                    m('td', Math.round(this.cart.reduce((sum, item) => sum + item.book.price * item.quantity, 0) * 100) / 100),
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
