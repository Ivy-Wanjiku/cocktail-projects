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