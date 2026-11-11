/**
 * ZAHIDUL HOQUE — GITHUB PROFILE & ACADEMIC PORTFOLIO ENGINE
 * Features:
 * - GitHub Underline Tab Switching with URL Hash Synchronization
 * - Live GitHub Repository Fetcher & Filter Engine
 * - 52-Week Contribution Calendar Generator
 * - CarDD Prototypical Mask R-CNN Defect Simulator
 * - Interactive Academic Git CLI / Terminal Playground
 * - Clipboard Copy & Toast Feedback Engine
 * - Global '/' Keyboard Shortcut for Search
 */

// ==========================================
// 1. DATA & GITHUB REPOSITORIES
// ==========================================
const GITHUB_USERNAME = "ZAHIDUL-HOQUE";

const FALLBACK_REPOS = [
  {
    name: "Masters-thesis-project-of-Zahidul-Hoque-University-of-Hertfordshire-Student-id-23097240-",
    displayName: "Masters-thesis-project-Prototypical-Mask-R-CNN",
    description: "Prototypical Mask R-CNN for Vehicle Exterior Damage Detection (7COM1039-0901-2025). Hybrid instance segmentation combining Deep Metric Learning with a Squared Euclidean Prototypical Box Predictor head on the CarDD benchmark (4,000 images). Achieved mAP: 0.319, AP@50: 0.630, AR: 0.436, F1-Score: 0.515 across 810 validation images.",
    language: "Python",
    html_url: "https://github.com/ZAHIDUL-HOQUE/Masters-thesis-project-of-Zahidul-Hoque-University-of-Hertfordshire-Student-id-23097240-",
    stargazers_count: 1,
    forks_count: 0,
    category: "python",
    tags: ["Computer Vision", "PyTorch", "Mask R-CNN", "Deep Metric Learning", "CarDD", "ResNet-50-FPN", "Thesis"],
    license: "Apache-2.0",
    isFeatured: true
  },
  {
    name: "DETR-FSOD-vehicle-damage-detection_two-model-pipeline",
    displayName: "DETR-FSOD-vehicle-damage-detection",
    description: "Two-model vehicle damage detection and instance segmentation pipeline integrating Detection Transformers (DETR) and Few-Shot Object Detection (FSOD) pipelines for localized exterior vehicle anomalies.",
    language: "Python",
    html_url: "https://github.com/ZAHIDUL-HOQUE/DETR-FSOD-vehicle-damage-detection_two-model-pipeline",
    stargazers_count: 0,
    forks_count: 0,
    category: "python",
    tags: ["DETR", "Transformers", "Few-Shot", "Object Detection", "PyTorch"],
    license: "Apache-2.0",
    isFeatured: false
  }
];

const EXCLUDED_REPOS = [
  "portfolio-website-for-shuvo-sultan",
  "zahidul-hoque-portfolio-website"
];

const LANGUAGE_COLORS = {
  Python: "#3572A5",
  HTML: "#e34c26",
  JavaScript: "#f1e05a",
  CSS: "#563d7c",
  Shell: "#89e051"
};

// ==========================================
// 2. INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  initTabs();
  initAvatarFlip();
  initSimulator();
  initClipboard();
  initRepositories();
  initSearch();
});

// ==========================================
// 2.5 PROFILE AVATAR 3D FLIP TRANSITION
// ==========================================
function initAvatarFlip() {
  const flipCard = document.getElementById("avatar-flip-card");
  const headerAvatar = document.querySelector(".gh-header-avatar");
  if (!flipCard) return;

  function toggleFlip() {
    const isFlipped = flipCard.classList.toggle("is-flipped");
    if (headerAvatar) {
      headerAvatar.classList.toggle("is-flipped", isFlipped);
      setTimeout(() => {
        headerAvatar.src = isFlipped ? "pic.jpg" : "pixelated pic.jpg";
        headerAvatar.style.imageRendering = isFlipped ? "auto" : "pixelated";
      }, 150);
    }
  }

  flipCard.addEventListener("click", toggleFlip);
  flipCard.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleFlip();
    }
  });
}

