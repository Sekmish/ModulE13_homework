import './styles.css';  // Путь к CSS файлу должен быть правильным
declare const module: any;

document.addEventListener("DOMContentLoaded", () => {
  const title: HTMLElement | null = document.querySelector('.test');

  function enlargeTitle(): void {
    if (title) {
      title.style.fontSize = '3em';
      title.style.transition = 'font-size 1s ease-in-out';
    }
  }

  function shrinkTitle(): void {
    if (title) {
      title.style.fontSize = '2em';
      title.style.transition = 'font-size 1s ease-in-out';
    }
  }

  setInterval(() => {
    enlargeTitle();
    setTimeout(shrinkTitle, 1000);
  }, 2000);
});

if (module.hot) {
  module.hot.accept();
}
