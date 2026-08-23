export type OptimizationResult = {
  blob: Blob;
  width: number;
  height: number;
  quality: number;
  originalSize: number;
  finalSize: number;
  format: "webp" | "jpeg" | "png";
};

export async function optimizeImage(
  file: File,
  targetKB: number
): Promise<OptimizationResult> {
  const targetBytes = Math.max(1024, targetKB * 1024);

  const image = await loadImage(file);

  const originalWidth = image.naturalWidth;
  const originalHeight = image.naturalHeight;

  let width = originalWidth;
  let height = originalHeight;

  /*
   * Compression keeps the ORIGINAL image format.
   *
   * JPEG -> JPEG
   * PNG  -> PNG
   * WebP -> WebP
   */
  const mimeType =
    file.type === "image/png"
      ? "image/png"
      : file.type === "image/webp"
        ? "image/webp"
        : "image/jpeg";

  let bestResult: OptimizationResult | null = null;

  /*
   * Try compression at the original dimensions first.
   *
   * Only reduce dimensions if the image cannot
   * reach the target size through compression alone.
   */
  for (
    let dimensionAttempt = 0;
    dimensionAttempt < 12;
    dimensionAttempt++
  ) {
    const result = await findBestFormat(
      image,
      width,
      height,
      targetBytes,
      mimeType,
      file.size
    );

    if (result) {
      bestResult = {
        ...result,
        format:
          mimeType === "image/png"
            ? "png"
            : mimeType === "image/webp"
              ? "webp"
              : "jpeg",
      };

      break;
    }

    /*
     * Compression alone could not reach the target.
     * Reduce dimensions gradually.
     */
    width = Math.floor(width * 0.92);
    height = Math.floor(height * 0.92);

    if (width < 200 || height < 200) {
      break;
    }
  }

  if (!bestResult) {
    throw new Error(
      `FitFile could not reduce this image below ${targetKB} KB.`
    );
  }

  return bestResult;
}

async function findBestFormat(
  image: HTMLImageElement,
  width: number,
  height: number,
  targetBytes: number,
  mimeType: "image/png" | "image/webp" | "image/jpeg",
  originalSize: number
): Promise<OptimizationResult | null> {
  /*
   * PNG is lossless.
   *
   * Browsers do not provide useful quality-based PNG
   * compression through canvas.toBlob().
   *
   * Therefore, create the PNG at the current
   * dimensions and check whether it already fits.
   */
  if (mimeType === "image/png") {
    const pngBlob = await createImage(
      image,
      width,
      height,
      undefined,
      mimeType
    );

    if (pngBlob.size > targetBytes) {
      return null;
    }

    return {
      blob: pngBlob,
      width,
      height,
      quality: 1,
      originalSize,
      finalSize: pngBlob.size,
      format: "png",
    };
  }

  /*
   * JPEG and WebP support quality-based compression.
   *
   * Start with very strong compression to see if the
   * target is possible at this resolution.
   */
  const lowestQualityBlob = await createImage(
    image,
    width,
    height,
    0.05,
    mimeType
  );

  if (lowestQualityBlob.size > targetBytes) {
    return null;
  }

  /*
   * Find the HIGHEST quality that still fits.
   */
  let low = 0.05;
  let high = 0.98;

  let bestBlob = lowestQualityBlob;
  let bestQuality = 0.05;

  for (let attempt = 0; attempt < 14; attempt++) {
    const quality = (low + high) / 2;

    const blob = await createImage(
      image,
      width,
      height,
      quality,
      mimeType
    );

    if (blob.size <= targetBytes) {
      bestBlob = blob;
      bestQuality = quality;

      low = quality;
    } else {
      high = quality;
    }
  }

  return {
    blob: bestBlob,
    width,
    height,
    quality: bestQuality,
    originalSize,
    finalSize: bestBlob.size,
    format:
      mimeType === "image/webp"
        ? "webp"
        : "jpeg",
  };
}

function loadImage(
  file: File
): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    const url = URL.createObjectURL(file);

    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);

      reject(
        new Error(
          "FitFile could not read this image."
        )
      );
    };

    image.src = url;
  });
}

function createImage(
  image: HTMLImageElement,
  width: number,
  height: number,
  quality: number | undefined,
  mimeType:
    | "image/webp"
    | "image/jpeg"
    | "image/png"
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");

    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d");

    if (!context) {
      reject(
        new Error(
          "FitFile could not create the image canvas."
        )
      );

      return;
    }

    /*
     * Keep browser resizing as high quality as possible.
     */
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";

    context.drawImage(
      image,
      0,
      0,
      width,
      height
    );

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(
            new Error(
              "FitFile could not create the optimized image."
            )
          );

          return;
        }

        resolve(blob);
      },
      mimeType,
      quality
    );
  });
}

export async function convertImage(
  file: File,
  outputFormat:
    | "original"
    | "jpeg"
    | "png"
    | "webp"
    | "avif"
): Promise<Blob> {
  if (outputFormat === "original") {
    return file;
  }

  const image = await loadImage(file);

  const canvas = document.createElement("canvas");

  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error(
      "FitFile could not create the conversion canvas."
    );
  }

  /*
   * JPEG does not support transparency.
   * Use a white background when converting to JPEG.
   */
  if (outputFormat === "jpeg") {
    context.fillStyle = "#ffffff";

    context.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );
  }

  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";

  context.drawImage(
    image,
    0,
    0,
    canvas.width,
    canvas.height
  );

  const mimeTypes = {
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    avif: "image/avif",
  } as const;

  const mimeType = mimeTypes[outputFormat];

  /*
   * PNG doesn't use a quality parameter in browsers.
   *
   * The other formats use a reasonably high quality.
   */
  const quality =
    outputFormat === "png"
      ? undefined
      : outputFormat === "avif"
        ? 0.8
        : outputFormat === "webp"
          ? 0.82
          : 0.85;

  const blob = await new Promise<Blob>(
    (resolve, reject) => {
      canvas.toBlob(
        (result) => {
          if (!result) {
            reject(
              new Error(
                `Your browser could not create ${outputFormat.toUpperCase()} output.`
              )
            );

            return;
          }

          resolve(result);
        },
        mimeType,
        quality
      );
    }
  );

  return blob;
}

export async function resizeImage(
  file: File,
  width: number,
  height: number
): Promise<Blob> {
  if (width <= 0 || height <= 0) {
    throw new Error(
      "Width and height must be greater than zero."
    );
  }

  const image = await loadImage(file);

  const canvas = document.createElement("canvas");

  canvas.width = Math.round(width);
  canvas.height = Math.round(height);

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error(
      "FitFile could not create the resize canvas."
    );
  }

  /*
   * JPEG does not support transparency.
   * Use a white background when exporting as JPEG.
   */
  if (
    file.type === "image/jpeg" ||
    file.type === "image/jpg"
  ) {
    context.fillStyle = "#ffffff";

    context.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );
  }

  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";

  context.drawImage(
    image,
    0,
    0,
    canvas.width,
    canvas.height
  );

  const outputType =
    file.type === "image/png"
      ? "image/png"
      : file.type === "image/webp"
        ? "image/webp"
        : "image/jpeg";

  const quality =
    outputType === "image/png"
      ? undefined
      : outputType === "image/webp"
        ? 0.82
        : 0.85;

  const blob = await new Promise<Blob>(
    (resolve, reject) => {
      canvas.toBlob(
        (result) => {
          if (!result) {
            reject(
              new Error(
                "FitFile could not create the resized image."
              )
            );

            return;
          }

          resolve(result);
        },
        outputType,
        quality
      );
    }
  );

  return blob;
}