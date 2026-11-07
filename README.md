# Zahidul Hoque — Academic & Engineering Portfolio

> Personal academic research hub and engineering portfolio for **Zahidul Hoque (`@ZAHIDUL-HOQUE`)** — Aspiring Ph.D. Researcher in AI, Computer Vision & Autonomous Systems; **M.Sc. in Data Science and Analytics with Advanced Research (Passed with Distinction)**, University of Hertfordshire; **B.Sc. in Computer Science**, Beijing Institute of Technology (BIT).

🌐 **Live Portfolio:** [https://zahidul-hoque.github.io/ZAhidul-Hoque-Portfolio-website/](https://zahidul-hoque.github.io/ZAhidul-Hoque-Portfolio-website/)

---

## 🌟 Architecture & Features

Built using **Vanilla Web Standards (HTML5, Vanilla CSS3, Modern JavaScript)** adhering to the **GitHub Primer Design System** for a clean, content-first, developer-native aesthetic.

1. **GitHub Native Profile Layout**:
   - Two-column GitHub profile structure with left user sidebar (pixel-art avatar, availability beacon badge, verified contact metadata, one-click email copy, achievements, and academic supervisor reference for [Dr. Joseph Reddington](https://joereddington.com/)).
   - Underline profile tab navigation with URL hash synchronisation (`#overview`, `#research`, `#repositories`, `#experience`, `#skills`, `#contact`).

2. **Master's Final Project Report (`7COM1039-0901-2025`)**:
   - ***Prototypical Mask R-CNN for Vehicle Exterior Damage Detection*** (University of Hertfordshire • Supervisor: Dr. Joseph Reddington).
   - **Predictor Head Remodelling (`PrototypicalBoxPredictor`)**: Replaces standard parametric linear classification (`Score = Wx + b`) with temperature-scaled ($\alpha = 20.0$) Negative Squared Euclidean Distance to static, Xavier-initialized learnable class prototypes projected onto a unit hypersphere ($\|\hat{x}\|_2 = \|\hat{P}_k\|_2 = 1$).
   - **CarDD Statistical & Geometric EDA**: Comprehensive analysis of the **4,000 high-resolution CarDD images** (>9,000 pixel-level instances across **2,817 train / 810 validation / 373 test**), quantifying the **11.4 : 1** long-tail class imbalance (`Scratch` $n=2,560$ vs `Tire Flat` $n=225$), $\log_2(W/H)$ aspect-ratio distribution, $\sqrt{\text{Area}}$ scale variance, and 2D spatial Photographer Centre Bias.
   - **Quantitative Validation Performance (Table 1, 810 Validation Images)**:
     - **mAP (IoU 0.50:0.95)**: `0.319` (reaches peak `~32.2%` at Epoch 11 without overfitting)
     - **AP@50 (PASCAL VOC)**: `0.630`
     - **Average Recall (AR, MaxDets=100)**: `0.436`
     - **F1-Score**: `0.515`
     - **AP (Large, Area > 96² px)**: `0.320` | **AP (Small, Area < 32² px)**: `0.074`
   - **7×7 Learned Prototype Distance Matrix**: Empirical pairwise squared Euclidean distances ($d^2(p_i, p_j) = \|p_i - p_j\|_2^2 = 2 - 2\cos\theta$) ranging between `1.90` and `2.16` off-diagonal (clustering tightly around `2.00`, $\theta \approx 90^\circ$ orthogonality).

3. **Academic Qualifications, Industry Experience & Technical Taxonomy**:
   - **M.Sc. in Data Science and Analytics with Advanced Research** (*Passed with Distinction*, Certificate Awarded: 15 October 2026) — University of Hertfordshire, UK.
   - **B.Sc. in Computer Science** (Sep 2019 – Jun 2023) — Beijing Institute of Technology (BIT), China.
   - **Industry Experience**: Project Associate (Computer Vision & Data Annotation) at Quantanite.
   - **Technical Stack**: Python, SQL, Bash, PyTorch, Torchvision, Mask R-CNN, Faster R-CNN, FPN, Deep Metric Learning, Prototypical Networks, DETR, OpenCV, Pycocotools, Scikit-learn, NumPy, Pandas, SciPy, Matplotlib, Seaborn, NVIDIA CUDA (`torch.cuda.amp`), Git/GitHub, and LaTeX.

4. **Live GitHub Repositories & Instant Search**:
   - Fetches and filters public research repositories from `@ZAHIDUL-HOQUE` (`Prototypical Mask R-CNN` and `DETR-FSOD` two-model pipeline) with instant keyword search (`/` shortcut), category filtering, and one-click `git clone` command copying.

5. **Automated GitHub Pages CI/CD**:
   - Configured with GitHub Actions (`.github/workflows/deploy.yml`) for automatic deployment to GitHub Pages on every push to `main`.

---

## 🚀 Running Locally

```bash
# Start local Node server
node server.js
```

Then visit `http://127.0.0.1:3000` in your web browser.

---

© 2026 Zahidul Hoque. All rights reserved.
