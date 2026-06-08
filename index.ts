import axios from "axios";

const BOT_TOKEN = "8792253369:AAE_Sk5GVG8uFKoOuEAmbDtFVSg_y0MzuQM";
const CHANNEL_ID = "@amar_news_bot";
const API_KEY = "1a3a4c903e79feb442626e4346298961";

// Telegram send
async function sendMessage(text: string) {
  await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    chat_id: CHANNEL_ID,
    text: text,
    parse_mode: "HTML",
  });
}

// Live matches
async function getMatches() {
  const res = await axios.get(
    "https://v3.football.api-sports.io/fixtures?live=all",
    {
      headers: {
        "x-apisports-key": API_KEY,
      },
    },
  );

  return res.data.response;
}

// Bangla format
function format(match: any) {
  return `
⚽ <b>লাইভ ম্যাচ</b>

🏟️ ${match.teams.home.name} ${match.goals.home} - ${match.goals.away} ${match.teams.away.name}

⏱️ ম্যাচ চলছে

🔥 Amar News
`;
}

// Main bot
async function run() {
  const matches = await getMatches();

  for (let m of matches) {
    await sendMessage(format(m));
  }

  console.log("Updated!");
}

setInterval(run, 60000);

run();
