const m = require('mithril');
const HomeView = require('./HomeView');
const CartView = require('./CartView');


m.route(document.body, '/home', {
    '/home': HomeView,
    '/cart': CartView,
});