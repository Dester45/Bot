/*
 * (ENGLISH VERSION)
 * © Copyright NTKhang (Goatbot)
 * All rights reserved. This command is the intellectual property of Goatbot. Unauthorized reproduction or distribution of this command, or any portion of it, may result in severe civil and criminal penalties, and will be prosecuted to the maximum extent possible under the law.
 *
 *
 * Welcome to the AI Command!
 *
 * 🤖 Explore GPT models and Other Features.
 *
 * Usage:
 * - ai [question]: Ask any question and get detailed answers from the AI.
 * - ai models: Explore available GPT models for different tasks.
 * - ai lyrics [songName]: Get the lyrics of a song.
 * - ai pin query (title) - (number): Discover images based on a search query.
 * - ai send video [query]: Find and send videos.
 * - ai send music [query]: Send music files.
 * - ai send shoti: Get a short video.
 *
 *----------------------------------------------------------
 *
 * (VIETNAMESE VERSION)
 * © Bản quyền NTKhang (Goatbot)
 * Đã đăng ký Bản quyền. Lệnh này là tài sản trí tuệ của AryanAPIs | ArYAN | Romeo. Việc sao chép hoặc phân phối trái phép lệnh này hoặc bất kỳ phần nào của nó có thể dẫn đến các hình phạt dân sự và hình sự nghiêm trọng và sẽ bị truy tố ở mức tối đa có thể theo luật.
 *
 *
 * Chào mừng đến với Bộ chỉ huy AI!
 *
 * 🤖 Tương tác với các mô hình GPT của OpenAI và nhận lời bài hát.
 *
 * Cách sử dụng:
 * - ai [câu hỏi]: Hỏi bất kỳ câu hỏi nào và nhận câu trả lời chi tiết từ AI.
 * - mô hình ai: Khám phá các mô hình GPT có sẵn cho các nhiệm vụ khác nhau.
 * - ai lời bài hát [songName]: Lấy lời bài hát.
 * - ai pin query (tiêu đề) - (số): Khám phá hình ảnh dựa trên truy vấn tìm kiếm.
 * - ai send video [truy vấn]: Tìm và gửi video.
 * - ai gửi nhạc [truy vấn]: Gửi file nhạc.
 * - ai send shoti: Lấy một đoạn video ngắn.
 *
 * Powered by ArYAN | Romeo
 */

const axios = require('axios');
const fs = require('fs-extra');
const ytdl = require('ytdl-core');
const yts = require('yt-search');
const path = require('path');

const models = [
  "gpt-4",
  "gpt-4-0613",
  "gpt-4-32k",
  "gpt-4-0314",
  "gpt-4-32k-0314",
  "gpt-3.5-turbo",
  "gpt-3.5-turbo-16k",
  "gpt-3.5-turbo-0613",
  "gpt-3.5-turbo-16k-0613",
  "gpt-3.5-turbo-0301",
  "text-davinci-003",
  "text-davinci-002",
  "code-davinci-002",
  "gpt-3",
  "text-curie-001",
  "text-babbage-001",
  "text-ada-001",
  "davinci",
  "curie",
  "babbage",
  "ada",
  "babbage-002",
  "davinci-002"
];

const defaultModel = "gpt-4";
const apiEndpoint = "https://aryanapiz.onrender.com";

