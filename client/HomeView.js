const m = require('mithril');
const TopNavView = require('./TopNavView');

const HomeView = {
    view: function(vnode) {
        return m(TopNavView);
    }
};

module.exports = HomeView;
