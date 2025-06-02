const lumberjack = document.querySelector('.lumberjack');
const explosion = document.querySelector('.explosion');
const windowWidth = window.innerWidth;
const scoreP = document.querySelector('.score');
const logs = document.querySelectorAll('.log');
const timerText = document.querySelector('.timer-text');
const x = document.querySelector('.x-space');
const playButton = document.querySelector('.play');
const popup = document.querySelector('.popup');

let branchArray = [0, 0, 0, 0, 0, 0, 0];

function getRnd(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateBranch = (branchI) => {
  let branch = branchI == 6 ? 0 : getRnd(0, 2);
  branchArray[branchI] = branch;
};

for (const branchI in branchArray) {
  generateBranch(branchI);
}

const createBranch = (type) => {
  let logImg = document.createElement('img');
  logImg.src = 'images/branch.png';

  switch (type) {
    case 1:
      logImg.className += ' branch left-branch';
      break;
    case 2:
      logImg.className += ' branch right-branch';
      break;
  }

  return logImg;
};

const logHandle = () => {
  for (let logI = 0; logI < 6; logI++) {
    let branchType = branchArray[logI];
    logs[logI].innerHTML = '';

    if (branchType) {
      logs[logI].appendChild(createBranch(branchType));
    }
  }
};

logHandle();

const shiftArray = () => {
  for (let i = 6; i > 0; i--) {
    branchArray[i] = branchArray[i - 1];
  }
};
console.log(branchArray);

let score = 0;
let lost = false;
let timeout;
const handleLeftRight = () => {};

window.addEventListener('keydown', (e) => {
  let keyPressed = e.key;

  if (keyPressed == ' ') {
    popup.style.display = 'none';
    timer = setInterval(timerFunction, 1000);
  }

  if (
    !lost &&
    (keyPressed === 'ArrowLeft' ||
      keyPressed === 'a' ||
      keyPressed === 'ArrowRight' ||
      keyPressed === 'd')
  ) {
    let chopSound = new Audio(`sounds/chop${getRnd(0, 2)}.wav`);
    let hurtSound = new Audio('sounds/hurt.mp3');

    chopSound.play();

    generateBranch(0);
    shiftArray();
    logHandle();
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      x.innerHTML = '';
    }, 350);

    timeoutTimer = true;
    console.log(branchArray);
    if (keyPressed === 'ArrowLeft' || keyPressed === 'a') {
      lumberjack.className = 'lumberjack lj-left';
      explosion.className = 'explosion exp-left';

      x.className = 'x-space x-left';
      x.innerHTML = `<img src="images/x.png" style="top: ${getRnd(
        3,
        11
      )}vh; left: ${getRnd(0, 3)}vh" />`;

      if (branchArray[6] == 1) {
        logs[6].appendChild(createBranch(1));
        lost = true;
        explosion.style.display = 'block';
        hurtSound.play();
        clearInterval(timer);
      } else {
        scoreP.innerHTML = ++score;
      }
    } else if (keyPressed === 'ArrowRight' || keyPressed === 'd') {
      lumberjack.className = 'lumberjack lj-right';

      explosion.className = 'explosion exp-right';
      x.className = 'x-space x-right';
      x.innerHTML = `<img src="images/x.png" style="top: ${getRnd(
        3,
        11
      )}vh; right: ${getRnd(0, 3)}vh" />`;

      if (branchArray[6] == 2) {
        logs[6].appendChild(createBranch(2));
        lost = true;
        explosion.style.display = 'block';
        hurtSound.play();
      } else {
        scoreP.innerHTML = ++score;
      }
    }
  }
});

// window.addEventListener('click', (e) => {
//   let clickPosition = e.clientX;

//   if (clickPosition < windowWidth / 2) {
//     lumberjack.className = 'lumberjack lj-left';
//   } else {
//     lumberjack.className = 'lumberjack lj-right';
//   }
// });

let time = 60;

const timerFunction = () => {
  time--;
  timerText.innerHTML = time;
  timerText.style.color = `hsl(${time * 2}, 100%, 60%)`;
  if (time == 0) {
    lost = true;
    clearInterval(timer);
  }
};

let timer;

playButton.addEventListener('click', () => {
  popup.style.display = 'none';
  timer = setInterval(timerFunction, 1000);
});
