// these variables will be used to access the HTML tags by their classes.
const pokemon_name = document.querySelector('.pokemon_name');
const pokemon_number = document.querySelector('.pokemon_number');
const pokemon_gif = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const prox = document.querySelector('.btn-prox');
const prev = document.querySelector('.btn-prev');
const habitat = document.querySelector('.habitat');

let pokemon_index = 1;

 // The "fecthPokemon function" will search an item in the Pokemon API list and bring the response thats gonna be stored in variable.
 // "await" suits to wait the method execute completly before precede the next lines of the function
 // "async" define the function as asyncrone. its allow to use the "await" clausule.
const fecthPokemon = async (pokemon) => { 

    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIresponse.status == 200){

        const data = await APIresponse.json();
        console.log(data);
        return data;
        
    
    } 
   
   
}
// This function will render the data sent for the API
const renderPokemon = async (pokemon) => {
  
    console.log(" uma string passando...");
    let pokemon_habitat;

    const data = await fecthPokemon(pokemon);
    if (data){

        pokemon_name.innerHTML = data.name;
        pokemon_number.innerHTML = data.id;
        pokemon_gif.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        pokemon_index = data.id;
        console.log(pokemon_index);
        pokemon_habitat = data['types']['0']['type']['name'];
        renderHabitat(pokemon_habitat);

      
    } else {
        pokemon_name.innerHTML = 'Não encontrado :(';
        pokemon_number.innerHTML = '';
        pokemon_gif.setAttribute('src','./images/005-800.webp');
    }

}
const renderHabitat = (pokemon_habitat) => {
    if(pokemon_habitat === 'water'){
        habitat.setAttribute('src','./images/kawawagi-river.gif');
    }else if (pokemon_habitat === 'fire'){
        habitat.setAttribute('src','./images/firehabitat.webp');
    }else if (pokemon_habitat === 'grass'){
        habitat.setAttribute('src','./images/planthabitat.gif');
    }else if (pokemon_habitat === 'poison'){
        habitat.setAttribute('src','./images/swamphabitat.gif');
    }
}

// Event Listeners:
// Event function used to get the string of the input 
form.addEventListener('submit',(event) => { // the function has 2 parameters: the event type and the arrow function used to describe comands for the event
    event.preventDefault();
    
    renderPokemon(input.value.toLowerCase());  
    input.value = '';
});

prox.addEventListener('click',() => {
    


        pokemon_index += 1;
        renderPokemon(pokemon_index);
        console.log(pokemon_index);

   

})
prev.addEventListener('click',() => {
    if(pokemon_index > 1){

        pokemon_index -= 1;
        renderPokemon(pokemon_index);
        console.log(pokemon_index);
    }

})

renderPokemon('1');

