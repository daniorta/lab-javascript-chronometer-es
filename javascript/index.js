
const chronometer = new Chronometer();

// get the buttons:
const btnLeftElement = document.getElementById('btnLeft');
const btnRightElement = document.getElementById('btnRight');



// get the DOM elements that will serve us to display the time:
const minDecElement = document.getElementById('minDec');
const minUniElement = document.getElementById('minUni');
const secDecElement = document.getElementById('secDec');
const secUniElement = document.getElementById('secUni');
const milDecElement = document.getElementById('milDec');
const milUniElement = document.getElementById('milUni');
const splitsElement = document.getElementById('splits');



function printTime() {
  printMinutes();
  printSeconds();
  printMilliseconds()
}

function printMinutes() {
  const min = chronometer.getMinutes(); // Obtener los minutos
  const minFormateados = chronometer.computeTwoDigitNumber(min); // Formatear los minutos

  document.querySelector("#minDec").textContent = minFormateados[0];
  document.querySelector("#minUni").textContent = minFormateados[1];
}


function printSeconds() {
  const sec = chronometer.getSeconds(); // Obtener los segundos
  const secFormateados = chronometer.computeTwoDigitNumber(sec); // Formatear los segundos

  document.querySelector("#secDec").textContent = secFormateados[0];
  document.querySelector("#secUni").textContent = secFormateados[1];
}

// ==> BONUS
function printMilliseconds() {
  const milisegundos = Date.now() % 1000;
  const milisegundosFormateados = chronometer.computeTwoDigitNumber(milisegundos);

  milDecElement.textContent = milisegundosFormateados.charAt(0);
  milUniElement.textContent = milisegundosFormateados.charAt(1);
  
}


function printSplit() {
  if (chronometer.intervalId !== null) {
    const splitTime = chronometer.split();
    const splitItem = document.createElement("li");
    splitItem.textContent = splitTime;

    splitsElement.appendChild(splitItem);
  }

}
function clearSplits() {
  const splitsList = document.getElementById('splits'); // Obtener la lista de divisiones
  while (splitsList.firstChild) { // Mientras existan elementos en la lista
    splitsList.removeChild(splitsList.firstChild); // Eliminar el primer elemento
  }
}

function setStopBtn() {
  btnLeftElement.classList.remove('start');
  btnLeftElement.classList.add('stop');
  btnLeftElement.textContent = 'STOP';
}

function setSplitBtn() {
  btnRightElement.classList.remove('reset');
  btnRightElement.classList.add('split');
  btnRightElement.textContent = 'SPLIT';
}

function setStartBtn() {
  btnLeftElement.classList.remove('stop');
  btnLeftElement.classList.add('start');
  btnLeftElement.textContent = 'START';
}

function setResetBtn() {
  btnRightElement.classList.remove('split');
  btnRightElement.classList.add('reset');
  btnRightElement.textContent = 'RESET';
}

// Start/Stop Button
btnLeftElement.addEventListener('click', () => {
  if (btnLeftElement.classList.contains('start')) {
    chronometer.start(printTime);
    setStopBtn();
    setSplitBtn();
    intervalId = setInterval(printMilliseconds, 10); // Iniciar la actualización de los milisegundos al iniciar el cronómetro

  } else {
    chronometer.stop(printTime);
    setStartBtn();
    setResetBtn();
    clearInterval(intervalId);
  }
});

// Reset/Split Button
btnRightElement.addEventListener('click', () => {
  if (btnRightElement.classList.contains('split')) {
    const splitMilisegundos = printMilliseconds();
    chronometer.split(printSplit, splitMilisegundos);
    printSplit(); // Llamar a la función de división

  } else {
    chronometer.reset(); // Llamar a la función de reinicio en el caso contrario
    clearSplits(); // Limpiar las divisiones mostradas
  }
})
