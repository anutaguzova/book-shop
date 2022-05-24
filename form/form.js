//validation form
const form = document.querySelector('.form_delivery');
const submitBtn = document.querySelector('#submit');
const inputs = document.querySelectorAll('.input');


// next day
let next = new Date();
let day = next.getDate() + 1;
let month = next.getMonth() + 1;
let year = next.getFullYear();
if (day < 10) day = '0' + day
if (month < 10) month = '0' + month

next = year + '-' + month + '-' + day;
document.getElementById('date').setAttribute("min", next);


// checkbox <= 2
document.querySelector(".gift").addEventListener("change", function () {
    let a = document.querySelector(".gift").querySelectorAll('[type="checkbox"]'),
        b = document.querySelector(".gift").querySelectorAll('[type="checkbox"]:checked');
    for (let j = 0; j < a.length; j++)
        if (b.length >= 2) {
            a[j].disabled = true;
            for (let i = 0; i < b.length; i++)
                b[i].disabled = false;
        } else {
            a[j].disabled = false;
        }
})

function inputsAreFilledAndValid() {
    const allInputs = Array.from(inputs)
    return allInputs.every(input => input.value && input.validity.valid) ?
        true :
        false
}

const submitForm = (event) => {
    event.preventDefault()
    let name = document.getElementById("name").value;
    let surName = document.getElementById("surname").value;
    let street = document.getElementById("street").value;
    let house_number = document.getElementById("house_number").value;
    let flat_number = document.getElementById("flat_number").value;
    let date = document.getElementById("date").value;

    result1.textContent = `Customer: ${name} ${surName}`;
    result2.textContent = ` The delivery address: ${street} street, house ${house_number}, flat ${flat_number} `
    result3.textContent = `Delivery date: ${date}`


    document.getElementById("popup_result").classList.add("visible")
    submitBtn.disabled = true
    inputs.forEach(input => input.required = false)
    form.reset()
}

document.querySelector(".close_form")
    .addEventListener("click", () => window.location.href = '../index.html');


form.addEventListener('submit', submitForm)

inputs.forEach(input => {
    input.addEventListener('input', () => {

        input.required = true

        if (!input.validity.valid) {
            input.nextElementSibling.style.opacity = 1
        } else {
            input.nextElementSibling.style.opacity = 0
        }
        inputsAreFilledAndValid() ?
            submitBtn.disabled = false :
            submitBtn.disabled = true
    })
})


document.addEventListener('invalid', (function () {
    return function (e) {
        e.preventDefault();
    };
})(), true);