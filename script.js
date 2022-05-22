// book  catalog 
let catalogElement = document.createElement('div');
catalogElement.className = "catalog";



let modalElement = document.createElement('div');
let overlayElement = document.createElement('div');
let btnClose = document.createElement('button');
let descriptionElement = document.createElement('div');
modalElement.className = "modal";
descriptionElement.className = "book_description";
btnClose.className = "close-button";
modalElement.id = "modal";
overlayElement.id = "overlay";
btnClose.setAttribute("data-close-button", '');
btnClose.innerText = 'X';

modalElement.append(btnClose, descriptionElement);

fetch('/book.json')
    .then((response) => response.json())
    .then((data) => {
        for (let i = 0; i < data.length; i++) {
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

            bookImage.src = data[i].imageLink;




            btnMore.setAttribute("type", "button");
            btnBacket.setAttribute("type", "button");
            bookImage.setAttribute("alt", "book");
            btnMore.setAttribute("data-modal-target", "#modal");
            btnMore.setAttribute("href", "#popup1");
            // descriptionElement.innerText = data[i].description;


            bookTitle.innerText = data[i].title;
            bookAuthor.innerText = data[i].author;
            bookPrice.innerText = data[i].price;
            btnMore.innerText = "Learn more";
            btnBacket.innerText = "Add to backet";



            catalogElement.appendChild(bookElement);
            bookElement.append(bookWrapper, bookTitle, bookAuthor, bookPrice, btnBacket);
            bookWrapper.append(bookImage, btnMore);

            // popup
            const openModalButtons = document.querySelectorAll('[data-modal-target]')
            const closeModalButtons = document.querySelectorAll('[data-close-button]')


            openModalButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const modal = document.querySelector(e.target.dataset.modalTarget)
                    openModal(modal)
                    descriptionElement.innerText = data[0].description;

                })
            })

            overlay.addEventListener('click', () => {
                const modals = document.querySelectorAll('.modal.active')
                modals.forEach(modal => {
                    closeModal(modal)

                })
            })

            closeModalButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // const modal = button.closest('.modal')
                    closeModal(modal)
                })
            })

            function openModal(modal) {
                if (modal == null) return
                modal.classList.add('active')
                overlayElement.classList.add('active')
                //   descriptionElement.innerText = data[i].description;
            }

            function closeModal(modal) {
                if (modal == null) return
                modal.classList.remove('active')

                overlayElement.classList.remove('active')
                descriptionElement.innerText = ' ';
            }

        }

    });

document.querySelector('.wrapper').append(catalogElement, modalElement, overlayElement);




