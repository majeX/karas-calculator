/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

test('main calculator flow', async () => {
  render(<BrowserRouter><App /></BrowserRouter>);
  const user = userEvent.setup();

  // Input current and target points
  await user.type(screen.getByLabelText('Уже набрано'), '1000');
  await user.type(screen.getByLabelText('Сколько нужно набрать'), '200000');

  // Input multipliers
  await user.type(screen.getByLabelText('Множитель 1'), '10');
  
  // Add second multiplier
  await user.click(screen.getByText('+'));
  await user.type(screen.getByLabelText('Множитель 2'), '20');

  // Input ad bonus
  await user.type(screen.getByLabelText('Бонус от рекламы'), '1.5');

  // Click calculate
  await user.click(screen.getByText('Рассчитать'));

  // Wait for results to appear
  const results = await screen.findAllByText(/20/);
  expect(results.length).toBeGreaterThan(0);
});