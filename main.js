var input = document.getElementById('liste-input');
var button = document.getElementById('add');
var deleteConfirmButton = document.getElementById('confirm-delete');
var list = document.getElementById('list');

function onBtnClick($this) {
    console.log('btnclicked');
    let $name = $this.innerText;
    if ($this.classList.contains('checked')) {
        // set unchecked
        console.log('isActive');
        $this.classList.remove('checked');
        localStorage.setItem($name, 'false');
    } else {
        // set checked
        console.log('isNotActive');
        $this.classList.add('checked');
        localStorage.setItem($name, 'true');
    }
}

function addItemToDiv(name, checked) {
    let ul = document.createElement('ul');
    let li = document.createElement('li');
    ul.appendChild(li);
    if (checked) {
        li.classList.add('checked');
    }
    li.innerText = name;
    li.setAttribute('onclick', 'onBtnClick(this);');
    list.appendChild(ul);
}

function getItemsFromLocalStorage() {
    for (let [name, checked] of Object.entries(localStorage)) {
        addItemToDiv(name, checked === 'true' ? true : false);
    }
}

window.addEventListener('load', (e) => {
    getItemsFromLocalStorage();
});

button.addEventListener('click', (e) => {
    if (input.value === '') {
        input.classList.add('is-invalid');
    } else {
        addItemToDiv(input.value, false);
        localStorage.setItem(input.value, false);
        input.value = '';
    }
});

input.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        button.click();
    }
});

input.addEventListener('input', (e) => {
    if (input.classList.contains('is-invalid')) {
        input.classList.remove('is-invalid');
    }
});

deleteConfirmButton.addEventListener('click', (e) => {
    localStorage.clear();
    list.innerHTML = '';
});