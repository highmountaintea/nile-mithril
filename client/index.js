const m = require('mithril');
const HomeView = require('./HomeView');
const CategoryView = require('./CategoryView');
const SearchView = require('./SearchView');
const BookView = require('./BookView');
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
    '/search/:term': {
        onmatch: function(args) {
            this.key = Date.now();
        },
        render: function(vnode) {
            // console.log(this.key, vnode);
            return m(SearchView, {key: this.key, ...vnode.attrs});
        }
    },
    '/book/:isbn': {
        onmatch: function(args) {
            this.key = Date.now();
        },
        render: function(vnode) {
            // console.log(this.key, vnode);
            return m(BookView, {key: this.key, ...vnode.attrs});
        }
    },
    '/cart': CartView,
});