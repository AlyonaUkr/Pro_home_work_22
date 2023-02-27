const genreList = document.querySelector('.categories-list');
const songList = document.querySelectorAll('.product-list');
const songdisc = document.querySelectorAll('.card ');
const modal = document.querySelector('.modal_conteiner');
const closeButton = document.querySelector('.close');
const form = document.getElementById('form');
const formName = document.getElementById('name');
const formPhone = document.getElementById('number');
const formEmail = document.getElementById('email');
const requiredFields = form.querySelectorAll('.required');
const formDataEl = document.querySelector('.form-data');

for (let item of document.querySelectorAll('.buy ')){
    item.addEventListener('click', () => {
        closeMenu(songList);
        closeMenu(songdisc);
        modal.classList.remove('display-none');
    });
} 

function closeMenu(array) {
    for (let i = 0; i < array.length; i++) {
        if (!array[i].classList.contains('display-none')) {
            array[i].classList.add('display-none');
        } 
    }
}

function printError(el, errorMessage) {
    form.elements[el].nextElementSibling.textContent = errorMessage;
}

function sendFormtoHtml () {
    for (let i = 0; i < form.elements.length - 1; i++) {
        const div = document.createElement('div');
        let formElementValue = form.elements[i].value;

        if (form.elements[i].type !== 'radio') {
            div.textContent = `${form.elements[i].name}: ${formElementValue}`;
            formDataEl.append(div);
        }

        if (form.elements[i].type === 'radio' && form.elements[i].checked) {
            formElementValue = form.elements['radio'].value;
            div.textContent = `${form.elements[i].name}: ${formElementValue}`;
            formDataEl.append(div);
        }
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let formValid = true;

    requiredFields.forEach((field) => {
        if(field.value === '') {
            printError(field.id, 'The field is empty');
            formValid = false;
        };

        if (field.getAttribute('type') === 'email' && !field.value.includes('@')) {
            printError(field.id, 'The field is empty');
            formValid = false;
        } else if (field.getAttribute('name') === 'email' && !field.value.includes('@')) {
            printError(field.id, 'Incorrect value');
            formValid = false;
        }
    });

    if (formValid) {
        sendFormtoHtml();
        modal.classList.add('display-none');
        formDataEl.classList.remove('display-none');
    }
});

formName.addEventListener('input', (e) => {
    if (e.target.value.length > 0) {
        printError('name', '');
    } 
});

formPhone.addEventListener('input', (e) => {
    if (e.target.value.length > 0) {
        printError('number', '');
    } 
});

formEmail.addEventListener('input', (e) => {
    if (e.target.value.length > 0) {
        printError('email', '');
    } 
});

genreList.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.value.includes('item-link')) {
        closeMenu(songList);
        event.target.nextElementSibling.classList.remove('display-none');
    } else if (target.classList.value.includes('item-discription')) {
        closeMenu(songdisc);
        event.target.nextElementSibling.classList.remove('display-none');
    }
});

closeButton.addEventListener('click', () => {
    modal.classList.add('display-none');
})
