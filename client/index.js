const m = require('mithril');
const HomeView = require('./HomeView');
const CategoryView = require('./CategoryView');
const SearchView = require('./SearchView');
const BookView = require('./BookView');
const CartView = require('./CartView');
const ProfileView = require('./ProfileView');
const gtag = window.gtag;


m.route(document.body, '/home', {
    '/home': {
        onmatch: function(args) {
            gtag('config', 'UA-115934341-1', {
                'page_title' : 'home',
                'page_path': window.location.hash
            });
            return { view: vnode => m(HomeView, vnode.attrs) };
        },
    },
    '/category/:category': {
        onmatch: function(args) {
            gtag('config', 'UA-115934341-1', {
                'page_title' : 'category view',
                'page_path': window.location.hash
            });
            return { view: vnode => m(CategoryView, vnode.attrs) };
        },
    },
    '/search/:term': {
        onmatch: function(args) {
            gtag('config', 'UA-115934341-1', {
                'page_title' : 'search view',
                'page_path': window.location.hash
            });
            return { view: vnode => m(SearchView, vnode.attrs) };
        },
    },
    '/book/:isbn': {
        onmatch: function(args) {
            gtag('config', 'UA-115934341-1', {
                'page_title' : 'product view',
                'page_path': window.location.hash
            });
            return { view: vnode => m(BookView, vnode.attrs) };
        },
    },
    '/cart': {
        onmatch: function(args) {
            gtag('config', 'UA-115934341-1', {
                'page_title' : 'cart',
                'page_path': window.location.hash
            });
            return { view: vnode => m(CartView, vnode.attrs) };
        },
    },
    '/profile': {
        onmatch: function(args) {
            gtag('config', 'UA-115934341-1', {
                'page_title' : 'profile',
                'page_path': window.location.hash
            });
            return { view: vnode => m(ProfileView, vnode.attrs) };
        },
    }
});