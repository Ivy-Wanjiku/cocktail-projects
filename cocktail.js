
let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let url = "https://thecocktaildb.com/api/json/v1/1/search.php?s=";
let getInfo = () => {
  let userInp = document.getElementById("user-inp").value;
  if (userInp.length == 0) {
    result.innerHTML = `<h3 class="msg">The input field cannot be empty</h3>`;
  } else {
    fetch(url + userInp)
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("user-inp").value = "";
        console.log(data);
        console.log(data.drinks[0]);
        let myDrink = data.drinks[0];
        console.log(myDrink.strDrink);
        console.log(myDrink.strDrinkThumb);
        console.log(myDrink.strInstructions);
        let count = 1;
        let ingredients = [];
        for (let i in myDrink) {
          let ingredient = "";
          let measure = "";
          if (i.startsWith("strIngredient") && myDrink[i]) {
            ingredient = myDrink[i];
            if (myDrink[`strMeasure` + count]) {
              measure = myDrink[`strMeasure` + count];
            } else {
              measure = "";
            }
            count += 1;
            ingredients.push(`${measure} ${ingredient}`);
          }
        }
        console.log(ingredients);
        result.innerHTML = `
      <img src=${myDrink.strDrinkThumb}>
      <h2>${myDrink.strDrink}</h2>
      <h3>Ingredients:</h3>
      <ul class="ingredients"></ul>
      <h3>Instructions:</h3>
      <p>${myDrink.strInstructions}</p>
      `;
        let ingredientsCon = document.querySelector(".ingredients");
        ingredients.forEach((item) => {
          let listItem = document.createElement("li");
          listItem.innerText = item;
          ingredientsCon.appendChild(listItem);
        });
      })
      .catch(() => {
        result.innerHTML = `<h3 class="msg">Please enter a valid input</h3>`;
      });
  }
};
window.addEventListener("load", getInfo);
searchBtn.addEventListener("click", getInfo);
fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin")
.then(response => response.json())
.then(data => {
  const cocktailsDiv = document.getElementById("cocktails");
  data.drinks.forEach(drink => {
    const drinkDiv = document.createElement("div");
    const drinkThumb = document.createElement("img");
    drinkThumb.src = drink.strDrinkThumb;
    drinkThumb.alt = drink.strDrink;
    const drinkName = document.createElement("h2");
    drinkName.textContent = drink.strDrink;
    drinkDiv.appendChild(drinkThumb);
    drinkDiv.appendChild(drinkName);
    cocktailsDiv.appendChild(drinkDiv);
  });
})
 .catch(error => console.error(error));




// // Fetch the cocktail data from The Cocktail DB API
//   fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin")
//     .then(response => response.json())
//     .then(data => {
//       // Process the cocktail data
//       var drinks = data.drinks;
//       var cocktailsDiv = document.getElementById("cocktails");
//       // Loop over the drinks and replace the images
//       for (var i = 0; i < drinks.length; i++) {
//         var drink = drinks[i];
//         var id = drink.idDrink;
//         var name = drink.strDrink;
//         // Fetch a random image from Unsplash
//         fetch(`https://api.unsplash.com/photos/random?client_id=`)
//           .then(response => response.json())
//           .then(data => {
//             var image = data.urls.raw;
//             // Create a cocktail card with the new image
//             var cocktailCard = document.createElement("div");
//             cocktailCard.innerHTML = `
//               <img src="${image}" alt="${name}">
//               <h2>${name}</h2>
//             `;
//             cocktailsDiv.appendChild(cocktailCard);
//             // Update the image URL in The Cocktail DB API
//             updateImageInCocktailDB(id, image);
//           })
//           .catch(error => console.error(error));
//       }
//     })
//     .catch(error => console.error(error));
//   // Function to update the image URL in The Cocktail DB API
//   function updateImageInCocktailDB(id, imageUrl) {
//     fetch(`https://www.thecocktaildb.com/api/json/v1/1/update.php?i=${id}&img=${imageUrl}`, {
//       method: 'POST'
//     })
//       .then(response => response.json())
//       .then(data => {
//         console.log(data);
//       })
//       .catch(error => console.error(error));
//   }
