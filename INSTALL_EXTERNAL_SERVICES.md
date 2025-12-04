# 📦 INSTALLATION DES SERVICES EXTERNES

Guide rapide pour installer les dépendances nécessaires aux services externes.

---

## 🚀 INSTALLATION RAPIDE

```bash
# Installer toutes les dépendances en une fois
npm install twilio openai @googlemaps/google-maps-services-js
```

---

## 📱 1. TWILIO (SMS)

### Installation
```bash
npm install twilio
```

### Configuration
Ajoutez dans `.env.local` :
```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890
```

### Documentation
- [Twilio Node.js SDK](https://www.twilio.com/docs/libraries/node)
- [Pricing SMS France](https://www.twilio.com/fr/pricing)

---

## 🤖 2. OPENAI (Chatbot IA)

### Installation
```bash
npm install openai
```

### Configuration
Ajoutez dans `.env.local` :
```env
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Documentation
- [OpenAI Node.js SDK](https://github.com/openai/openai-node)
- [Pricing GPT-3.5](https://openai.com/pricing)

---

## ⭐ 3. GOOGLE PLACES API (Reviews)

### Installation
```bash
npm install @googlemaps/google-maps-services-js
```

### Configuration
Ajoutez dans `.env.local` :
```env
GOOGLE_PLACES_API_KEY=your_api_key_here
```

### Documentation
- [Google Maps Services JS](https://github.com/googlemaps/google-maps-services-js)
- [Places API Pricing](https://developers.google.com/maps/billing-and-pricing/pricing)

---

## ✅ VÉRIFICATION

Après installation, vérifiez que tout fonctionne :

```bash
# Vérifier les dépendances installées
npm list twilio openai @googlemaps/google-maps-services-js
```

---

## 🔄 MISE À JOUR DES ROUTES API

Les routes API ont été créées avec support des services externes :
- ✅ `app/api/sms/send/route.ts` - Prêt pour Twilio
- ✅ `app/api/chatbot/message/route.ts` - Utilise `ai-service.ts` (OpenAI)
- ✅ `app/api/reviews/sync/route.ts` - Utilise `google-reviews-service.ts`

**Note** : Les routes fonctionnent en mode "fallback" si les services ne sont pas configurés, mais avec des fonctionnalités limitées.

---

## 📖 GUIDES COMPLETS

Pour les instructions détaillées d'intégration, consultez :
- 📄 `docs/INTEGRATION_GUIDES.md` - Guide complet avec code

---

**Une fois les dépendances installées et les variables d'environnement configurées, les services externes seront automatiquement activés !** 🎉

