import {
  Locale,
  TranslationError,
  TranslationIdentifiers,
  Translator
} from '../infraestructure/language'

export class TranslationService {
  private constructor(private readonly translator: Translator) {}

  public translate(locale: Locale, key: keyof TranslationIdentifiers): string {
    const language = this.translator.translations.get(locale)

    if (language !== undefined) {
      const translation = language.get(key)

      if (translation !== undefined) {
        return translation
      } else {
        const defaultTranslation = this.translator.getDefaultLocaleTranslation().get(key)
        if (defaultTranslation === undefined) {
          throw new TranslationError(
            `Translation for key "${key}" in locale "${locale}" could not be found`
          )
        }

        return defaultTranslation
      }
    }

    return this.translator.getDefaultLocaleTranslation().get(key)!
  }

  public toString(locale: Locale) {
    switch (locale) {
      case Locale.DEFAULT:
      case Locale.EN:
        return 'en'
      case Locale.ES:
        return 'es'
      default:
        throw new TranslationError(`Locale ${locale} not found`)
    }
  }

  public toLocale(string: string): Locale {
    switch (string) {
      case 'en':
        return Locale.EN
      case 'es':
        return Locale.ES
      default:
        throw new TranslationError(`String ${string} could not be mapped to a locale`)
    }
  }

  public static create(translator: Translator) {
    return new TranslationService(translator)
  }
}
