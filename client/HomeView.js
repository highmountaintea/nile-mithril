const m = require('mithril');
const TopNavView = require('./TopNavView');
const LeftNavView = require('./LeftNavView');
const displayBookListItem = require('./displayBookListItem');

function HomeView({ attrs }) {
    let hotitems = [];

    async function oninit({ attrs }) {
        try {
            hotitems = await m.request({
                method: 'GET',
                url: MITHRIL_SERVER_URL + '/listhotitems',
            });
        } catch (e) {
            console.log(e);
        }    
    }

    function view({ attrs }) {
        return [
            m(TopNavView),
            m('main', { role: 'main', class: 'container' },
                m('div', { class: 'row' },
                    m('div', { class: 'col-md-3' },
                        m(LeftNavView)
                    ),
                    m('div', { class: 'col-md-9' },
                        m('h1', 'Hot Items'),
                        ...hotitems.map(displayBookListItem)
                    ),
                ),
            ),
        ];
    }

    return { oninit, view };
}

module.exports = HomeView;
