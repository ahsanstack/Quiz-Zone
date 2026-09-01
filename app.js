/**
 * Main Application Logic for Simple Quiz
 */

class QuizApp {
  constructor() {
    this.currentCategory = "webdev";
    this.currentDifficulty = "easy";
    this.questions = [];
    this.currentIndex = 0;
    this.userAnswers = [];
    this.score = 0;
    this.timer = null;
    this.timeLeft = 15;
    this.maxTime = 15;

    this.cacheDOM();
    this.bindEvents();
    this.renderCategoryOptions();
    this.renderDifficultyOptions();
    this.updateBestScoreDisplay();
  }

  cacheDOM() {
    this.dom = {
      welcomeScreen: document.getElementById("welcome-screen"),
      quizScreen: document.getElementById("quiz-screen"),
      resultsScreen: document.getElementById("results-screen"),
      categoryOptions: document.getElementById("category-options"),
      difficultyOptions: document.getElementById("difficulty-options"),
      startBtn: document.getElementById("start-btn"),
      resetStatsBtn: document.getElementById("reset-stats-btn"),
      bestScoreLabel: document.getElementById("best-score-label"),
      bestScoreVal: document.getElementById("best-score-val"),

      quizCategoryBadge: document.getElementById("quiz-category-badge"),
      quizDifficultyBadge: document.getElementById("quiz-difficulty-badge"),
      currentScore: document.getElementById("current-score"),
      timerProgress: document.getElementById("timer-progress"),
      timerText: document.getElementById("timer-text"),
      qCurrent: document.getElementById("q-current"),
      qTotal: document.getElementById("q-total"),
      progressBar: document.getElementById("progress-bar"),
      progressPercent: document.getElementById("progress-percent"),
      questionText: document.getElementById("question-text"),
      optionsContainer: document.getElementById("options-container"),
      explanationBox: document.getElementById("explanation-box"),
      explanationText: document.getElementById("explanation-text"),
      prevBtn: document.getElementById("prev-btn"),
      nextBtn: document.getElementById("next-btn"),

      resultIcon: document.getElementById("result-icon"),
      resultTitle: document.getElementById("result-title"),
      resultSubtitle: document.getElementById("result-subtitle"),
      finalScore: document.getElementById("final-score"),
      accuracyPercent: document.getElementById("accuracy-percent"),
      correctCount: document.getElementById("correct-count"),
      wrongCount: document.getElementById("wrong-count"),
      restartBtn: document.getElementById("restart-btn"),
      reviewBtn: document.getElementById("review-btn"),
      reviewContainer: document.getElementById("review-container"),
      reviewList: document.getElementById("review-list"),
    };
  }

