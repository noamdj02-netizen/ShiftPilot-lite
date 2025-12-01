import { createClient } from "@/lib/supabase/server";

export type Language = 'fr' | 'en' | 'es';

export class I18nService {
  /**
   * Get user's language preference
   */
  static async getUserLanguage(userId: string): Promise<Language> {
    const supabase = await createClient();
    
    const { data: profile } = await supabase
      .from('profiles')
      .select('language')
      .eq('id', userId)
      .single();

    return (profile?.language as Language) || 'fr';
  }

  /**
   * Set user's language preference
   */
  static async setUserLanguage(
    userId: string,
    language: Language
  ): Promise<{ success: boolean; error?: string }> {
    const supabase = await createClient();
    
    const { error } = await supabase
      .from('profiles')
      .update({ language })
      .eq('id', userId);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  }

  /**
   * Get translation
   */
  static async getTranslation(
    key: string,
    language: Language = 'fr'
  ): Promise<string> {
    const supabase = await createClient();
    
    const { data } = await supabase
      .from('translations')
      .select('value')
      .eq('key', key)
      .eq('language', language)
      .single();

    return data?.value || key; // Fallback to key if translation not found
  }

  /**
   * Get all translations for a language
   */
  static async getTranslations(language: Language = 'fr'): Promise<Record<string, string>> {
    const supabase = await createClient();
    
    const { data } = await supabase
      .from('translations')
      .select('key, value')
      .eq('language', language);

    if (!data) return {};

    return data.reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {} as Record<string, string>);
  }

  /**
   * Translate a key (with fallback)
   */
  static async t(key: string, language?: Language): Promise<string> {
    if (!language) {
      // Would need to get from context/request
      language = 'fr';
    }
    return this.getTranslation(key, language);
  }
}

