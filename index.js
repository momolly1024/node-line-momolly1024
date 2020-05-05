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
        msg += data.results[i].original_title + '\n'
      }
    } else if (event.message.text === '熱映中') {
      for (let i = 0; i < data.results.length; i++) {
        msg = data.results[0].title + '\n'
      }
    } else if (event.message.text === '說明') {
      for (let i = 0; i < data.results.length; i++) {
        msg += data.results[i].overview + '\n'
      }
    } else if (event.message.text === '機器人在哪') {
      msg = {
        type: 'location',
        title: '在你心裡',
        address: '25172新北市淡水區中正路一段2號1樓(國賓影城@淡水禮萊廣場)',
        latitude: 25.176703,
        longitude: 121.429059
      }
    } else if (event.message.type === 'sticker') {
      msg = [{
        type: 'text',
        text: '不管怎樣，送你一個抱抱'
      }, {
        type: 'sticker',
        packageId: '11537',
        stickerId: '52002737'
      }]
    } else if (event.message.type === 'image') {
      msg = '抱歉，我不能收你的照片:<'
    } else if (event.message.text === '機器人長相') {
      msg = [{
        type: 'text',
        text: '你要我的照片做什麼˙v˙！'
      }, {
        type: 'image',
        originalContentUrl: 'https://i.imgur.com/ZTxlAke.png',
        previewImageUrl: 'https://i.imgur.com/ZTxlAke.png'
      }]
    } else if (event.message.text === '滾') {
      msg = {
        type: 'template',
        altText: '你忍心嗎QQ',
        template: {
          type: 'confirm',
          text: '決定我的去向',
          actions: [{
            type: 'message',
            label: '滾！',
            text: '掰掰'
          }, {
            type: 'message',
            label: '留下來',
            text: '再給你一次機會'
          }]
        }
      }
    } else {
      msg = '哈囉~~ 請輸入【now_playing】或【熱映中】，查看近期熱播中的電影！\n好啦還是你想知道【機器人在哪】、【機器人長相】、【滾】、【？？？】'
    }
  } catch (error) {
    msg = '發生錯誤'
  }
  event.reply(msg)
})

bot.on('join', async (event) => {
  let say = ''
  try {
    say = [
      {
        type: 'text',
        text: 'OH YA,大家好~~~'
      },
      {
        type: 'sticker',
        packageId: '11537',
        stickerId: '52002734'
      }
    ]
  } catch (error) {
    say = '發生錯誤'
  }
  event.reply(say)
})
bot.on('message', async (event) => {
  let action = ''
  try {

  } catch (error) {
    action = '發生錯誤'
  }
  event.reply(action)
})
// 在 port 啟動
bot.listen('/', process.env.PORT, () => {
  console.log('機器人已啟動')
})
