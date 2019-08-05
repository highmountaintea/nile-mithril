const m = require('mithril');

function displayBookListItem(book) {
  return m('div', { class: 'row' },
      m('div', { class: 'col-md-auto' },
          m('img', { src: 'book-clip-art-20.jpg' })
      ),
      m('div', { class: 'col' },
          m('h3', { class: 'row' },
              m(m.route.Link, { href: '/book/' + book.isbn }, book.title)
          ),
          m('div', { class: 'row' }, book.author),
          m('div', { class: 'row' }, '$' + book.price.toFixed(2)),
      )
  );
}

module.exports = displayBookListItem;