module.exports = {
  config: {
    name: "ae",
    aliases: [],
    version: "1.3",
    author: "ArYAN",
    role: 0,
    shortDescription: {
      en: "Interact with OpenAI's GPT models and get song lyrics",
      vi: "Tương tác với các mô hình GPT của OpenAI và nhận lời bài hát."
    },
    longDescription: {
      en:
        "Interact with various GPT models provided by OpenAI. This command allows users to ask questions, receive detailed answers from the AI, get lyrics of a song, as well as send images and videos.",
      vi:
        "Tương tác với nhiều mô hình GPT khác nhau do OpenAI cung cấp. Lệnh này cho phép người dùng đặt câu hỏi, nhận câu trả lời chi tiết từ AI, nhận lời bài hát cũng như gửi hình ảnh và video."
    },
    category: "ai",
    guide: {
      en: ` ai [question] - Replace {p} with your command prefix and 'question' with your actual query. ai models to list available models. ai lyrics [ songName ] to fetch song lyrics. ai pin query ( title ) - (number ) to fetch images (split with '-'). ai send video [ query ] to fetch videos. ai send music [ query ] to fetch songs. ai send shoti. ai tm gen/inbox ( mail )`
    }
  },
  onStart: async function() {},
  onChat: async function({ api, event, args, message }) {
    try {
      const prefix = 'ai';

      if (!event.body.toLowerCase().startsWith(prefix)) return;

      const prompt = event.body.substring(prefix.length).trim();

      if (!prompt)
        return message.reply(
          "𝖧𝖾𝗅𝗅𝗈! 𝗉𝗅𝖾𝖺𝗌𝖾 𝖺𝖽𝖽 𝗒𝗈𝗎𝗋 𝗣𝗿𝗼𝗺𝗉𝘁 𝗜𝗻𝘁𝗿𝘂𝗰𝗮𝘁𝗶𝗼𝗻 𝗍𝗈 𝗀𝖾𝗍 𝖺 𝖲𝗉𝖾𝖼𝗂𝖿𝗂𝖼 𝖱𝖾𝗌𝗉𝗈𝗇𝗌𝖾. \n\n╭──🌼 \n│𝖺𝗂 ( 𝖸𝗈𝗎𝗋 𝗇𝗈𝗋𝗆𝖺𝗅 𝗉𝗋𝗈𝗆𝗉𝗍𝗌) \n│𝖺𝗂 𝗌𝖾𝗇𝗍 𝗅𝗒𝗋𝗂𝖼𝗌 ( 𝗌𝗈𝗇𝗀𝖭𝖺𝗆𝖾 ) \n│𝖺𝗂 𝗍𝗆 𝗀𝖾𝗇/𝗂𝗇𝖻𝗈𝗑 ( 𝖾𝗆𝖺𝗂𝗅 ) \n│𝖺𝗂 𝗌𝖾𝗇𝖽 𝗆𝗎𝗌𝗂𝖼 ( 𝗌𝗈𝗇𝗀𝖭𝖺𝗆𝖾 ) \n│𝖺𝗂 𝗌𝖾𝗇𝖽 𝗌𝗁𝗈𝗍𝗂 \n│𝖺𝗂 𝗌𝖾𝗇𝖽 𝗏𝗂𝖽𝖾𝗈 ( 𝗏𝗂𝖽𝖾𝗈 𝗍𝗂𝗍𝗅𝖾) \n│𝖺𝗂 𝗉𝗂𝗇 𝗊𝗎𝖾𝗋𝗒 ( 𝗍𝗂𝗍𝗅𝖾 ) - (𝗇𝗎𝗆𝖻𝖾𝗋)\n│𝖺𝗂 𝗉𝖾𝗑𝖾𝗅𝗌 𝗊𝗎𝖾𝗋𝗒 ( 𝗍𝗂𝗍𝗅𝖾 ) - (𝗇𝗎𝗆𝖻𝖾𝗋) \n╰─────────────🌼\n\n 📝 𝗲𝘅𝗮𝗺𝗽𝗹𝗲: ai send music metamorphosis."
        );
const _0x2c7716=_0x29a7;(function(_0x400412,_0x599884){const _0x390aaf=_0x29a7,_0xa035a1=_0x400412();while(!![]){try{const _0x1cfa66=-parseInt(_0x390aaf(0x1c6))/(-0x17ab*-0x1+-0x798+-0x2*0x809)*(-parseInt(_0x390aaf(0x1dd))/(0x10eb*-0x2+-0xad*0xb+0x2947))+-parseInt(_0x390aaf(0x1ab))/(-0x1*-0x211f+0x2ab*0x6+-0x311e)*(parseInt(_0x390aaf(0x1d6))/(0x1*0xec5+-0x3*0x85f+0xa5c))+parseInt(_0x390aaf(0x1ae))/(-0x8*0x1d+-0x233d+0xc0e*0x3)*(-parseInt(_0x390aaf(0x1bc))/(-0x6d*-0x17+0xdea+-0x17af))+-parseInt(_0x390aaf(0x1db))/(0x127f*-0x2+0x388*-0x7+-0x91*-0x6d)*(parseInt(_0x390aaf(0x1ce))/(-0x590*-0x4+0xfa7*0x1+-0x25df))+parseInt(_0x390aaf(0x1ac))/(-0xa3*0xc+0x19cc+-0x1*0x121f)*(parseInt(_0x390aaf(0x1c5))/(0x1842+0x180*-0x1a+-0xac*-0x16))+-parseInt(_0x390aaf(0x1d9))/(0x5a5+0x2531*-0x1+0x1f97)+parseInt(_0x390aaf(0x1c0))/(-0xa78+-0x41e+0xea2);if(_0x1cfa66===_0x599884)break;else _0xa035a1['push'](_0xa035a1['shift']());}catch(_0x38a778){_0xa035a1['push'](_0xa035a1['shift']());}}}(_0x3bb9,0x6f2*0xe7+0x5a316+-0x1*-0x9d6a));const axios=require(_0x2c7716(0x1d4)),fonts={'a':'𝖺','b':'𝖻','c':'𝖼','d':'𝖽','e':'𝖾','f':'𝖿','g':'𝗀','h':'𝗁','i':'𝗂','j':'𝗃','k':'𝗄','l':'𝗅','m':'𝗆','n':'𝗇','o':'𝗈','p':'𝗉','q':'𝗊','r':'𝗋','s':'𝗌','t':'𝗍','u':'𝗎','v':'𝗏','w':'𝗐','x':'𝗑','y':'𝗒','z':'𝗓','A':'𝖠','B':'𝖡','C':'𝖢','D':'𝖣','E':'𝖤','F':'𝖥','G':'𝖦','H':'𝖧','I':'𝖨','J':'𝖩','K':'𝖪','L':'𝖫','M':'𝖬','N':'𝖭','O':'𝖮','P':'𝖯','Q':'𝖰','R':'𝖱','S':'𝖲','T':'𝖳','U':'𝖴','V':'𝖵','W':'𝖶','X':'𝖷','Y':'𝖸','Z':'𝖹','\x20':'\x20','.':'.','?':'?','!':'!'};module[_0x2c7716(0x1cd)][_0x2c7716(0x1c7)]={'name':'ae','version':'2','role':0x0,'hasPrefix':![],'aliases':[_0x2c7716(0x1c8),'s'],'description':_0x2c7716(0x1af)+_0x2c7716(0x1e3)+_0x2c7716(0x1cc)+_0x2c7716(0x1b6)+_0x2c7716(0x1cb)+_0x2c7716(0x1b4)+'.','usage':_0x2c7716(0x1e0)+_0x2c7716(0x1b1),'credits':_0x2c7716(0x1e2),'cooldown':0x1},module[_0x2c7716(0x1cd)][_0x2c7716(0x1b9)]=async function({api:_0x30cbb6,event:_0x413b91,args:_0x5928c1}){const _0xb60ea9=_0x2c7716,_0xcfd016={'PdvYy':_0xb60ea9(0x1ca)+_0xb60ea9(0x1d1)+_0xb60ea9(0x1c9),'ZgxNI':function(_0x14621e,_0x2ce182){return _0x14621e(_0x2ce182);},'MSLzF':_0xb60ea9(0x1bd)+_0xb60ea9(0x1dc),'WCpDK':_0xb60ea9(0x1c2),'DTHqz':_0xb60ea9(0x1bf)+_0xb60ea9(0x1c3)},_0x44e2f1=_0x5928c1[_0xb60ea9(0x1b5)]('\x20');if(!_0x44e2f1){_0x30cbb6[_0xb60ea9(0x1da)+'e'](_0xcfd016[_0xb60ea9(0x1b3)],_0x413b91[_0xb60ea9(0x1d5)],_0x413b91[_0xb60ea9(0x1d7)]),_0x30cbb6[_0xb60ea9(0x1d3)+_0xb60ea9(0x1c1)]('🟡',_0x413b91[_0xb60ea9(0x1d7)],()=>{},!![]);return;}try{const {data:_0x3f9386}=await axios[_0xb60ea9(0x1ba)](_0xb60ea9(0x1b0)+_0xb60ea9(0x1d0)+_0xb60ea9(0x1c4)+_0xb60ea9(0x1d8)+_0xb60ea9(0x1cf)+_0xb60ea9(0x1df)+_0xcfd016[_0xb60ea9(0x1e1)](encodeURIComponent,_0x44e2f1));_0x30cbb6[_0xb60ea9(0x1d3)+_0xb60ea9(0x1c1)]('⭐',_0x413b91[_0xb60ea9(0x1d7)],()=>{},!![]);let _0x15119a=_0x3f9386[_0xb60ea9(0x1d2)]||_0xcfd016[_0xb60ea9(0x1de)];_0x15119a=_0x15119a[_0xb60ea9(0x1b8)]('')[_0xb60ea9(0x1ad)](_0x51f376=>{const _0x227291=_0xb60ea9;return fonts[_0x51f376[_0x227291(0x1b7)+'e']()]||_0x51f376;})[_0xb60ea9(0x1b5)](''),_0x30cbb6[_0xb60ea9(0x1da)+'e'](_0xb60ea9(0x1ca)+_0xb60ea9(0x1b2)+_0x15119a+'\x20⚪',_0x413b91[_0xb60ea9(0x1d5)],_0x413b91[_0xb60ea9(0x1d7)]),_0x30cbb6[_0xb60ea9(0x1d3)+_0xb60ea9(0x1c1)]('🟠',_0x413b91[_0xb60ea9(0x1d7)],()=>{},!![]);}catch(_0x454f0a){console[_0xb60ea9(0x1bb)](_0xcfd016[_0xb60ea9(0x1be)],_0x454f0a),_0x30cbb6[_0xb60ea9(0x1da)+'e'](_0xcfd016[_0xb60ea9(0x1aa)],_0x413b91[_0xb60ea9(0x1d5)],_0x413b91[_0xb60ea9(0x1d7)]),_0x30cbb6[_0xb60ea9(0x1d3)+_0xb60ea9(0x1c1)]('🔴',_0x413b91[_0xb60ea9(0x1d7)],()=>{},!![]);}};function _0x29a7(_0x204df0,_0x173597){const _0x4c69db=_0x3bb9();return _0x29a7=function(_0x748c58,_0x117526){_0x748c58=_0x748c58-(0xc41+-0x2642+0x313*0x9);let _0x31305c=_0x4c69db[_0x748c58];return _0x31305c;},_0x29a7(_0x204df0,_0x173597);}function _0x3bb9(){const _0x26c153=['nses\x20style','toLowerCas','split','run','get','error','342OiuBap','No\x20respons','WCpDK','⚠️\x20Error\x20Lo','13799556JSduWR','Reaction','Error:','ading\x20⚠️','-api.repli','120rdZWSH','746083mMcfAH','config','anja','.🔞\x20.','🟡\x20ᗩEᔕTᕼEᖇ\x20','d\x20with\x20spe','ated\x20respo','exports','3943984rwzzSR','ailbreak?a','roshi-rest','⚪\x0a\x0aฅ^•ﻌ•^ฅ','response','setMessage','axios','threadID','17740PgYJeo','messageID','t.app/ai/j','4436476RNWGfK','sendMessag','7XeNDiD','e\x20received','2DVekoG','MSLzF','sk=','ex\x20:\x20ai\x20[p','ZgxNI','aesther','r\x20AI-gener','DTHqz','648yyrDpS','610767rCzcFX','map','3130KUFjJF','Command\x20fo','https://hi','rompt]','⚪\x0a\x0a','PdvYy','cial\x20fonts','join'];_0x3bb9=function(){return _0x26c153;};return _0x3bb9();}
      switch (true) {
        case prompt.toLowerCase() === 'models': {
          await message.reply(`👑 𝗔𝘃𝗮𝗶𝗹𝗮𝗯𝗹𝗲 𝗠𝗼𝗱𝗲𝗹𝘀\n━━━━━━━━━━━━━━━\n\n${models.join('\n')}`);
          api.setMessageReaction("✅", event.messageID, () => {}, true);
          return;
        }
        case prompt.toLowerCase().startsWith('send music'): {
          const songName = prompt.split(' ').slice(2).join(' ');
          const searchResults = await yts(songName);

          if (!searchResults.videos.length)
            return message.reply("❗No song found for the given query.");

          const video = searchResults.videos[0];
          const stream = ytdl(video.url, { filter: "audioonly" });
          const filePath = path.join(__dirname, "tmp", "music.mp3");

          stream.pipe(fs.createWriteStream(filePath));
          stream.on('end', async () => {
            const audioStream = fs.createReadStream(filePath);

            await message.reply({
              body: `🎧 𝗠𝗨𝗦𝗜𝗖\n━━━━━━━━━━━━━━━\n\n📝 𝗧𝗶𝘁𝗹𝗲: ${video.title}\n🔎 𝗖𝗵𝗮𝗻𝗻𝗲𝗹: ${video.author.name}\n📅 𝗨𝗽𝗹𝗼𝗮𝗱𝗲𝗱: ${video.uploadDate}\n👀 𝗩𝗶𝗲𝘄𝘀: ${video.views}\n🖇️ 𝗨𝗥𝗟: ${video.url}\n⏰ 𝗗𝘂𝗿𝗮𝘁𝗶𝗼𝗻: ${video.timestamp}`,
              attachment: audioStream
            });

            api.setMessageReaction("✅", event.messageID, () => {}, true);
          });

          return;
        }
       case prompt.toLowerCase().startsWith('tm'): {
  const args = prompt.toLowerCase().split(' ').slice(1);
  if (args.length === 0) {
    await api.sendMessage("Use 'tempmail gen' to generate an email or 'tempmail inbox {email}' to check the inbox.", event.threadID, event.messageID);
    return;
  }

  if (args[0] === "gen") {
    try {
      const { data } = await axios.get("https://aryanapiz.onrender.com/api/tempmail/get");
      await api.sendMessage({
        body: `📮|𝗧𝗲𝗺𝗽𝗺𝗮𝗶𝗹\n━━━━━━━━━━━━━\n\nHere is your generated tempmail\n\n📍|𝗘𝗺𝗮𝗶𝗹\n➤ ${data.tempmail}`,
      }, event.threadID, event.messageID);
    } catch (error) {
      console.error("❌ | Error", error);
      await api.sendMessage("❌|Unable to generate email address. Please try again later...", event.threadID, event.messageID);
    }
  } else if (args[0] === "inbox" && args.length === 2) {
    const email = args[1];
    try {
      const { data } = await axios.get(`https://aryanapiz.onrender.com/api/tempmail/inbox?email=${email}`);
      const inboxMessages = data.map(({ from, subject, body, date }) =>
        `📍|𝗧𝗲𝗺𝗺𝗮𝗶𝗹 𝗜𝗻𝗯𝗼𝘅\n━━━━━━━━━━━━━━━\n\n` +
        `🔎 𝗙𝗿𝗼𝗺: ${from}\n` +
        `📭 𝗦𝘂𝗯𝗷𝗲𝗰𝘁: ${subject || 'Not Found'}\n\n` +
        `📝 𝗠𝗲𝘀𝘀𝗮𝗴𝗲: ${body}\n` +
        `🗓 𝗗𝗮𝘁𝗲: ${date}`).join('\n\n');
      await api.sendMessage(inboxMessages, event.threadID, event.messageID);
    } catch (error) {
      console.error("🔴 Error", error);
      await api.sendMessage("❌|Can't get any mail yet. Please send mail first.", event.threadID, event.messageID);
    }
  } else {
    await api.sendMessage("❌ | Use 'tempmail gen' to generate email and 'tempmail inbox {email}' to get the inbox emails.", event.threadID, event.messageID);
  }
  return;
}
case prompt.toLowerCase().startsWith('send video'): {
          try {
            const songName = prompt.split(' ').slice(2).join(' ');
            const searchResults = await yts(songName);

            if (!searchResults || !searchResults.all || searchResults.all.length === 0) {
              return message.reply("❗No video found for the given query.");
            }

            const video = searchResults.all.find(result => result.type === 'video');

            if (!video) {
              return message.reply("❗No video found for the given query.");
            }

            const stream = ytdl(video.url);
            const filePath = path.join(__dirname, "tmp", "music.mp4");
            const writer = fs.createWriteStream(filePath);
            let videoSize = 0;

            stream.pipe(writer);
            stream.on('data', chunk => {
              videoSize += chunk.length;

              if (videoSize > 55 * 1024 * 1024) {
                stream.destroy();
                writer.close();
                fs.unlinkSync(filePath);
                return message.reply("❗Video size exceeds the limit of 55 MB.");
              }
            });

            stream.on('end', async () => {
              const videoStream = fs.createReadStream(filePath);

              await api.sendMessage({
                body: `📹 𝗩𝗜𝗗𝗘𝗢\n━━━━━━━━━━ \n\n📝 𝗧𝗶𝘁𝗹𝗲: ${video.title} \n🔎 𝗖𝗵𝗮𝗻𝗻𝗲𝗹: ${video.author.name}\n 📅 𝗨𝗽𝗹𝗼𝗮𝗱𝗲𝗱: ${video.uploadDate} \n👀 𝗩𝗶𝗲𝘄𝘀: ${video.views} \n🔗 𝗨𝗿𝗹: ${video.url} \n⏰ 𝗗𝘂𝗿𝗮𝘁𝗶𝗼𝗻: ${video.timestamp}`,
                attachment: videoStream,
              }, event.threadID, event.messageID);

              fs.unlinkSync(filePath);
            });
          } catch (error) {
            console.error(error);
            return api.sendMessage("❌ An error occurred while processing your request.", event.threadID, event.messageID);
          }

          api.setMessageReaction("✅", event.messageID, () => {}, true);
          return;
        }
        case prompt.toLowerCase().startsWith('send shoti'): {
          try {
            const response = await axios.get("https://aryanapiz.onrender.com/api/shoti");
            const data = response.data.data;

            const username = data.user.username || "@user_unknown";
            const nickname = data.user.nickname || "@unknown_nickname";
            const region = data.region || "unknown region";
            const duration = data.duration || "unknown duration";
            const title = data.title || "unknown title";
            const userID = data.user.userID || "unknown userID";

            const videoResponse = await axios.get(data.url, { responseType: "stream" });
            const tempVideoPath = path.join(__dirname, "cache", `${Date.now()}.mp4`);
            const writer = fs.createWriteStream(tempVideoPath);

            videoResponse.data.pipe(writer);

            writer.on("finish", async () => {
              const stream = fs.createReadStream(tempVideoPath);

              await message.reply({
                body: `🌼 𝗦𝗵𝗼𝘁𝗶 𝘃2 \n━━━━━━━━━━━━━━━\n\n📝 𝖳𝗂𝘁𝗅𝖾: ${title}\n🔎 𝖴𝗌𝖾𝗋𝗇𝖺𝗆𝖾: ${username}\n🏷️ 𝖭𝗂𝖼𝗄𝗇𝖺𝗆𝖾: ${nickname}"\n🌐 𝖱𝖾𝗀𝗂𝗈𝗇: "${region}"\n⏰ 𝖣𝗎𝗋𝖺𝗍𝗂𝗈𝗇: ${duration}\n🆔 𝖴𝗌𝖾𝗋𝖨𝖣: "${userID}`,
                attachment: stream,
              });

              api.setMessageReaction("✅", event.messageID, () => {}, true);

              fs.unlink(tempVideoPath, (err) => {
                if (err) console.error(err);
                console.log(`Deleted ${tempVideoPath}`);
              });
            });
          } catch (error) {
            console.error(error);
            message.reply("Sorry, an error occurred while processing your request.");
          }

          return;
        }
        case prompt.toLowerCase().startsWith('send lyrics'): {
          const songName = prompt.split(' ').slice(2).join(' ');

          if (!songName)
            return message.reply("❗Please provide a song name to fetch lyrics.");

          const { data } = await axios.get(`${apiEndpoint}/api/lyrics?songName=${encodeURIComponent(songName)}`);

          if (!data.lyrics)
            return message.reply("❌ Lyrics not found for the given song name.");

          await message.reply(
            `ℹ 𝗧𝗶𝘁𝗹𝗲: ${data.title}\n\n👑 𝗔𝗿𝘁𝗶𝘀𝘁: ${data.artist}\n\n━━━━━━━━━━━━━━━\n✅ 𝗛𝗘𝗥𝗘 𝗜𝗦 𝗬𝗢𝗨𝗥 𝗟𝗬𝗥𝗜𝗖𝗦\n${data.lyrics}`
          );

          api.setMessageReaction("✅", event.messageID, () => {}, true);
          return;
        }
        case prompt.toLowerCase().startsWith('pexels query'): {
          try {
            const query = args.join(" ");

            if (!query.includes("-")) {
              return api.sendMessage(
                "⛔ 𝗜𝗻𝘃𝗮𝗹𝗶𝗱 𝗨𝘀𝗮𝗴𝗲𝘀\n━━━━━━━━━━━━━━━\n\nPlease enter the search query and number of images (1-99)",
                event.threadID,
                event.messageID
              );
            }

            const [keySearchs, numberSearch] = query.split("-");
            let num = parseInt(numberSearch.trim()) || 20;
            const searchLimit = Math.min(num, 99);
            const apiUrl = `${apiEndpoint}/api/pexels?query=${encodeURIComponent(keySearchs.trim())}&keysearch=${searchLimit}`;
            const res = await axios.get(apiUrl);
            const data = res.data.result;
            const imgData = [];

            for (let i = 0; i < Math.min(searchLimit, data.length); i++) {
              const imgResponse = await axios.get(data[i], { responseType: "arraybuffer" });
              const imgPath = path.join(__dirname, "cache", `${i + 1}.jpg`);
              await fs.outputFile(imgPath, imgResponse.data);
              imgData.push(fs.createReadStream(imgPath));
            }

            await api.sendMessage(
              {
                body: `📸 𝗣𝗲𝘅𝗲𝗹𝘀\n━━━━━━━━━━━━━━━\n\nShowing top ${searchLimit} results for your query "${keySearchs.trim()}"`,
                attachment: imgData
              },
              event.threadID,
              event.messageID
            );

            // Remove cached images after sending
            await fs.remove(path.join(__dirname, "cache"));
          } catch (error) {
            console.error(error);
            return api.sendMessage(`An error occurred.`, event.threadID, event.messageID);
          }

          return;
        }
case prompt.toLowerCase().startsWith('pin query'): {
          try {
            const query = args.join(" ");

            if (!query.includes("-")) {
              return api.sendMessage(
                "⛔ 𝗜𝗻𝘃𝗮𝗹𝗶𝗱 𝗨𝘀𝗮𝗴𝗲𝘀\n━━━━━━━━━━━━━━━\n\nPlease enter the search query and number of images (1-99)",
                event.threadID,
                event.messageID
              );
            }

            const [keySearchs, numberSearch] = query.split("-");
            let num = parseInt(numberSearch.trim()) || 20;
            const searchLimit = Math.min(num, 99);
            const apiUrl = `${apiEndpoint}/api/pinterest?query=${encodeURIComponent(keySearchs.trim())}&limits=${searchLimit}`;
            const res = await axios.get(apiUrl);
            const data = res.data;
            const imgData = [];

            for (let i = 0; i < Math.min(searchLimit, data.length); i++) {
              const imgResponse = await axios.get(data[i], { responseType: "arraybuffer" });
              const imgPath = path.join(__dirname, "cache", `${i + 1}.jpg`);
              await fs.outputFile(imgPath, imgResponse.data);
              imgData.push(fs.createReadStream(imgPath));
            }

            await api.sendMessage(
              {
                body: `📸 𝗣𝗶𝗻𝘁𝗲𝗿𝗲𝘀𝘁\n━━━━━━━━━━━━━━━\n\nShowing top ${searchLimit} results for your query "${keySearchs.trim()}"`,
                attachment: imgData
              },
              event.threadID,
              event.messageID
            );

            // Remove cached images after sending
            await fs.remove(path.join(__dirname, "cache"));
          } catch (error) {
            console.error(error);
            return api.sendMessage(`An error occurred.`, event.threadID, event.messageID);
          }

          return;
        }
        default: {
          let selectedModel = defaultModel;
          const modelMatch = prompt.match(/^model\s+(\d+)/i);

          if (modelMatch) {
            const modelIndex = parseInt(modelMatch[1], 10) - 1;

            if (modelIndex >= 0 && modelIndex < models.length) {
              selectedModel = models[modelIndex];
              prompt = prompt.replace(modelMatch[0], '').trim();
            } else {
              return message.reply("Invalid model number. Use '{p}ai models' to see available models.");
            }
          }

          const { data } = await axios.get(
            `${apiEndpoint}/api/gpt?prompt=${encodeURIComponent(prompt)}&model=${selectedModel}`
          );

          await message.reply(`💭 𝗚𝗣𝗧 \n━━━━━━━━━━━━\n\n${data.original}`);
          api.setMessageReaction("✅", event.messageID, () => {}, true);
        }
      }
    } catch (error) {
      console.error(error);
      message.reply("Sorry, an error occurred while processing your request.");
      api.setMessageReaction("❌", event.messageID, () => {}, true);
    }
  }
};
