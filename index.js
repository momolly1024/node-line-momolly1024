// 引用linebot套件
import linebot from 'linebot'
// 引用 dotenv套件
import dotenv from 'dotenv'
// 引用request-promise套件
import rp from 'request-promise'
// 讀取 .env檔
dotenv.config()
// 宣告機器人的資訊
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})
// 當收到訊息時
bot.on('message', async (event) => {
  let msg = ''
  try {
    const data = await rp({ uri: 'https://kktix.com/events.json', json: true })
    msg = data.entry[0].title
    console.log(msg)
  } catch (error) {
    msg = '發生錯誤'
  }
  event.reply(msg)
})

// 在 port 啟動
bot.listen('/', process.env.PORT, () => {
  console.log('機器人已啟動')
})
