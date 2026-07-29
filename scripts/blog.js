const searchInput = document.querySelector('#post-search');
const tagButtons = [...document.querySelectorAll('.tag-filter')];
const posts = [...document.querySelectorAll('[data-post]')];
const emptyState = document.querySelector('.empty-state');
let activeTag = 'all';

function normalize(value) {
  return value.toLowerCase().trim();
}

function filterPosts() {
  const query = normalize(searchInput.value);
  let visibleCount = 0;

  posts.forEach((post) => {
    const tags = normalize(post.dataset.tags || '');
    const haystack = normalize(`${post.textContent} ${post.dataset.date || ''} ${tags}`);
    const matchesTag = activeTag === 'all' || tags.split(' ').includes(activeTag);
    const matchesQuery = !query || haystack.includes(query);
    const isVisible = matchesTag && matchesQuery;

    post.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  emptyState.hidden = visibleCount > 0;
}

searchInput.addEventListener('input', filterPosts);

tagButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeTag = button.dataset.tag;
    tagButtons.forEach((item) => {
      item.classList.toggle('is-active', item === button);
    });
    filterPosts();
  });
});
