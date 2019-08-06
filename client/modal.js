const m = require('mithril');

let innerNode = null;

function open(inner) {
  innerNode = inner;
  m.redraw();
}

function close() {
  innerNode = null;
  m.redraw();
}

function render() {
  if (!innerNode) return null;
  return m('.modal',
    m('div', innerNode)
  );
}

exports.open = open;
exports.close = close;
exports.render = render;
exports.component = { view: render };
