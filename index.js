require('dotenv').config()
const telegramAPI = require('node-telegram-bot-api')

const bot = new telegramAPI(process.env.TELEGRAM_TOKEN, { polling: true })

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
  bot.sendPhoto(message.chat.id, 'AgACAgIAAxkBAAIF22NcLBi1FT8ccdz_Yj8pvkaIbqsWAAImwjEbbh-xSjbkx8YRy3RYAQADAgADeQADKgQ', comandsList)
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
    'room': async () => {
      await bot.sendMessage(chatId, 'С одной кроватью')
      await bot.sendMediaGroup(chatId, [
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

      await bot.sendMessage(chatId, 'С одной кроватью')
      await bot.sendMediaGroup(chatId, [
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
      await bot.sendMessage(chatId, 'С двумя кроватями')
      await bot.sendMediaGroup(chatId, [
        {
          type: 'photo',
          media: 'AgACAgQAAxkBAAIGB2NcMjyM_F2Vch9nej300iOWUWZWAAKsujEbdArIUg-luSXnc2lHAQADAgADeAADKgQ'
        },
        {
          type: 'photo',
          media: 'AgACAgQAAxkBAAIGCGNcMqvsQZuOszUkNn6fzc4OsXfGAAKtujEbdArIUn3oBCFOXhYEAQADAgADeQADKgQ'
        },
        {
          type: 'photo',
          media: 'AgACAgQAAxkBAAIGCWNcMsvbNmuhLsc3IGokhHQEdlZvAAKuujEbdArIUgy32EzH0H0qAQADAgADeAADKgQ'
        },
        {
          type: 'photo',
          media: 'AgACAgQAAxkBAAIGCmNcMuHEAdyGL3_rsjNNza8KwD0BAAKvujEbdArIUuKdyy6vXRk3AQADAgADeQADKgQ'
        },
        {
          type: 'photo',
          media: 'AgACAgQAAxkBAAIGDGNcM0Dlsj4hZt8hpcLJvHB3t8IzAAKwujEbdArIUp7sCJir3EuhAQADAgADbQADKgQ'
        },
        {
          type: 'photo',
          media: 'AgACAgQAAxkBAAIGDWNcM2eg6cQ8vK-uGu6Rz_MWTqQYAAKxujEbdArIUnQ4U1eHbeuZAQADAgADeQADKgQ'
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
