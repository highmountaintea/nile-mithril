const m = require('mithril');
const actions = require('./modelactions');

function tryLogin() {
    let username = prompt('Username (for demo, use: plato)');
    let password = prompt('Password (for demo, use: plato2)');
    actions.login(username, password);
}

function TopNavView({ attrs }) {
    let term = '';

    function termInput(ev) {
        term = ev.currentTarget.value;
    }

    function termKeyPress(ev) {
        if (ev.keyCode === 13 && term) m.route.set('/search/:term', { term: encodeURIComponent(term) });
    }

    function onButton(ev) {
        if (term) m.route.set('/search/:term', { term: encodeURIComponent(term) });
    }

    function view({ attrs }) {
        let model = actions.getModel();
        return m('nav', { class: 'navbar navbar-expand-md navbar-dark bg-dark fixed-top' },
            m('a', { class: 'navbar-brand', href: 'https://www.npmjs.com/package/nile-mithril' }, m('img', { class: 'main-logo', src: 'nilelogo.jpg' })),
            m('a', { class: 'navbar-brand', href: 'https://www.npmjs.com/package/nile-mithril' }, 'Nile'),
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
                        m('a', { class: 'btn btn-light', onclick: actions.logout }, 'Logout ' + model.user.username) :
                        m('a', { class: 'btn btn-success', onclick: tryLogin }, 'Login')
                ),
            ),
            m('div', { class: 'form-inline my-2 my-lg-0' },
                m('input', { class: 'form-control mr-sm-2', type: 'text', placeholder: 'Search',
                    oninput: termInput, value: term,
                    onkeypress: termKeyPress,
                }),
                m('button', { class: 'btn btn-outline-success my-2 my-sm-0', type: 'button',
                    onclick: onButton,
                }, 'Search'),
            ),
        );
    }

    return { view };
}

module.exports = TopNavView;
