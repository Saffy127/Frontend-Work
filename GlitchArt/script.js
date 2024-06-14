document.addEventListener("DOMContentLoaded", () => {
  const upload = document.getElementById("upload");
  const applyGlitchBtn = document.getElementById("apply-glitch");
  const loading = document.getElementById("loading");
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  let imageLoaded = false;

  upload.addEventListener("change", (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        imageLoaded = true;
        applyGlitchBtn.disabled = false;
      };
    };
    reader.readAsDataURL(file);
  });

  applyGlitchBtn.addEventListener("click", () => {
    if (imageLoaded) {
      applyGlitchBtn.disabled = true;
      loading.classList.remove("hidden");
      createGlitchEffect().then(() => {
        loading.classList.add("hidden");
        applyGlitchBtn.disabled = false;
      });
    }
  });

  async function createGlitchEffect() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    let tensor = tf.browser.fromPixels(imageData);

    const redChannel = tensor.slice([0, 0, 0], [-1, -1, 1]);
    const greenChannel = tensor.slice([0, 0, 1], [-1, -1, 1]);
    const blueChannel = tensor.slice([0, 0, 2], [-1, -1, 1]);

    const shiftAmount = 20;
    const redShifted = tf.concat(
      [
        redChannel.slice([0, shiftAmount, 0], [-1, -1, -1]),
        redChannel.slice([0, 0, 0], [-1, shiftAmount, -1]),
      ],
      1,
    );

    tensor = tf.concat([redShifted, greenChannel, blueChannel], 2);

    const noise = tf.randomUniform(tensor.shape, -50, 50, "int32");
    tensor = tensor.add(noise).clipByValue(0, 255);

    await tf.browser.toPixels(tensor, canvas);
    console.log("Glitch effect applied successfully");
  }
});
