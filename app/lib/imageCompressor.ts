/**
 * Mengompres file gambar secara otomatis di browser sebelum disimpan.
 * Mengubah ukuran gambar ke batas resolusi avatar (misal 256x256 px)
 * dan mengonversi menjadi string Data URL (WebP/JPEG) berukuran sangat kecil (~15-30 KB).
 */
export async function compressImage(
  file: File,
  maxWidth = 256,
  maxHeight = 256,
  quality = 0.8
): Promise<string> {
  return new Promise((resolve, reject) => {
    // Validasi tipe file
    if (!file.type.startsWith("image/")) {
      reject(new Error("File yang dipilih bukan gambar"));
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Pertahankan rasio aspek gambar
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }

        // Gambar ulang di canvas dengan ukuran baru
        ctx.drawImage(img, 0, 0, width, height);

        // Kompres ke format WebP jika didukung browser, atau fallback ke JPEG
        try {
          const webpData = canvas.toDataURL("image/webp", quality);
          if (webpData.startsWith("data:image/webp")) {
            resolve(webpData);
            return;
          }
        } catch {
          // Fallback jika browser lawas
        }

        resolve(canvas.toDataURL("image/jpeg", quality));
      };

      img.onerror = () => reject(new Error("Gagal membaca file gambar"));
    };

    reader.onerror = () => reject(new Error("Gagal membaca file"));
  });
}
