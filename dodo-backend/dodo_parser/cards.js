// insert this code on site
let cards = document.getElementsByClassName("sc-1gfzx1o-0 cFGSzH");
let titlesArray = [];
let ingredientsArray = [];
for (let i = 0; i < cards.length; i++) {
    let card = cards[i];
    let title = card.getElementsByClassName("sc-1gfzx1o-2 gCRxXk")[0].getElementsByClassName("sc-77undf-1 jHwIyu")[0].innerHTML;
    let ingredients = card.innerHTML.slice(card.innerHTML.lastIndexOf(">"));
    titlesArray.push(title);
    ingredientsArray.push(ingredients);
}
// copy output arrays to data.py
console.log(titlesArray);
console.log(ingredientsArray);
