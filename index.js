// script.js
document.getElementById('download-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const videoUrl = document.getElementById('video-url').value;

    const response = await fetch('http://127.0.0.1:5000/download', { // Ensure the URL matches your backend URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: videoUrl }),
    });

    if (response.ok) {
        const formats = await response.json();
        displayDownloadOptions(formats);
    } else {
        console.error('Failed to fetch video formats');
    }
});

function displayDownloadOptions(formats) {
    const optionsDiv = document.getElementById('download-options');
    optionsDiv.innerHTML = '<h3>Select a format to download:</h3>';

    formats.forEach(format => {
        const btn = document.createElement('button');
        btn.textContent = `Download ${format.ext} (${format.format_note})`;
        btn.addEventListener('click', () => downloadVideo(format.url));
        optionsDiv.appendChild(btn);
    });
}

function downloadVideo(formatUrl) {
    window.location.href = formatUrl; // Redirect to the download link
}
