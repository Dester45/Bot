const axios = require('axios');
const Prefixes = ['line', 'ai', 'hunter', 'pharouk', 'anja', 'ae'];

function findPrefix(body) {
    return Prefixes.find(prefix => body.startsWith(prefix));
}

module.exports = {
    config: {
        name: 'ai',
        version: 1,
        author: 'aesther',
        longDescription: 'AI',
        category: 'ai',
        guide: { en: '≛LINE≛' }
    },

    onStart: async function () {
        // Fonction vide pour onStart
    },

    onChat: async function ({ api, event, args, message }) {
        try {
            const body = event.body.toLowerCase().trim();
            const prefix = findPrefix(body);

            if (!prefix) return;

            const question = body.substring(prefix.length).trim();
            if (!question) {
                await message.reply('≛𝙃𝙐𝙉𝙏𝙀𝙍\x27𝙎\x20𝙇𝙄𝙉𝙀≛\x0a\x0a\x20(⁠･ั⁠ω⁠･ั⁠).....?\x20');
                api.setMessageReaction('⚪', event.messageID);
                return;
            }

            const response = await axios.get(`https://global-sprak.onrender.com/api/gemini?prompt=${encodeURIComponent(question)}`);
            const answer = `≛𝙇𝙄𝙉𝙀𝙎≛\x20\x20\x20:\x0a────────────\x20\x0a${response.data.answer}`;
            
            api.setMessageReaction('🟣', event.messageID);
            await message.reply(answer);
        } catch (error) {
            console.error('Error:', error.message);
        }
    }
};
