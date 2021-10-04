function formatTime(seconds) {

    hours = Math.floor(seconds / 3600);
    mins = Math.floor(seconds / 60);
    secs = (seconds % 60);

    if (hours > 0) {
    time = `${hours}:${mins}:${seconds}`;
    } else 

    return time;
}


function updateClock(timeWorked) {
    return new Promise(resolve => setTimeout(() => {

        
        timer = document.getElementById("timer-display");
        timer.innerHTML = `${mins}:${secs}`;

        resolve();

    }, 1000));
}


async function startTimer() {
    var timeWorked = 0;

    while(true) {

        console.log("Time left:");
        console.log(timeWorked);

        await updateClock(timeWorked);

        timeWorked += 1;
    };
};

console.log(formatTime(60));