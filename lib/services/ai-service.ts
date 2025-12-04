import OpenAI from 'openai';

// Initialiser OpenAI seulement si la clé est disponible
let openai: OpenAI | null = null;

if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface FAQ {
  question: string;
  answer: string;
  keywords?: string;
}

/**
 * Génère une réponse de chatbot intelligente basée sur les FAQ et le contexte
 */
export async function generateChatbotResponse(
  userMessage: string,
  faqs: FAQ[],
  organizationContext?: string
): Promise<string> {
  // Si OpenAI n'est pas configuré, utiliser la logique de fallback
  if (!openai) {
    return generateFallbackResponse(userMessage, faqs);
  }

  try {
    // Construire le contexte système avec les FAQ
    const faqContext = faqs.length > 0
      ? faqs.map(faq => `Q: ${faq.question}\nR: ${faq.answer}`).join('\n\n')
      : 'Aucune FAQ configurée.';

    const systemPrompt = `Tu es un assistant chatbot pour un restaurant. 
Tu dois répondre aux questions des clients de manière amicale, professionnelle et concise.

FAQ disponibles :
${faqContext}

${organizationContext ? `Contexte de l'établissement: ${organizationContext}` : ''}

Instructions :
- Si la question correspond à une FAQ, utilise la réponse de la FAQ
- Si la question n'est pas dans les FAQ, réponds de manière générale et amicale
- Sois concis (maximum 2-3 phrases)
- Utilise un ton professionnel mais chaleureux
- Si tu ne comprends pas, demande poliment plus de détails`;

    const messages: ChatMessage[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage }
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // ou 'gpt-4' pour plus de qualité
      messages: messages as any,
      temperature: 0.7,
      max_tokens: 200
    });

    return completion.choices[0]?.message?.content || generateFallbackResponse(userMessage, faqs);
  } catch (error) {
    console.error('OpenAI error:', error);
    // En cas d'erreur, utiliser le fallback
    return generateFallbackResponse(userMessage, faqs);
  }
}

/**
 * Logique de fallback si OpenAI n'est pas disponible
 */
function generateFallbackResponse(userMessage: string, faqs: FAQ[]): string {
  const messageLower = userMessage.toLowerCase();
  
  // Chercher une correspondance dans les FAQ
  for (const faq of faqs) {
    const questionLower = faq.question.toLowerCase();
    const keywordsLower = (faq.keywords || '').toLowerCase();
    
    if (messageLower.includes(questionLower) || 
        (keywordsLower && keywordsLower.split(',').some(kw => messageLower.includes(kw.trim())))) {
      return faq.answer;
    }
  }

  // Réponse par défaut
  return "Je n'ai pas compris votre question. Pouvez-vous reformuler ? Vous pouvez aussi nous contacter directement pour plus d'informations.";
}

