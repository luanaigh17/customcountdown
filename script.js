const inputContainer = document.getElementById('input-contaienr');
const countdownForm= document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

// Set Date Input Minimum to Todays date
// Grabs date, converts to string, splits string at T(dev tools to see)
const today= new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);