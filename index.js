var timing = false;
var timeWorked = 25 * 60 * 1000;

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
    return new Promise((resolve) => {setTimeout(() => {resolve();}, ms);});
}



async function checkTimer() {
    if (timing == false) {
        timing = true;

        workButton = document.getElementById("work-button");
        workButton.style.boxShadow = "none";
        workButton.style.transform = "translateY(8px)"
        workButton.innerHTML = "PAUSE"

        while (timing == true) {
            await delay(10);

            timer = document.getElementById("timer-display");
            timer.innerHTML = formatTime(timeWorked);

            timeWorked -= 10;
            console.log(timeWorked);
        };

        console.log("function finished");

    } else if (timing == true) {
        timing = false;

        workButton.style.boxShadow = "0px 8px #2c3f63";
        workButton.style.transform = "translateY(0px)"
        workButton.innerHTML = "WORK"

    }
};
