import { test } from 'node:test';
import assert from 'node:assert/strict';
import { emptyParticipation, participationReducer as reduce } from '../lib/join-participation.ts';
const project = { title: 'My project', team: 'My team', text: 'Build something together.', needs: 'Design', level: 'New idea', open: true };

test('creating projects, requesting teams, and acceptance accumulate without replacing earlier work', () => {
  let state = reduce(emptyParticipation, { type: 'create', project });
  state = reduce(state, { type: 'request', projectId: 'sakay' });
  state = reduce(state, { type: 'create', project: { ...project, title: 'Second idea' } });
  state = reduce(state, { type: 'request', projectId: 'pulong' });
  assert.equal(state.projects.length, 2);
  assert.notEqual(state.projects[0].id, state.projects[1].id);
  assert.deepEqual(state.requests.map(r => r.status), ['pending', 'pending']);
  state = reduce(state, { type: 'approve', projectId: 'sakay' });
  assert.deepEqual(state.requests, [{ projectId: 'sakay', status: 'member' }, { projectId: 'pulong', status: 'pending' }]);
  state = reduce(state, { type: 'cancel', projectId: 'pulong' });
  assert.equal(state.projects.length, 2);
  assert.deepEqual(state.requests, [{ projectId: 'sakay', status: 'member' }]);
});

test('duplicate and invalid requests cannot create memberships or duplicate interests', () => {
  let state = reduce(emptyParticipation, { type: 'create', project });
  for (const projectId of ['missing', 'own-1']) state = reduce(state, { type: 'request', projectId });
  state = reduce(state, { type: 'approve', projectId: 'sakay' });
  assert.deepEqual(state.requests, []);
  state = reduce(state, { type: 'request', projectId: 'sakay' });
  state = reduce(state, { type: 'request', projectId: 'sakay' });
  assert.equal(state.requests.length, 1);
  assert.equal(state.requests[0].status, 'pending');
  state = reduce(state, { type: 'approve', projectId: 'sakay' });
  state = reduce(state, { type: 'request', projectId: 'sakay' });
  state = reduce(state, { type: 'cancel', projectId: 'sakay' });
  assert.deepEqual(state.requests, [{ projectId: 'sakay', status: 'member' }]);
  assert.deepEqual(reduce(state, { type: 'reset' }), emptyParticipation);
});
