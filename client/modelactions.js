const m = require('mithril');

let model = {
    user: null
};

async function login(username, password) {
    try {
        let token = await m.request({
            method: 'POST',
            url: MITHRIL_SERVER_URL + '/login',
            data: { username, password }
        });
        let profile = await m.request({
            method: 'POST',
            url: MITHRIL_SERVER_URL + '/profile',
            data: { token }
        });
        model.user = {
            token,
            username: profile.username
        };
        m.route.set(m.route.get(), null, { replace: false });
    } catch(e) {
        alert('login failed');
        console.log(e);
    }        
}

function logout() {
    model.user = null;
    m.route.set(m.route.get(), null, { replace: false });
}

function getCart() {
    try {
        let cartstr = window.localStorage.getItem('nilecart');
        if (cartstr == null) return [];
        let cart = JSON.parse(cartstr);
        return cart;
    } catch(e) {
        return [];
    }
}

function setCart(cart) {
    window.localStorage.setItem('nilecart', JSON.stringify(cart));
}

function setCartItem(isbn, quantity) {
    let cart = getCart();
    let found = cart.find(item => item.isbn === isbn);
    if (!found) cart.push({ isbn, quantity });
    else found.quantity = quantity;
    cart = cart.filter(item => item.quantity > 0);
    setCart(cart);
}

exports.getModel = () => model;
exports.login = login;
exports.logout = logout;
exports.getCart = getCart;
exports.setCart = setCart;
exports.setCartItem = setCartItem;
