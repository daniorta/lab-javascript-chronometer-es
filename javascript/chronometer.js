class Chronometer {
  constructor() {
    this.currentTime = 0;
    this.intervalId = null;
    // ... your code goes here
  }

  start(callback) {

    this.intervalId = setInterval(() => {
      if (typeof callback === "function") {
        callback();
      }
      this.currentTime++;
    }, 1000)
  }

  getMinutes() {
    let minutos = Math.floor(this.currentTime / 60);
    return minutos;
  }

  getSeconds() {
    let segundos = this.currentTime % 60;
    return segundos;
  }

  computeTwoDigitNumber(number) {
    return String(number).length === 1 ? "0" + number : String(number).slice(0, 2);

  }

  stop() {
    clearInterval(this.intervalId);
  }

  reset() {
    this.currentTime = 0;
  
    const minDecElement = document.querySelector("#minDec");
    const minUniElement = document.querySelector("#minUni");
    const secDecElement = document.querySelector("#secDec");
    const secUniElement = document.querySelector("#secUni");
    const milDecElement = document.querySelector("#milDec");
    const milUniElement = document.querySelector("#milUni");
  
    if (minDecElement && minUniElement && secDecElement && secUniElement && milDecElement && milUniElement) {
      minDecElement.textContent = "0";
      minUniElement.textContent = "0";
      secDecElement.textContent = "0";
      secUniElement.textContent = "0";
      milDecElement.textContent = "0";
      milUniElement.textContent = "0";
    } 
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  split() {

    let minutos = this.computeTwoDigitNumber(this.getMinutes());
    let segundos = this.computeTwoDigitNumber(this.getSeconds());
    let milisegundos = this.computeTwoDigitNumber(Date.now() % 1000); // Capturar los milisegundos al registrar un split

    return `${minutos}:${segundos}:${milisegundos}`;

  }
 

}
// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = Chronometer;
}
