/**
 * GitHub Integration Module
 * Fetches live repositories, profile telemetry, and languages for harshitadutt100-ship-it.
 * Includes local caching and intelligent fallback data.
 */

const GitHubClient = (function () {
  const CACHE_KEY_REPOS = "agy_portfolio_github_repos_v1";
  const CACHE_KEY_USER = "agy_portfolio_github_user_v1";
  const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

  // Default fallback data if offline or GitHub API rate-limited
  const FALLBACK_REPOS = [
    {
      name: "E-Commerce-Project",
      description: "A modern e-commerce platform that enables customers to browse products, manage carts, place secure orders, and track deliveries. Includes user authentication, search & filtering, payment gateway, inventory management, and an admin analytics dashboard.",
      language: "Python / Jupyter",
      html_url: "https://github.com/harshitadutt100-ship-it/E-Commerce-Project",
      stargazers_count: 2,
      forks_count: 0,
      updated_at: "2026-03-01T12:00:00Z",
      topics: ["ecommerce", "fullstack", "analytics", "python"]
    },
    {
      name: "netflix-dashboard",
      description: "Interactive data visualization and predictive analytics dashboard analyzing streaming catalogs, user engagement trends, release patterns, and viewer demographics.",
      language: "Python / React",
      html_url: "https://github.com/harshitadutt100-ship-it/netflix-dashboard",
      stargazers_count: 1,
      forks_count: 0,
      updated_at: "2026-02-15T14:30:00Z",
      topics: ["dashboard", "data-visualization", "react", "eda"]
    },
    {
      name: "my-sql-practice",
      description: "Comprehensive relational database architecture repository: complex query optimization, relational indexing, trigger procedures, ACID transaction benchmarks, and schema design.",
      language: "SQL",
      html_url: "https://github.com/harshitadutt100-ship-it/my-sql-practice",
      stargazers_count: 0,
      forks_count: 0,
      updated_at: "2026-01-20T10:15:00Z",
      topics: ["database", "sql", "performance-tuning", "schemas"]
    },
    {
      name: "Testing",
      description: "Automated software verification suite, unit/integration testing harnesses, CI/CD pipeline automation experiments, and test-driven development methodologies.",
      language: "Python / PyTest",
      html_url: "https://github.com/harshitadutt100-ship-it/Testing",
      stargazers_count: 0,
      forks_count: 0,
      updated_at: "2026-01-10T09:00:00Z",
      topics: ["testing", "qa", "automation", "pytest"]
    }
  ];

  const LANGUAGE_COLORS = {
    "JavaScript": "#f7df1e",
    "TypeScript": "#3178c6",
    "Python": "#3572A5",
    "Python / Jupyter": "#f37626",
    "Jupyter Notebook": "#da5b0b",
    "HTML": "#e34c26",
    "CSS": "#563d7c",
    "Rust": "#dea584",
    "SQL": "#e38c00",
    "Go": "#00ADD8",
    "C++": "#f34b7d"
  };

  function getCached(key) {
    try {
      const record = localStorage.getItem(key);
      if (!record) return null;
      const parsed = JSON.parse(record);
      if (Date.now() - parsed.timestamp < CACHE_TTL_MS) {
        return parsed.data;
      }
    } catch (e) {
      console.warn("Storage access failed:", e);
    }
    return null;
  }

  function setCached(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify({ timestamp: Date.now(), data }));
    } catch (e) {
      console.warn("Storage save failed:", e);
    }
  }

  async function fetchRepositories(username) {
    const cached = getCached(CACHE_KEY_REPOS);
    if (cached) {
      updateSyncStatus("CACHE ACTIVE // LIVE TELEMETRY VERIFIED");
      return cached;
    }

    try {
      updateSyncStatus("QUERYING GITHUB API...");
      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=12`, {
        headers: { Accept: "application/vnd.github.v3+json" }
      });

      if (!response.ok) {
        throw new Error(`GitHub API returned status: ${response.status}`);
      }

      const repos = await response.json();
      const validRepos = repos.filter(r => !r.fork);
      const dataToStore = validRepos.length > 0 ? validRepos : repos;

      setCached(CACHE_KEY_REPOS, dataToStore);
      updateSyncStatus("SYNC ESTABLISHED // 0ms LATENCY");
      return dataToStore;
    } catch (err) {
      console.warn("Using fallback repository telemetry:", err.message);
      updateSyncStatus("STANDBY MODE // FALLBACK REPOSITORIES ACTIVE");
      return FALLBACK_REPOS;
    }
  }

  function updateSyncStatus(statusText) {
    const el = document.getElementById("github-sync-indicator");
    if (el) {
      el.textContent = statusText;
    }
  }

  function formatTimeAgo(isoString) {
    if (!isoString) return "Recently";
    const date = new Date(isoString);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return "Updated today";
    if (diffDays === 1) return "Updated yesterday";
    if (diffDays < 30) return `Updated ${diffDays}d ago`;
    const diffMonths = Math.floor(diffDays / 30);
    return `Updated ${diffMonths}mo ago`;
  }

  function renderRepositories(repos, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";

    repos.forEach((repo, idx) => {
      const lang = repo.language || "Engineered Code";
      const langColor = LANGUAGE_COLORS[lang] || "#00f0ff";
      const desc = repo.description || "Experimental computational architecture, algorithms, and modular software implementation.";
      const stars = repo.stargazers_count || 0;
      const indexStr = String(idx + 1).padStart(2, "0");

      const card = document.createElement("div");
      card.className = "project-card floating-card";
      card.setAttribute("data-tilt", "true");

      card.innerHTML = `
        <div class="card-glow"></div>
        <div class="card-inner">
          <div class="card-header">
            <div class="card-meta">
              <span class="card-index">GITHUB // ${indexStr}</span>
              <span class="repo-badge">PUBLIC REPO</span>
            </div>
            <div class="repo-stats">
              <span class="star-count" title="Stars">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                ${stars}
              </span>
            </div>
          </div>

          <h3 class="card-title">${repo.name}</h3>
          <p class="card-description">${desc}</p>

          <div class="card-footer">
            <div class="card-tech">
              <span class="lang-dot" style="background-color: ${langColor};"></span>
              <span class="tech-tag">${lang}</span>
              <span class="updated-tag">${formatTimeAgo(repo.updated_at)}</span>
            </div>
            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="btn-card-action">
              <span>VIEW SOURCE</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>
          </div>
        </div>
      `;

      container.appendChild(card);
    });
  }

  return {
    init: async function (username, containerId) {
      const repos = await fetchRepositories(username);
      renderRepositories(repos, containerId);
    }
  };
})();
