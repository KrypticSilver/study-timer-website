let startTimer = () => {
    console.log("working");
    var timeLeft = 200;

    while(timeLeft > 0) {
        console.log("working1");
        setInterval(() => {

            mins = Math.floor(2000 / 60);
            secs = (2000 % 60);

            console.log("nice");
            timer = document.getElementById("timer-display");
            timer.innerHTML = `${mins}:${secs}`;

            timeleft -= 1;

        }, 1000)
    };
};

