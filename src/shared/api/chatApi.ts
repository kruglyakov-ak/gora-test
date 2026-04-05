export const sendMessageApi = () => {
  return new Promise<void>((resolve, reject) => {
    const delay = 1000 + Math.random() * 1000;

    setTimeout(() => {
      const isError = Math.random() < 0.2;

      if (isError) {
        reject(new Error('Network error'));
      } else {
        resolve();
      }
    }, delay);
  });
};

export const BOT_MESSAGES = [
  'Понял, спасибо что поделился',
  'Это важное замечание',
  'Интересная мысль, продолжай',
  'Я подумаю над этим',
  'Можешь уточнить детали?',
  'Кажется, я понимаю о чём ты',
  'Это звучит знакомо',
  'Давай разберёмся подробнее',
  'Неожиданный поворот 🙂',
  'Хорошо сформулировано',
];
