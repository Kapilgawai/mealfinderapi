// define the global variables here
const search = document.getElementById ('search');
const submit = document.getElementById ('submit');
const random = document.getElementById ('random');
const mealEl = document.getElementById ('food');
const resultHeading = document.getElementsByClassName ('result-heading');
const select_mealEl = document.getElementById ('select-meal');



//define the function to search meal
function searchMeal(e) {

    e.preventDefault();

    //clear single meal by making null inner html
    select_mealEl.innerHTML="";

    //get search meal
    const term = search.value;

    if (term.trim()) {

        //to fetch the meal from the api
        fetch (            

            ` https://www.themealdb.com/api/json/v1/1/search.php?s=${term} `

        )
        .then((res) => res.json())

        .then((data) => {

            console.log(data);

            resultHeading.innerHTML = ` <h2> Search Result For ${term} </h2> `;

            if (data.meal===null ) {

                resultHeading.innerHTML = `<h2> There Are No Result for${term} </h2>`;

            } else {

                mealEl.innerHTML = data.meals.map (

                    (meal) => `

                        <div class= "meal">

                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">

                            <div class="meal-info" data-mealID="${meal.idMeal}">

                                <h3> ${meal.strMeal} </h3>

                            </div>

                        </div>

                    `

                    ).join("");

            }

        });


    } else {

        alert ( "please insert a valid meal in search bar" );

    }

}




//fetchmeal or get meal using its ID or it get the meal when click on the image of meal
function getMealById( mealID ) {

    fetch ( `

        https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}

    ` )

    .then((res) => res.json())

    .then((data) => {

        console.log(data);

        const meal = data.meals[0];

        addMealToDOM(meal);

    });

}




//random-meal or it will fetch the random meal when click on random button
function randomMeal(){

    mealEl.innerHTML="";

    resultHeading.innerHTML="";

    fetch(

        `https://www.themealdb.com/api/json/v1/1/random.php`

    )

    .then((res) => (res).json())

    .then((data)=>{

        const meal = data.meals[0];

        addMealToDOM(meal);

    });

}




//adding to dom
function addMealToDOM(meal){

    const ingredients =  [];

    for (let i=1; i <=20; i++){               

        if (meal[`strIngredient${i}`]){

            ingredients.push(`

                ${meal[`strIngredient${i}`]} - ${meal[`strMeasure{i}`]}

            `);

        }else{

            break;

        }
    }

    // for selected meal, category, instructions and favorite button
    select_mealEl.innerHTML = `

        <div>

            <h1 class="select-meal-heading"> ${meal.strMeal} </h1>

            <img src= "${meal.strMealThumb}" alt = "${meal.strMeal}" class="select-meal-img"/>

            <div class= "select-meal-info">

                ${meal.strCategory ? `<p class="select-meal-category"> ${meal.strCategory}</p>` : ''}

                ${meal.strArea ? `<p> ${meal.strArea}</p>`:''}

            </div>

            <div class="main">

                <p class="select-meal-para">${meal.strInstructions}</p>

                <h2 class="ingredients">INGREDIENTS</h2>

                <ul class="ingredients-ul"> ${ingredients.map(ing => `# ${ing},       `).join('')}</ul>

            </div>

            <div>

                <button name="button" value="OK" type="button" onclick="favourite()" class="favorite">

                    <i class="fa-solid fa-heart" id="icon"></i> Favourite

                </button>

            </div>

        </div>`

}

const fav_el = document.createElement("div");




//event listener
submit.addEventListener('submit',searchMeal);

//--------------------=----------------------------------------------------

random.addEventListener('click',randomMeal);

//--------------------------------------------------------------------------




//to get meal information when click on meal icon
mealEl.addEventListener("click", (e)=>{

    const mealInfo = e.path.find((item) => {

        if(item.classList){

            return item.classList.contains("meal-info");

        }else{

            return false;

        }
    });

    if(mealInfo){

        const mealID = mealInfo.getAttribute("data-mealid");

        getMealById(mealID);
    }

});

