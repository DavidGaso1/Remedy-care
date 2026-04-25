# Categorized Images Directory

## Overview
This directory organizes product and condition images by medical category for the Remedy Care platform. Each top-level folder represents a distinct health condition category.

## Directory Structure Convention
```
categorized_images/
└── {Category Name}/
    ├── products/          — Product images (supplements, teas, softgels, etc.)
    ├── conditions/        — Condition-related imagery (symptoms, anatomy, stages)
    ├── testimonials/      — Patient testimonial graphics and before/after images
    ├── informational/     — Educational infographics, guides, how-it-works visuals
    ├── README.md          — Category-specific documentation
    └── .meta.json         — Category metadata manifest
```

## Subfolder Purposes
| Subfolder | Purpose | File Types |
|-----------|---------|------------|
| `products/` | Individual product package photos, bottle images, product labels | .jpg, .png, .webp |
| `conditions/` | Medical condition illustrations, symptom diagrams, stage progressions | .jpg, .png, .svg |
| `testimonials/` | Patient review cards, before/after results, rating graphics | .jpg, .png |
| `informational/` | Infographics, treatment flowcharts, educational diagrams, ingredient charts | .jpg, .png, .svg |

## File Naming Convention
- **Product images**: `{CODE}_{PRODUCT_NAME}.jpg` (e.g., `A07_B_CLEAR.jpg`)
  - Prefix `A` = Capsules/Tablets, `B` = Softgels, `T` = Teas
- **Condition images**: `{category-slug}-{descriptor}.jpg` (e.g., `cancer-symptoms.jpg`)
- **Testimonial images**: `{category-slug}-testimonial-{id}.jpg` (e.g., `cancer-testimonial-01.jpg`)
- **Informational images**: `{category-slug}-{type}-{descriptor}.jpg` (e.g., `cancer-info-how-it-works.jpg`)

## Product Code Reference
| Code | Product Name | Type |
|------|-------------|------|
| A02 | Longzit | Capsule |
| A03 | Female Care | Capsule |
| A05 | Caerite | Capsule |
| A06 | Prostbeta | Capsule |
| A07 | B-Clear | Capsule |
| A08 | Sto-Care | Capsule |
| A09 | GHT Ginseng & Royal Jelly Softgel | Softgel |
| A10 | GHT Ganoderma Softgel (Reishi 3-in-1) | Softgel |
| A11 | GHT Myco Balance Softgel | Softgel |
| A12 | GHT Vigor Max Softgel | Softgel |
| A13 | Hyperfree | Capsule |
| A14 | Dialese | Capsule |
| A17 | Livities Tablet | Tablet |
| B04 | Garlic Oil Softgel | Softgel |
| T01 | Constifree Tea | Tea |
| T02 | I-Detox Tea | Tea |

## Categories Index
| Category | Route Slug | App Product ID | Sub-Categories |
|----------|-----------|----------------|----------------|
| Cancer | — | — | Prevention, Treatment, Recovery |
| Diabetes Type 2 | diabetes | diabetes | Blood Sugar Management, Complications Prevention, Dietary Support |
| Female Infertility | — | — | Hormonal Balance, Reproductive Health, Ovulation Support |
| Hemorrhoid (Pile) | — | — | Internal, External, Thrombosed |
| Hepatitis | — | — | Hepatitis B, Hepatitis C, Liver Inflammation |
| Hypotension - Hypertension | blood-pressure | blood-pressure | Hypertension, Hypotension, Cardiovascular Support |
| Liver Disease | — | — | Fatty Liver, Cirrhosis, Liver Detox |
| Prostatitis | prostate | prostate | Acute Prostatitis, Chronic Prostatitis, BPH |
| Stroke | — | — | Ischemic, Hemorrhagic, Post-Stroke Recovery |
| Ulcer | ulcer | ulcer | Gastric Ulcer, Duodenal Ulcer, H. Pylori |

## Notes
- This directory is separate from `public/images/products/` which is used by the app's ProductPage component
- The `categorized_images` directory provides a condition-first organization for content management and future expansion
- `.meta.json` files contain structured metadata for programmatic access and CMS integration
