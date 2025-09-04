import { describe, it, expect, beforeEach } from 'vitest';
import i18n from '../i18n';

describe('i18n Configuration', () => {
  beforeEach(() => {
    // Reset i18n to default state
    i18n.changeLanguage('en');
  });

  it('should initialize with English as default language', () => {
    expect(i18n.language).toBe('en');
  });

  it('should have all required languages configured', () => {
    const expectedLanguages = ['en', 'fr', 'es', 'pt', 'pt-BR', 'ja', 'zh', 'de', 'it', 'ru'];
    expect(i18n.options.supportedLngs).toEqual(expect.arrayContaining(expectedLanguages));
  });

  it('should have fallback language set to English', () => {
    expect(i18n.options.fallbackLng).toEqual(['en']);
  });

  it('should change language successfully', async () => {
    await i18n.changeLanguage('fr');
    expect(i18n.language).toBe('fr');
  });

  it('should have translation resources for all languages', () => {
    const languages = ['en', 'fr', 'es', 'pt', 'pt-BR', 'ja', 'zh', 'de', 'it', 'ru'];

    languages.forEach((lang) => {
      expect(i18n.hasResourceBundle(lang, 'translation')).toBe(true);
    });
  });

  it('should translate common UI elements', () => {
    // Test English translations
    expect(i18n.t('navigation.dashboard')).toBe('Dashboard');
    expect(i18n.t('navigation.portfolio')).toBe('Portfolio');
    expect(i18n.t('wallet.connect')).toBe('Connect Wallet');
    expect(i18n.t('actions.toggleTheme')).toBe('Toggle theme');
  });

  it('should translate to French', async () => {
    await i18n.changeLanguage('fr');

    expect(i18n.t('navigation.dashboard')).toBe('Tableau de bord');
    expect(i18n.t('navigation.portfolio')).toBe('Portefeuille');
    expect(i18n.t('wallet.connect')).toBe('Connecter le portefeuille');
    expect(i18n.t('actions.toggleTheme')).toBe('Basculer le thème');
  });

  it('should handle missing translations gracefully', () => {
    const missingKey = 'nonexistent.key';
    const translation = i18n.t(missingKey);

    // Should return the key itself or a fallback
    expect(translation).toBeDefined();
    expect(typeof translation).toBe('string');
  });
});
