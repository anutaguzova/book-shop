// book  catalog 
let catalogElement = document.createElement('div');
catalogElement.className = "catalog";

fetch('./assets/book.json')
    .then((response) => response.json())
    .then((data) => {
        for (let i = 0; i < data.length; i++) {
            // book
            let bookElement = document.createElement('div');
            let bookWrapper = document.createElement('div');
            let bookImage = document.createElement('img');
            let bookTitle = document.createElement('p');
            let bookAuthor = document.createElement('p');
            let bookPrice = document.createElement('p');
            let btnMore = document.createElement('a');
            let btnBacket = document.createElement('button');

            bookElement.className = "book";
            bookWrapper.className = "book_wrapper";
            bookImage.className = "book_image";
            bookTitle.className = "book_title";
            bookAuthor.className = "book_author";
            bookPrice.className = "book_price";
            btnMore.className = "button more__button";
            btnBacket.className = "button backet__button";

            bookTitle.innerText = data[i].title;
            bookAuthor.innerText = data[i].author;
            bookPrice.innerText = data[i].price;
            btnMore.innerText = "Learn more";
            btnBacket.innerText = "Add to backet";
            bookImage.src = data[i].imageLink;

            btnMore.setAttribute("type", "button");
            btnBacket.setAttribute("type", "button");
            bookImage.setAttribute("alt", "book");

            // popup description
            let popupElement = document.createElement('div');
            let moreElement = document.createElement('div');
            let closeElement = document.createElement('div');
            let descriptionElement = document.createElement('p');

            popupElement.id = "popup_more";
            moreElement.id = "more_content";
            closeElement.className = "close_result";
            descriptionElement.className = "description";
            closeElement.innerText = "X";

            moreElement.append(closeElement, descriptionElement);
            popupElement.appendChild(moreElement);

            catalogElement.append(bookElement, popupElement);
            bookElement.append(bookWrapper, bookTitle, bookAuthor, bookPrice, btnBacket);
            bookWrapper.append(bookImage, btnMore);

            btnMore.addEventListener("click", (e) =>
                popupElement.classList.add("visible"),
                descriptionElement.innerText = data[i].description
            );
            closeElement.addEventListener("click", () => popupElement.classList.remove("visible"));
        }
    });

document.querySelector('.wrapper').appendChild(catalogElement);
