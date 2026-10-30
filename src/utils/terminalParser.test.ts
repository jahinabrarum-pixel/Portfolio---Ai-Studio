import test from 'node:test';
import assert from 'node:assert/strict';
import { parseCommand } from './terminalParser.ts';

test('terminalParser returns empty output on blank input', () => {
  const res = parseCommand('   ');
  assert.equal(res.type, 'output');
  assert.equal(res.content.length, 0);
});

test('terminalParser handles "help" command correctly', () => {
  const res = parseCommand('help');
  assert.equal(res.type, 'info');
  assert.ok(res.content.some(line => line.includes('AVAILABLE PROTOCOLS')));
  assert.ok(res.content.some(line => line.includes('about')));
});

test('terminalParser handles "about" command', () => {
  const res = parseCommand('about');
  assert.equal(res.type, 'output');
  assert.ok(res.content.some(line => line.includes('Kairen Vex')));
});

test('terminalParser handles "skills" command', () => {
  const res = parseCommand('skills', { availableProjects: [], skillsCount: 32 });
  assert.equal(res.type, 'output');
  assert.ok(res.content.some(line => line.includes('32 modules verified')));
});

test('terminalParser handles "clear" command', () => {
  const res = parseCommand('clear');
  assert.equal(res.type, 'clear');
});

test('terminalParser handles specific "project <name>" command', () => {
  const res1 = parseCommand('project neural');
  assert.equal(res1.type, 'output');
  assert.ok(res1.content[0].includes('NEURAL LATENT CANVAS'));

  const res2 = parseCommand('project unknownXYZ');
  assert.equal(res2.type, 'error');
});

test('terminalParser flags unrecognized commands', () => {
  const res = parseCommand('invalid_command_xyz');
  assert.equal(res.type, 'error');
  assert.ok(res.content[0].includes('COMMAND UNRECOGNIZED'));
});
