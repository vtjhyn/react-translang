
---

# react-translang 🌍

![GitHub package.json version](https://img.shields.io/github/package-json/v/vtjhyn/react-translang)
![GitHub license](https://img.shields.io/github/license/vtjhyn/react-translang)
![npm](https://img.shields.io/npm/v/react-translang)

A simple yet powerful localization library for React applications, designed to streamline multi-language support using TypeScript.

## Features

- 🌐 Easy setup and integration into existing React projects.
- 🚀 Lightweight and efficient with minimal dependencies.
- 🌍 Supports dynamic language switching and automatic language detection.
- 📚 Seamless translation management through JSON files.
- ⚛️ Fully typed with TypeScript for enhanced development experience.
- 🎨 Customizable to fit various project requirements.

## Installation

Install `react-translang` via npm:

```bash
npm install react-translang
```

## Usage

### 1. Setup `MultilangProvider`

Wrap your root component with `MultilangProvider` and provide the list of supported languages and default language.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { MultilangProvider } from 'react-translang';

const App = () => {
  const supportedLanguages ={
  en: {
    greeting: 'Hello!',
    farewell: 'Goodbye!',
  },
  zh: {
    greeting: '你好!',
    farewell: '再见!',
  },
  fr: {
    greeting: 'Bonjour!',
    farewell: 'Au revoir!',
  },
};
  const defaultLanguage = 'en';

  return (
    <MultilangProvider languages={supportedLanguages} defaultLanguage={defaultLanguage}>
      <YourAppContent />
    </MultilangProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

### 2. Use `useMultilang` Hook

Use the `useMultilang` hook in your components to access translation functions (`t`) and current language (`language`).

```jsx
import React from 'react';
import { useMultilang } from 'react-translang';
import { Button } from '@mui/material';

const ExampleComponent = () => {
  const { t, language, setLanguage } = useMultilang();

  const handleLanguageChange = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  return (
    <div>
      <h1>{t('greeting')}</h1>
      <Button variant="outlined" onClick={handleLanguageChange}>
        {t('farewell')}
      </Button>
      <p>Current Language: {language}</p>
    </div>
  );
}

export default ExampleComponent;
```

### 3. Manage Translations

Place your translation files (`en.json`, `zh.json`, `fr.json`, etc.) in a public directory (`public/localize`) with key-value pairs representing translations for each supported language.

#### Example of Translation JSON Files

##### `en.json`:

```json
{
  "greeting": "Hello!",
  "farewell": "Goodbye!"
}
```

##### `zh.json`:

```json
{
  "greeting": "你好!",
  "farewell": "再见!"
}
```

##### `fr.json`:

```json
{
  "greeting": "Bonjour!",
  "farewell": "Au revoir!"
}
```

### Types

#### `MultilangProviderProps`

- **`languages`**: `string[]` - Array of supported language codes.
- **`defaultLanguage`**: `string` - Default language code.

#### `MultilangContextType`

- **`language`**: `string` - Current selected language.
- **`setLanguage`**: `(language: string) => void` - Function to set the current language.
- **`t`**: `(key: string) => string` - Function to translate a key into the current language.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Fork this repository, make your changes, and submit a pull request.

## Issues

If you encounter any issues or have suggestions, please [open an issue](https://github.com/vtjhyn/react-translang/issues) on GitHub.

---