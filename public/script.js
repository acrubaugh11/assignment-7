"use strict";

let randomJoke = document.getElementById("random-joke");

let categoriesBtn = document.getElementById("category-btn");
categoriesBtn.addEventListener('click', getCategories);

let categories = document.getElementById("categories");
let clicked = false;

let jokeForm = document.getElementById("add-joke-form");
jokeForm.addEventListener('submit', addNewJoke);

let searchBar = document.getElementById("search-btn");
searchBar.addEventListener('click', searchCategory);

document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("/jokebook/random");
        if (!response.ok) {
            console.error("Error getting joke!")
            return;
        }
        const result = await response.json();
        console.log(result.setup);
        console.log(result.delivery);
        const setup = result.setup;
        const delivery = result.delivery;
        let randomP1 = document.createElement('p')
        let randomP2 = document.createElement('p');
        let jokeSetup = document.createTextNode(setup);
        let jokeDelivery = document.createTextNode(delivery);

        randomP1.appendChild(jokeSetup);
        randomP2.appendChild(jokeDelivery);
        randomJoke.appendChild(randomP1);
        randomJoke.appendChild(randomP2);
    } catch (err) {
        console.error(err);
    }
});

async function getCategories() {
    if (clicked) return;
    clicked = true;
    let categoriesList = [];
    try {
        const response = await fetch("/jokebook/categories");
        if (!response.ok) {
            console.error("Error getting Categories!");
        }
        const result = await response.json();
        for (let i = 0; i < result.length; i++) {
            categoriesList.push(result[i].name);
        }

    } catch (err) {
        console.error(err);
    }
    let categoriesP = document.createElement('p');
    for (let i = 0; i < categoriesList.length; i++) {
        let categoryLink = document.createElement('a');
        categoryLink.classList.add('category-btn')
        categoryLink.textContent = categoriesList[i];
        categoryLink.href = `${categoriesList[i]}.html`;
        categoriesP.appendChild(categoryLink);
        categories.appendChild(categoriesP);
    }
}


async function addNewJoke(event) {
    event.preventDefault();
    let newJokeCategory = document.getElementById("category").value;
    let newJokeSetup = document.getElementById("setup").value;
    let newJokeDelivery = document.getElementById("delivery").value;

    const jsonBody = JSON.stringify({
        category_id: newJokeCategory,
        setup: newJokeSetup,
        delivery: newJokeDelivery
    });
    try {
        const response = await fetch("/jokebook/add", {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-type": "application/json",
            },
            body: jsonBody,
        })
        if (!response.ok) {
            console.error("Error adding new Joke!");
        }
        if(newJokeCategory == 1){
            window.location.href = "/funnyJoke.html"
        }
        else if (newJokeCategory == 2){
            window.location.href = "/lameJoke.html"
        }
    } catch (err) {
        console.error(err);
    }
}


function searchCategory(){
    const input = document.getElementById("category-search").value.trim().toLowerCase();

    const validCategories = {
        "funnyjoke": "funnyJoke",
        "lamejoke": "lameJoke",
        "funnyjokes": "funnyJoke",
        "lamejokes": "lameJoke",
    };

    if (input in validCategories) {
        window.location.href = `/${validCategories[input]}.html`;
    } else {
        alert("Invalid category. Try 'funnyJoke' or 'lameJoke'.");
    }
}