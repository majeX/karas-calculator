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

test('specific calculation case - 9605 target with 131,144 multipliers and 5 adBonus', async () => {
  render(<BrowserRouter><App /></BrowserRouter>);
  const user = userEvent.setup();

  // Input target points
  await user.clear(screen.getByLabelText('Сколько нужно набрать'));
  await user.type(screen.getByLabelText('Сколько нужно набрать'), '9605');

  // Input multipliers
  await user.clear(screen.getByLabelText('Множитель 1'));
  await user.type(screen.getByLabelText('Множитель 1'), '131');
  
  // Add second multiplier
  await user.click(screen.getByText('+'));
  await user.clear(screen.getByLabelText('Множитель 2'));
  await user.type(screen.getByLabelText('Множитель 2'), '144');

  // Input ad bonus
  await user.clear(screen.getByLabelText('Бонус от рекламы'));
  await user.type(screen.getByLabelText('Бонус от рекламы'), '5');

  // Click calculate
  await user.click(screen.getByText('Рассчитать'));

  // Wait for results to appear and verify the calculation produces results
  const results = await screen.findAllByText(/\d+x/);
  expect(results.length).toBeGreaterThan(0);
  
  // Verify that the multipliers from our input (131, 144) appear in results
  expect(screen.getAllByText('131x').length).toBeGreaterThan(0);
  expect(screen.getAllByText('144x').length).toBeGreaterThan(0);
  
  // Verify that bonus multipliers (136=131+5, 149=144+5) appear in results
  expect(screen.getAllByText('136x').length).toBeGreaterThan(0);
  expect(screen.getAllByText('149x').length).toBeGreaterThan(0);
});