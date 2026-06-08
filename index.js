const axios = require("axios");

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;
const API_KEY = process.env.API_KEY;

async function sendMessage(text) {
  await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    chat_id: CHANNEL_ID,
    text: text,
    parse_mode: "HTML"
  });
}

async function getMatches() {
  const res = await axios.get("https://v3.football.api-sports.io/fixtures?live=all", {
    headers: {
      "x-apisports-key": API_KEY
    }
  });

  return res.data.response;
}

function format(m) {
  return `
⚽ লাইভ ম্যাচ

🏟️ ${m.teams.home.name} ${m.goals.home} - ${m.goals.away} ${m.teams.away.name}

🔥 Amar News
`;
}

async function run() {
  const matches = await getMatches();

  for (let m of matches) {
    await sendMessage(format(m));
  }
}

setInterval(run, 60000);
run();
