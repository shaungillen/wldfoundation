/**
 * Read-only adapters for the current Base44 Article and Artwork models.
 * The Article schema does not yet provide a general media/resource taxonomy.
 * Categorize only from explicit tags or supported article types.
 */
export const resourceKinds = [
  { value: 'all', label: 'All' },
  { value: 'publications', label: 'Publications' },
  { value: 'essays', label: 'Essays' },
  { value: 'interviews', label: 'Interviews' },
  { value: 'video', label: 'Video' },
  { value: 'audio', label: 'Audio' },
  { value: 'photography', label: 'Photography' },
  { value: 'stories', label: 'Stories' },
];

const tagList = (article) => Array.isArray(article.tags)
  ? article.tags.filter((tag) => typeof tag === 'string').map((tag) => tag.toLowerCase().trim())
  : [];

export function resourceKind(article) {
  const tags = tagList(article);
  if (tags.some((t) => /^(publication|publications|catalog|catalogue|book)$/.test(t))) return 'publications';
  if (tags.some((t) => /^(interview|interviews|conversation)$/.test(t))) return 'interviews';
  if (tags.some((t) => /^(video|film|films)$/.test(t))) return 'video';
  if (tags.some((t) => /^(audio|podcast|recording)$/.test(t))) return 'audio';
  if (tags.some((t) => /^(photo|photography|photographs)$/.test(t))) return 'photography';
  if (article.type === 'essay' || article.type === 'scholarship') return 'essays';
  return 'stories';
}

export function resourceYear(article) {
  const match = String(article?.date || '').match(/^\d{4}/);
  return match ? match[0] : '';
}

export function filterLibraryResources(articles, { kind = 'all', search = '', artistId = 'all', year = 'all' } = {}) {
  const term = search.trim().toLocaleLowerCase();
  return articles.filter((article) => {
    if (kind !== 'all' && resourceKind(article) !== kind) return false;
    if (artistId !== 'all' && !(article.related_artist_ids || []).includes(artistId)) return false;
    if (year !== 'all' && resourceYear(article) !== year) return false;
    if (!term) return true;
    const haystack = [article.title, article.excerpt, article.author, article.type, ...tagList(article)]
      .filter(Boolean).join(' ').toLocaleLowerCase();
    return haystack.includes(term);
  });
}

export function filterLibraryArtworks(artworks, search = '') {
  const term = search.trim().toLocaleLowerCase();
  if (!term) return artworks;
  return artworks.filter((artwork) =>
    [artwork.title, artwork.artist_name, artwork.medium, artwork.description, ...(artwork.themes || [])]
      .filter(Boolean).join(' ').toLocaleLowerCase().includes(term)
  );
}
