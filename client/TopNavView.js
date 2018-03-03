const m = require('mithril');

const TopNavView = {
    view: function(vnode) {
        return m('nav', { class: 'navbar navbar-expand-md navbar-dark bg-dark fixed-top' },
            m('a', { class: 'navbar-brand', href: '#!/home' }, 'Nile'),
            m('ul', { class: 'navbar-nav mr-auto' },
                m('li', { class: 'nav-item' },
                    m('a', { class: 'nav-link', href: '#!/home'}, 'Home')
                ),
                m('li', { class: 'nav-item' },
                    m('a', { class: 'nav-link', href: '#!/profile'}, 'Profile')
                ),
                m('li', { class: 'nav-item' },
                    m('a', { class: 'nav-link', href: '#!/cart'}, 'Cart')
                ),
            ),
            m('form', { class: 'form-inline my-2 my-lg-0' },
                m('input', { class: 'form-control mr-sm-2', type: 'text', placeholder: 'Search' }),
                m('button', { class: 'btn btn-outline-success my-2 my-sm-0', type: 'submit' }, 'Search'),
            ),
        );
    }
};

module.exports = TopNavView;
