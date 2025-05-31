const lumberjack = document.querySelector('.lumberjack');
const windowWidth = window.innerWidth;
window.addEventListener('keydown', (e) => {
  let keyPressed = e.key;

  if (keyPressed === 'ArrowLeft' || keyPressed === 'a') {
    lumberjack.className = 'lumberjack lj-left';
  } else if (keyPressed === 'ArrowRight' || keyPressed === 'd') {
    lumberjack.className = 'lumberjack lj-right';
  }
});

window.addEventListener('click', (e) => {
  let clickPosition = e.clientX;

  if (clickPosition < windowWidth / 2) {
    lumberjack.className = 'lumberjack lj-left';
  } else {
    lumberjack.className = 'lumberjack lj-right';
  }
});
