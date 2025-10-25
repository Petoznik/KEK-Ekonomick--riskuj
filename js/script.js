const REQUIRED_POINTS = [100, 200, 300, 400, 500];
// gameConfig loader should be available from game-config.js
const gameConfig = window.loadGameConfig ? window.loadGameConfig() : (typeof loadGameConfig === 'function' ? loadGameConfig() : {});
const categoriesData = (typeof buildCategoriesData === 'function') ? buildCategoriesData(gameConfig) : [];

const boardElement = document.getElementById("board");
const teamsContainer = document.getElementById("teams");
const teamCountSelect = document.getElementById("team-count");
const startBtn = document.getElementById("start-btn");
const modal = document.getElementById("question-modal");
const questionText = document.getElementById("question-text");
const answersDiv = document.getElementById("answers");
const resultDiv = document.getElementById("result");
const timerSpan = document.getElementById("timer");
const closeBtn = document.getElementById("close-btn");
const explainDiv = document.getElementById("explain");
const heroMeta = document.getElementById("hero-meta");

let teams = [];
let currentTeamIndex = 0;
let currentQuestion = null;
let currentPoints = 0;
let timerInterval = null;
let timeLeft = 30;
let cooldownTimeout = null;
let isCooldown = false;
let explainInterval = null;
let explainTimeLeft = 0;

function resetModal() {
    clearInterval(timerInterval);
    timerInterval = null;
    timeLeft = 30;
    if (timerSpan) timerSpan.textContent = timeLeft;
    if (answersDiv) answersDiv.innerHTML = "";
    if (resultDiv) resultDiv.textContent = "";
    if (resultDiv) resultDiv.style.color = "var(--text)";
    if (closeBtn) closeBtn.style.display = "none";
    // clear explanation display and timer
    if (explainInterval) {
        clearInterval(explainInterval);
        explainInterval = null;
    }
    explainTimeLeft = 0;
    if (explainDiv) explainDiv.textContent = "";
    if (modal) {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
    }
}

function initBoard() {
    if (!boardElement) return;
    boardElement.innerHTML = "";
    boardElement.className = "board-grid";

    (categoriesData || []).forEach(category => {
        const column = document.createElement("div");
        column.className = "board-column";
        if (category.highlighted) {
            column.classList.add("selected");
        }
        const sortedPoints = Object.keys(category.questions || {})
            .map(Number)
            .sort((a, b) => a - b);

        sortedPoints.forEach(points => {
            const questionData = category.questions[points];
            const cell = document.createElement("button");
            cell.className = "cell";
            cell.textContent = points;
            cell.dataset.category = category.name;
            cell.dataset.points = String(points);
            const tooltip = document.createElement("span");
            tooltip.className = "cell-label";
            tooltip.textContent = category.name;
            cell.appendChild(tooltip);
            column.appendChild(cell);
        });

        boardElement.appendChild(column);
    });
}

function setupTeams(count) {
    teams = Array.from({ length: count }, (_, i) => ({
        name: `Tým ${i + 1}`,
        score: 0
    }));
    currentTeamIndex = 0;
    renderTeams();
}

function renderTeams() {
    if (!teamsContainer) return;
    teamsContainer.innerHTML = "";
    teams.forEach((team, index) => {
        const card = document.createElement("div");
        card.className = "team-card";
        if (index === currentTeamIndex) card.classList.add("active");

        const name = document.createElement("div");
        name.className = "team-name";
        name.textContent = team.name;

        const score = document.createElement("div");
        score.className = "team-score";
        score.textContent = team.score;

        card.appendChild(name);
        card.appendChild(score);
        teamsContainer.appendChild(card);
    });
}

function openQuestion(categoryName, points, cell) {
    const category = (categoriesData || []).find(cat => cat.name === categoryName);
    const questionData = category?.questions?.[points];

    if (!questionData) return;

    currentQuestion = { ...questionData, categoryName, points: Number(points), cell };
    currentPoints = Number(points);
    if (questionText) questionText.textContent = questionData.question;
    if (resultDiv) resultDiv.textContent = "";
    if (resultDiv) resultDiv.style.color = "var(--text)";
    timeLeft = 30;
    if (timerSpan) timerSpan.textContent = timeLeft;
    if (answersDiv) answersDiv.innerHTML = "";
    if (closeBtn) closeBtn.style.display = "none";

    (questionData.answers || []).forEach((answer, index) => {
        const btn = document.createElement("button");
        btn.className = "answer-btn";
        btn.textContent = answer;
        btn.addEventListener("click", () => handleAnswer(index));
        answersDiv.appendChild(btn);
    });

    if (modal) {
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
    }
    startTimer();
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        if (timerSpan) timerSpan.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeout();
        }
    }, 1000);
}

function startExplainTimer(duration) {
    if (!explainDiv) return;
    if (explainInterval) clearInterval(explainInterval);
    explainTimeLeft = duration;
    explainDiv.textContent = `Vysvětlení: ${explainTimeLeft}s`;
    explainInterval = setInterval(() => {
        explainTimeLeft -= 1;
        if (explainTimeLeft <= 0) {
            clearInterval(explainInterval);
            explainInterval = null;
            explainDiv.textContent = "";
            return;
        }
        explainDiv.textContent = `Vysvětlení: ${explainTimeLeft}s`;
    }, 1000);
}

function disableAnswers() {
    document.querySelectorAll(".answer-btn").forEach(btn => (btn.disabled = true));
}

