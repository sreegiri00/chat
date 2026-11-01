import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import App from './App';

describe('WhatsApp Web Clone Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders initial contacts in sidebar', () => {
    render(<App />);
    const botElements = screen.getAllByText('WhatsApp AI Assistant');
    expect(botElements.length).toBeGreaterThan(0);
    expect(screen.getByText('🚀 Frontend Dev Team')).toBeInTheDocument();
    expect(screen.getByText('Sarah Connor')).toBeInTheDocument();
  });

  it('allows filtering contacts using search bar and clearing via clear button', () => {
    render(<App />);
    const searchInput = screen.getByRole('textbox', { name: 'Search or start new chat' });
    fireEvent.change(searchInput, { target: { value: 'Elena' } });

    expect(screen.getByText('Elena Rostova')).toBeInTheDocument();
    expect(screen.queryByText('Sarah Connor')).not.toBeInTheDocument();

    const clearButton = screen.getByRole('button', { name: 'Clear search' });
    fireEvent.click(clearButton);

    expect(searchInput.value).toBe('');
    expect(screen.getByText('Sarah Connor')).toBeInTheDocument();
  });

  it('allows clearing search using Escape key and via empty state CTA', () => {
    render(<App />);
    const searchInput = screen.getByRole('textbox', { name: 'Search or start new chat' });

    // Test Escape key
    fireEvent.change(searchInput, { target: { value: 'Elena' } });
    expect(screen.getByRole('button', { name: 'Clear search' })).toBeInTheDocument();
    fireEvent.keyDown(searchInput, { key: 'Escape' });
    expect(searchInput.value).toBe('');

    // Test Empty state CTA
    fireEvent.change(searchInput, { target: { value: 'NonexistentContactXYZ' } });
    expect(screen.getByText('No chats found')).toBeInTheDocument();
    expect(screen.getByText(/No chats matching/)).toBeInTheDocument();

    // The empty state CTA has text "Clear search"
    const clearCta = screen.getByText('Clear search', { selector: 'button' });
    fireEvent.click(clearCta);
    expect(searchInput.value).toBe('');
    expect(screen.getByText('Sarah Connor')).toBeInTheDocument();
  });

  it('allows selecting a contact and sending a text message', () => {
    render(<App />);

    // Select WhatsApp AI Assistant from sidebar list
    const botContacts = screen.getAllByText('WhatsApp AI Assistant');
    fireEvent.click(botContacts[0]);

    // Type and send message
    const messageInput = screen.getByPlaceholderText('Type a message');
    fireEvent.change(messageInput, { target: { value: 'hello' } });

    const sendButton = screen.getByTitle('Send Message');
    fireEvent.click(sendButton);

    const sentMessages = screen.getAllByText('hello');
    expect(sentMessages.length).toBeGreaterThan(0);

    // Fast-forward fake timer for bot response trigger
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    const botReplies = screen.getAllByText(/What can I assist you with/i);
    expect(botReplies.length).toBeGreaterThan(0);
  });

  it('opens profile drawer when profile icon is clicked', () => {
    render(<App />);
    const profileBtn = screen.getByTitle('Profile Settings');
    fireEvent.click(profileBtn);

    expect(screen.getByText('Your Name')).toBeInTheDocument();
    expect(screen.getByText('Alex Morgan')).toBeInTheDocument();
  });
});
