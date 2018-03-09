const m = require('mithril');
const TopNavView = require('./TopNavView');
const LeftNavView = require('./LeftNavView');
const actions = require('./modelactions');

function drawProfile(profile) {
    return [
        m('h1', { class: 'row' }, 'Profile'),
        m('div', { class: 'row' }, 'Username: ' + profile.username),
        m('div', { class: 'row' }, 'Balance: $' + profile.balance),
    ];
}

function drawShoppingHistory(shoppinghistory) {
    return [
        ...shoppinghistory.map(hist => [
            m('div', { class: 'row shoppinghistory-newentry' }, 'Date: ' + new Date(hist.timestamp)),
            m('div', { class: 'row' }, 'Total: $' + hist.payment),
            ...hist.items.map(item => m('div', { class: 'row' }, 'ISBN: ' + item.isbn + ' x' + item.quantity))
        ])
    ];
}


const ProfileView = {
    oninit: async function(vnode) {
        // console.log(args, requestPath);
        try {
            // console.log(vnode);
            let model = actions.getModel();
            this.loggedIn = model.user != null;
            if (this.loggedIn) {
                this.profile = await m.request({
                    method: 'POST',
                    url: 'http://localhost:3570/profile',
                    data: { token: model.user.token }
                });
                this.shoppinghistory = await m.request({
                    method: 'POST',
                    url: 'http://localhost:3570/listshoppinghistory',
                    data: { token: model.user.token }
                });
                this.shoppinghistory.reverse();
            }
        } catch(e) {
            console.log(e);
        }        
    },
    view: function(vnode) {
        // console.log(vnode);
        return [
            m(TopNavView),
            m('main', { role: 'main', class: 'container' },
                m('div', { class: 'row' },
                    m('div', { class: 'col-md-3' },
                        m(LeftNavView)
                    ),
                    m('div', { class: 'col-md-9 profile' },
                        this.loggedIn ? [
                          this.profile ? drawProfile(this.profile) : null,
                          this.shoppinghistory ? drawShoppingHistory(this.shoppinghistory) : null,  
                        ] : 'Not logged in'
                    ),
                ),
            ),
        ];
    }
};

module.exports = ProfileView;
