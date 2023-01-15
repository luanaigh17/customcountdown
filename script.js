const inputContainer = document.getElementById('input-container');
const countdownForm= document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById("complete-button");

let countdownTitle = "";
let countdownDate = "";
let countdownValue = Date;
let countdownActive;


const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;



//! Set Date Input Minimum to Todays date
//! Grabs date, converts to string, splits string at T(dev tools to see)
const today= new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

//! Populate COuntdown
function updateDOM() {
    //! setInterval makes its repeat the UpdateDOM funciton every second
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue-now;
        console.log("distance", distance);

        const days = Math.floor(distance / day);
        const hours = Math.floor ((distance%day) / hour);
        const minutes = Math.floor ((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);
        console.log(days, hours, minutes, seconds);

        // Hide Input
        inputContainer.hidden = true;

        // if countdown is complete show complete
        if (distance < 0) {
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent=`${countdownTitle} completed on ${countdownDate}`;
            completeEl.hidden=false;
        } else {
            // show countdown in progress
            // Populating Countdown
            countdownElTitle.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;
            completeEl.hidden = true;
            countdownEl.hidden = false;
        }

        //! below along with setInterval makes function happen every second
    },second);
    

}

//! Values From Dom Form
function updateCountdown(e) {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    console.log(countdownTitle,countdownDate);
//   ! Check for Actual Date input
    if (countdownDate === "") {
        alert("Please select a date for the Countdown");
    } else {
     //! Get number versoin of current date, update DOM
    countdownValue = new Date(countdownDate).getTime();
    console.log("countdown value:", countdownValue);
    updateDOM();
    }

}

//! Reset Button
function reset() {
    //! Hides countdown, shows the input screen
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden=false;
    //!  Stops countdown from continueing in background
    clearInterval(countdownActive)
    //! resets values
    countdownTitle = "";
    countdownDate = "";

}

//! Event Listeners
countdownForm.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener("click", reset);
completeBtn.addEventListener("click", reset);