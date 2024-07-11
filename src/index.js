console.log('%c HI', 'color: firebrick')
document.addEventListener("DOMContentLoaded",() => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    
    function fetchDogImages() {
        fetch(imgUrl)
        .then(response => response.json)
        .then (data => {
            const dogImage = document.getElementById("dog-image-container");
            data.message.forEach(imageUrl => {
                const img = document.createElement("img");
                img.src = imageUrl;
                img.alt = "Random Dog";
                dogImage.appendChild(img);
            });
        })
        .catch(error => console.error("Error fetching images: ", error));
    };
    fetchDogImages();
    
    function fetchDogBreeds() {
        fetch (breedUrl)
        .then(response => response.json)
        .then(data => {
            const breeds = data.message;
            const breedList = document.getElementById("dog-breeds");
            for (let breed in breeds) {
                const li = document.createElement("li");
                li.textContent = breed;
                breedList.appendChild(li);

                li.addEventListener("click", () => {
                    li.style.color = "blue";
                })
            }
        })
        .catch(error => console.error("Error fetching breeds: ", error));
    };

    function filterBreeds(letter) {
        if (letter === 'all') {
            displayBreeds(allBreeds);
        } else {
            const filteredBreeds = {};
            for (let breed in allBreeds) {
                if (breed.startsWith(letter)) {
                    filteredBreeds[breed] = allBreeds[breed];
                }
            }
            displayBreeds(filteredBreeds);
        }
    }

    const dropdown = document.getElementById('breed-dropdown');
    dropdown.addEventListener('change', (event) => {
        const selectedLetter = event.target.value;
        filterBreeds(selectedLetter);
    });

    fetchDogBreeds();
});

