document.addEventListener("DOMContentLoaded", () => {
  const njbNavy = "#1A3673";
  const njbGreen = "#8CC63F";

  let qrOptions = {
    width: 300,
    height: 300,
    type: "canvas",
    data: "https://example.com",
    image: "",
    margin: 10,
    qrOptions: { typeNumber: 0, mode: "Byte", errorCorrectionLevel: "H" },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.4,
      margin: 5,
      crossOrigin: "anonymous",
    },
    dotsOptions: { type: "square", color: njbNavy },
    cornersSquareOptions: { type: "", color: njbNavy },
    cornersDotOptions: { type: "", color: njbGreen },
  };

  const qrCode = new QRCodeStyling(qrOptions);
  qrCode.append(document.getElementById("qr-preview"));

  const updateQR = () => {
    const text = document.getElementById("dataInput").value;
    qrOptions.data = text || "https://example.com";

    qrOptions.dotsOptions.type = document.querySelector(
      'input[name="bodyShape"]:checked',
    ).value;
    qrOptions.cornersSquareOptions.type = document.querySelector(
      'input[name="extEyeShape"]:checked',
    ).value;
    qrOptions.cornersDotOptions.type = document.querySelector(
      'input[name="intEyeShape"]:checked',
    ).value;

    qrOptions.dotsOptions.color = document.getElementById("bodyColor").value;
    qrOptions.cornersSquareOptions.color =
      document.getElementById("extEyeColor").value;
    qrOptions.cornersDotOptions.color =
      document.getElementById("intEyeColor").value;

    qrCode.update(qrOptions);
  };

  document.getElementById("dataInput").addEventListener("input", updateQR);
  document
    .querySelectorAll('input[type="radio"], input[type="color"]')
    .forEach((el) => {
      el.addEventListener("input", updateQR);
    });

  const logoInput = document.getElementById("logoInput");
  const removeLogoBtn = document.getElementById("removeLogoBtn");
  const fileNameDisplay = document.getElementById("fileNameDisplay");

  logoInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      fileNameDisplay.textContent = `Logo: ${file.name}`;
      fileNameDisplay.classList.add("text-blue-600");

      const reader = new FileReader();
      reader.onload = (event) => {
        qrOptions.image = event.target.result;
        removeLogoBtn.classList.remove("hidden");
        updateQR();
      };
      reader.readAsDataURL(file);
    }
  });

  removeLogoBtn.addEventListener("click", () => {
    qrOptions.image = "";
    logoInput.value = "";
    fileNameDisplay.textContent = "Belum ada logo terpilih";
    fileNameDisplay.classList.remove("text-blue-600");
    removeLogoBtn.classList.add("hidden");
    updateQR();
  });

  document.getElementById("downloadBtn").addEventListener("click", () => {
    const format = document.getElementById("formatSelect").value;
    const fileNameRaw = document.getElementById("filenameInput").value.trim();
    qrCode.download({
      name: fileNameRaw || "NJB_QRCode",
      extension: format,
    });
  });

  updateQR();
});
