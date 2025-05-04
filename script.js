const questions = [
  { q: "تحميل مرفق من بريد غير معروف آمن؟", correct: false },
  { q: "هل يجب استخدام كلمة مرور قوية وطويلة؟", correct: true },
  { q: "مشاركة كلمة المرور مع الزملاء آمن إذا كنت تثق بهم؟", correct: false }
];

let current = 0;
let score = 0;
let timeLeft = 15;
let timer;

function showQuestion() {
  clearInterval(timer);
  timeLeft = 15;
  document.getElementById("timer").innerText = "الوقت: " + timeLeft;
  document.getElementById("question").innerText = questions[current].q;
  document.getElementById("feedback").innerText = "";
  timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
  timeLeft--;
  document.getElementById("timer").innerText = "الوقت: " + timeLeft;
  if (timeLeft === 0) {
    clearInterval(timer);
    answer(null); // عدّها خاطئة
  }
}

function answer(choice) {
  clearInterval(timer);
  const correct = questions[current].correct;
  if (choice === correct) {
    document.getElementById("feedback").innerText = "إجابة صحيحة!";
    score++;
  } else if (choice === null) {
    document.getElementById("feedback").innerText = "انتهى الوقت!";
  } else {
    document.getElementById("feedback").innerText = "إجابة خاطئة.";
  }

  document.getElementById("score").innerText = "النتيجة: " + score;
  current++;

  if (current < questions.length) {
    setTimeout(showQuestion, 1500);
  } else {
    setTimeout(endGame, 1500);
  }
}

function endGame() {
  document.getElementById("game").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");
  document.getElementById("final-score").innerText = "درجتك: " + score + " من " + questions.length;
  let feedback = score === questions.length
    ? "رائع! وعيك الأمني ممتاز."
    : score >= 2
    ? "جيد! لكن ما زال بإمكانك التحسن."
    : "انتبه! تحتاج إلى مزيد من التوعية.";
  document.getElementById("final-feedback").innerText = feedback;
}

showQuestion();
