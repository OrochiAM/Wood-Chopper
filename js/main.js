const lumberjack = document.querySelector('.lumberjack');
const explosion = document.querySelector('.explosion');
const scoreP = document.querySelector('.score');
const logs = document.querySelectorAll('.log');
const timerText = document.querySelector('.timer-text');
const x = document.querySelector('.x-space');
const playButton = document.querySelector('.play');
const popup = document.querySelector('.popup');

// NIZ VREDNOSTI KOJE SE PODUDARAJU SA ORIJENTACIJOM GRANA 1-LEVA 2-DESNA 0-NEMA GRANE
let branchArray = [0, 0, 0, 0, 0, 0, 0];

function getRnd(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// KRIERANJE GRANE NA ODNOSU BROJA
const generateBranch = (branchI) => {
  let branch = branchI == 6 ? 0 : getRnd(0, 2);
  branchArray[branchI] = branch;
};

// POPUNJAVANJE NIZA GRANAMA
for (const branchI in branchArray) {
  generateBranch(branchI);
}

// KREIRANJE SLIKE GRANE NA OSNOVU BROJA U NIZU
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

// DODAVANJE GRANA ODGOVARAJUCIM STABLIMA
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

// POMERANJE PRVIH 6 GRANA NA DOLA (JEDNA GRANA SE NE VIDI)
const shiftArray = () => {
  for (let i = 6; i > 0; i--) {
    branchArray[i] = branchArray[i - 1];
  }
};

console.log(branchArray);

let score = 0;
let lost = true;
let timeout;
let time = 60;

// F-JA KOJA ODREDJUJE STA CE SE DESITI KADA SE KLIKNE LEVO ILI DESNO DUGME
const handleLeftRight = (key) => {
  let string;
  key === 'ArrowLeft' || key === 'a' ? (string = 'left') : (string = 'right');
  let num = string == 'left' ? 1 : 2;

  lumberjack.className = `lumberjack lj-${string}`;
  explosion.className = `explosion exp-${string}`;

  x.className = `x-space x-${string}`;
  x.innerHTML = `<img src="images/x.png" style="top: ${getRnd(
    3,
    11
  )}vh; ${string}: ${getRnd(0, 3)}vh" />`;
  console.log(x.innerHTML);

  if (branchArray[6] == num) {
    logs[6].appendChild(createBranch(num));
    lost = true;
    popup.style.display = 'grid';
    explosion.style.display = 'block';
    hurtSound.play();
    clearInterval(timer);
  } else {
    score++;
    handleScore();
  }
};

//POSTAVLJANJE VREMENA I SCORE-A
const handleScore = () => {
  scoreP.innerHTML = score;
};

const handleTime = () => {
  timerText.innerHTML = time;
  timerText.style.color = `hsl(120, 100%, 60%)`;
};

let hurtSound = new Audio('sounds/hurt.mp3');

window.addEventListener('keydown', (e) => {
  let keyPressed = e.key;

  if (keyPressed == ' ' && lost) {
    handleStart();
  }

  if (
    !lost &&
    (keyPressed === 'ArrowLeft' ||
      keyPressed === 'a' ||
      keyPressed === 'ArrowRight' ||
      keyPressed === 'd')
  ) {
    let chopSound = new Audio(`sounds/chop${getRnd(0, 2)}.wav`);

    chopSound.play();

    generateBranch(0);
    shiftArray();
    logHandle();

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      x.innerHTML = '';
    }, 350);

    timeoutTimer = true;

    if (
      keyPressed === 'ArrowLeft' ||
      keyPressed === 'a' ||
      keyPressed === 'ArrowRight' ||
      keyPressed === 'd'
    ) {
      handleLeftRight(keyPressed);
    }
  }
});

let start = 0;
// MOBILNE KONTROLE
window.addEventListener('mousedown', (e) => {
  if (!lost && start == 1) {
    let clickPosition = e.clientX;
    const windowWidth = window.innerWidth;

    let chopSound = new Audio(`sounds/chop${getRnd(0, 2)}.wav`);

    chopSound.play();

    generateBranch(0);
    shiftArray();
    logHandle();

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      x.innerHTML = '';
    }, 350);

    if (clickPosition > windowWidth / 2) {
      handleLeftRight('d');
    } else {
      handleLeftRight('a');
    }
  }
});

// STA SE DESAVA SVAKE SEKUNDE TIMER-A
const timerFunction = () => {
  time--;
  timerText.innerHTML = time;
  timerText.style.color = `hsl(${time * 2}, 100%, 60%)`;
  if (time == 0) {
    lost = true;
    popup.style.display = 'grid';
    clearInterval(timer);
  }
};

let timer;

// F-JA KOJA POSTAVLJA SVE POTREBNE PARAMETRE ZA POCETAK RUNDE
const handleStart = () => {
  clearInterval(timer);

  popup.style.display = 'none';

  lost = false;

  explosion.style.display = 'none';
  logs[6].innerHTML = '';
  lumberjack.className = 'lumberjack lj-left';

  time = 60;
  score = 0;
  handleScore();
  handleTime();

  for (const branchI in branchArray) {
    generateBranch(branchI);
  }
  logHandle();

  timer = setInterval(timerFunction, 1000);
};

playButton.addEventListener('mouseup', () => {
  handleStart();
  if (!start) {
    start++;
  }
});
