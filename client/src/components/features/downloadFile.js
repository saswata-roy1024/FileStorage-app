
async function downloadFile(fileUrl, fileName) {
    try {
        const response = await fetch(fileUrl);
        if (!response.ok) throw new Error('Network response was not ok');

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = fileName;
        document.body.appendChild(anchor);
        anchor.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(anchor);
    } catch (error) {
        console.error('Error downloading the file:', error);
    }
}

export default downloadFile