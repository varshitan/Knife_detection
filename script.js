const imageUpload = document.getElementById('imageUpload');
const resultDiv = document.getElementById('result');

imageUpload.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    const image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = async () => {
        const model = await mobilenet.load();
        const predictions = await model.classify(image);
        const knifePrediction = predictions.find(prediction => prediction.className.includes('knife'));
        if (knifePrediction && knifePrediction.probability > 0.5) {
            resultDiv.textContent = "It's a Knife";
        } else {
            resultDiv.textContent = "It's not a Knife";
        }
    };
});
