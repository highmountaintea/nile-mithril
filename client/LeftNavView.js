const m = require('mithril');

function drawCategory(category) {
    return m('li', { class: 'nav-item category' },
        m(m.route.Link, { class: 'nav-link', href: '/category/' + category }, category)
    );
}

function LeftNavView({ attrs }) {
    let categories = [];

    async function oninit({ attrs }) {
        try {
            categories = await m.request({
                method: 'GET',
                url: MITHRIL_SERVER_URL + '/listcategories',
            });
            categories.sort();
        } catch(e) {
        }
    }

    function view({ attrs }) {
        return m('ul', { class: 'nav flex-column left-nav' },
            ...categories.map(drawCategory)
        );
    }

    return { oninit, view };
}

module.exports = LeftNavView;