function handleAnswer(index) {
    if (!currentQuestion) return;
    clearInterval(timerInterval);
    disableAnswers();

    const isCorrect = index === currentQuestion.correct;
    const team = teams[currentTeamIndex];

    if (isCorrect) {
        team.score += currentPoints;
        if (resultDiv) resultDiv.textContent = `Správně! +${currentPoints} bodů pro ${team.name}`;
        if (resultDiv) resultDiv.style.color = "var(--success)";
    } else {
        team.score -= currentPoints;
        if (resultDiv) resultDiv.textContent = `Špatně! -${currentPoints} bodů pro ${team.name}`;
        if (resultDiv) resultDiv.style.color = "var(--danger)";
    }

    updateScoreboard();
    concludeQuestion();
}

function handleTimeout() {
    if (!currentQuestion) return;
    disableAnswers();
    const team = teams[currentTeamIndex];
    team.score -= currentPoints;
    if (resultDiv) resultDiv.textContent = `Čas vypršel! -${currentPoints} bodů pro ${team.name}`;
    if (resultDiv) resultDiv.style.color = "var(--danger)";
    updateScoreboard();
    concludeQuestion();
}

function updateScoreboard() {
    renderTeams();
}

function concludeQuestion() {
    if (currentQuestion?.cell) {
        currentQuestion.cell.classList.add("disabled");
        currentQuestion.cell.disabled = true;
    }
    // Set contextual label for the next round button (show which team will play next)
    if (teams.length) {
        const nextIndex = (currentTeamIndex + 1) % teams.length;
        if (closeBtn) closeBtn.textContent = `Další kolo — ${teams[nextIndex].name}`;
    } else {
        if (closeBtn) closeBtn.textContent = "Další kolo";
    }

    if (closeBtn) {
        closeBtn.setAttribute('aria-hidden', 'false');
        closeBtn.style.display = "inline-flex";
        closeBtn.classList.add('next-btn');
        closeBtn.focus();
    }
    if (!isCooldown) {
        beginCooldown();
    }
    startExplainTimer(20);
}

function closeQuestion() {
    const hadQuestion = Boolean(currentQuestion);
    stopCooldown();
    resetModal();
    if (hadQuestion && teams.length) {
        currentTeamIndex = (currentTeamIndex + 1) % teams.length;
        renderTeams();
    }
    currentQuestion = null;
}

if (closeBtn) {
    closeBtn.addEventListener('keydown', (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && closeBtn.style.display !== 'none') {
            e.preventDefault();
            closeQuestion();
        }
    });
}

function handleCellClick(event) {
    const cell = event.target.closest(".cell");
    if (!cell || cell.classList.contains("disabled")) return;
    if (!teams.length) {
        alert("Nejdříve spusť hru pomocí tlačítka 'Spustit hru'.");
        return;
    }
    if (isCooldown) return;
    if (modal && modal.classList.contains("active")) return;
    const category = cell.dataset.category;
    const points = cell.dataset.points;
    openQuestion(category, points, cell);
}

if (startBtn) {
    startBtn.addEventListener("click", () => {
        const teamCount = Number(teamCountSelect.value);
        stopCooldown();
        resetModal();
        currentQuestion = null;
        currentPoints = 0;
        setupTeams(teamCount);
        initBoard();
    });
}

if (boardElement) boardElement.addEventListener("click", handleCellClick);
if (closeBtn) closeBtn.addEventListener("click", () => { closeQuestion(); });

window.addEventListener("click", event => {
    if (event.target === modal && modal && modal.classList.contains("active") && closeBtn && closeBtn.style.display !== "none") {
        closeQuestion();
    }
});

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Inicializace
initBoard();

function buildCategoriesData(config) {
    const { categories, overrides, topic } = config || {};
    const categoryList = (categories && categories.length) ? categories : Object.keys(window.QUESTION_BANK || {});

    return categoryList.map(name => ({
        name,
        highlighted: name === topic,
        questions: cloneQuestions(overrides?.[name] ?? (window.QUESTION_BANK?.[name] ?? buildEmptyCategory()))
    }));
}

function buildEmptyCategory() {
    return REQUIRED_POINTS.reduce((acc, points) => {
        acc[points] = {
            question: "Zatím není k dispozici otázka.",
            answers: ["A", "B", "C", "D"],
            correct: 0
        };
        return acc;
    }, {});
}

function cloneQuestions(source) {
    const fallback = buildEmptyCategory();
    return Object.fromEntries(
        REQUIRED_POINTS.map(points => {
            const template = source?.[points];
            if (!template) {
                const empty = fallback[points];
                return [points, { ...empty, answers: [...empty.answers] }];
            }
            return [points, { ...template, answers: [...template.answers] }];
        })
    );
}

function beginCooldown() {
    isCooldown = true;
    if (boardElement) boardElement.classList.add("cooldown");
    cooldownTimeout = setTimeout(() => {
        isCooldown = false;
        if (boardElement) boardElement.classList.remove("cooldown");
        cooldownTimeout = null;
    }, 10000);
}

function stopCooldown() {
    if (cooldownTimeout) {
        clearTimeout(cooldownTimeout);
        cooldownTimeout = null;
    }
    isCooldown = false;
    if (boardElement) boardElement.classList.remove("cooldown");
}

function renderHeroMeta(config) {
    if (!heroMeta) return;
    heroMeta.innerHTML = "";

    const metaItems = [];
    if (config?.grade && config.grade !== "default") {
        metaItems.push({ label: "Ročník", value: config.grade });
    }
    if (config?.topic) {
        metaItems.push({ label: "Téma", value: config.topic });
    }

    if (!metaItems.length) {
        heroMeta.style.display = "none";
        return;
    }

    heroMeta.style.display = "flex";
    metaItems.forEach(item => {
        const badge = document.createElement("span");
        badge.className = "meta-badge";
        badge.innerHTML = `<strong>${item.label}:</strong> ${item.value}`;
        heroMeta.appendChild(badge);
    });
}
