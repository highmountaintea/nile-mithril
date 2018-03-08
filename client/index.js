const m = require('mithril');
const HomeView = require('./HomeView');
const CategoryView = require('./CategoryView');
const CartView = require('./CartView');


m.route(document.body, '/home', {
    '/home': HomeView,
    '/category/:category': CategoryView,
    '/cart': CartView,
});