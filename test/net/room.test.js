import { describe, it, assert, assertEqual } from '../harness.js';
import { createRoomCode, validateCode, getRoomName } from '../../src/net/room.js';

describe('createRoomCode', () => {
  it('returns a 4 character string', () => {
    assertEqual(createRoomCode().length, 4);
  });
  it('returns uppercase letters only', () => {
    assert(/^[A-Z]+$/.test(createRoomCode()));
  });
});

describe('validateCode', () => {
  it('returns true for valid codes like ABCD', () => {
    assertEqual(validateCode('ABCD'), true);
  });
  it('returns false for empty string', () => {
    assertEqual(validateCode(''), false);
  });
  it('returns false for lowercase', () => {
    assertEqual(validateCode('abcd'), false);
  });
  it('returns false for numbers', () => {
    assertEqual(validateCode('1234'), false);
  });
});

describe('getRoomName', () => {
  it('returns string containing the code', () => {
    assert(getRoomName('ABCD').includes('ABCD'));
  });
  it('prefixes with compress-arena-', () => {
    assertEqual(getRoomName('ABCD'), 'compress-arena-ABCD');
  });
});