  bindEvents() {
    this.dom.startBtn.addEventListener("click", () => this.startQuiz());
    this.dom.nextBtn.addEventListener("click", () => this.nextQuestion());
    this.dom.prevBtn.addEventListener("click", () => this.prevQuestion());
    this.dom.restartBtn.addEventListener("click", () =>
      this.showScreen("welcome-screen"),
    );
    this.dom.reviewBtn.addEventListener("click", () => this.toggleReviewMode());

    if (this.dom.resetStatsBtn) {
      this.dom.resetStatsBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to reset all high scores?")) {
          localStorage.clear();
          this.updateBestScoreDisplay();
        }
      });
    }

    document.addEventListener("keydown", (e) => {
      if (this.dom.quizScreen.classList.contains("hidden")) return;

      if (e.key >= "1" && e.key <= "4") {
        const index = parseInt(e.key) - 1;
        const options = this.dom.optionsContainer.querySelectorAll("button");
        if (options[index] && !options[index].disabled) {
          options[index].click();
        }
      } else if (e.key === "ArrowRight" || e.key === "Enter") {
        if (!this.dom.nextBtn.disabled) this.nextQuestion();
      } else if (e.key === "ArrowLeft") {
        if (!this.dom.prevBtn.disabled) this.prevQuestion();
      }
    });
  }

  showScreen(screenId) {
    [
      this.dom.welcomeScreen,
      this.dom.quizScreen,
      this.dom.resultsScreen,
    ].forEach((s) => s.classList.add("hidden"));
    document.getElementById(screenId).classList.remove("hidden");

    if (screenId === "welcome-screen") {
      this.updateBestScoreDisplay();
    }
  }

  renderCategoryOptions() {
    this.dom.categoryOptions.innerHTML = "";
    Object.keys(QUESTION_BANK).forEach((catKey) => {
      const cat = QUESTION_BANK[catKey];
      const btn = document.createElement("button");
      const isSelected = this.currentCategory === catKey;

      btn.className = `w-full p-3.5 rounded-xl border font-semibold flex items-center justify-between transition-all ${
        isSelected
          ? "bg-indigo-600/20 border-indigo-500 text-white shadow-md"
          : "bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
      }`;

      btn.innerHTML = `
        <div class="flex items-center gap-3">
          <i class="fa-solid ${cat.icon} text-lg ${isSelected ? "text-indigo-400" : "text-slate-500"}"></i>
          <span>${cat.title}</span>
        </div>
        ${isSelected ? '<i class="fa-solid fa-circle-check text-indigo-400 text-sm"></i>' : ""}
      `;

      btn.onclick = () => {
        this.currentCategory = catKey;
        this.renderCategoryOptions();
        this.updateBestScoreDisplay();
      };

      this.dom.categoryOptions.appendChild(btn);
    });
  }

  renderDifficultyOptions() {
    const diffs = [
      { id: "easy", label: "Easy", color: "emerald" },
      { id: "medium", label: "Medium", color: "amber" },
      { id: "hard", label: "Hard", color: "rose" },
    ];

    this.dom.difficultyOptions.innerHTML = "";
    diffs.forEach((diff) => {
      const isSelected = this.currentDifficulty === diff.id;
      const btn = document.createElement("button");

      btn.className = `py-3 px-2 rounded-xl border text-sm font-bold capitalize transition-all text-center ${
        isSelected
          ? `bg-${diff.color}-500/20 border-${diff.color}-500 text-${diff.color}-400 shadow-md`
          : "bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
      }`;

      btn.textContent = diff.label;
      btn.onclick = () => {
        this.currentDifficulty = diff.id;
        this.renderDifficultyOptions();
        this.updateBestScoreDisplay();
      };

      this.dom.difficultyOptions.appendChild(btn);
    });
  }

  updateBestScoreDisplay() {
    const key = `simple_quiz_best_${this.currentCategory}_${this.currentDifficulty}`;
    const best = localStorage.getItem(key);
    const catTitle = QUESTION_BANK[this.currentCategory].title;

    this.dom.bestScoreLabel.textContent = `${catTitle} (${this.currentDifficulty})`;
    this.dom.bestScoreVal.textContent =
      best !== null ? `${best} points` : "No Record";
  }

  startQuiz() {
    const catQuestions =
      QUESTION_BANK[this.currentCategory][this.currentDifficulty] || [];

    if (catQuestions.length === 0) {
      alert("No questions available for selected criteria!");
      return;
    }

    this.questions = [...catQuestions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);
    this.currentIndex = 0;
    this.score = 0;
    this.userAnswers = new Array(this.questions.length).fill(null);

    this.maxTime =
      this.currentDifficulty === "easy"
        ? 20
        : this.currentDifficulty === "medium"
          ? 15
          : 10;

    this.dom.quizCategoryBadge.textContent =
      QUESTION_BANK[this.currentCategory].title;
    this.dom.quizDifficultyBadge.textContent = this.currentDifficulty;
    this.dom.qTotal.textContent = this.questions.length;

    this.showScreen("quiz-screen");
    this.loadQuestion();
  }

  loadQuestion() {
    this.resetTimer();
    const q = this.questions[this.currentIndex];

    this.dom.qCurrent.textContent = this.currentIndex + 1;
    this.dom.currentScore.textContent = this.score;

    const progressPercent = Math.round(
      ((this.currentIndex + 1) / this.questions.length) * 100,
    );
    this.dom.progressBar.style.width = `${progressPercent}%`;
    this.dom.progressPercent.textContent = `${progressPercent}%`;

    this.dom.questionText.textContent = q.question;
    this.dom.optionsContainer.innerHTML = "";
    this.dom.explanationBox.classList.add("hidden");

    const recordedAnswer = this.userAnswers[this.currentIndex];

    q.options.forEach((optText, optIndex) => {
      const btn = document.createElement("button");
      btn.className = `quiz-option w-full p-4 rounded-xl border text-left font-medium text-slate-200 bg-slate-900/60 border-slate-800 hover:border-slate-600 flex items-center justify-between group`;

      const keyLabel = `<span class="inline-flex items-center justify-center w-6 h-6 rounded-md bg-slate-800 border border-slate-700 text-xs font-bold text-slate-400 group-hover:text-white mr-3">${optIndex + 1}</span>`;

      btn.innerHTML = `
        <div class="flex items-center">
          ${keyLabel}
          <span>${optText}</span>
        </div>
        <div class="status-icon"></div>
      `;

      btn.onclick = () => this.handleOptionSelect(optIndex);

      if (recordedAnswer !== null) {
        btn.disabled = true;
        this.applyOptionStyle(btn, optIndex, recordedAnswer, q.answer);
      }

      this.dom.optionsContainer.appendChild(btn);
    });

    if (recordedAnswer !== null) {
      this.showExplanation(q.explanation);
    } else {
      this.startTimer();
    }

    this.dom.prevBtn.disabled = this.currentIndex === 0;
    this.dom.nextBtn.textContent =
      this.currentIndex === this.questions.length - 1 ? "Finish" : "Next";
  }

  handleOptionSelect(selectedIndex) {
    this.stopTimer();
    const q = this.questions[this.currentIndex];

    this.userAnswers[this.currentIndex] = selectedIndex;

    const isCorrect = selectedIndex === q.answer;
    if (isCorrect) {
      this.score += 10 + this.timeLeft;
    }

    this.dom.currentScore.textContent = this.score;

    const buttons = this.dom.optionsContainer.querySelectorAll("button");
    buttons.forEach((btn, idx) => {
      btn.disabled = true;
      this.applyOptionStyle(btn, idx, selectedIndex, q.answer);
    });

    this.showExplanation(q.explanation);
  }

  applyOptionStyle(btn, index, selected, correct) {
    const iconContainer = btn.querySelector(".status-icon");

    if (index === correct) {
      btn.classList.remove("bg-slate-900/60", "border-slate-800");
      btn.classList.add(
        "bg-emerald-500/20",
        "border-emerald-500/80",
        "text-emerald-300",
      );
      iconContainer.innerHTML =
        '<i class="fa-solid fa-circle-check text-emerald-400 text-lg"></i>';
    } else if (index === selected && selected !== correct) {
      btn.classList.remove("bg-slate-900/60", "border-slate-800");
      btn.classList.add(
        "bg-rose-500/20",
        "border-rose-500/80",
        "text-rose-300",
      );
      iconContainer.innerHTML =
        '<i class="fa-solid fa-circle-xmark text-rose-400 text-lg"></i>';
    } else {
      btn.classList.add("opacity-40");
    }
  }

  showExplanation(text) {
    if (!text) return;
    this.dom.explanationText.textContent = text;
    this.dom.explanationBox.classList.remove("hidden");
  }

  startTimer() {
    this.stopTimer();
    this.timeLeft = this.maxTime;
    this.updateTimerUI();

    this.timer = setInterval(() => {
      this.timeLeft--;
      this.updateTimerUI();

      if (this.timeLeft <= 0) {
        this.stopTimer();
        this.handleTimeOut();
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timer) clearInterval(this.timer);
  }

  resetTimer() {
    this.stopTimer();
    this.timeLeft = this.maxTime;
    this.updateTimerUI();
  }

  updateTimerUI() {
    this.dom.timerText.textContent = this.timeLeft;
    const dashOffset = 100 - (this.timeLeft / this.maxTime) * 100;
    this.dom.timerProgress.style.strokeDashoffset = dashOffset;

    if (this.timeLeft <= 5) {
      this.dom.timerProgress.classList.remove("text-indigo-500");
      this.dom.timerProgress.classList.add("text-rose-500");
    } else {
      this.dom.timerProgress.classList.remove("text-rose-500");
      this.dom.timerProgress.classList.add("text-indigo-500");
    }
  }

  handleTimeOut() {
    if (this.userAnswers[this.currentIndex] === null) {
      this.userAnswers[this.currentIndex] = -1;

      const q = this.questions[this.currentIndex];
      const buttons = this.dom.optionsContainer.querySelectorAll("button");

      buttons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === q.answer) {
          btn.classList.add(
            "bg-emerald-500/20",
            "border-emerald-500/80",
            "text-emerald-300",
          );
        } else {
          btn.classList.add("opacity-40");
        }
      });

      this.showExplanation("Time's up! " + q.explanation);
    }
  }

  nextQuestion() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      this.loadQuestion();
    } else {
      this.finishQuiz();
    }
  }

  prevQuestion() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.loadQuestion();
    }
  }

  finishQuiz() {
    this.stopTimer();

    const key = `simple_quiz_best_${this.currentCategory}_${this.currentDifficulty}`;
    const currentBest = parseInt(localStorage.getItem(key) || "0");
    if (this.score > currentBest) {
      localStorage.setItem(key, this.score);
    }

    let correctCount = 0;
    this.questions.forEach((q, idx) => {
      if (this.userAnswers[idx] === q.answer) correctCount++;
    });

    const wrongCount = this.questions.length - correctCount;
    const accuracy = Math.round((correctCount / this.questions.length) * 100);

    this.dom.finalScore.textContent = this.score;
    this.dom.accuracyPercent.textContent = `${accuracy}%`;
    this.dom.correctCount.textContent = correctCount;
    this.dom.wrongCount.textContent = wrongCount;

    if (accuracy >= 70) {
      this.dom.resultIcon.className = "fa-solid fa-trophy text-amber-400";
      this.dom.resultTitle.textContent = "Great Job!";
      this.dom.resultSubtitle.textContent = "You passed the quiz!";

      if (typeof confetti === "function") {
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      }
    } else {
      this.dom.resultIcon.className = "fa-solid fa-award text-indigo-400";
      this.dom.resultTitle.textContent = "Quiz Completed!";
      this.dom.resultSubtitle.textContent = "Keep practicing to improve!";
    }

    this.dom.reviewContainer.classList.add("hidden");
    this.showScreen("results-screen");
  }

  toggleReviewMode() {
    const isHidden = this.dom.reviewContainer.classList.contains("hidden");
    if (isHidden) {
      this.renderReviewList();
      this.dom.reviewContainer.classList.remove("hidden");
      this.dom.reviewContainer.scrollIntoView({ behavior: "smooth" });
    } else {
      this.dom.reviewContainer.classList.add("hidden");
    }
  }

  renderReviewList() {
    this.dom.reviewList.innerHTML = "";

    this.questions.forEach((q, idx) => {
      const userAns = this.userAnswers[idx];
      const isCorrect = userAns === q.answer;

      const item = document.createElement("div");
      item.className = `p-5 rounded-2xl border bg-slate-900/60 backdrop-blur-sm space-y-3 ${
        isCorrect ? "border-emerald-500/30" : "border-rose-500/30"
      }`;

      const userChoiceText =
        userAns >= 0 ? q.options[userAns] : "Time Expired / Skipped";
      const correctChoiceText = q.options[q.answer];

      item.innerHTML = `
        <div class="flex items-start justify-between gap-4">
          <h4 class="font-bold text-white text-base">${idx + 1}. ${q.question}</h4>
          <span class="px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
            isCorrect
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
              : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
          }">
            ${isCorrect ? "Correct" : "Incorrect"}
          </span>
        </div>

        <div class="grid sm:grid-cols-2 gap-2 text-sm pt-2">
          <div class="p-3 rounded-xl ${isCorrect ? "bg-emerald-500/10 text-emerald-300" : "bg-rose-500/10 text-rose-300"} border border-slate-800">
            <span class="block text-xs uppercase text-slate-500 font-bold mb-0.5">Your Answer:</span>
            ${userChoiceText}
          </div>
          ${
            !isCorrect
              ? `
            <div class="p-3 rounded-xl bg-emerald-500/10 text-emerald-300 border border-slate-800">
              <span class="block text-xs uppercase text-slate-500 font-bold mb-0.5">Correct Answer:</span>
              ${correctChoiceText}
            </div>`
              : ""
          }
        </div>

        <p class="text-xs text-slate-400 pt-1 border-t border-slate-800">
          <strong class="text-indigo-400">Note:</strong> ${q.explanation}
        </p>
      `;

      this.dom.reviewList.appendChild(item);
    });
  }
}

// Initialize Application
let app;
document.addEventListener("DOMContentLoaded", () => {
  app = new QuizApp();
});
