document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('currentYear').textContent = new Date().getFullYear();

  const dropdown = document.querySelector('.dropdown');
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const reviewButton = document.getElementById('reviewButton');
  const codeInput = document.getElementById('codeInput');
  const resultsContainer = document.getElementById('resultsContainer');
  const fetchRepoButton = document.getElementById('fetchRepo');
  const repoUrlInput = document.getElementById('repoUrl');

  dropdownToggle.addEventListener('click', function (e) {
    e.stopPropagation();
    dropdown.classList.toggle('open');
  });

  document.addEventListener('click', function (e) {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('open');
    }
  });

  reviewButton.addEventListener('click', function () {
    const code = codeInput.value.trim();
    if (!code) {
      resultsContainer.innerHTML = '<div class="placeholder-message">Please enter some code to review</div>';
      return;
    }

    resultsContainer.innerHTML = `
      <div class="loading-spinner">
        <div class="spinner"></div>
      </div>
    `;

    fetch("/api/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ code: code })
    })
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          resultsContainer.innerHTML = data.results.map(item =>
            `<div class="review-item">${item}</div>`
          ).join('');
        } else {
          resultsContainer.innerHTML = '<div class="placeholder-message">No suggestions found.</div>';
        }
      })
      .catch(error => {
        resultsContainer.innerHTML = `<div class="placeholder-message">Error: ${error.message}</div>`;
      });
  });

  fetchRepoButton.addEventListener('click', function () {
    const repoUrl = repoUrlInput.value.trim();

    if (!repoUrl) {
      alert('Please enter a GitHub repository URL');
      return;
    }

    codeInput.value = 'Fetching code from repository...';
    codeInput.disabled = true;

    let owner, repo;
    try {
      const urlParts = new URL(repoUrl).pathname.split('/').filter(Boolean);
      if (urlParts.length >= 2) {
        owner = urlParts[0];
        repo = urlParts[1];
      } else {
        throw new Error('Invalid GitHub URL format');
      }
    } catch (error) {
      codeInput.value = 'Error: Invalid GitHub repository URL';
      codeInput.disabled = false;
      return;
    }

    fetch(`/api/github/${owner}/${repo}`)
      .then(response => response.json())
      .then(data => {
        if (data.code) {
          codeInput.value = data.code;
        } else {
          codeInput.value = 'Error: Could not fetch code';
        }
        codeInput.disabled = false;
      })
      .catch(error => {
        codeInput.value = `Error: ${error.message}`;
        codeInput.disabled = false;
      });
  });
});
