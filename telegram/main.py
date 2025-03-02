import asyncio
import logging
from aiogram import Bot, Dispatcher
from config import config
from telegram.handlers.admin_handlers import admin_router
from telegram.handlers.login_handlers import login_router
from telegram.handlers.user_handlers import user_router

# Включаем логирование, чтобы не пропустить важные сообщения
logging.basicConfig(level=logging.INFO)
# Объект бота
bot = Bot(token=config.bot_token.get_secret_value())
# Диспетчер
dp = Dispatcher()

dp.include_routers(admin_router, login_router, user_router)


async def main():
    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())
