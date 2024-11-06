function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function fetchPokemon() {
    const query = document.getElementById("pokemon-name-input").value.trim().toLowerCase();
    const pokemonInfoDiv = document.getElementById("pokemon-info");


    const searchParam = isNaN(query) ? query : Number(query);

    fetch(`https://pokeapi.co/api/v2/pokemon/${searchParam}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Pokémon não encontrado");
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("pokemon-name").textContent = capitalizeFirstLetter(data.name);
            const types = data.types.map(type => capitalizeFirstLetter(type.type.name));

            document.getElementById("pokemon-id").textContent = "ID: " + data.id;
            document.getElementById("pokemon-image").src = data.sprites.front_default;
            document.getElementById("pokemon-type").textContent = "Tipo: " + types.join(", ");
            document.getElementById("pokemon-height").textContent = "Altura: " + data.height / 10 + " m";
        })
        .catch(error => {
            pokemonInfoDiv.innerHTML = "<p>Pokémon não encontrado!</p>";
            console.error("Erro ao buscar o Pokémon:", error);
        });
}
