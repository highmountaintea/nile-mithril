const m = require('mithril');
const dateformat = require('dateformat');
const TopNavView = require('./TopNavView');
const LeftNavView = require('./LeftNavView');
const actions = require('./modelactions');

async function addBalance() {
    try {
        let model = actions.getModel();
        await m.request({
            method: 'POST',
            url: MITHRIL_SERVER_URL + '/addbalance',
            body: {
                token: model.user.token,
                cardNo: '5555666677778888',
                amount: 50.00
            }
        });
        m.route.set(m.route.get(), null, { replace: false });
    } catch(e) {
        alert('unable to add money');
    }
}

function drawProfile(profile) {
    return [
        m('h1', { class: 'row' }, 'Profile'),
        m('div', { class: 'row' }, 'Username: ' + profile.username),
        m('div', { class: 'row' }, 'Balance: $' + profile.balance.toFixed(2),
            m('a', { class: 'btn btn-light', onclick: addBalance }, 'Add $50')
        ),
    ];
}

function drawShoppingHistory(shoppinghistory) {
    return [
        ...shoppinghistory.map(hist => [
            m('div', { class: 'row shoppinghistory-newentry' }, 'Date: ' + dateformat(new Date(hist.timestamp), 'isoDate')),
            m('div', { class: 'row' }, 'Total: $' + hist.payment.toFixed(2)),
            ...hist.items.map(item => m('div', { class: 'row' }, 'ISBN: ' + item.isbn + ' x' + item.quantity))
        ])
    ];
}


function ProfileView({ attrs }) {
    let loggedIn;
    let profile;
    let shoppinghistory;

    async function oninit({ attrs }) {
        try {
            let model = actions.getModel();
            loggedIn = model.user != null;
            if (loggedIn) {
                profile = await m.request({
                    method: 'POST',
                    url: MITHRIL_SERVER_URL + '/profile',
                    body: { token: model.user.token }
                });
                shoppinghistory = await m.request({
                    method: 'POST',
                    url: MITHRIL_SERVER_URL + '/listshoppinghistory',
                    body: { token: model.user.token }
                });
                shoppinghistory.reverse();
            }
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
                    m('div', { class: 'col-md-9 profile' },
                        loggedIn ? [
                          profile ? drawProfile(profile) : null,
                          shoppinghistory ? drawShoppingHistory(shoppinghistory) : null,  
                        ] : 'Not logged in'
                    ),
                ),
            ),
        ];
    }

    return { oninit, view };
}

module.exports = ProfileView;
