const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLessons(data.data));
};

const displayLessons = (lessons) => {
  // 1 get the container and empty the container
  const lavalContainer = document.getElementById("lavalContainer");
  lavalContainer.innerHTML = "";

  // 2 get into every lessons
  for (let lesson of lessons) {
    console.log(lesson)
    //      3 . create Element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
      <button class="btn btn-outline btn-primary" href=""
      ><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button
    >
      `;
    //      4 . append in container
    lavalContainer.append(btnDiv)
  }
};

loadLessons();
