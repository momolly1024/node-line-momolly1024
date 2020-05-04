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
    const data = await rp({ url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=0d93c386d9d8221cbfa4c29585d53c53&language=zh-tw', json: true })
    if (event.message.text === 'now_playing') {
      for (let i = 0; i < data.results.length; i++) {
        // movie += data.result[i].original_title
        msg += '現正熱映中的電影有：' + data.results[i].title + '\n'
      }
    } else if (event.message.type === 'sticker') {
      msg = '抱歉，我看不懂貼圖>.<'
    } else if (event.message.type === 'image') {
      msg = '抱歉，我不能收你的照片:<'
    } else {
      msg = '請輸入now_playing'
    }
  } catch (error) {
    msg = '發生錯誤'
  }
  event.reply(msg)
})

// 在 port 啟動
bot.listen('/', process.env.PORT, () => {
  console.log('機器人已啟動')
  // console.log(movie)
})
