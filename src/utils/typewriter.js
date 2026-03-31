/**
 * Typewriter effect - types text character by character into an element
 */
export function typewrite(element, text, speed = 40) {
  return new Promise((resolve) => {
    let i = 0;
    element.textContent = '';
    element.classList.add('typing-cursor');

    const interval = setInterval(() => {
      if (i < text.length) {
        element.textContent += text[i];
        i++;
      } else {
        clearInterval(interval);
        element.classList.remove('typing-cursor');
        resolve();
      }
    }, speed);
  });
}

/**
 * Typewrite with HTML support (for styled segments)
 */
export function typewriteHTML(element, text, speed = 40) {
  return new Promise((resolve) => {
    let i = 0;
    element.innerHTML = '';

    const interval = setInterval(() => {
      if (i < text.length) {
        // Skip HTML tags instantly
        if (text[i] === '<') {
          const closeIdx = text.indexOf('>', i);
          if (closeIdx !== -1) {
            element.innerHTML += text.substring(i, closeIdx + 1);
            i = closeIdx + 1;
            return;
          }
        }
        element.innerHTML += text[i];
        i++;
      } else {
        clearInterval(interval);
        resolve();
      }
    }, speed);
  });
}

/**
 * Wait with a visual "contemplation" pause
 */
export function contemplationPause(ms = 1200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
