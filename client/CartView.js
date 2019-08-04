const m = require('mithril');
const TopNavView = require('./TopNavView');
const LeftNavView = require('./LeftNavView');
const actions = require('./modelactions');

async function getCart() {
    let cart = actions.getCart();
    let books = await m.request({
        method: 'POST',
        url: MITHRIL_SERVER_URL + '/listproducts',
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

function cartDirty(srcCart) {
    if (!srcCart) return true;
    let cart = actions.getCart();
    if (srcCart.length !== cart.length) return true;
    let dirty = false;
    srcCart.forEach(srcItem => {
        let item = cart.find(it => it.isbn === srcItem.isbn);
        if (!item || item.quantity !== srcItem.quantity) dirty = true;
    });
    return dirty;
}

async function purchase(token, srcCart, payment) {
    try {
        if (srcCart.length === 0 || cartDirty(srcCart)) {
            alert('This cart is out of sync, please refresh page');
            return;
        };
        await m.request({
            method: 'POST',
            url: MITHRIL_SERVER_URL + '/purchase',
            body: { token, items: srcCart, payment }
        });
        actions.setCart([]);
        alert('Purchaed');
        m.route.set('/home');
    } catch(e) {
        alert(e.toString());
        console.log(e);
    }
}

function drawCart(cart, updateCart) {
    let model = actions.getModel();
    let dirty = cartDirty(cart);
    let canPurchase = cart.length > 0 && !dirty;
    let totalPrice = Math.round(cart.reduce((sum, item) => sum + item.book.price * item.quantity, 0) * 100) / 100;
    return m('div', { class: 'col-md-9' },
        m('h1', 'Shopping Cart'),
        m('table', { class: 'shoppingcart' },
            m('tr',
                m('th', 'Title'),
                m('th', 'Price'),
                m('th', 'Quantity'),
                m('th', 'Total'),
            ),
            cart.map(item => m('tr',
                m('td', item.book.title),
                m('td', item.book.price.toFixed(2)),
                m('td',
                    m('input', { type: 'text', size: 3, value: item.quantity,
                        oninput: (ev) => { cart.find(it => it.isbn === item.isbn).quantity = ev.currentTarget.value; }
                    })
                ),
                m('td', (item.book.price * item.quantity).toFixed(2))
            )),
            m('tr',
                m('td',
                    canPurchase ?
                        model.user ?
                            m('button', { class: 'btn btn-outline-success my-2 my-sm-0', type: 'button',
                                onclick: async () => { await purchase(model.user.token, cart, totalPrice); } }, 'Purchase') :
                            '** Login above to purchase **' :
                            ''
                ),
                m('td', ''),
                m('td',
                    dirty ?
                        m('button', { class: 'btn btn-outline-success my-2 my-sm-0', type: 'button',
                            onclick: updateCart }, 'Update') :
                        ''
                ),
                m('td', totalPrice.toFixed(2)),
            )
        ),
    )
}

function CartView({ attrs }) {
    let cart;

    async function oninit({ attrs }) {
        try {
            cart = await getCart();
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
                    cart != null ? drawCart(cart, async () => { await updateCart(cart); cart = await getCart(); }) : null
                ),
            ),
        ];
    }

    return { oninit, view };
}

module.exports = CartView;
