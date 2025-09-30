# ThyRAD – Thyroid Radioactive Decay Prediction Tool
ThyRAD – Thyroid Radioactive Decay Predictor Tool. Open-access, JavaScript-based web app to simulate ¹³¹I decay using mono-exponential and piecewise multisegmented models. Features include half-life estimation, decay tables, time–activity curves, AUC calculation.

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
## Disclaimer
The software, content and platform(s) hosted on this site (collectively, “Software Platform”) are for informational purposes only and are not intended as a substitute for professional medical advice, diagnosis, or treatment.  Always seek the advice of your doctor or other qualified health provider with any questions you may have regarding your personal health or medical condition.

This Software Platform may contain copyrighted material, the use of which may not have been specifically authorized by the copyright holders.  We are making such material available in an effort to advance research and teaching related to patient care and believe this constitutes “fair use” of any such copyrighted material.  If you wish to use copyrighted material from this software, content or platform for purposes of your own that go beyond “fair use,” you must obtain permission from the copyright holder.

This Software Platform is not endorsed, sponsored, or authorized by or affiliated, associated, or in any way officially connected with any other company, government agency, or other third party.  All third-party product and company names as well as any related names, marks, emblems, or images featured or referred to within this course are trademarks™ or registered® trademarks of their respective holders.  Any use of these trademarks is for identification and reference purposes only and in no way implies any connection between the Developers and a respective trademark holder, nor does it signify that the trademark holder has licensed or approved any portion of this software, content or platform.  The Developers make no claim or representation regarding, and accept no responsibility for, the quality, nature, or reliability of third-party products.

By using this Software Platform you agree that its use is at yout sole risk. All Software Platform content, data and information is provided “As Is,” and the developers MAKE NO WARRANTY, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, WITH RESPECT TO THE SOFTWARE PLATFORM OR RELATED KNOW-HOW, TRADEMARKS, COPYRIGHTS, NON PUBLIC OR OTHER INFORMATION ENHANCEMENTS  OR OTHERWISE AND HEREBY DISCLAIMS THE SAME INCLUDING, WITHOUT LIMITATION, ANY IMPLIED WARRANTY OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, AND WARRANTIES THAT MAY ARISE OUT OF COURSE OF DEALING, COURSE OF PERFORMANCE, USAGE, OR TRADE PRACTICE AND HEREBY DISCLAIM THE SAME. No advice or information derived from the SOFTWARE PLATFORM constitutes medical advice or treatment recommendations. THE DEVELOPERS DO not make any warranties or representations regarding the use of the SOFTWARE PLATFORM in terms of its completeness, correctness, accuracy, adequacy, usefulness, timeliness, reliability or otherwise. YOU acknowledge and agree that you have full responsibility for your use of tHIS SOFTWARE PLATFORM. YOU FURTHER AGREE that, to the fullest extent permitted by applicable law, THAT NEITHER DEVELOPERS NOR THE Company or companies for which the developers work, trustees, directors, officers, agents, employees and contractors will be liable for any direct, indirect, punitive, exemplary, incidental, special, consequential or other damages arising out of or in any way related to THIS SOFTWARE PLATFORM and its use, distribution and re-distribution to ANY third parties, whether based on contract, tort, strict liability or otherwise, EVEN IF ANY OF THE ABOVE HAVE been advised of the possibility of damages.
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
📧 ludovico.garau@gmail.com  
🔗 ORCID: https://orcid.org/0000-0001-5603-4689