// ==========================================
// 3. GITHUB UNDERLINE TAB SWITCHING
// ==========================================
function initTabs() {
  const tabs = document.querySelectorAll(".gh-tab");
  const panes = document.querySelectorAll(".tab-pane");

  function switchTab(tabId) {
    tabs.forEach(tab => {
      const isTarget = tab.getAttribute("data-tab") === tabId;
      tab.classList.toggle("active", isTarget);
    });

    panes.forEach(pane => {
      const isTarget = pane.id === `pane-${tabId}`;
      pane.classList.toggle("active", isTarget);
    });

    // Update URL hash without jumping
    if (history.replaceState) {
      history.replaceState(null, null, `#${tabId}`);
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const tabId = tab.getAttribute("data-tab");
      switchTab(tabId);
    });
  });

  // Handle external trigger links (e.g. "View all repositories", "Back to top")
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest(".gh-tab-trigger");
    if (trigger) {
      e.preventDefault();
      const tabId = trigger.getAttribute("data-target-tab");
      switchTab(tabId);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  // Check URL hash on initial load
  const hash = window.location.hash.replace("#", "");
  const validTabs = ["overview", "research", "repositories", "experience", "skills", "contact"];
  if (hash && validTabs.includes(hash)) {
    switchTab(hash);
  }
}

// ==========================================
// 4. REPOSITORIES DIRECTORY & SEARCH
// ==========================================
let currentReposList = [...FALLBACK_REPOS];

