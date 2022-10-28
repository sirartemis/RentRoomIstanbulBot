require('dotenv').config()
const telegramAPI = require('node-telegram-bot-api')

const bot = new telegramAPI(process.env.TELEGRAM_TOKEN, { webHook: process.env.PORT })
bot.setWebHook(`${process.env.APP_URL}/bot${process.env.TELEGRAM_TOKEN}`)

bot.setMyCommands([
  { command: '/start', description: 'запустить/перезапустить  бот' },
  { command: '/info', description: 'информация об отеле' },
  { command: '/rent', description: 'забронировать номер в отеле' },
  { command: '/question', description: 'задать вопрос' },
])

const comandsList = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: 'Инфо', callback_data: 'info' }, { text: 'Бронировать', callback_data: 'rent' }],
      [{ text: 'Задать вопрос', callback_data: 'question' }, { text: 'Перезапустить бота', callback_data: 'start' }],
    ]
  })
}

const infoOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: 'Краткое описание', callback_data: 'short' },{ text: 'Цена за ночь', callback_data: 'price' }],
      [{ text: 'Комнаты', callback_data: 'room' }, { text: 'Кухня', callback_data: 'kitchen' }],
      [{ text: 'Условия', callback_data: 'conditions' },{ text: 'Стирка вещей', callback_data: 'washing' }],
    ]
  })
}

const infoMenu = message => {
  const chatId = message.chat.id
  bot.sendMessage(chatId, 'Выберите раздел', infoOptions)
}

const startingBot = message => {
  const chatId = message.chat.id
  bot.sendMessage(chatId, 'Добро пожаловать в сервис брони отеля в самом центре Стамбула!')
  bot.sendPhoto(message.chat.id, './photos/photo_2022-10-24_18-43-43.jpg', comandsList)
}

const rentRoom = message => {
  const chatId = -656996991
  let name = message.from.first_name
  let lastName = message.from.last_name || ''
  let userName = message.from.username
  const sendingMessages = () => {
    bot.sendMessage(chatId, `${name} ${lastName} @${userName} want to rent room`)
    bot.sendMessage(message.chat.id, 'Скоро с вами свяжется хозяин отеля. Ожидайте')
  }
  if (userName === undefined) {
    bot.sendMessage(message.chat.id, 'У вас нет username в Telegram. Создайте username, чтобы хозяин отеля смог с вами связаться')
  } else if (message.from.is_bot) {
    name = message.chat.first_name
    lastName = message.chat.last_name
    userName = message.chat.username
    sendingMessages()
  } else {
    sendingMessages()
  }
}

bot.onText(/\/start/, message => startingBot(message))

bot.onText(/\/question/, message => {
  rentRoom(message)
})

bot.onText(/\/info/, message => infoMenu(message))

bot.onText(/\/rent/, message => {
  rentRoom(message)
})

bot.on('photo', ctx => {
  console.log(ctx)
})

bot.on('message', message => {
  console.log(message)
})

bot.on('callback_query', query => {
  const message = query.message
  console.log(message)
  const chatId = query.message.chat.id
  const optionsList = {
    'short': () => {
      bot.sendMessage(chatId, 'Предлагаем вашему вниманию возможность проживания в комнатах со всеми удобствами в прекрасном районе Бейоглу')
    },
    'price': () => {
      bot.sendMessage(chatId, 'Стоимость аренды от 700 лир за ночь')
    },
    'room': () => {
      bot.sendMessage(chatId, 'С одной кроватью')
      bot.sendMediaGroup(chatId, [
        {
          type: 'photo',
          media: 'AgACAgQAAxkBAAICzGNW_TshBAOCNj09-YwOBolGXqVLAALLujEbD7BJUjk13v00isgBAQADAgADeQADKgQ'
        },
        {
          type: 'photo',
          media: 'AgACAgQAAxkBAAIC2WNXnaIZNbixRyEzT8AoITdeJfeSAALJujEbD7BJUmPYjEg10nT7AQADAgADbQADKgQ'
        },
        {
          type: 'photo',
          media: 'AgACAgQAAxkBAAIC2mNXneNEGBPcpF2WRffMEhsNXgEoAALIujEbD7BJUil3JouVBKBcAQADAgADeQADKgQ'
        },
        {
          type: 'photo',
          media: 'AgACAgQAAxkBAAIC22NXnfk__77B7P-UqhkP_wX6pOHVAALKujEbD7BJUowNyKhdtiTPAQADAgADeAADKgQ'
        },
      ])

      bot.sendMessage(chatId, 'С двумя кроватями')
      bot.sendMediaGroup(chatId, [
        {
          type: 'photo',
          media: 'AgACAgQAAxkBAAIFSmNarGbdia6bAwF9wcpDJ-9MqsBgAAJFujEbQ-3IUuSjeEY2Qv9fAQADAgADcwADKgQ'
        },
        {
          type: 'photo',
          media: 'AgACAgQAAxkBAAIFS2NarIj0yBIVh5BeJnRayMS67A9GAAJGujEbQ-3IUgABXWREWMvFdwEAAwIAA3MAAyoE'
        },
        {
          type: 'photo',
          media: 'AgACAgQAAxkBAAIFTGNarLMfupFBM0hkljIKxInSHn-nAAJHujEbQ-3IUgwW6NZZJqWvAQADAgADcwADKgQ'
        },
        {
          type: 'photo',
          media: 'AgACAgQAAxkBAAIFTWNarO7IV8wE-qqv_njHYaosC_NJAAJIujEbQ-3IUtydRnD3W3TMAQADAgADcwADKgQ'
        },
      ])
    },
    'kitchen': () => {
      bot.sendMediaGroup(chatId, [
        {
          type: 'photo',
          media: 'AgACAgQAAxkBAAIC72NXnoWGELTayUKOeq5hcMSUjv0-AAJCvDEboTO5UrcWz_f4ug1iAQADAgADcwADKgQ'
        },
        {
          type: 'photo',
          media: 'AgACAgQAAxkBAAIC8GNXnoVaAuj6G4bAmR2R5582JANJAAJDvDEboTO5UheU54r1zsvZAQADAgADcwADKgQ'
        }
      ])
    },
    'washing': () => {
      bot.sendMediaGroup(chatId, [
        {
          type: 'photo',
          media: 'AgACAgQAAxkBAAIC9mNXn0B8QuqbZ3CcQR2_gauFau9EAAJBvDEboTO5UvUxfYSYhpwJAQADAgADeQADKgQ'
        }
      ])
    },
    'conditions': () => {
      bot.sendMessage(chatId, 'Общая кухня,стиральные и сушильные машины, посуда')
      bot.sendMessage(chatId, 'Входная терасса с розеткой и столиками, где можно сидеть и даже курить')
    },
    'info': () => infoMenu(message),
    'question': () => rentRoom(message),
    'start': () => startingBot(message),
    'rent': () => rentRoom(message),
  }
  optionsList[query.data]()
})
