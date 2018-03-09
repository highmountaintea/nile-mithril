const m = require('mithril');

let model = {
    user: null
};

async function login(username, password) {
    try {
        let token = await m.request({
            method: 'POST',
            url: 'http://localhost:3570/login',
            data: { username, password }
        });
        let profile = await m.request({
            method: 'POST',
            url: 'http://localhost:3570/profile',
            data: { token }
        });
        model.user = {
            token,
            username: profile.username
        };
    } catch(e) {
        alert('login failed');
        console.log(e);
    }        
}

function logout() {
    model.user = null;
}

exports.getModel = () => model;
exports.login = login;
exports.logout = logout;
