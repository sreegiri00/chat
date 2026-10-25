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

  it('has correct ARIA labels on icon buttons and filter tabs for screen reader accessibility', () => {
    render(<App />);

    expect(screen.getByRole('button', { name: /Profile Settings/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Status Updates/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Switch to (Light|Dark) Mode/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /New Chat/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Filter by All/i })).toBeInTheDocument();

    const botContacts = screen.getAllByText('WhatsApp AI Assistant');
    fireEvent.click(botContacts[0]);

    expect(screen.getByRole('button', { name: /Video Call/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Voice Call/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Search in Chat/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Emoji/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Attach File/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Voice Recording/i })).toBeInTheDocument();
  });
});
