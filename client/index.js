const m = require('mithril');
const HomeView = require('./HomeView');
const CategoryView = require('./CategoryView');
const SearchView = require('./SearchView');
const BookView = require('./BookView');
const CartView = require('./CartView');
const ProfileView = require('./ProfileView');
const Modal = require('./modal');
const gtag = window.gtag;


m.route(document.body, '/home', {
    '/home': {
        onmatch: function(args) {
            gtag('config', 'UA-115934341-1', {
                'page_title' : 'home',
                'page_path': window.location.hash
            });
            return { view: vnode => [m(HomeView, vnode.attrs), m(Modal.component)] };
        },
    },
    '/category/:category': {
        onmatch: function(args) {
            gtag('config', 'UA-115934341-1', {
                'page_title' : 'category view',
                'page_path': window.location.hash
            });
            return { view: vnode => [m(CategoryView, vnode.attrs), m(Modal.component)] };
        },
    },
    '/search/:term': {
        onmatch: function(args) {
            gtag('config', 'UA-115934341-1', {
                'page_title' : 'search view',
                'page_path': window.location.hash
            });
            return { view: vnode => [m(SearchView, vnode.attrs), m(Modal.component)] };
        },
    },
    '/book/:isbn': {
        onmatch: function(args) {
            gtag('config', 'UA-115934341-1', {
                'page_title' : 'product view',
                'page_path': window.location.hash
            });
            return { view: vnode => [m(BookView, vnode.attrs), m(Modal.component)] };
        },
    },
    '/cart': {
        onmatch: function(args) {
            gtag('config', 'UA-115934341-1', {
                'page_title' : 'cart',
                'page_path': window.location.hash
            });
            return { view: vnode => [m(CartView, vnode.attrs), m(Modal.component)] };
        },
    },
    '/profile': {
        onmatch: function(args) {
            gtag('config', 'UA-115934341-1', {
                'page_title' : 'profile',
                'page_path': window.location.hash
            });
            return { view: vnode => [m(ProfileView, vnode.attrs), m(Modal.component)] };
        },
    }
});