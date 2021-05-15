/**
 * ! For preventing promising deprecating issue
 */
process.env.NTBA_FIX_319 = 1;

/**
 * * Imports
 */
require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

/**
 * * Bot Token
 */
const botToken = process.env.BOT_TOKEN;

/**
 * * Create Bot
 */
const bot = new TelegramBot(botToken, {
  polling: true,
});

/**
 * * On sending message to bot event
 */
bot.on("message", (message) => {
  /**
   * * Check if the contact has been shared then remove the custom keyboard
   */
  if (message.contact) {
    bot.sendMessage(
      message.chat.id,
      `Thank you for sharing! 🙏🏻 \n\nWelcome aboard our service, ${message.contact.first_name}! 🥰`,
      {
        reply_markup: {
          remove_keyboard: true,
        },
      }
    );
  }
});

/**
 * * On text /start which is the first command when user initialize conversation with bot
 */
bot.onText(/\/start/, (message) => {

  console.log(message);

  /**
   * * Request user phone number/location
   */
  bot.sendMessage(
    message.chat.id,
    "Welcome to our service! 😍 \n\nPlease share your phone number in order to recieve custom personal notifications! 🥳",
    {
      reply_markup: {
        keyboard: [
          [
            {
              text: "Share Contact",
              request_contact: true,
            },
          ],
        ],
        one_time_keyboard: true,
      },
    }
  );
});

/**
 * * Error Handling
 */
bot.on("polling_error", (error) => {
  console.log(error);
});
