const m = require('mithril');
const HomeView = require('./HomeView');

m.route(document.body, "/home", {
    "/home": HomeView,
});