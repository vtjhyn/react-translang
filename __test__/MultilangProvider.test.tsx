import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MultilangProvider } from '../src/MultilangProvider';
import { useMultilang } from '../src/useMultilang';

const translations = {
  en: { greeting: 'Hello!' },
  zh: { greeting: '你好!' },
  fr: { greeting: 'Bonjour!' },
};

const TestComponent = () => {
  const { t, setLanguage } = useMultilang();
  return (
    <div>
      <p>{t('greeting')}</p>
      <button onClick={() => setLanguage('zh')}>Change to Chinese</button>
      <button onClick={() => setLanguage('fr')}>Change to French</button>
      <button onClick={() => setLanguage('en')}>Change to Default</button>
    </div>
  );
};

describe('MultilangProvider', () => {
  test('renders correctly with default language', () => {
    render(
      <MultilangProvider translations={translations} defaultLanguage="en">
        <TestComponent />
      </MultilangProvider>,
    );
    expect(screen.getByText('Hello!')).toBeInTheDocument();
  });

  test('changes language to Chinese', async () => {
    render(
      <MultilangProvider translations={translations} defaultLanguage="en">
        <TestComponent />
      </MultilangProvider>,
    );
    userEvent.click(screen.getByText('Change to Chinese'));
    await waitFor(() => {
      expect(screen.getByText('你好!')).toBeInTheDocument();
    });
  });

  test('changes language to French', async () => {
    render(
      <MultilangProvider translations={translations} defaultLanguage="en">
        <TestComponent />
      </MultilangProvider>,
    );
    userEvent.click(screen.getByText('Change to French'));
    await waitFor(() => {
      expect(screen.getByText('Bonjour!')).toBeInTheDocument();
    });
  });

  test('changes language back to default', async () => {
    render(
      <MultilangProvider translations={translations} defaultLanguage="en">
        <TestComponent />
      </MultilangProvider>,
    );
    // Change to Chinese first
    userEvent.click(screen.getByText('Change to Chinese'));
    await waitFor(() => {
      expect(screen.getByText('你好!')).toBeInTheDocument();
    });

    // Change back to default
    userEvent.click(screen.getByText('Change to Default'));
    await waitFor(() => {
      expect(screen.getByText('Hello!')).toBeInTheDocument();
    });
  });
});
