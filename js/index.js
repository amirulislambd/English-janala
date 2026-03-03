const createElement = (arr) => {
  const htmlElement = arr.map((el) => `<span>${el}</span>`);
  return htmlElement.join(" ");
};
function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-EN"; // English
    window.speechSynthesis.speak(utterance);
  }
const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("word-container").classList.remove("hidden");
  }
};

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLessons(data.data));
};

const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  lessonButtons.forEach((btn) => btn.classList.remove("active"));
};

const loadLabelWord = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("active");
      displayLevelWords(data.data);
    });
};

const displayLevelWords = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  if (words.length == 0) {
    wordContainer.innerHTML = `
    <div class="text-center col-span-full rounded-xl space-y-2 md:space-y-4 ">
    <img class="mx-auto" src="./assets/alert-error.png"/>
        <p class="text-gray-400 font-semibold font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="text-2xl md:text-4xl font-bold font-bangla">নেক্সট Lesson এ যান</h2>
     </div>
    `;
  }

  words.forEach((word) => {
    // console.log(word)
    const card = document.createElement("div");
    card.innerHTML = `
    <div class="bg-white text-center py-8 px-5 md:py-12 rounded space-y-4">
    <h2 class="font-bold text-xl md:text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
    <p class="font-semibold">Meaning /Pronounciation</p>
    <div class="text-xl md:text-2xl font-bangla">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"}"</div>

    <div class="flex justify-between items-center">
      <button onclick="loadWordDetails(${word.id})"
        class="btn bg-[#1A91FF15] hover:bg-[#1A91FF80] hover:rounded-full w-10 h-10"
      >
        <i  class="fa-solid fa-circle-info"></i>
      </button>
      <button onclick="pronounceWord('${word.word}')"
        class="btn bg-[#1A91FF15] hover:bg-[#1A91FF80] hover:rounded-full w-10 h-10"
      >
        <i class="fa-solid fa-volume-high"></i>
      </button>
    </div>
  </div>
    `;
    wordContainer.append(card);
  });
  manageSpinner(false);
};

const loadWordDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordsDetails(details.data);
};
const displayWordsDetails = (word) => {
  console.log(word);
  console.log(word.word);
  const detailsContainer = document.getElementById("detailsContainer");
  detailsContainer.innerHTML = `
  <div class="">
            <h2 class="text-xl md:text-2xl font-bold">
              ${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})
            </h2>
          </div>
          <div class="">
            <h2>Meaning</h2>
            <p>${word.meaning ? word.meaning : "No mining"}</p>
          </div>
          <div>
            <h2>Example</h2>
            <p>${word.sentence}</p>
          </div>
          <div>
            <h2>সমার্থক শব্দ গুলো</h2>
            <div class="flex gap-2">
              ${createElement(word.synonyms)}
            </div>
          </div>
  `;
  document.getElementById("word_modal").showModal();
};

const displayLessons = (lessons) => {
  // 1 get the container and empty the container
  const lavalContainer = document.getElementById("lavalContainer");
  lavalContainer.innerHTML = "";

  // 2 get into every lessons
  for (let lesson of lessons) {
    // console.log(lesson)
    //      3 . create Element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
      <button id="lesson-btn-${lesson.level_no}" onclick="loadLabelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn" href=""
      ><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button
    >
      `;
    //      4 . append in container
    lavalContainer.append(btnDiv);
  }
};

loadLessons();
document.getElementById("btn-search").addEventListener("click", () => {
    removeActive()
  const input = document.getElementById("input-search");
  const searchValue = input.value.trim().toLowerCase();
  console.log(searchValue);
  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((data) => {
      const allWords = data.data;
      console.log(data);
      const filterWords = allWords.filter((word) =>
        word.word.toLowerCase().includes(searchValue),
      );
      displayLevelWords(filterWords)
    });
});
