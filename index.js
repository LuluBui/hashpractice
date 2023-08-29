
const list = document.querySelector('ul');
const itemDisplay = document.querySelector('div');
let recipes;
let current;
main();

async function main(){
    recipes = await getRecipeData();
    renderList();
    selectRecipe();
}

async function getRecipeData(){
    const response = await fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2307-ftb-et-web-ft/recipes');
    const jdata = await response.json();
    return jdata.data;
}

function selectRecipe(){
        
    getEventFromHash();
    renderItem();
}

window.addEventListener("hashchange", () => {
    
    selectRecipe();
})

function getEventFromHash(){
    //get the id from the hash
    const id = window.location.hash.slice(1);

    const item = recipes.find((i) => {
        return i.id === (id*1);
    })

    current = item;
}
function renderItem(){
    if(current === undefined){
        return;
    }
    itemDisplay.innerHTML = `
    <h1>${current.name}</h1>
    <img src=${current.imageUrl} alt=food #${current.id}/>
    <p>${current.description}</p>
    `;
}
function renderList(){
    //const events = await getEventData();
    const update = recipes.map(function(i){

        return `
        <h2><a href=#${i.id}>${i.name}</a></h2>
        `;
    })

    list.innerHTML = update.join('');

}