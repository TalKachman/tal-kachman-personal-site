const places = {
  amsterdam: {
    title: 'Amsterdam',
    description: 'Canals, brown cafes, late trains, and a standing list of places to bring friends who say they only have one night.',
    tags: ['Restaurants', 'Walks', 'Photos'],
    note: 'Start near the water, keep dinner informal, and let the route bend toward conversation.'
  },
  lisbon: {
    title: 'Lisbon',
    description: 'Hills, tiles, seafood, and the precise geometry of earning your next glass of vinho verde.',
    tags: ['Seafood', 'Views', 'Return to'],
    note: 'The good version is never a straight line: climb first, eat second, linger third.'
  },
  tokyo: {
    title: 'Tokyo',
    description: 'Saved counters, station-adjacent rituals, quiet bars, and the feeling that every detail has a second detail behind it.',
    tags: ['Food', 'Bars', 'Transit'],
    note: 'Eventually this should become a dense layer of tiny, useful coordinates.'
  },
  nyc: {
    title: 'New York',
    description: 'Old addresses, new appetite, neighborhood walks, and places that still know how to hold noise.',
    tags: ['Counters', 'Bars', 'Walks'],
    note: 'Best read by neighborhood, mood, and how late the evening has already become.'
  },
  shanghai: {
    title: 'Shanghai',
    description: 'Food memories, old routines, and the kind of city scale that rewrites your sense of distance.',
    tags: ['Memory', 'Food', 'City notes'],
    note: 'A future place for older stories, favorite corners, and things I would try to find again.'
  }
};

const pins = [...document.querySelectorAll('.map-pin[data-place]')];
const cards = [...document.querySelectorAll('[data-place-card]')];
const title = document.querySelector('#atlas-place-title');
const description = document.querySelector('#atlas-place-description');
const meta = document.querySelector('.atlas-meta');
const note = document.querySelector('#atlas-place-note');
let selectedPlace = 'amsterdam';

function renderPlace(placeKey, persist = false) {
  const place = places[placeKey];
  if (!place) return;

  title.textContent = place.title;
  description.textContent = place.description;
  note.textContent = place.note;
  meta.replaceChildren(...place.tags.map((tag) => {
    const item = document.createElement('span');
    item.textContent = tag;
    return item;
  }));

  pins.forEach((pin) => {
    const isActive = pin.dataset.place === placeKey;
    pin.classList.toggle('is-active', isActive);
    pin.setAttribute('aria-pressed', String(isActive && persist));
  });

  cards.forEach((card) => {
    card.classList.toggle('is-active', card.dataset.placeCard === placeKey);
  });

  if (persist) selectedPlace = placeKey;
}

pins.forEach((pin) => {
  pin.addEventListener('mouseenter', () => renderPlace(pin.dataset.place));
  pin.addEventListener('focus', () => renderPlace(pin.dataset.place));
  pin.addEventListener('click', () => renderPlace(pin.dataset.place, true));
  pin.addEventListener('mouseleave', () => renderPlace(selectedPlace, true));
  pin.addEventListener('blur', () => renderPlace(selectedPlace, true));
});

cards.forEach((card) => {
  card.addEventListener('mouseenter', () => renderPlace(card.dataset.placeCard));
  card.addEventListener('focusin', () => renderPlace(card.dataset.placeCard));
  card.addEventListener('click', () => renderPlace(card.dataset.placeCard, true));
  card.addEventListener('mouseleave', () => renderPlace(selectedPlace, true));
  card.addEventListener('focusout', () => renderPlace(selectedPlace, true));
});
