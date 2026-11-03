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

  it('allows filtering contacts using search bar', () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText('Search or start new chat');
    fireEvent.change(searchInput, { target: { value: 'Sarah' } });

    expect(screen.getByText('Sarah Connor')).toBeInTheDocument();
  });

  it('allows clearing search via clear button and escape key', () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText('Search or start new chat');

    // 1. Filter with non-matching term to show empty state
    fireEvent.change(searchInput, { target: { value: 'NonexistentContact123' } });
    expect(screen.getByText('No chats found')).toBeInTheDocument();
    const clearButtons = screen.getAllByRole('button', { name: /clear search/i });
    expect(clearButtons.length).toBe(2); // One in search bar, one in empty state

    // 2. Clear via the search bar clear button (title="Clear search")
    fireEvent.click(clearButtons[0]);
    expect(searchInput.value).toBe('');
    expect(screen.getByText('Sarah Connor')).toBeInTheDocument();

    // 3. Filter again and clear with Escape key
    fireEvent.change(searchInput, { target: { value: 'Sarah' } });
    fireEvent.keyDown(searchInput, { key: 'Escape', code: 'Escape' });
    expect(searchInput.value).toBe('');
    expect(screen.getAllByText('WhatsApp AI Assistant').length).toBeGreaterThan(0);
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
