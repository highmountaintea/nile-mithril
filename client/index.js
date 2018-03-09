const m = require('mithril');
const HomeView = require('./HomeView');
const CategoryView = require('./CategoryView');
const CartView = require('./CartView');


m.route(document.body, '/home', {
    '/home': HomeView,
    '/category/:category': {
        onmatch: function(args) {
            this.key = Date.now();
        },
        render: function(vnode) {
            // console.log(this.key, vnode);
            return m(CategoryView, {key: this.key, ...vnode.attrs});
        }
    },
    '/cart': CartView,
});