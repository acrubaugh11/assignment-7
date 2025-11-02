let funnyJokesDiv = document.getElementById("funnyJokes");

document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("/jokebook/category/funnyJoke");
        if (!response.ok) {
            console.error("Error getting joke!")
            return;
        }
        const result = await response.json();
        for(let i = 0; i < result.length; i++){
            const setup = result[i].setup;
            const delivery = result[i].delivery;
            let jokeDiv = document.createElement('div');
            jokeDiv.classList.toggle('jokeDiv');
            let randomP1 = document.createElement('p')
            let randomP2 = document.createElement('p');
            let jokeSetup = document.createTextNode(setup);
            let jokeDelivery = document.createTextNode(delivery);

            randomP1.appendChild(jokeSetup);
            randomP2.appendChild(jokeDelivery);
            jokeDiv.appendChild(randomP1);
            jokeDiv.appendChild(randomP2);
            funnyJokesDiv.appendChild(jokeDiv);
        }
    } catch (err) {
        console.error(err);
    }
});