document.getElementById('start-test').addEventListener('click', function () {
    // Disable the button and change its text
    const startButtonContainer = document.getElementById('start-btn-container');
    startButtonContainer.disabled = true;
    const startButton = document.getElementById('start-test');
    // startButton.textContent = 'Testing...';
    startButton.setAttribute('src', 'dots.svg');
    startButton.setAttribute('class', 'dots-icon');

    // Start the speed test
    measureSpeed();
});

function measureSpeed() {
    const downloadSpeedElement = document.getElementById('download-speed');
    const averageSpeedElement = document.getElementById('average-speed');
    const topSpeedElement = document.getElementById('top-speed');

    // URL of a large file to download (add a random query string to bypass cache)
    const fileUrl = `https://kiwizu3.github.io/internet-speed/large-file.zip?nocache=${new Date().getTime()}`;

    const xhr = new XMLHttpRequest();

    let startTime, previousTime, previousLoaded = 0;
    let speedSamples = [];

    xhr.open('GET', fileUrl, true);
    xhr.responseType = 'blob';

    xhr.onprogress = function (event) {
        const currentTime = (new Date()).getTime();
        if (!startTime) {
            startTime = currentTime;
            previousTime = currentTime;
        }

        const currentLoaded = event.loaded;
        let timeElapsed = (currentTime - previousTime) / 1000; // Time elapsed in seconds
        if (timeElapsed === 0) return;

        const dataDownloaded = currentLoaded - previousLoaded;
        if (dataDownloaded <= 0) return;

        // Calculate speed in Mbps
        const speedBps = (dataDownloaded * 8) / timeElapsed;
        const speedMbps = (speedBps / (1024 * 1024)).toFixed(2);

        if (!isNaN(speedMbps) && isFinite(speedMbps)) {
            speedSamples.push(parseFloat(speedMbps));
        }

        if (speedSamples.length > 0) {
            const topSpeed = Math.max(...speedSamples);
            topSpeedElement.textContent = topSpeed.toFixed(2);
        }

        if (speedSamples.length > 0) {
            const averageSpeed = (speedSamples.reduce((sum, speed) => sum + speed, 0) / speedSamples.length).toFixed(2);
            averageSpeedElement.textContent = averageSpeed;
        }

        downloadSpeedElement.textContent = speedMbps;

        previousTime = currentTime;
        previousLoaded = currentLoaded;
    };

    xhr.onload = function () {
        const endTime = (new Date()).getTime();
        const totalTime = (endTime - startTime) / 1000; // Total time in seconds
        const totalLoaded = xhr.response.size;

        if (totalTime > 0) {
            const speedBps = (totalLoaded * 8) / totalTime;
            const speedMbps = (speedBps / (1024 * 1024)).toFixed(2);
            downloadSpeedElement.textContent = speedMbps;
        }

        // Re-enable the button
        const startButtonContainer = document.getElementById('start-btn-container');
        startButtonContainer.disabled = false;
        const startButton = document.getElementById('start-test');
        // startButton.textContent = '\uF4F5';
        startButton.setAttribute('src', 'play.svg');
        startButton.setAttribute('class', 'start-icon');
    };

    xhr.onerror = function () {
        console.error('Error downloading the file.');
        const startButtonContainer = document.getElementById('start-btn-container');
        startButtonContainer.disabled = false;
        const startButton = document.getElementById('start-test');
        // startButton.textContent = '\uF4F5';
        startButton.setAttribute('src', 'play.svg');
        startButton.setAttribute('class', 'start-icon');
    };

    xhr.send();
}
