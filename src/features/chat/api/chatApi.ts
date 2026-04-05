export const sendMessageApi = (
  needError: boolean,
  signal?: AbortSignal,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const delayMs = 1000 + Math.random() * 1000;
    const timeoutId = setTimeout(() => {
      if (signal?.aborted) {
        reject(new DOMException('The operation was aborted.', 'AbortError'));
        return;
      }

      const isError = Math.random() < 0.2;
      if (isError && needError) {
        reject(new Error('Network error'));
      } else {
        resolve();
      }
    }, delayMs);

    signal?.addEventListener('abort', () => {
      clearTimeout(timeoutId);
      reject(new DOMException('The operation was aborted.', 'AbortError'));
    });
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
