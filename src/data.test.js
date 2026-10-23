import { describe, it, expect } from 'vitest';
import { INITIAL_CONTACTS, INITIAL_MESSAGES, INITIAL_STATUSES } from './data/mockData';

describe('Data Models & Initial State', () => {
  it('should contain expected initial contacts', () => {
    expect(INITIAL_CONTACTS.length).toBeGreaterThan(0);
    const bot = INITIAL_CONTACTS.find(c => c.isBot);
    expect(bot).toBeDefined();
    expect(bot.name).toBe('WhatsApp AI Assistant');
  });

  it('should contain messages for initial contacts', () => {
    expect(INITIAL_MESSAGES['chat_bot']).toBeDefined();
    expect(INITIAL_MESSAGES['chat_bot'].length).toBeGreaterThan(0);
    expect(INITIAL_MESSAGES['chat_bot'][0].text).toContain('WhatsApp Web');
  });

  it('should contain initial status stories', () => {
    expect(INITIAL_STATUSES.length).toBeGreaterThan(0);
    const selfStatus = INITIAL_STATUSES.find(s => s.isSelf);
    expect(selfStatus).toBeDefined();
  });
});