async function initRepositories() {
  const container = document.getElementById("repos-container");
  const tabCount = document.getElementById("tab-repos-count");
  const headerStarsBadge = document.getElementById("header-stars-badge");

  let repos = [...FALLBACK_REPOS];

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { signal: controller.signal }),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated`, { signal: controller.signal })
    ]);

    clearTimeout(timeoutId);

    if (userRes.ok && reposRes.ok) {
      const liveRepos = await reposRes.json();
      if (Array.isArray(liveRepos) && liveRepos.length > 0) {
        // Exclude unwanted repositories
        const filteredLive = liveRepos.filter(live =>
          !EXCLUDED_REPOS.includes(live.name.toLowerCase())
        );

        repos = filteredLive.map(live => {
          const match = FALLBACK_REPOS.find(f => f.name.toLowerCase() === live.name.toLowerCase());
          return {
            name: live.name,
            displayName: match?.displayName || live.name,
            description: live.description || match?.description || "Open-source research repository by Zahidul Hoque.",
            language: live.language || (match?.language || "Python"),
            html_url: live.html_url,
            stargazers_count: live.stargazers_count || (match?.stargazers_count || 0),
            forks_count: live.forks_count || 0,
            category: live.language?.toLowerCase() === "html" ? "web" : "python",
            tags: match?.tags || [live.language || "Code", "GitHub Repo"],
            license: live.license?.spdx_id || (match?.license || "MIT")
          };
        });
      }
    }
  } catch (err) {
    console.info("Using cached GitHub portfolio repository records.");
  }

  // Ensure excluded repositories are strictly filtered
  repos = repos.filter(r => !EXCLUDED_REPOS.includes(r.name.toLowerCase()));
  currentReposList = repos;

  // Update stars count
  const totalStars = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
  if (headerStarsBadge) headerStarsBadge.textContent = totalStars || 1;
  if (tabCount) tabCount.textContent = repos.length;

  renderReposList(repos);
  setupRepoFilterButtons(repos);
}

function renderReposList(repos) {
  const container = document.getElementById("repos-container");
  if (!container) return;

  if (repos.length === 0) {
    container.innerHTML = `
      <div style="padding: 32px 0; text-align: center; color: var(--fg-muted);">
        No repositories matched your search criteria.
      </div>
    `;
    return;
  }

  container.innerHTML = repos.map(repo => {
    const langColor = LANGUAGE_COLORS[repo.language] || "#3572A5";
    const cloneCmd = `git clone ${repo.html_url}.git`;

    return `
      <article class="repo-card">
        <div class="repo-main-col">
          <div class="repo-header-line">
            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="repo-title-link">
              ${repo.displayName || repo.name}
            </a>
            <span class="gh-visibility-pill">Public</span>
          </div>
          <p class="repo-description-text">${repo.description}</p>
          <div class="repo-tags-row">
            ${repo.tags.map(t => `<span class="repo-tag">${t}</span>`).join("")}
          </div>
          <div class="repo-meta-row">
            <span class="repo-lang">
              <span class="lang-color" style="background-color: ${langColor};"></span>
              ${repo.language}
            </span>
            <span class="repo-meta-stat">
              <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
                <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"></path>
              </svg>
              ${repo.stargazers_count}
            </span>
            <span class="repo-meta-stat">${repo.license}</span>
          </div>
        </div>

        <div class="repo-actions-col">
          <button class="gh-btn gh-btn-sm copy-btn" data-clipboard="${cloneCmd}" title="Copy git clone command">
            <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
              <path d="M0 4.75C0 3.784.784 3 1.75 3h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 15H1.75A1.75 1.75 0 0 1 0 13.25ZM1.5 4.887v7.363c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V4.887l-6.286 4.4a.75.75 0 0 1-.856 0L1.5 4.887Zm.58-1.387 5.92 4.144L13.92 3.5H2.08Z"></path>
            </svg>
            clone
          </button>
          <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="gh-btn gh-btn-sm">
            View &rarr;
          </a>
        </div>
      </article>
    `;
  }).join("");
}

function setupRepoFilterButtons(allRepos) {
  const allBtn = document.querySelector('#repos-filter-buttons [data-filter="all"]');
  const pythonBtn = document.querySelector('#repos-filter-buttons [data-filter="python"]');
  const webBtn = document.querySelector('#repos-filter-buttons [data-filter="web"]');

  const pythonCount = allRepos.filter(r => r.category === "python").length;
  const webCount = allRepos.filter(r => r.category === "web").length;

  if (allBtn) allBtn.textContent = `All (${allRepos.length})`;
  if (pythonBtn) pythonBtn.textContent = `Python & AI (${pythonCount})`;
  if (webBtn) {
    if (webCount === 0) {
      webBtn.style.display = "none";
    } else {
      webBtn.style.display = "";
      webBtn.textContent = `Web & HTML (${webCount})`;
    }
  }

  const buttons = document.querySelectorAll("#repos-filter-buttons .gh-btn");
  buttons.forEach(btn => {
    btn.onclick = () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");
      if (filter === "all") {
        renderReposList(allRepos);
      } else {
        const filtered = allRepos.filter(r => r.category === filter);
        renderReposList(filtered);
      }
    };
  });
}

function initSearch() {
  const repoSearchInput = document.getElementById("repo-search-input");
  const globalSearchInput = document.getElementById("global-search-input");

  function filterRepos(query) {
    const q = query.toLowerCase().trim();
    if (!q) {
      renderReposList(currentReposList);
      return;
    }
    const filtered = currentReposList.filter(r =>
      r.name.toLowerCase().includes(q) ||
      (r.displayName && r.displayName.toLowerCase().includes(q)) ||
      (r.description && r.description.toLowerCase().includes(q)) ||
      (r.language && r.language.toLowerCase().includes(q)) ||
      r.tags.some(t => t.toLowerCase().includes(q))
    );
    renderReposList(filtered);
  }

  if (repoSearchInput) {
    repoSearchInput.addEventListener("input", (e) => filterRepos(e.target.value));
  }

  if (globalSearchInput) {
    globalSearchInput.addEventListener("input", (e) => {
      // If typing in global search, switch to repositories tab and filter
      const tabBtn = document.querySelector('.gh-tab[data-tab="repositories"]');
      if (tabBtn && !tabBtn.classList.contains("active")) {
        tabBtn.click();
      }
      if (repoSearchInput) repoSearchInput.value = e.target.value;
      filterRepos(e.target.value);
    });

    // Global keyboard shortcut '/' to focus search
    window.addEventListener("keydown", (e) => {
      if (e.key === "/" && document.activeElement !== globalSearchInput && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
        e.preventDefault();
        globalSearchInput.focus();
      }
    });
  }
}

// ==========================================
// 6. CARDD DEFECT SIMULATOR
// ==========================================
function initSimulator() {
  const buttons = document.querySelectorAll(".defect-btn");
  const bbox = document.getElementById("sim-bbox");
  const kpiType = document.getElementById("kpi-damage-type");
  const kpiHex = document.getElementById("kpi-color-code");
  const kpiConf = document.getElementById("kpi-confidence");
  const kpiMeter = document.getElementById("kpi-conf-meter");
  const kpiDefects = document.getElementById("kpi-total-defects");
  const kpiSeverity = document.getElementById("kpi-severity");

  const confSlider = document.getElementById("conf-slider");
  const confVal = document.getElementById("conf-val");
  const iouSlider = document.getElementById("iou-slider");
  const iouVal = document.getElementById("iou-val");

  const DEFECTS = {
    dent: {
      name: "Door & Panel Dent",
      color: "#FF7A00",
      conf: "96.8%",
      numericConf: 96.8,
      instances: "2 Instances Detected",
      severity: "Moderate Damage",
      severityClass: "tag-moderate",
      position: { top: "36%", left: "44%", width: "75px", height: "48px" }
    },
    scratch: {
      name: "Surface Paint Scratch",
      color: "#00D2FF",
      conf: "94.2%",
      numericConf: 94.2,
      instances: "4 Instances Detected",
      severity: "Minor Damage",
      severityClass: "tag-moderate",
      position: { top: "40%", left: "56%", width: "88px", height: "30px" }
    },
    crack: {
      name: "Bumper Structural Crack",
      color: "#A855F7",
      conf: "91.5%",
      numericConf: 91.5,
      instances: "1 Instance Detected",
      severity: "Moderate Damage",
      severityClass: "tag-moderate",
      position: { top: "52%", left: "14%", width: "54px", height: "38px" }
    },
    glass: {
      name: "Windshield Glass Shatter",
      color: "#FF2A6D",
      conf: "98.9%",
      numericConf: 98.9,
      instances: "1 Critical Fracture",
      severity: "Severe Defect",
      severityClass: "tag-moderate",
      position: { top: "26%", left: "33%", width: "78px", height: "52px" }
    },
    lamp: {
      name: "Headlamp Broken / Shattered",
      color: "#FACC15",
      conf: "97.4%",
      numericConf: 97.4,
      instances: "1 Light Unit",
      severity: "Moderate Damage",
      severityClass: "tag-moderate",
      position: { top: "46%", left: "80%", width: "44px", height: "34px" }
    },
    tire: {
      name: "Tire Flat / Punctured",
      color: "#10B981",
      conf: "99.1%",
      numericConf: 99.1,
      instances: "Rear Wheel Flat",
      severity: "Critical Defect",
      severityClass: "tag-moderate",
      position: { top: "58%", left: "68%", width: "64px", height: "54px" }
    }
  };

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const type = btn.getAttribute("data-defect");
      const d = DEFECTS[type];
      if (!d) return;

      if (bbox) {
        bbox.style.borderColor = d.color;
        bbox.style.top = d.position.top;
        bbox.style.left = d.position.left;
        bbox.style.width = d.position.width;
        bbox.style.height = d.position.height;

        const label = bbox.querySelector(".bbox-label");
        const mask = bbox.querySelector(".bbox-mask");
        if (label) {
          label.style.backgroundColor = d.color;
          label.textContent = `${type.toUpperCase()}: ${d.conf}`;
        }
        if (mask) {
          mask.style.backgroundColor = d.color + "35";
        }
      }

      if (kpiType) kpiType.textContent = d.name;
      if (kpiHex) kpiHex.textContent = `CarDD Spec: ${d.color}`;
      if (kpiConf) kpiConf.textContent = d.conf;
      if (kpiMeter) {
        kpiMeter.style.width = `${d.numericConf}%`;
        kpiMeter.style.backgroundColor = d.color;
      }
      if (kpiDefects) kpiDefects.textContent = d.instances;
      if (kpiSeverity) kpiSeverity.textContent = d.severity;
    });
  });

  if (confSlider && confVal) {
    confSlider.addEventListener("input", (e) => {
      confVal.textContent = e.target.value;
      const val = parseFloat(e.target.value);
      if (bbox) bbox.style.opacity = val > 0.98 ? "0.2" : "1";
    });
  }

  if (iouSlider && iouVal) {
    iouSlider.addEventListener("input", (e) => {
      iouVal.textContent = e.target.value;
    });
  }
}

// ==========================================
// 7. CLIPBOARD & TOAST NOTIFICATION
// ==========================================
function initClipboard() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".copy-btn");
    if (!btn) return;

    const text = btn.getAttribute("data-clipboard") || "zahidulhoqueomy@gmail.com";
    navigator.clipboard.writeText(text).then(() => {
      showToast(`Copied: <strong>${text}</strong>`);
    }).catch(() => {
      showToast(`Copied text to clipboard`);
    });
  });
}

function showToast(html) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "gh-toast";
  toast.innerHTML = `
    <svg viewBox="0 0 16 16" width="16" height="16" fill="var(--success-fg)">
      <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path>
    </svg>
    <span>${html}</span>
  `;

  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("show"));

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 3200);
}


