var timing = false;
var timeWorked = 25 * 60 - 1;

function formatTime(seconds) {
    hours = Math.floor(seconds / 3600);
    mins = Math.floor((seconds / 60) - (hours * 60));
    secs = (seconds - (mins * 60) - (hours * 3600));


    if (hours < 99) {
        hours = "0" + hours;
    }

    if (mins < 10) {
        mins = "0" + mins;
    }

    if (secs < 10) {
        secs = "0" + secs;
    }

    if (timing == true) {
        time = `${hours}:${mins}:${secs}`;
    }

    return time;
}


function updateClock(timeWorked) {
    return new Promise(resolve => setTimeout(() => {
        timer = document.getElementById("timer-display");
        timer.innerHTML = formatTime(timeWorked);

        resolve();

    }, 1000));
}


async function startTimer() {
    console.log("Heyy")
    if (timing != true) {

        timing = true;

        workButton = document.getElementById("work-button");
        workButton.style.boxShadow = "none";
        workButton.style.transform = "translateY(8px)"
        workButton.innerHTML = "STOP"

        while (timing) {

            console.log(timing);

            await updateClock(timeWorked);

            timeWorked -= 1;
        };
    } else {
        workButton.style.boxShadow = "0px 8px #2c3f63";
        workButton.style.transform = "translateY(0px)"
        workButton.innerHTML = "WORK"

        timing = false;
    }
};
