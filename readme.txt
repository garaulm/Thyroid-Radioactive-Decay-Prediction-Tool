# ThyRAD – Thyroid Radioactive Decay Prediction Tool

**Author:** Ludovico Maria Garau, MD  
**License:** Apache License 2.0  
**DOI:** The DOI will be provided by Zenodo upon publication of the first release.  

---

## Overview
ThyRAD is a web-based tool designed to predict radioactive iodine (¹³¹I) decay in patients treated for differentiated thyroid carcinoma.  
Main features:  
- Calculate decay constants (λ) and half-life (t½)  
- Generate decay tables and time-activity curves  
- Estimate when a patient’s radiation exposure drops below a threshold (µSv/h). 
- Compute the area under the curve (AUC)  
(Further modules will be added).

---

## Project Structure
- `index.html` → main entry point of the program  
- `css/style.css` → styles (CSS)  
- `js/app.js` → main logic (JavaScript)  
- `libs/` → third-party libraries  
   - `jquery-3.5.1.min.js`  
   - `mathjax-tex-mml-chtml.js`  
   - `plotly-2.24.1.min.js`  
   - `jspdf.umd.min.js`  
   - `jspdf.plugin.autotable.js`  
- `LICENSE` → Apache License 2.0 (for ThyRAD)  
- `THIRD_PARTY_LICENSES.md` → summary of third-party licenses  
- `readme.md`
- `readme.txt`

---

## How to Use
1. Download the repository (or the Zenodo archive).  
2. Keep the folder structure intact (`css/`, `js/`, `libs/`).  
3. Open `index.html` in a modern browser (tested on Chrome and Firefox).  
4. Input your treatment data and generate the predictions.  

---

## Licenses
- **This project (ThyRAD):** Apache License 2.0 (see `LICENSE`).  
- **Third-party libraries:** MIT or Apache 2.0 (see `THIRD_PARTY_LICENSES.md`).  

---

## Citation
If you use ThyRAD in a scientific publication, please cite as follows (DOI will be provided by Zenodo after publication):  
Garau, L. M. (2025). 

---

## Contact
Ludovico Maria Garau, MD  
ASUFC – S.M. della Misericordia University Hospital, Udine, Italy  
ludovico.garau@gmail.com  
ORCID: https://orcid.org/0000-0001-5603-4689
