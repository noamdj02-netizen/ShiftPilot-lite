import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { getAuthenticatedUser, requireOrganization } from "@/lib/api/auth-helper";

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { user, error: authError } = await getAuthenticatedUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { organization_id, error: orgError } = await requireOrganization(user);
    if (orgError || !organization_id) {
      return NextResponse.json({ error: "Organization required" }, { status: 403 });
    }

    const body = await request.json();
    const { message, platform = 'website' } = body;

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const supabase = await createClient();

    // Récupérer les FAQ de l'organisation
    const { data: faqs } = await supabase
      .from('chatbot_faqs')
      .select('*')
      .eq('organization_id', organization_id)
      .eq('is_active', true);

    // Récupérer le contexte de l'organisation
    const { data: org } = await supabase
      .from('organizations')
      .select('name')
      .eq('id', organization_id)
      .single();

    // Utiliser le service IA si disponible, sinon fallback
    let response: string = "Je n'ai pas compris votre question. Pouvez-vous reformuler ?";
    try {
      const { generateChatbotResponse } = await import('@/lib/services/ai-service');
      response = await generateChatbotResponse(
        message,
        (faqs || []).map(f => ({ question: f.question, answer: f.answer, keywords: f.keywords })),
        org?.name
      );
    } catch (error) {
      // Fallback si le service IA n'est pas disponible
      console.log('Using fallback chatbot logic');
      const messageLower = message.toLowerCase();
      let found = false;
      
      for (const faq of faqs || []) {
        const questionLower = (faq.question || '').toLowerCase();
        const keywordsLower = (faq.keywords || '').toLowerCase();
        
        if (messageLower.includes(questionLower) || 
            (keywordsLower && messageLower.includes(keywordsLower))) {
          response = faq.answer;
          found = true;
          break;
        }
      }
      
      if (!found) {
        response = "Je n'ai pas compris votre question. Pouvez-vous reformuler ?";
      }
    }

    // Log du message
    await supabase.from('chatbot_messages').insert({
      organization_id,
      platform,
      customer_message: message,
      bot_response: response,
      is_auto: true
    });

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Chatbot error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { user, error: authError } = await getAuthenticatedUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { organization_id, error: orgError } = await requireOrganization(user);
    if (orgError || !organization_id) {
      return NextResponse.json({ error: "Organization required" }, { status: 403 });
    }

    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');

    const { data, error } = await supabase
      .from('chatbot_messages')
      .select('*')
      .eq('organization_id', organization_id)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error) {
    console.error("Chatbot GET error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

