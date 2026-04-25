"""Remove backgrounds from all product images in categorized_images folder."""

import os
from pathlib import Path
from rembg import remove
from PIL import Image

BASE = Path(r"c:\Users\HP\Desktop\Remedy Care\public\categorized_images")

processed = 0
skipped = 0

for jpg in BASE.rglob("*.jpg"):
    png_path = jpg.with_suffix(".png")

    # Skip if PNG already exists
    if png_path.exists():
        print(f"SKIP (PNG exists): {jpg.name}")
        skipped += 1
        continue

    print(f"Processing: {jpg.relative_to(BASE)} ...", end=" ", flush=True)
    try:
        input_img = Image.open(jpg)
        output_img = remove(input_img)
        output_img.save(png_path, "PNG")
        print("OK")
        processed += 1
    except Exception as e:
        print(f"ERROR: {e}")

# Also handle any existing PNGs that might still have backgrounds
for png in BASE.rglob("*.png"):
    # Only process PNGs that don't have a corresponding JPG (i.e., original PNGs)
    if not png.with_suffix(".jpg").exists():
        # Check if this PNG might still have a background by checking if it has an alpha channel
        try:
            img = Image.open(png)
            if img.mode != "RGBA":
                print(f"Processing existing PNG: {png.relative_to(BASE)} ...", end=" ", flush=True)
                output_img = remove(img)
                output_img.save(png, "PNG")
                print("OK")
                processed += 1
            else:
                skipped += 1
        except Exception as e:
            print(f"ERROR with {png.name}: {e}")

print(f"\nDone! Processed: {processed}, Skipped: {skipped}")
