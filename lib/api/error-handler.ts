import { NextResponse } from "next/server";

/**
 * Format d'erreur standardisé pour toutes les routes API
 */
export interface ApiError {
  error: string;
  code?: string;
  details?: Record<string, any>;
}

/**
 * Crée une réponse d'erreur standardisée
 */
export function createErrorResponse(
  message: string,
  status: number = 500,
  code?: string,
  details?: Record<string, any>
): NextResponse<ApiError> {
  const error: ApiError = { error: message };
  if (code) error.code = code;
  if (details) error.details = details;

  // Log en production seulement si erreur serveur
  if (status >= 500) {
    console.error(`[API Error ${status}]`, message, details || '');
  }

  return NextResponse.json(error, { status });
}

/**
 * Wrapper pour gérer les erreurs dans les routes API
 */
export function withErrorHandler<T extends (...args: any[]) => Promise<NextResponse>>(
  handler: T
): T {
  return (async (...args: Parameters<T>) => {
    try {
      return await handler(...args);
    } catch (error) {
      console.error('[Unhandled API Error]', error);
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'An unexpected error occurred';
      
      return createErrorResponse(
        errorMessage,
        500,
        'INTERNAL_SERVER_ERROR'
      );
    }
  }) as T;
}

/**
 * Valide que les variables d'environnement requises sont présentes
 */
export function validateEnvVars(required: string[]): { valid: boolean; missing: string[] } {
  const missing: string[] = [];
  
  for (const varName of required) {
    const value = process.env[varName];
    if (!value || value.includes('your-') || value.includes('placeholder')) {
      missing.push(varName);
    }
  }
  
  return {
    valid: missing.length === 0,
    missing
  };
}

/**
 * Valide les variables d'environnement et retourne une erreur si manquantes
 */
export function requireEnvVars(...varNames: string[]): NextResponse | null {
  const { valid, missing } = validateEnvVars(varNames);
  
  if (!valid) {
    return createErrorResponse(
      `Missing required environment variables: ${missing.join(', ')}. Please configure them in your environment.`,
      500,
      'MISSING_ENV_VARS',
      { missing }
    );
  }
  
  return null;
}

