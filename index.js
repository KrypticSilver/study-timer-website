var working = false;
var auxBreaking = false;
var shortBreaking = false;
var longBreaking = false;

var workRemaining = 25 * 60 * 1000;
var auxBreakRemaining = 10 * 60 * 1000;
var shortBreakRemaining = 6 * 60 * 1000;
var longBreakRemaining = 15 * 60 * 1000;

var shortBreakCount = 0;
var longBreakInterval = 4;

var timerMode = "work";

function formatTime(ms) {
    hours = Math.floor(ms / (3600 * 1000));
    mins = Math.floor((ms / (60 * 1000)) - (hours * 60));
    secs = Math.floor((ms / 1000) - (mins * 60) - (hours * 3600));


    if (hours < 99) {
        hours = "0" + hours;
    }

    if (mins < 10) {
        mins = "0" + mins;
    }

    if (secs < 10) {
        secs = "0" + secs;
    }


    time = `${hours}:${mins}:${secs}`;

    return time;
}

function delay(ms) {
    return new Promise((resolve) => { setTimeout(() => { resolve(); }, ms); });
}

function changeMode(modeTo) {
    timerMode = modeTo;

    document.getElementById("work-tab").style.backgroundColor = "#02c99f";
    document.getElementById("short-break-tab").style.backgroundColor = "#02c99f";
    document.getElementById("long-break-tab").style.backgroundColor = "#02c99f";

    document.getElementById("work-tab").style.boxShadow = "#02cfa3";
    document.getElementById("short-break-tab").style.boxShadow = "#02cfa3";
    document.getElementById("long-break-tab").style.boxShadow = "#02cfa3";

    if (modeTo == "work") {
        tab = document.getElementById("work-tab");
        tab.style.backgroundColor = "#00e6b4";
        tab.style.boxShadow = "0px 5px #00f0bc";
        checkWorkTimer();

    } else if (modeTo == "short break") {
        tab = document.getElementById("short-break-tab");
        tab.style.backgroundColor = "#00e6b4";
        tab.style.boxShadow = "0px 5px #00f0bc";
        checkShortBreakTimer();

    } else if (modeTo == "long break") {
        tab = document.getElementById("long-break-tab");
        tab.style.backgroundColor = "#00e6b4";
        tab.style.boxShadow = "0px 5px #00f0bc";
        checkLongBreakTimer();
    }
}

async function checkWorkTimer() {
    if (working == false) {
        working = true;

        if (auxBreaking == true) {
            checkAuxillaryBreak()
        }

        timerButton = document.getElementById("timer-button");
        timerButton.style.boxShadow = "none";
        timerButton.style.transform = "translateY(8px)"
        timerButton.innerHTML = "PAUSE"

        while (working == true) {
            await delay(10);

            timer = document.getElementById("timer-display");
            timer.innerHTML = formatTime(workRemaining);

            workRemaining -= 1000;

            if (workRemaining == 0) {
                working = false;

                alert("Work Complete :)");

                checkWorkTimer();
                changeMode("short break");

            }
        };

    } else if (shortBreaking == true) {
        shortBreaking = false;

        timerButton.style.boxShadow = "0px 8px #2c3f63";
        timerButton.style.transform = "translateY(0px)"
        timerButton.innerHTML = "WORK"
    }
}

async function checkShortBreakTimer() {
    if (shortBreaking == false) {
        shortBreaking = true;

        if (auxBreaking == true) {
            checkAuxillaryBreak()
        }

        timerButton = document.getElementById("timer-button");
        timerButton.style.boxShadow = "none";
        timerButton.style.transform = "translateY(8px)"
        timerButton.innerHTML = "PAUSE"

        while (shortBreaking == true) {
            await delay(10);

            timer = document.getElementById("timer-display");
            timer.innerHTML = formatTime(shortBreakRemaining);

            shortBreakRemaining -= 1000;

            if (shortBreakRemaining == 0) {
                shortBreaking = false;
                shortBreakCount += 1;

                alert("Short Break Over");

                if (shortBreakCount % longBreakInterval == 0) {
                    changeMode("long break");

                } else {
                    workRemaining += (25 * 60 * 1000);
                    changeMode("work");

                }

            }
        };

    } else if (shortBreaking == true) {
        shortBreaking = false;

        timerButton.style.boxShadow = "0px 8px #2c3f63";
        timerButton.style.transform = "translateY(0px)"
        timerButton.innerHTML = "RESUME BREAK"
    }
}

async function checkLongBreakTimer() {
    if (longBreaking == false) {
        longBreaking = true;

        if (auxBreaking == true) {
            checkAuxillaryBreak()
        }

        timerButton = document.getElementById("timer-button");
        timerButton.style.boxShadow = "none";
        timerButton.style.transform = "translateY(8px)"
        timerButton.innerHTML = "PAUSE"

        while (longBreaking == true) {
            await delay(10);

            timer = document.getElementById("timer-display");
            timer.innerHTML = formatTime(longBreakRemaining);

            longBreakRemaining -= 1000;

            if (longBreakRemaining == 0) {
                longBreaking = false;

                alert("Short Break Over");

                changeMode("work");

            }
        };

    } else if (longBreaking == true) {
        longBreaking = false;

        timerButton.style.boxShadow = "0px 8px #2c3f63";
        timerButton.style.transform = "translateY(0px)"
        timerButton.innerHTML = "RESUME BREAK"
    }
}

async function checkAuxillaryBreak() {
    if (auxBreaking == false) {
        auxBreaking = true;

        if (shortBreaking == true) {
            checkTimer();
        }

        breakButton = document.getElementById("break-button");
        breakButton.style.boxShadow = "none";
        breakButton.style.transform = "translateY(8px)"
        breakButton.innerHTML = "STOP FREE BREAK";

        while (auxBreaking == true) {
            await delay(10);

            timer = document.getElementById("break-display");
            timer.innerHTML = formatTime(auxBreakRemaining);

            auxBreakRemaining -= 10;
        };

    } else if (auxBreaking == true) {
        auxBreaking = false;

        breakButton.style.boxShadow = "0px 8px #2c3f63";
        breakButton.style.transform = "translateY(0px)"
        breakButton.innerHTML = "START BREAK NOW";

    }


}

function checkTimer() {
    if (timerMode == "work") {
        checkWorkTimer();
    } else if (timerMode == "short break") {
        checkShortBreakTimer();
    } else if (timerMode == "long break") {
        checkLongBreakTimer();
    }
}


changeMode("work");
checkWorkTimer();