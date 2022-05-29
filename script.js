// book  page
const page = document.createDocumentFragment();

let header = document.createElement("header");
let main = document.createElement("main");
let footer = document.createElement("footer");

let nameShop = document.createElement("h1");
nameShop.innerText = "Book Shop";
header.appendChild(nameShop);

let wrapperElement = document.createElement("div");
wrapperElement.className = "wrapper";
let basketWrapperElement = document.createElement("div");
basketWrapperElement.className = "basket_wrapper";

let catalogElement = document.createElement("div");
catalogElement.className = "catalog";

document.addEventListener("DOMContentLoaded", () => fetch("./assets/book.json")
    .then((response) => response.json())
    .then((data) => {

        // basket
        let basketElement = document.createElement("div");
        let basketTitleElement = document.createElement("p");
        let basketItemsElement = document.createElement("div");
        let basketTotalElement = document.createElement("div");
        let totalPriceElement = document.createElement("span");
        let totalTitleElement = document.createElement("span");
        let purchaseElement = document.createElement("a");
        let purchaseButton = document.createElement("button");

        basketElement.className = "basket";
        basketTitleElement.className = "basket_title";
        basketItemsElement.className = "basket_items";
        basketTotalElement.className = "basket_total";
        totalPriceElement.className = "total_price";
        totalTitleElement.className = "total_title";
        purchaseElement.className = "link_form"
        purchaseButton.className = "buy_button";

        basketTitleElement.innerText = "Basket";
        totalPriceElement.innerText = "0€";
        totalTitleElement.innerText = "Total:";
        purchaseButton.innerText = "Purchase";

        purchaseElement.href = "./form/form.html";
        purchaseButton.setAttribute("type", "button");

        purchaseElement.appendChild(purchaseButton);

        basketElement.append(basketTitleElement, basketItemsElement, basketTotalElement, purchaseElement);
        basketTotalElement.append(totalTitleElement, totalPriceElement);


        basketWrapperElement.appendChild(basketElement)

        // drag drop
        catalogElement.addEventListener("dragstart", function (event) {
            event.dataTransfer.setData('text', event.target.id)

        })

        basketElement.addEventListener("dragover", function (event) {
            event.preventDefault();
        }),

        basketElement.addEventListener("drop", function (event) {
            let id = event.dataTransfer.getData('text');
            addDropped(id);
            event.dataTransfer.clearData();
            })

        function addDropped(id) {
            purchaseButton.classList.add("visible")
            let title = document.querySelectorAll(".book_title")[id - 1].innerText
            let price = document.querySelectorAll(".book_price")[id - 1].innerText
            let author = document.querySelectorAll(".book_author")[id - 1].innerText
            let image = document.querySelectorAll(".book_image")[id - 1].src
            addItemBasket(title, author, price, image)
            updateTotal()
        }



        for (let i = 0; i < data.length; i++) {
            // book
            let bookElement = document.createElement("div");
            let bookWrapper = document.createElement("div");
            let bookImage = document.createElement("img");
            let bookTitle = document.createElement("p");
            let bookAuthor = document.createElement("p");
            let bookPrice = document.createElement("span");
            let bookCurrency = document.createElement("span");
            let btnMore = document.createElement("a");
            let btnBasket = document.createElement("button");

            bookElement.className = "book";
            bookWrapper.className = "book_wrapper";
            bookImage.className = "book_image";
            bookTitle.className = "book_title";
            bookAuthor.className = "book_author";
            bookPrice.className = "book_price";
            bookCurrency.className = "book_currency"
            btnMore.className = "button more__button";
            btnBasket.className = "button basket__button";

            bookTitle.innerText = data[i].title;
            bookAuthor.innerText = data[i].author;
            bookPrice.innerText = data[i].price;
            bookCurrency.innerText = "€";
            btnMore.innerText = "Learn more";
            btnBasket.innerText = "Add to basket";
            bookImage.src = data[i].imageLink;

            bookElement.setAttribute("draggable", "true");
            bookElement.id = data[i].id;

            btnMore.setAttribute("type", "button");
            btnBasket.setAttribute("type", "button");
            bookImage.setAttribute("alt", "book");

            // popup description
            let popupElement = document.createElement("div");
            let moreElement = document.createElement("div");
            let closeElement = document.createElement("div");
            let descriptionElement = document.createElement("p");

            popupElement.id = "popup_more";
            moreElement.id = "more_content";
            closeElement.className = "close_result";
            descriptionElement.className = "description";
            closeElement.innerText = "X";

            moreElement.append(closeElement, descriptionElement);
            popupElement.appendChild(moreElement);

            catalogElement.append(bookElement, popupElement);
            bookElement.append(bookWrapper, bookPrice, bookCurrency, bookAuthor, bookTitle, btnBasket);
            bookWrapper.append(bookImage, btnMore);

            btnMore.addEventListener("click", (e) =>
                popupElement.classList.add("visible"),
                descriptionElement.innerText = data[i].description
            );
            closeElement.addEventListener("click", () => popupElement.classList.remove("visible"));


            // basket
            let addToCartButtons = document.querySelectorAll(".basket__button")
            for (let j = 0; j < addToCartButtons.length; j++) {
                let button = addToCartButtons[i]
                button.addEventListener("click", addClicked)
            }

            let quantityInputs = document.querySelectorAll(".quantity_input")
            for (let j = 0; j < quantityInputs.length; i++) {
                let input = quantityInputs[j]
                input.addEventListener("change", changeQuantity)
            }

            let removeButtons = document.querySelectorAll(".button_remove")
            for (let j = 0; j < removeButtons.length; j++) {
                let button = removeButtons[j]
                button.addEventListener("click", removeItem)
            }

            function addClicked() {
                purchaseButton.classList.add("visible")
                let title = document.querySelectorAll(".book_title")[i].innerText
                let price = document.querySelectorAll(".book_price")[i].innerText
                let author = document.querySelectorAll(".book_author")[i].innerText
                let image = document.querySelectorAll(".book_image")[i].src
                addItemBasket(title, author, price, image)
                updateTotal()
            }

            function addItemBasket(title, author, price, image) {
                let basket_item = document.createElement("div")
                basket_item.classList.add("basket_item")
                let itemsBasket = document.querySelector(".basket_items")
                let basketItemTitles = document.querySelectorAll('.basket_item_title')
                // for (let j = 0; j < basketItemTitles.length; j++) {
                //     if (basketItemTitles[j].innerText == title) {
                //         alert('This book has been already added to the basket')
                //         return
                //     }
                // }

                let itemContent = `
                <div class="basket_item_part child-active">
                  <div class="basket_item_title">${title}</div>
                  <div class="basket_item_author">${author}</div>
                  <div class="basket_amount_remove">
                    <input class="quantity_input" type="number" value="1">
                    <button class="button_remove" type="button"> REMOVE </button>  
                  </div> 
                </div>
                <div class="basket_item_part">
                  <span class="basket_item_price">${price}</span> 
                  <span>€</span>
                </div>
                <div class="basket_item_part">
                  <img class="basket_item_image" src="${image}" width="65" height="80">   
                </div>
                `
                basket_item.innerHTML = itemContent
                itemsBasket.appendChild(basket_item)
                basket_item.querySelectorAll(".button_remove")[0].addEventListener("click", removeItem)
                basket_item.querySelectorAll(".quantity_input")[0].addEventListener("change", changeQuantity)
            }

            function changeQuantity(event) {
                if (isNaN(event.target.value) || event.target.value < 0) {
                    event.target.value = 1
                }

                if (event.target.value == 0) {
                    removeItem(event)
                }
                updateTotal()
            }

            function removeItem(event) {
                let buttonClicked = event.target
                buttonClicked.parentElement.parentElement.parentElement.remove()
                updateTotal()
            }

            function updateTotal() {
                let basket = document.querySelectorAll(".basket_item")
                let total = 0
                for (let j = 0; j < basket.length; j++) {
                    let price = document.querySelectorAll(".basket_item_price")[j].innerText
                    let quantity = document.querySelectorAll(".quantity_input")[j].value
                    total = total + (price * quantity)
                }

                if (total === 0) {
                    purchaseButton.classList.remove("visible")
                }
                document.querySelector(".total_price").innerText = total + " €"
            }
        }
    })
)


main.append(wrapperElement, basketWrapperElement)
wrapperElement.appendChild(catalogElement);


page.appendChild(header);
page.appendChild(main);
page.appendChild(footer);
document.body.appendChild(page);
