const m = require('mithril');
const Modal = require('./modal');
const actions = require('./modelactions');

function LoginBox({ attrs }) {
    let { username, password, submit } = attrs;

    function doSubmit() {
        Modal.close();
        submit({ username, password });
    }

    function handleKeypress(ev) {
        var code = (ev.keyCode ? ev.keyCode : ev.which);
        if(code == 13) doSubmit();
    }

    function view({ attrs }) {
        return m('div', [
            m('h3', 'Login'),
            m('hr'),
            m('table',
                m('tr',
                    m('td', 'Username:'),
                    m('td',
                        m('input', { value: username, onchange: (ev) => username = ev.target.value, onkeypress: handleKeypress }),
                    ),
                ),
                m('tr',
                    m('td', 'Password:'),
                    m('td',
                        m('input', { value: password, onchange: (ev) => password = ev.target.value, onkeypress: handleKeypress, type: 'password'}),
                    ),
                ),
            ),
            m('hr'),
            m('button', { onclick: doSubmit }, 'Login'),
            m('button', { onclick: Modal.close }, 'Cancel'),
        ]);
    }

    return { view };
}

function tryLogin() {
    Modal.open(m(LoginBox, { username: 'plato', password: 'plato2', submit: ({ username, password}) => actions.login(username, password) }));
    //     m('h3', Login),
    //     m('hr'),
    //     m('div', 
    // let username = prompt('Username (for demo, use: plato)');
    // let password = prompt('Password (for demo, use: plato2)');
    // actions.login(username, password);
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
