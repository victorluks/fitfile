"use client";

import {
  ChangeEvent,
  DragEvent,
  useEffect,
  useState,
} from "react";

import {
  optimizeImage,
  convertImage,
  resizeImage,
  OptimizationResult,
} from "@/lib/imageOptimizer";

type Mode = "compress" | "convert" | "resize";

type OutputFormat =
  | "original"
  | "jpeg"
  | "png"
  | "webp"
  | "avif";

type ImageFitToolProps = {
  lockedMode?: Mode;
};

export default function ImageFitTool({
  lockedMode,
}: ImageFitToolProps) {
  const [file, setFile] = useState<File | null>(null);

  const [mode, setMode] = useState<Mode>(
  lockedMode ?? "compress"
);

  const [outputFormat, setOutputFormat] =
    useState<OutputFormat>("webp");

  const [resizeWidth, setResizeWidth] =
    useState(1200);

  const [resizeHeight, setResizeHeight] =
    useState(1200);

  const [keepAspectRatio, setKeepAspectRatio] =
    useState(true);

  const [targetKB, setTargetKB] =
    useState(100);

  const [dragging, setDragging] =
    useState(false);

  const [processing, setProcessing] =
    useState(false);

  const [progress, setProgress] =
    useState(0);

  const [result, setResult] =
    useState<OptimizationResult | null>(null);

  const [error, setError] =
    useState("");

  const [originalPreview, setOriginalPreview] =
    useState("");

  const [processedPreview, setProcessedPreview] =
    useState("");

  const [originalSize, setOriginalSize] =
    useState(0);

  const [processedSize, setProcessedSize] =
    useState(0);

  const [processedBlob, setProcessedBlob] =
    useState<Blob | null>(null);

  /*
   * CLEAN UP PREVIEW URLS
   */
  useEffect(() => {
    return () => {
      if (originalPreview) {
        URL.revokeObjectURL(originalPreview);
      }

      if (processedPreview) {
        URL.revokeObjectURL(processedPreview);
      }
    };
  }, [originalPreview, processedPreview]);

  /*
   * FORMAT FILE SIZE
   */
  function formatBytes(bytes: number) {
    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  /*
   * GET CURRENT FILE FORMAT
   */
  const currentFormat =
    file?.type === "image/png"
      ? "PNG"
      : file?.type === "image/webp"
        ? "WebP"
        : "JPEG";

  /*
   * TARGET SIZE WARNING
   */
  const targetIsLargerThanOriginal =
    file !== null &&
    targetKB * 1024 >= file.size;

  /*
   * HANDLE FILE
   */
  function handleFile(selectedFile?: File) {
    if (!selectedFile) {
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      setError("Please choose a valid image file.");
      return;
    }

    if (selectedFile.size > 50 * 1024 * 1024) {
      setError(
        "Please choose an image smaller than 50 MB."
      );
      return;
    }

    setFile(selectedFile);

    setOriginalSize(selectedFile.size);

    setOriginalPreview(
      URL.createObjectURL(selectedFile)
    );

    setProcessedPreview("");
    setProcessedSize(0);
    setProcessedBlob(null);
    setResult(null);
    setError("");
    setProgress(0);
  }

  /*
   * FILE INPUT
   */
  function handleInput(
    event: ChangeEvent<HTMLInputElement>
  ) {
    handleFile(event.target.files?.[0]);
  }

  /*
   * DRAG & DROP
   */
  function handleDrop(
    event: DragEvent<HTMLDivElement>
  ) {
    event.preventDefault();

    setDragging(false);

    handleFile(
      event.dataTransfer.files?.[0]
    );
  }

  /*
   * CLEAR PREVIOUS RESULT
   */
  function clearProcessedResult() {
    setResult(null);
    setProcessedPreview("");
    setProcessedSize(0);
    setProcessedBlob(null);
    setError("");
    setProgress(0);
  }

  /*
   * SWITCH MODE
   */
  function switchMode(nextMode: Mode) {
    setMode(nextMode);

    clearProcessedResult();

    if (nextMode === "compress") {
      setTargetKB(100);
    }

    if (nextMode === "convert") {
      setOutputFormat("webp");
    }

    if (nextMode === "resize") {
      setResizeWidth(1200);
      setResizeHeight(1200);
      setKeepAspectRatio(true);
    }
  }

  /*
   * COMPRESS
   */
  async function handleOptimize() {
    if (!file) {
      setError("Please choose an image first.");
      return;
    }

    if (targetKB <= 0) {
      setError("Enter a valid target size.");
      return;
    }

    setProcessing(true);
    setProgress(0);
    setError("");
    setResult(null);

    const progressTimer =
      window.setInterval(() => {
        setProgress((current) => {
          if (current >= 90) {
            return current;
          }

          if (current < 30) {
            return current + 5;
          }

          if (current < 60) {
            return current + 3;
          }

          return current + 1;
        });
      }, 150);

    try {
      const optimized = await optimizeImage(
        file,
        targetKB
      );

      setProcessedPreview(
        URL.createObjectURL(
          optimized.blob
        )
      );

      setProcessedSize(
        optimized.blob.size
      );

      setProcessedBlob(
        optimized.blob
      );

      setResult(optimized);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while optimizing the image."
      );
    } finally {
      window.clearInterval(progressTimer);

      setProgress(100);

      window.setTimeout(() => {
        setProcessing(false);
      }, 350);
    }
  }

  /*
   * CONVERT
   */
  async function handleConvert() {
    if (!file) {
      setError("Please choose an image first.");
      return;
    }

    if (outputFormat === "original") {
      setError(
        "Choose a different output format."
      );
      return;
    }

    setProcessing(true);
    setProgress(0);
    setError("");

    setProcessedPreview("");
    setProcessedSize(0);
    setProcessedBlob(null);
    setResult(null);

    const progressTimer =
      window.setInterval(() => {
        setProgress((current) => {
          if (current >= 95) {
            return current;
          }

          return current + 1;
        });
      }, 100);

    try {
      const converted = await convertImage(
        file,
        outputFormat
      );

      setProcessedBlob(converted);

      setProcessedPreview(
        URL.createObjectURL(converted)
      );

      setProcessedSize(converted.size);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Conversion failed."
      );
    } finally {
      window.clearInterval(progressTimer);

      setProgress(100);

      window.setTimeout(() => {
        setProcessing(false);
      }, 350);
    }
  }

  /*
   * RESIZE
   */
  async function handleResize() {
    if (!file) {
      setError("Please choose an image first.");
      return;
    }

    if (
      resizeWidth <= 0 ||
      resizeHeight <= 0
    ) {
      setError(
        "Enter valid width and height values."
      );
      return;
    }

    setProcessing(true);
    setProgress(0);
    setError("");

    setProcessedPreview("");
    setProcessedSize(0);
    setProcessedBlob(null);
    setResult(null);

    const progressTimer =
      window.setInterval(() => {
        setProgress((current) => {
          if (current >= 95) {
            return current;
          }

          return current + 1;
        });
      }, 100);

    try {
      const resized = await resizeImage(
        file,
        resizeWidth,
        resizeHeight
      );

      setProcessedPreview(
        URL.createObjectURL(resized)
      );

      setProcessedSize(resized.size);

      setProcessedBlob(resized);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Resize failed."
      );
    } finally {
      window.clearInterval(progressTimer);

      setProgress(100);

      window.setTimeout(() => {
        setProcessing(false);
      }, 350);
    }
  }

  /*
   * RESET EVERYTHING
   */
  function resetTool() {
    if (originalPreview) {
      URL.revokeObjectURL(
        originalPreview
      );
    }

    if (processedPreview) {
      URL.revokeObjectURL(
        processedPreview
      );
    }

    setFile(null);
    setResult(null);
    setError("");
    setDragging(false);
    setOriginalPreview("");
    setProcessedPreview("");
    setOriginalSize(0);
    setProcessedSize(0);
    setProcessedBlob(null);
    setProgress(0);
    setProcessing(false);
  }

  /*
   * COMPRESS SAVINGS
   *
   * IMPORTANT:
   * This is ONLY used by Compress.
   */
  const savings =
    result &&
    result.originalSize > 0
      ? Math.max(
          0,
          Math.round(
            (1 -
              result.finalSize /
                result.originalSize) *
              100
          )
        )
      : 0;

  /*
   * DOWNLOAD CONVERTED / RESIZED FILE
   */
  function downloadProcessedFile() {
    if (!processedBlob || !file) {
      return;
    }

    const url =
      URL.createObjectURL(
        processedBlob
      );

    const link =
      document.createElement("a");

    link.href = url;

    const baseName =
      file.name.replace(
        /\.[^/.]+$/,
        ""
      );

    if (mode === "convert") {
      const extension =
        outputFormat === "jpeg"
          ? "jpg"
          : outputFormat;

      link.download =
        `fitfile-${baseName}.${extension}`;
    } else {
      const extension =
        file.type === "image/png"
          ? "png"
          : file.type === "image/webp"
            ? "webp"
            : "jpg";

      link.download =
        `fitfile-${baseName}-resized.${extension}`;
    }

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    window.setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  }

  /*
   * DOWNLOAD COMPRESSED FILE
   */
  function downloadCompressedFile() {
    if (!result || !file) {
      return;
    }

    const url =
      URL.createObjectURL(
        result.blob
      );

    const link =
      document.createElement("a");

    link.href = url;

    const baseName =
      file.name.replace(
        /\.[^/.]+$/,
        ""
      );

    const extension =
      result.format === "jpeg"
        ? "jpg"
        : result.format;

    link.download =
      `fitfile-${baseName}-compressed.${extension}`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    window.setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  }

  /*
   * RESIZE WIDTH → HEIGHT
   */
  function updateResizeWidth(
    newWidth: number
  ) {
    setResizeWidth(newWidth);

    if (
      !keepAspectRatio ||
      !file ||
      newWidth <= 0
    ) {
      return;
    }

    const image = new Image();

    const url =
      URL.createObjectURL(file);

    image.onload = () => {
      const newHeight =
        Math.round(
          newWidth *
            (image.naturalHeight /
              image.naturalWidth)
        );

      setResizeHeight(
        newHeight
      );

      URL.revokeObjectURL(url);
    };

    image.src = url;
  }

  /*
   * RESIZE HEIGHT → WIDTH
   */
  function updateResizeHeight(
    newHeight: number
  ) {
    setResizeHeight(newHeight);

    if (
      !keepAspectRatio ||
      !file ||
      newHeight <= 0
    ) {
      return;
    }

    const image = new Image();

    const url =
      URL.createObjectURL(file);

    image.onload = () => {
      const newWidth =
        Math.round(
          newHeight *
            (image.naturalWidth /
              image.naturalHeight)
        );

      setResizeWidth(
        newWidth
      );

      URL.revokeObjectURL(url);
    };

    image.src = url;
  }

  /*
   * KEEP ASPECT RATIO
   */
  function toggleAspectRatio(
    checked: boolean
  ) {
    setKeepAspectRatio(checked);

    if (!checked || !file) {
      return;
    }

    const image = new Image();

    const url =
      URL.createObjectURL(file);

    image.onload = () => {
      const newHeight =
        Math.round(
          resizeWidth *
            (image.naturalHeight /
              image.naturalWidth)
        );

      setResizeHeight(
        newHeight
      );

      URL.revokeObjectURL(url);
    };

    image.src = url;
  }

  return (
    <div
      className={`relative rounded-[2rem] border p-3 shadow-2xl transition-all ${
        dragging
          ? "border-[#c8ff3d] bg-[#c8ff3d]/10"
          : "border-white/10 bg-[#0d100e]/90"
      }`}
    >
      {/* ================================================== */}
{/* MODE SWITCHER */}
{/* ================================================== */}
{!lockedMode && (
  <div className="mb-4 grid grid-cols-3 rounded-2xl border border-white/8 bg-[#090b0a] p-1.5">
        <button
          type="button"
          onClick={() =>
            switchMode("compress")
          }
          className={`rounded-xl px-3 py-3 text-xs font-bold transition ${
            mode === "compress"
              ? "bg-[#c8ff3d] text-[#080a09]"
              : "text-white/35 hover:text-white"
          }`}
        >
          Compress
        </button>

        <button
          type="button"
          onClick={() =>
            switchMode("convert")
          }
          className={`rounded-xl px-3 py-3 text-xs font-bold transition ${
            mode === "convert"
              ? "bg-[#c8ff3d] text-[#080a09]"
              : "text-white/35 hover:text-white"
          }`}
        >
          Convert
        </button>

        <button
          type="button"
          onClick={() =>
            switchMode("resize")
          }
          className={`rounded-xl px-3 py-3 text-xs font-bold transition ${
            mode === "resize"
              ? "bg-[#c8ff3d] text-[#080a09]"
              : "text-white/35 hover:text-white"
          }`}
        >
          Resize
        </button>
        </div>
)}

{/* ================================================== */}
{/* DROP ZONE */}
      {/* ================================================== */}

      <div
        onDragEnter={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() =>
          setDragging(false)
        }
        onDrop={handleDrop}
        className="rounded-[1.5rem] border border-white/8 bg-[#090b0a] p-7 sm:p-9"
      >
        {/* ================================================== */}
        {/* NO FILE */}
        {/* ================================================== */}

        {!file ? (
          <>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/30">
                  Step 01
                </p>

                <h2 className="mt-2 text-xl font-bold">
                  Drop your file
                </h2>
              </div>

              <span className="text-sm text-white/20">
                01
              </span>
            </div>

            <div className="mt-8 flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-6 text-center">
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-[#c8ff3d] text-2xl font-black text-[#080a09] ${
                  dragging
                    ? "scale-110"
                    : ""
                }`}
              >
                ↑
              </div>

              <p className="mt-6 font-semibold">
                {dragging
                  ? "Drop it here"
                  : "Drop an image here"}
              </p>

              <p className="mt-2 text-sm text-white/30">
                JPG, PNG or WebP · Max 50 MB
              </p>

              <label className="mt-6 cursor-pointer rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium transition hover:border-[#c8ff3d]/30 hover:text-[#c8ff3d]">
                Choose file

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={handleInput}
                />
              </label>
            </div>
          </>
        ) : (
          <>
            {/* ================================================== */}
            {/* FILE HEADER */}
            {/* ================================================== */}

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c8ff3d]">
                  {(
                    mode === "compress"
                      ? result
                      : processedPreview
                  )
                    ? "Complete"
                    : "Step 02"}
                </p>

                <h2 className="mt-2 text-xl font-bold">
                  {(
                    mode === "compress"
                      ? result
                      : processedPreview
                  )
                    ? "Your file is ready."
                    : mode === "compress"
                      ? "Set your requirement"
                      : mode === "convert"
                        ? "Choose a format"
                        : "Set your dimensions"}
                </h2>
              </div>

              <button
                type="button"
                onClick={resetTool}
                className="text-xs text-white/30 transition hover:text-white"
              >
                Change file
              </button>
            </div>

            {/* ================================================== */}
            {/* FILE CARD */}
            {/* ================================================== */}

            <div className="mt-8 rounded-2xl border border-white/8 bg-white/[0.025] p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/5">
                  <img
                    src={originalPreview}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">
                    {file.name}
                  </p>

                  <p className="mt-1 text-xs text-white/30">
                    {formatBytes(file.size)}
                  </p>
                </div>
              </div>
            </div>

            {/* ================================================== */}
            {/* ORIGINAL PREVIEW */}
            {/* ================================================== */}

            <div className="mt-4 rounded-2xl border border-white/8 bg-white/[0.025] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/25">
                Original
              </p>

              <div className="mt-3 overflow-hidden rounded-xl bg-black/20">
                <img
                  src={originalPreview}
                  alt="Original image"
                  className="h-52 w-full object-contain"
                />
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-white/30">
                  Before
                </span>

                <span className="text-xs font-semibold text-white/60">
                  {formatBytes(
                    originalSize
                  )}
                </span>
              </div>
            </div>

            {/* ================================================== */}
            {/* COMPRESS SETTINGS */}
            {/* ================================================== */}

            {mode === "compress" &&
              !result && (
                <div className="mt-4 rounded-2xl border border-white/8 bg-white/[0.025] p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/25">
                        Maximum file size
                      </p>

                      <p className="mt-1 text-sm text-white/40">
                        Keep it under
                      </p>

                      {targetIsLargerThanOriginal && (
                        <p className="mt-2 text-xs text-[#c8ff3d]/70">
                          Your target is already larger than the original file. Compression may not be necessary.
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 rounded-xl border border-[#c8ff3d]/20 bg-[#c8ff3d]/5 px-4 py-2">
                      <input
                        type="number"
                        min="1"
                        max="50000"
                        value={targetKB}
                        onChange={(event) =>
                          setTargetKB(
                            Number(
                              event.target.value
                            )
                          )
                        }
                        className="w-16 bg-transparent text-right text-lg font-bold text-[#c8ff3d] outline-none"
                      />

                      <span className="text-xs text-[#c8ff3d]/60">
                        KB
                      </span>
                    </div>
                  </div>
                </div>
              )}

            {/* ================================================== */}
            {/* CONVERT SETTINGS */}
            {/* ================================================== */}

            {mode === "convert" &&
              !processedPreview && (
                <div className="mt-4 rounded-2xl border border-white/8 bg-white/[0.025] p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/25">
                      Convert to
                    </p>

                    <span className="rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 text-[10px] font-semibold text-white/35">
                      Current: {currentFormat}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {[
                      {
                        value: "jpeg",
                        label: "JPEG",
                      },
                      {
                        value: "png",
                        label: "PNG",
                      },
                      {
                        value: "webp",
                        label: "WebP",
                      },
                      {
                        value: "avif",
                        label: "AVIF",
                      },
                    ].map((format) => (
                      <button
                        key={format.value}
                        type="button"
                        onClick={() => {
                          setOutputFormat(
                            format.value as OutputFormat
                          );

                          setError("");
                        }}
                        className={`rounded-xl border px-3 py-3 text-xs font-bold transition ${
                          outputFormat ===
                          format.value
                            ? "border-[#c8ff3d]/40 bg-[#c8ff3d]/10 text-[#c8ff3d]"
                            : "border-white/8 bg-white/[0.02] text-white/35 hover:text-white"
                        }`}
                      >
                        {format.label}
                      </button>
                    ))}
                  </div>

                  <p className="mt-3 text-xs leading-5 text-white/25">
                    Changes the image format without changing its dimensions. Conversion may increase or decrease the final file size.
                  </p>
                </div>
              )}

            {/* ================================================== */}
            {/* RESIZE SETTINGS */}
            {/* ================================================== */}

            {mode === "resize" &&
              !processedPreview && (
                <div className="mt-4 rounded-2xl border border-white/8 bg-white/[0.025] p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/25">
                    Resize image
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {/* WIDTH */}
                    <div>
                      <label className="text-xs text-white/35">
                        Width
                      </label>

                      <div className="mt-2 flex items-center rounded-xl border border-white/8 bg-black/20 px-3">
                        <input
                          type="number"
                          min="1"
                          value={resizeWidth}
                          onChange={(event) =>
                            updateResizeWidth(
                              Number(
                                event.target.value
                              )
                            )
                          }
                          className="w-full bg-transparent py-3 text-sm font-semibold text-white outline-none"
                        />

                        <span className="text-xs text-white/20">
                          px
                        </span>
                      </div>
                    </div>

                    {/* HEIGHT */}
                    <div>
                      <label className="text-xs text-white/35">
                        Height
                      </label>

                      <div className="mt-2 flex items-center rounded-xl border border-white/8 bg-black/20 px-3">
                        <input
                          type="number"
                          min="1"
                          value={resizeHeight}
                          onChange={(event) =>
                            updateResizeHeight(
                              Number(
                                event.target.value
                              )
                            )
                          }
                          className="w-full bg-transparent py-3 text-sm font-semibold text-white outline-none"
                        />

                        <span className="text-xs text-white/20">
                          px
                        </span>
                      </div>
                    </div>
                  </div>

                  <label className="mt-4 flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={
                        keepAspectRatio
                      }
                      onChange={(event) =>
                        toggleAspectRatio(
                          event.target.checked
                        )
                      }
                      className="h-4 w-4 accent-[#c8ff3d]"
                    />

                    <span className="text-xs text-white/45">
                      Keep aspect ratio
                    </span>
                  </label>
                </div>
              )}

            {/* ================================================== */}
            {/* MAIN ACTION BUTTON */}
            {/* ================================================== */}

            {!(
              mode === "compress"
                ? result
                : processedPreview
            ) && (
              <button
                type="button"
                onClick={
                  mode === "compress"
                    ? handleOptimize
                    : mode === "convert"
                      ? handleConvert
                      : handleResize
                }
                disabled={processing}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#c8ff3d] py-4 text-sm font-bold text-[#080a09] transition hover:bg-[#d9ff76] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {processing
                  ? "Working..."
                  : mode === "compress"
                    ? targetIsLargerThanOriginal
                      ? "Keep original size"
                      : "Make it fit"
                    : mode === "convert"
                      ? "Convert image"
                      : "Resize image"}

                {!processing && (
                  <span>→</span>
                )}
              </button>
            )}

            {/* ================================================== */}
            {/* PROGRESS */}
            {/* ================================================== */}

            {processing && (
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs text-white/30">
                  <span>
                    {mode === "compress"
                      ? "Compressing image..."
                      : mode === "convert"
                        ? "Converting image..."
                        : "Resizing image..."}
                  </span>

                  <span className="font-semibold text-[#c8ff3d]">
                    {progress}%
                  </span>
                </div>

                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-[#c8ff3d] transition-all duration-150"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>

                <p className="mt-3 text-center text-xs text-white/30">
                  {progress < 90
                    ? "Processing your image..."
                    : "Finishing up..."}
                </p>
              </div>
            )}

            {/* ================================================== */}
            {/* ERROR */}
            {/* ================================================== */}

            {error && (
              <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-center">
                <p className="text-sm text-red-400">
                  {error}
                </p>
              </div>
            )}

            {/* ================================================== */}
            {/* COMPRESS RESULT */}
            {/* ================================================== */}

            {mode === "compress" &&
              result && (
                <div className="mt-7">
                  {/* BEFORE / AFTER */}

                  <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/25">
                        Before
                      </p>

                      <p className="mt-2 text-2xl font-black text-white/60">
                        {formatBytes(
                          result.originalSize
                        )}
                      </p>
                    </div>

                    <div className="text-xl text-[#c8ff3d]">
                      →
                    </div>

                    <div className="text-right">
                      <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#c8ff3d]/60">
                        After
                      </p>

                      <p className="mt-2 text-2xl font-black text-[#c8ff3d]">
                        {formatBytes(
                          result.finalSize
                        )}
                      </p>
                    </div>
                  </div>

                  {/* SPACE SAVED */}

                  <div className="mt-5 rounded-xl border border-white/8 bg-black/20 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.16em] text-white/25">
                          Space saved
                        </p>

                        <p className="mt-1 text-xl font-black">
                          {savings}%
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-[9px] uppercase tracking-[0.16em] text-white/25">
                          Requirement
                        </p>

                        <p className="mt-1 text-sm font-bold text-[#c8ff3d]">
                          ≤ {targetKB} KB ✓
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-[#c8ff3d]"
                        style={{
                          width: `${Math.min(
                            100,
                            savings
                          )}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* COMPRESS DETAILS */}

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className="rounded-xl border border-white/6 bg-white/[0.02] p-3">
                      <p className="text-[9px] uppercase tracking-[0.15em] text-white/20">
                        Dimensions
                      </p>

                      <p className="mt-1 text-xs font-semibold text-white/60">
                        {result.width} ×{" "}
                        {result.height}
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/6 bg-white/[0.02] p-3">
                      <p className="text-[9px] uppercase tracking-[0.15em] text-white/20">
                        Format
                      </p>

                      <p className="mt-1 text-xs font-semibold text-white/60">
                        {result.format.toUpperCase()}
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/6 bg-white/[0.02] p-3">
                      <p className="text-[9px] uppercase tracking-[0.15em] text-white/20">
                        Encoder quality
                      </p>

                      <p className="mt-1 text-xs font-semibold text-white/60">
                        {Math.round(
                          result.quality * 100
                        )}
                        %
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/6 bg-white/[0.02] p-3">
                      <p className="text-[9px] uppercase tracking-[0.15em] text-white/20">
                        Target
                      </p>

                      <p className="mt-1 text-xs font-semibold text-[#c8ff3d]">
                        {targetKB} KB
                      </p>
                    </div>
                  </div>

                  {/* COMPRESS PREVIEW */}

                  {processedPreview && (
                    <div className="mt-4 overflow-hidden rounded-xl bg-black/20">
                      <img
                        src={processedPreview}
                        alt="Compressed image"
                        className="h-64 w-full object-contain"
                      />
                    </div>
                  )}

                  {/* COMPRESS DOWNLOAD */}

                  <button
                    type="button"
                    onClick={
                      downloadCompressedFile
                    }
                    className="mt-5 flex w-full items-center justify-center gap-3 rounded-xl bg-[#c8ff3d] py-4 text-sm font-black text-[#080a09] transition hover:scale-[1.01] hover:bg-[#d9ff76]"
                  >
                    Download compressed file
                    <span>↓</span>
                  </button>

                  <button
                    type="button"
                    onClick={resetTool}
                    className="mt-3 w-full py-2 text-xs font-medium text-white/30 transition hover:text-white"
                  >
                    Optimize another image
                  </button>
                </div>
              )}

            {/* ================================================== */}
            {/* CONVERT RESULT */}
            {/* ================================================== */}

            {mode === "convert" &&
              processedPreview &&
              processedBlob && (
                <div className="mt-7">
                  <div className="rounded-2xl border border-white/8 bg-black/20 p-5">
                    <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#c8ff3d]/60">
                      Complete
                    </p>

                    <p className="mt-2 text-xl font-bold">
                      Your converted file is ready.
                    </p>

                    {/* BEFORE / AFTER */}

                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.16em] text-white/25">
                          Before
                        </p>

                        <p className="mt-2 text-xl font-black text-white/60">
                          {formatBytes(
                            originalSize
                          )}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-[9px] uppercase tracking-[0.16em] text-[#c8ff3d]/60">
                          After
                        </p>

                        <p className="mt-2 text-xl font-black text-[#c8ff3d]">
                          {formatBytes(
                            processedSize
                          )}
                        </p>
                      </div>
                    </div>

                    {/* PREVIEW */}

                    <div className="mt-5 overflow-hidden rounded-xl bg-black/20">
                      <img
                        src={processedPreview}
                        alt="Converted image"
                        className="h-64 w-full object-contain"
                      />
                    </div>

                    {/* CONVERSION INFO */}

                    <div className="mt-4 rounded-xl border border-white/8 bg-white/[0.02] p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[9px] uppercase tracking-[0.16em] text-white/25">
                            Operation
                          </p>

                          <p className="mt-1 text-sm font-bold text-white/70">
                            Convert to{" "}
                            {outputFormat.toUpperCase()}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-[9px] uppercase tracking-[0.16em] text-white/25">
                            Dimensions
                          </p>

                          <p className="mt-1 text-sm font-bold text-white/70">
                            Unchanged
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* DOWNLOAD */}

                    <button
                      type="button"
                      onClick={
                        downloadProcessedFile
                      }
                      className="mt-5 flex w-full items-center justify-center gap-3 rounded-xl bg-[#c8ff3d] py-4 text-sm font-black text-[#080a09] transition hover:scale-[1.01] hover:bg-[#d9ff76]"
                    >
                      Download converted file
                      <span>↓</span>
                    </button>

                    <button
                      type="button"
                      onClick={resetTool}
                      className="mt-3 w-full py-2 text-xs font-medium text-white/30 transition hover:text-white"
                    >
                      Convert another image
                    </button>
                  </div>
                </div>
              )}

            {/* ================================================== */}
            {/* RESIZE RESULT */}
            {/* ================================================== */}

            {mode === "resize" &&
              processedPreview &&
              processedBlob && (
                <div className="mt-7">
                  <div className="rounded-2xl border border-white/8 bg-black/20 p-5">
                    <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#c8ff3d]/60">
                      Complete
                    </p>

                    <p className="mt-2 text-xl font-bold">
                      Your resized file is ready.
                    </p>

                    {/* BEFORE / AFTER */}

                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.16em] text-white/25">
                          Before
                        </p>

                        <p className="mt-2 text-xl font-black text-white/60">
                          {formatBytes(
                            originalSize
                          )}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-[9px] uppercase tracking-[0.16em] text-[#c8ff3d]/60">
                          After
                        </p>

                        <p className="mt-2 text-xl font-black text-[#c8ff3d]">
                          {formatBytes(
                            processedSize
                          )}
                        </p>
                      </div>
                    </div>

                    {/* PREVIEW */}

                    <div className="mt-5 overflow-hidden rounded-xl bg-black/20">
                      <img
                        src={processedPreview}
                        alt="Resized image"
                        className="h-64 w-full object-contain"
                      />
                    </div>

                    {/* RESIZE INFO */}

                    <div className="mt-4 rounded-xl border border-white/8 bg-white/[0.02] p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[9px] uppercase tracking-[0.16em] text-white/25">
                            Operation
                          </p>

                          <p className="mt-1 text-sm font-bold text-white/70">
                            Resize image
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-[9px] uppercase tracking-[0.16em] text-white/25">
                            Dimensions
                          </p>

                          <p className="mt-1 text-sm font-bold text-[#c8ff3d]">
                            {resizeWidth} ×{" "}
                            {resizeHeight}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* DOWNLOAD */}

                    <button
                      type="button"
                      onClick={
                        downloadProcessedFile
                      }
                      className="mt-5 flex w-full items-center justify-center gap-3 rounded-xl bg-[#c8ff3d] py-4 text-sm font-black text-[#080a09] transition hover:scale-[1.01] hover:bg-[#d9ff76]"
                    >
                      Download resized file
                      <span>↓</span>
                    </button>

                    <button
                      type="button"
                      onClick={resetTool}
                      className="mt-3 w-full py-2 text-xs font-medium text-white/30 transition hover:text-white"
                    >
                      Resize another image
                    </button>
                  </div>
                </div>
              )}
          </>
        )}
      </div>
    </div>
  );
}