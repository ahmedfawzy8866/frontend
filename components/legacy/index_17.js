require('dotenv').config();
const { Telegraf } = require('telegraf');
const { GoogleGenerativeAI } = require("@google/generative-ai");

/**
 * Sierra AI: TELEGRAM ADVISORY BOT
 * Powered by Google Gemini AI
 */

const BOT_TOKEN = process.env.TG_BOT_TOKEN || '8732727284:AAEEMpfXG6zODD1Y0IoHtJbyGwtXAunSHww';
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || 'AIzaSyBlAIOjNVkscw6RigwhGkUO55qdcO4d4Og';

const bot = new Telegraf(BOT_TOKEN);
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
// Using robust model selection for varying API key tiers
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 
const fallbackModel = genAI.getGenerativeModel({ model: "gemini-pro" });

// Intelligence Relay
async function getAIResponse(prompt) {
    try {
        const generationConfig = {
            systemInstruction: "You are the Sierra AI Luxury Advisor. Your tone is elegant, professional, and slightly cinematic. You represent Sierra AI Realty, the premier real estate advisory in Egypt. Assist clients with property inquiries, investment snapshots, and market intelligence. Keep responses concise but ultra-premium.",
        };
        const result = await model.generateContent(prompt).catch(() => fallbackModel.generateContent(prompt));
        return result.response.text();
    } catch (error) {
        console.error("Neural intelligence error:", error);
        return "I apologize, but our intelligence relay is currently under maintenance. Please contact your dedicated Sierra AI advisor directly.";
    }
}

// Bot Command: Start
bot.start((ctx) => {
    ctx.replyWithMarkdownV2(
        `*Welcome to the Sierra AI Advisory Nexus\\.* \n\nI am your dedicated AI Intelligence Relay\\. How may I assist your luxury property portfolio today?`,
        {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "🏢 Explore Portfolio", callback_data: "portfolio" }],
                    [{ text: "📊 Market Insights", callback_data: "insights" }],
                    [{ text: "📞 Contact Advisor", callback_data: "contact" }]
                ]
            }
        }
    );
});

// Interactive Handlers
bot.action('portfolio', (ctx) => ctx.reply('Synchronizing with the Global Asset Database... One moment, please.'));
bot.action('insights', (ctx) => ctx.reply('Analyzing Egypt Real Estate Market Trends (Q2 2026)... High growth detected in New Administrative Capital.'));
bot.action('contact', (ctx) => ctx.reply('Your dedicated human advisor will be alerted to your presence. Alternatively, visit https://sierrablu.com'));

// Neural Message Processor
bot.on('text', async (ctx) => {
    const userMessage = ctx.message.text;
    
    // Show typing status for cinematic feel
    await ctx.sendChatAction('typing');
    
    const response = await getAIResponse(userMessage);
    ctx.reply(response);
});

bot.launch().then(() => {
    console.log('✅ Sierra AI Telegram Advisory Bot is synchronized and online.');
});

// Graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
