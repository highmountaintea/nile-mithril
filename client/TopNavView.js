const m = require('mithril');
const actions = require('./modelactions');

function tryLogin() {
    let username = prompt('Username');
    let password = prompt('Password');
    actions.login(username, password);
}

const TopNavView = {
    view: function(vnode) {
        let model = actions.getModel();
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
                m('li', { class: 'nav-item' },
                    model.user ?
                        m('a', { class: 'nav-link', onclick: actions.logout }, 'Logout ' + model.user.username) :
                        m('a', { class: 'nav-link', onclick: tryLogin }, 'Login')
                ),
            ),
            m('div', { class: 'form-inline my-2 my-lg-0' },
                m('input', { class: 'form-control mr-sm-2', type: 'text', placeholder: 'Search',
                    oninput: m.withAttr('value', (value) => { this.term = value; }), value: this.term,
                    onkeypress: (ev) => { if (ev.keyCode === 13 && this.term) m.route.set('/search/:term', { term: encodeURIComponent(this.term) }); } }),
                m('button', { class: 'btn btn-outline-success my-2 my-sm-0', type: 'button',
                    onclick: () => { if (this.term) m.route.set('/search/:term', { term: encodeURIComponent(this.term) }); } }, 'Search'),
            ),
        );
    }
};

module.exports = TopNavView;
