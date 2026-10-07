import { test } from 'node:test';
import assert from 'node:assert/strict';
import { gatheringState, formatTimeRange } from '../lib/gathering-state.ts';

const confirmed = {
  date: '2026-10-10',
  endDate: '2026-10-11',
  time: { start: '09:00', end: '17:00', checkIn: '08:00' },
  venue: { name: 'DOST Region 7 Innovation Hub', address: 'S&T Complex, Sudlon, Lahug' },
  registrationUrl: 'https://events.mlh.com/events/14973',
};
const unconfirmed = { date: '2026-10-18', endDate: '2026-10-19', time: null, venue: null, registrationUrl: null };

test('a confirmed gathering takes registrations until its end time in Manila', () => {
  assert.deepEqual(gatheringState(confirmed, new Date('2026-10-10T08:59:59Z')), {
    status: 'scheduled',
    registrationStatus: 'open',
    startsAt: '2026-10-10T09:00:00+08:00',
    endsAt: '2026-10-10T17:00:00+08:00',
  });
  const ended = gatheringState(confirmed, new Date('2026-10-10T09:00:00Z'));
  assert.equal(ended.status, 'completed');
  assert.equal(ended.registrationStatus, 'closed');
});

test('an unconfirmed gathering stays a date hold through the end of its Manila day', () => {
  assert.deepEqual(gatheringState(unconfirmed, new Date('2026-10-18T15:59:59Z')), {
    status: 'date_announced',
    registrationStatus: 'not_announced',
    startsAt: null,
    endsAt: null,
  });
  const ended = gatheringState(unconfirmed, new Date('2026-10-18T16:00:00Z'));
  assert.equal(ended.status, 'completed');
  assert.equal(ended.registrationStatus, 'closed');
});

test('a known time without a venue is not presented as scheduled', () => {
  const state = gatheringState({ ...confirmed, venue: null }, new Date('2026-10-01T00:00:00Z'));
  assert.equal(state.status, 'date_announced');
});

test('times read as a 12-hour range', () => {
  assert.equal(formatTimeRange({ start: '09:00', end: '17:00' }), '9 AM – 5 PM');
  assert.equal(formatTimeRange({ start: '12:00', end: '13:30' }), '12 PM – 1:30 PM');
  assert.equal(formatTimeRange({ start: '00:15', end: '11:45' }), '12:15 AM – 11:45 AM');
});
