let model;

async function loadModel() {
    model = await tf.loadLayersModel('model/model.json');
}

loadModel();

function classifyImage() {
    // showSpinner();
    const imageUpload = document.getElementById('imageUpload');
    if (!imageUpload.files[0]) return;
    showSpinner();
    const uploadedImage = document.getElementById('uploadedImage');
    const image = new Image();
    image.src = URL.createObjectURL(imageUpload.files[0]);
    uploadedImage.src = image.src;
    uploadedImage.style.display = 'block';
    image.onload = async () => {
        const tensor = tf.browser.fromPixels(image)
        .resizeNearestNeighbor([128, 128])
        .toFloat()
        .expandDims();

        const predictions = model.predict(tensor);
        const highestPredictionIndex = predictions.argMax(-1).dataSync()[0];
        const confidence = predictions.max().dataSync()[0];

        if(highestPredictionIndex == 0) {
            document.getElementById('prediction').innerText = `Prediction: Pokemon`;
        } else {
            document.getElementById('prediction').innerText = `Prediction: Digimon`;
        }
        document.getElementById('confidence').innerText = `Confidence: ${(confidence * 100).toFixed(2)}%`;
        hideSpinner();
    };
}

document.addEventListener("DOMContentLoaded", function() {
    function toggleMenu() {
        var x = document.getElementById("myLinks");
        if (x.style.display === "block") {
            x.style.display = "none";
        } else {
            x.style.display = "block";
        }
    }

});
document.getElementById('imageUpload').addEventListener('change', function() {
    const imageUpload = document.getElementById('imageUpload');
    const uploadedImage = document.getElementById('uploadedImage');
    uploadedImage.src = URL.createObjectURL(imageUpload.files[0]);
    uploadedImage.onload = function() {
        uploadedImage.style.display = 'block';
    };
});
function showSpinner() {
    document.getElementById('loading-spinner').style.display = 'block';
}
function hideSpinner() {
    document.getElementById('loading-spinner').style.display = 'none';
}
