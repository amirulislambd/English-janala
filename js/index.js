const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLessons(data.data));
};

const removeActive = ()=>{
    const lessonButtons = document.querySelectorAll('.lesson-btn')
    lessonButtons.forEach(btn => btn.classList.remove('active'));
}

const loadLabelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
        removeActive()
        const clickBtn = document.getElementById(`lesson-btn-${id}`)
        clickBtn.classList.add('active')
        displayLevelWords(data.data)
    });
};

const displayLevelWords = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  if(words.length ==0){
    wordContainer.innerHTML = `
    <div class="text-center col-span-full rounded-xl space-y-2 md:space-y-4 ">
    <img class="mx-auto" src="./assets/alert-error.png"/>
        <p class="text-gray-400 font-semibold font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="text-2xl md:text-4xl font-bold font-bangla">নেক্সট Lesson এ যান</h2>
     </div>
    `;
  }

  words.forEach(word => {
    // console.log(word)
    const card = document.createElement('div')
    card.innerHTML = `
    <div class="bg-white text-center py-8 px-5 md:py-12 rounded space-y-4">
    <h2 class="font-bold text-xl md:text-2xl">${word.word?word.word:'শব্দ পাওয়া যায়নি'}</h2>
    <p class="font-semibold">Meaning /Pronounciation</p>
    <div class="text-xl md:text-2xl font-bangla">"${word.meaning?word.meaning:'অর্থ পাওয়া যায়নি'} / ${word.pronunciation?word.pronunciation:'pronunciation পাওয়া যায়নি'}"</div>

    <div class="flex justify-between items-center">
      <button
        class="btn bg-[#1A91FF15] hover:bg-[#1A91FF80] hover:rounded-full w-10 h-10"
      >
        <i class="fa-solid fa-circle-info"></i>
      </button>
      <button
        class="btn bg-[#1A91FF15] hover:bg-[#1A91FF80] hover:rounded-full w-10 h-10"
      >
        <i class="fa-solid fa-volume-high"></i>
      </button>
    </div>
  </div>
    `
    wordContainer.append(card)
  });
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
