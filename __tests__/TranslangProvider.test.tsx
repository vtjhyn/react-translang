import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { TranslangProvider } from '../src/TranslangProvider';
import { useTranslang } from '../src/useTranslang';

const translations = {
  en: { greeting: 'Hello!' },
  zh: { greeting: '你好!' },
  fr: { greeting: 'Bonjour!' },
};

const TestComponent = () => {
  const { t, setLanguage } = useTranslang();
  return (
    <div>
      <p>{t('greeting')}</p>
      <button onClick={() => setLanguage('zh')}>Change to Chinese</button>
      <button onClick={() => setLanguage('fr')}>Change to French</button>
      <button onClick={() => setLanguage('en')}>Change to Default</button>
    </div>
  );
};

describe('TranslangProvider', () => {
  test('renders correctly with default language', () => {
    render(
      <TranslangProvider translations={translations} defaultLanguage="en">
        <TestComponent />
      </TranslangProvider>,
    );
    expect(screen.getByText('Hello!')).toBeInTheDocument();
  });

  test('changes language to Chinese', async () => {
    render(
      <TranslangProvider translations={translations} defaultLanguage="en">
        <TestComponent />
      </TranslangProvider>,
    );
    userEvent.click(screen.getByText('Change to Chinese'));
    await waitFor(() => {
      expect(screen.getByText('你好!')).toBeInTheDocument();
    });
  });

  test('changes language to French', async () => {
    render(
      <TranslangProvider translations={translations} defaultLanguage="en">
        <TestComponent />
      </TranslangProvider>,
    );
    userEvent.click(screen.getByText('Change to French'));
    await waitFor(() => {
      expect(screen.getByText('Bonjour!')).toBeInTheDocument();
    });
  });

  test('changes language back to default', async () => {
    render(
      <TranslangProvider translations={translations} defaultLanguage="en">
        <TestComponent />
      </TranslangProvider>,
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
