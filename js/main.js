const lumberjack = document.querySelector('.lumberjack');

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    lumberjack.className = 'lumberjack lj-left';
  } else if (e.key === 'ArrowRight') {
    lumberjack.className = 'lumberjack lj-right';
  }
});
