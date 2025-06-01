const lumberjack = document.querySelector('.lumberjack');
const explosion = document.querySelector('.explosion');
const windowWidth = window.innerWidth;
const scoreP = document.querySelector('.score');
const logs = document.querySelectorAll('.log');
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
window.addEventListener('keydown', (e) => {
  if (!lost) {
    let keyPressed = e.key;

    let chopSound = new Audio(`sounds/chop${getRnd(0, 2)}.wav`);
    let hurtSound = new Audio('sounds/hurt.mp3');

    chopSound.play();

    generateBranch(0);
    shiftArray();
    logHandle();

    console.log(branchArray);
    if (keyPressed === 'ArrowLeft' || keyPressed === 'a') {
      lumberjack.className = 'lumberjack lj-left';
      explosion.className = 'explosion exp-left';

      if (branchArray[6] == 1) {
        logs[6].appendChild(createBranch(1));
        lost = true;
        explosion.style.display = 'block';
        hurtSound.play();
      } else {
        scoreP.innerHTML = ++score;
      }
    } else if (keyPressed === 'ArrowRight' || keyPressed === 'd') {
      lumberjack.className = 'lumberjack lj-right';
      explosion.className = 'explosion exp-right';

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

window.addEventListener('click', (e) => {
  let clickPosition = e.clientX;

  if (clickPosition < windowWidth / 2) {
    lumberjack.className = 'lumberjack lj-left';
  } else {
    lumberjack.className = 'lumberjack lj-right';
  }
});
