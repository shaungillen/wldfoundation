import test from 'node:test';
import assert from 'node:assert/strict';
import {
  resourceKind,
  resourceYear,
  filterLibraryResources,
  filterLibraryArtworks,
} from '../src/components/library/libraryFilters.js';

const resources = [
  { id: '1', title: 'An Artist Catalog', type: 'news', tags: ['publication'], date: '2022-02-01', related_artist_ids: ['artist-1'] },
  { id: '2', title: 'Writing about Art', type: 'essay', excerpt: 'A reflective account', date: '2023-04-01', related_artist_ids: ['artist-2'] },
  { id: '3', title: 'Recorded Conversation', type: 'news', tags: ['interview'], date: '2024-01-10' },
  { id: '4', title: 'Foundation Update', type: 'news', date: '2024-06-15' },
];

test('resource types rely on explicit tags and supported article schema', () => {
  assert.equal(resourceKind(resources[0]), 'publications');
  assert.equal(resourceKind(resources[1]), 'essays');
  assert.equal(resourceKind(resources[2]), 'interviews');
  assert.equal(resourceKind(resources[3]), 'stories');
  assert.equal(resourceKind({ tags: ['VIDEO'], type: 'news' }), 'video');
  assert.equal(resourceKind({ type: 'news', tags: null }), 'stories');
});

test('library filters combine type, year, artist and case-insensitive search', () => {
  assert.deepEqual(filterLibraryResources(resources, { kind: 'publications' }).map((a) => a.id), ['1']);
  assert.deepEqual(filterLibraryResources(resources, { search: 'REFLECTIVE' }).map((a) => a.id), ['2']);
  assert.deepEqual(filterLibraryResources(resources, { artistId: 'artist-1', year: '2022' }).map((a) => a.id), ['1']);
  assert.deepEqual(filterLibraryResources(resources, { artistId: 'artist-2', year: '2022' }), []);
  assert.equal(filterLibraryResources(resources).length, 4);
});

test('year is extracted from valid ISO-like date only', () => {
  assert.equal(resourceYear(resources[0]), '2022');
  assert.equal(resourceYear({ date: '' }), '');
  assert.equal(resourceYear({ date: null }), '');
});

test('artwork preview search matches actual artwork metadata', () => {
  const artworks = [
    { id: 'a', title: 'Untitled', artist_name: 'Horst Janssen', themes: ['Portraiture'] },
    { id: 'b', title: 'Study', artist_name: 'Raymond Mason', medium: 'Bronze' },
  ];
  assert.deepEqual(filterLibraryArtworks(artworks, 'portrait').map((a) => a.id), ['a']);
  assert.deepEqual(filterLibraryArtworks(artworks, 'BRONZE').map((a) => a.id), ['b']);
  assert.equal(filterLibraryArtworks(artworks, '').length, 2);
});
