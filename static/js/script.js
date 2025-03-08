let currentIndex = 0;
let totalItems = 0;
let characterData = [];
const slider = document.querySelector('#characterContainer');
const nextButton = document.querySelector('#next');
const prevButton = document.querySelector('#prev');
const searchButton = document.querySelector('#searchButton');
const searchInput = document.getElementById("searchInput");

function checkInput() {
    if (searchInput.value.trim() === "") {
        searchButton.disabled = true;
    } else {
        searchButton.disabled = false;
    }
}

function searchCharacter() {
    const searchText = searchInput.value.trim();

    if (searchText !== "") {
        fetch(`/search?q=${searchText}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert(data.error);
                    return;
                }

                characterData = data;
                totalItems = characterData.length;
                currentIndex = 0;
                updateSliderPosition();
                document.body.classList.add('show-buttons');
            })
            .catch(error => console.log('Error:', error));
    }
}

nextButton.addEventListener('click', () => {
    if (currentIndex < totalItems - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateSliderPosition();
});

prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = totalItems - 1;
    }
    updateSliderPosition();
});

function updateSliderPosition() {

    slider.innerHTML = '';

    const character = characterData[currentIndex];
    const characterCard = document.createElement("div");
    characterCard.classList.add("character-card");

    const img = document.createElement("img");
    img.src = character.images.jpg.image_url;
    characterCard.appendChild(img);

    const characterInfo = document.createElement("div");
    characterInfo.classList.add("character-info");

    const name = document.createElement("h3");
    name.textContent = character.name;
    characterInfo.appendChild(name);

    const kanjiName = document.createElement("h4");
    kanjiName.textContent = character.name_kanji || "No Kanji Name";
    characterInfo.appendChild(kanjiName);

    const about = document.createElement("p");
    about.textContent = character.about || "No information available.";
    characterInfo.appendChild(about);

    characterCard.appendChild(characterInfo);
    slider.appendChild(characterCard);
}
