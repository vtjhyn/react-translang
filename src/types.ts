export type Language = string;

export interface TranslationData {
  [key: string]: string;
}

export interface Translations {
  [lang: string]: TranslationData;
}
