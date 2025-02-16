const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');

function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`;
    fetch(url)
        .then(response => response.json())
        .then(result => displayResults(result));
}

function displayResults(result) {
    resultPlaylist.classList.add("hidden");
    resultArtist.innerHTML = ''; // Limpa resultados anteriores

    if (result.length === 0) {
        resultArtist.innerHTML = '<p>Nenhum artista encontrado.</p>';
        return;
    }

    result.forEach(element => {
        const artistDiv = document.createElement('div');
        artistDiv.innerHTML = `
            <h2>${element.name}</h2>
            <img src="${element.urlImg}" alt="${element.name}">
        `;
        resultArtist.appendChild(artistDiv);
    });

    resultArtist.classList.remove('hidden');
}

searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (searchTerm === '') {
        resultArtist.classList.add('hidden');
        resultPlaylist.classList.remove('hidden');
        return;
    }

    requestApi(searchTerm);
});
