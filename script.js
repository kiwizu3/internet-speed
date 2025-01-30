document.getElementById('start-test').addEventListener('click', function() {
    measureSpeed();
});

function measureSpeed() {
    const downloadSpeedElement = document.getElementById('download-speed');
    const uploadSpeedElement = document.getElementById('upload-speed');

    // Measure download speed
    let startTime, endTime;
    const imageUrl = 'https://i.imgur.com/bSDSZQO.jpeg'; //'https://source.unsplash.com/random'; // Replace with a large image URL
    const downloadSize = 3676297; //5000000; // Size of the image in bytes (5MB)
                          
    let image = new Image();
    startTime = (new Date()).getTime();

    image.onload = function() {
        endTime = (new Date()).getTime();
        const duration = (endTime - startTime) / 1000; // Time in seconds
        const bitsLoaded = downloadSize * 8; // Size in bits
        const speedBps = (bitsLoaded / duration).toFixed(2);
        const speedMbps = (speedBps / (1024 * 1024)).toFixed(2);
        console.log("Test \n","image: ", imageUrl,"\n download size: ", downloadSize,"\n Start:", startTime,"\n End:", endTime, bitsLoaded, speedBps, speedMbps);

        downloadSpeedElement.textContent = speedMbps;

        // Measure upload speed (this is a placeholder, actual upload speed measurement is more complex)
        uploadSpeedElement.textContent = (speedMbps * 0.8).toFixed(2); // Assuming upload speed is 80% of download speed
    };

    image.src = imageUrl + '?v=' + Math.random(); // Cache buster
}