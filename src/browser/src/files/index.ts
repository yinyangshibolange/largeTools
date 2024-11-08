export function chooseImage(): Promise<File | null> {
  return new Promise((resolve, reject) => {
    const upload = document.createElement("input");
    upload.type = "file";
    upload.accept = "image/*";
    upload.style.display = "none";
    upload.addEventListener("change", (e) => {
      const file = upload.files && upload.files[0];
      resolve(file);
    });
    upload.click();
  });
}


