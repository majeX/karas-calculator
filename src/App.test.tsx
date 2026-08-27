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
test('grail toggle keeps the two multiplier lists separate', async () => {
  localStorage.clear();
  render(<BrowserRouter><App /></BrowserRouter>);
  const user = userEvent.setup();

  // Base list: three multipliers
  await user.type(screen.getByLabelText('Множитель 1'), '10');
  await user.click(screen.getByText('+'));
  await user.type(screen.getByLabelText('Множитель 2'), '20');
  await user.click(screen.getByText('+'));
  await user.type(screen.getByLabelText('Множитель 3'), '30');

  // Turning the Grail on shows an empty list, not the base values
  await user.click(screen.getByLabelText('У клана есть Грааль'));
  expect(screen.getByLabelText('Множитель 1')).toHaveValue(null);
  expect(screen.queryByLabelText('Множитель 2')).toBeNull();
  expect(screen.getByText(/Введите множители, которые показывает игра/)).toBeInTheDocument();

  await user.type(screen.getByLabelText('Множитель 1'), '99');
  expect(screen.queryByText(/Введите множители, которые показывает игра/)).toBeNull();

  // Turning it back off restores the base list untouched
  await user.click(screen.getByLabelText('У клана есть Грааль'));
  expect(screen.getByLabelText('Множитель 1')).toHaveValue(10);
  expect(screen.getByLabelText('Множитель 2')).toHaveValue(20);
  expect(screen.getByLabelText('Множитель 3')).toHaveValue(30);
});

test('calculation uses the grail list while the grail is on', async () => {
  localStorage.clear();
  render(<BrowserRouter><App /></BrowserRouter>);
  const user = userEvent.setup();

  await user.type(screen.getByLabelText('Сколько нужно набрать'), '200');
  await user.type(screen.getByLabelText('Множитель 1'), '10');

  await user.click(screen.getByLabelText('У клана есть Грааль'));
  await user.type(screen.getByLabelText('Множитель 1'), '20');

  await user.click(screen.getByText('Рассчитать'));

  expect(await screen.findByText('20x')).toBeInTheDocument();
  expect(screen.queryByText('10x')).toBeNull();
});

test('both lists and the toggle survive a remount', async () => {
  localStorage.clear();
  const { unmount } = render(<BrowserRouter><App /></BrowserRouter>);
  const user = userEvent.setup();

  await user.type(screen.getByLabelText('Множитель 1'), '10');
  await user.click(screen.getByLabelText('У клана есть Грааль'));
  await user.type(screen.getByLabelText('Множитель 1'), '20');

  unmount();
  render(<BrowserRouter><App /></BrowserRouter>);

  expect(screen.getByLabelText('У клана есть Грааль')).toBeChecked();
  expect(screen.getByLabelText('Множитель 1')).toHaveValue(20);

  await user.click(screen.getByLabelText('У клана есть Грааль'));
  expect(screen.getByLabelText('Множитель 1')).toHaveValue(10);
});

test('every form value survives reopening the calculator, zeros included', async () => {
  localStorage.clear();
  const { unmount } = render(<BrowserRouter><App /></BrowserRouter>);
  const user = userEvent.setup();

  await user.type(screen.getByLabelText('Уже набрано'), '0');
  await user.type(screen.getByLabelText('Сколько нужно набрать'), '200');
  await user.type(screen.getByLabelText('Бонус от рекламы'), '0');
  await user.type(screen.getByLabelText('Множитель 1'), '10');
  await user.click(screen.getByLabelText('У клана есть Грааль'));
  await user.type(screen.getByLabelText('Множитель 1'), '40');

  unmount();
  render(<BrowserRouter><App /></BrowserRouter>);

  expect(screen.getByLabelText('Уже набрано')).toHaveValue(0);
  expect(screen.getByLabelText('Сколько нужно набрать')).toHaveValue(200);
  expect(screen.getByLabelText('Бонус от рекламы')).toHaveValue(0);
  expect(screen.getByLabelText('У клана есть Грааль')).toBeChecked();
  expect(screen.getByLabelText('Множитель 1')).toHaveValue(40);

  await user.click(screen.getByLabelText('У клана есть Грааль'));
  expect(screen.getByLabelText('Множитель 1')).toHaveValue(10);
});

// The two lists are rounded independently — ceil(raw) vs ceil(raw * grail) — so
// one base multiplier can split into two with the Grail, and two can merge into
// one. Neither list constrains the other's length.
test('the grail list may be longer than the base list', async () => {
  localStorage.clear();
  render(<BrowserRouter><App /></BrowserRouter>);
  const user = userEvent.setup();

  // One base multiplier...
  await user.type(screen.getByLabelText('Множитель 1'), '11');
  expect(screen.queryByLabelText('Множитель 2')).toBeNull();

  // ...splits into two once the Grail is on
  await user.click(screen.getByLabelText('У клана есть Грааль'));
  await user.type(screen.getByLabelText('Множитель 1'), '13');
  await user.click(screen.getByText('+'));
  await user.type(screen.getByLabelText('Множитель 2'), '14');

  expect(screen.getByLabelText('Множитель 1')).toHaveValue(13);
  expect(screen.getByLabelText('Множитель 2')).toHaveValue(14);

  // Back to one entry, and the longer list is still there on the way back
  await user.click(screen.getByLabelText('У клана есть Грааль'));
  expect(screen.getByLabelText('Множитель 1')).toHaveValue(11);
  expect(screen.queryByLabelText('Множитель 2')).toBeNull();

  await user.click(screen.getByLabelText('У клана есть Грааль'));
  expect(screen.getByLabelText('Множитель 1')).toHaveValue(13);
  expect(screen.getByLabelText('Множитель 2')).toHaveValue(14);
});
