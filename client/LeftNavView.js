const m = require('mithril');

function drawCategory(category) {
    return m('li', { class: 'nav-item category' },
        m('a', { class: 'nav-link', href: '/category/' + category, oncreate: m.route.link }, category)
    );
}

const LeftNavView = {
    oninit: async function(vnode) {
        try {
            this.categories = [];
            this.categories = await m.request({
                method: 'GET',
                url: 'http://localhost:3570/listcategories',
            });
            this.categories.sort();
        } catch(e) {
        }
    },
    view: function(vnode) {
        return m('ul', { class: 'nav flex-column left-nav' },
            ...this.categories.map(drawCategory)
        );
    }
};

module.exports = LeftNavView;
