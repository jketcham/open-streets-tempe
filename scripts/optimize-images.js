import sharp from "sharp";
import { promises as fs } from "fs";
import { join, extname, basename } from "path";

// Breakpoints for responsive images (in pixels)
const PHOTO_BREAKPOINTS = [
  640, // mobile/base
  768, // tablet
  1024, // laptop
  1920, // desktop/FHD
  2560, // 4K/QHD
];

// Logo only needs one size since it's displayed small
const LOGO_MAX_WIDTH = 640;

// Quality settings
const BASE_QUALITY = {
  jpeg: 80,
  webp: 75,
  png: 80,
};

// Higher quality for smallest size
const SMALL_QUALITY = {
  jpeg: 90,
  webp: 85,
  png: 90,
};

async function cleanupOldImages(outputDir, originalFileName) {
  try {
    const files = await fs.readdir(outputDir);
    const baseFileName = basename(originalFileName, extname(originalFileName));

    // Find and remove all resized versions of this file
    for (const file of files) {
      if (
        file.startsWith(baseFileName + "-") &&
        (file.endsWith(".jpg") ||
          file.endsWith(".jpeg") ||
          file.endsWith(".png") ||
          file.endsWith(".webp"))
      ) {
        const filePath = join(outputDir, file);
        console.log(`Removing old resized image: ${file}`);
        await fs.unlink(filePath);
      }
    }
  } catch (error) {
    console.error(`Error cleaning up old images: ${error.message}`);
  }
}

async function processImage(filePath, outputDir) {
  const ext = extname(filePath).toLowerCase();
  const fileName = basename(filePath, ext);

  // Clean up old resized versions before creating new ones
  await cleanupOldImages(outputDir, fileName + ext);

  // Load the image
  const image = sharp(filePath);
  const metadata = await image.metadata();

  // Process based on file type
  if (ext === ".jpg" || ext === ".jpeg") {
    // For JPG, create both JPG and WebP versions at each breakpoint
    // Only create sizes for breakpoints that are smaller than the original
    const applicableBreakpoints = PHOTO_BREAKPOINTS.filter(
      (width) => width <= metadata.width,
    );

    for (const width of applicableBreakpoints) {
      // Use higher quality only for 640w version
      const quality = width === 640 ? SMALL_QUALITY : BASE_QUALITY;

      // Create resized JPG
      await image
        .resize(width, null, { withoutEnlargement: true })
        .jpeg({ quality: quality.jpeg })
        .toFile(join(outputDir, `${fileName}-${width}w${ext}`));

      // Create WebP version
      await image
        .resize(width, null, { withoutEnlargement: true })
        .webp({ quality: quality.webp })
        .toFile(join(outputDir, `${fileName}-${width}w.webp`));
    }

    // If the original is smaller than our smallest breakpoint,
    // create a copy with the width suffix
    if (metadata.width < PHOTO_BREAKPOINTS[0]) {
      await fs.copyFile(
        filePath,
        join(outputDir, `${fileName}-${metadata.width}w${ext}`),
      );
      // Also create a WebP version of the original size
      await image
        .webp({ quality: BASE_QUALITY.webp })
        .toFile(join(outputDir, `${fileName}-${metadata.width}w.webp`));
    }
  } else if (ext === ".png") {
    // For PNG (logos), only create one size if the original is larger
    if (metadata.width > LOGO_MAX_WIDTH) {
      // Use higher quality for logo at 640w
      await image
        .resize(LOGO_MAX_WIDTH, null, { withoutEnlargement: true })
        .png({ quality: SMALL_QUALITY.png })
        .toFile(join(outputDir, `${fileName}-${LOGO_MAX_WIDTH}w${ext}`));
    } else {
      // If the original is smaller, just copy it with the width suffix
      await fs.copyFile(
        filePath,
        join(outputDir, `${fileName}-${metadata.width}w${ext}`),
      );
    }
  }
}

async function processDirectory(sourceDir, outputDir) {
  try {
    // Ensure output directory exists
    await fs.mkdir(outputDir, { recursive: true });

    const files = await fs.readdir(sourceDir);

    for (const file of files) {
      const filePath = join(sourceDir, file);
      const stat = await fs.stat(filePath);

      if (!stat.isDirectory()) {
        const ext = extname(file).toLowerCase();
        if ([".jpg", ".jpeg", ".png"].includes(ext)) {
          console.log(`Processing: ${filePath}`);
          await processImage(filePath, outputDir);
        }
      }
    }
  } catch (error) {
    console.error(`Error processing directory: ${error.message}`);
  }
}

// Main execution
const baseDir = join(process.cwd(), "public", "images");
const originalsDir = join(baseDir, "originals");

// Create originals directory if it doesn't exist
fs.mkdir(originalsDir, { recursive: true })
  .then(() => {
    console.log("Starting image optimization...");
    return processDirectory(originalsDir, baseDir);
  })
  .then(() => console.log("Image optimization complete!"))
  .catch((error) => console.error("Error:", error));
