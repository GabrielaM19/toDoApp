let $task; // uzytkownik wpisuje tresc
let $alertInfo; // info o braku zadan
let $btnAdd; // przycisk ADD do dodania nowego zadania
let $ulList; // lista zadan
let $newTask;

// zmienne do elementu popup
let $popup; // pobrany element div - popup
let $popupInfo; // alert w popup'ie jak sie doda pusty tekst
let $editedToDo; // edytowany ToDo
let $popupInput; // tekst wpisywany w input'a w popup'ie
let $addPopupBtn; // przycisk zatwierdz w popupie
let $closeToDoBtn; // przycisk do zamykania popup'a

let $idNumberLi = 0; // numer dla elementu li - zadania

let $allTasks; // wszystkie zadania


// metoda wywolujaca metody przygotowujace DOM
const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
};

// metoda do dodawania tools - przyciskow do li
const createToolsArea = () => {
    let toolsPanel = document.createElement('div');
    toolsPanel.classList.add('tools');
    
    let btnComplete = document.createElement('button');
    btnComplete.classList.add('complete');
    btnComplete.innerHTML = '<i class="fas fa-check"></i> ';
    
    let btnEdit = document.createElement('button');
    btnEdit.classList.add('edit');
    btnEdit.innerText = 'EDIT';

    
    let btnDelete = document.createElement('button');
    btnDelete.classList.add('delete');
    btnDelete.innerHTML = '<i class="fas fa-times"></i> ';

    $newTask.appendChild(toolsPanel);
    toolsPanel.appendChild(btnComplete);
    toolsPanel.appendChild(btnEdit);
    toolsPanel.appendChild(btnDelete);


};

// metoda ktora bedzie sprawdzala ktory z przyciskow zostal nacisniety
const checkClick = (e) => {

    if(e.target.closest('button').classList.contains('complete')){
        e.target.closest('li').classList.toggle('completed');
        e.target.closest('button').classList.toggle('completed');
    } else if (e.target.closest('button').className === 'edit') {
        editTask(e);
    } else if(e.target.closest('button').classList.contains('delete')) {
        deleteTask(e);
    }
};

// metoda do dodawania nowego zadania
const addNewTask = () => {
    if($task.value !== ''){
        $idNumberLi++;
        $newTask = document.createElement('li');
        $newTask.textContent = $task.value;
        $newTask.setAttribute('id', `todo-${$idNumberLi}`);
        $ulList.appendChild($newTask);
        $task.value = '';
        $alertInfo.innerText = '';
        createToolsArea();
    } else {
        $alertInfo.innerText = 'Musisz wpisac tresc zadania';
    }
};

// metoda do sprawdzenia czy mamy wpisane zadanie i
// dodanie go za pomoca przycisku enter
const enterCheck = () => {
    if(event.keyCode === 13){
        addNewTask();
    }
};

// metoda do pokazania popup do edytowania zadania
const editTask = (e) => {
    
    // pobranie id elementu na stronie
    let oldToDo = e.target.closest('li').id;
    $editedToDo = document.getElementById(oldToDo);
    $popupInput.value = $editedToDo.firstChild.textContent;
    $popup.style.display = 'flex';
};

// metoda do zmiany zadania
const changeTask = () => {
    if($popupInput.value !== '') {
        $editedToDo.firstChild.textContent = $popupInput.value;
        $popup.style.display = 'none';
        $popupInfo.textContent = '';
    } else {
        $popupInfo.textContent = 'Musisz wpisac tresc zadania';
        $popupInfo.style.color = 'tomato';

    }
};

// metoda do usuwania zadania z listy
const deleteTask = (e) => {

    let oldLi = e.target.closest('li');
    // sa dwie mozliwosci
    // $ulList.removeChild(oldLi);
    oldLi.remove();

    // sprawdzenie czy ul nie jest puste
    // w tym celu pobierzemy wszystkie elementy li
    if($allTasks.length === 0){
        $alertInfo.innerText = 'Brak zadań na liście.';
    }
};


// metoda do zamykania popup
const closePopup = () => {
    $popup.style.display = 'none';
    $popupInfo.textContent = '';
}




// metoda do pobierania elementow html 
const prepareDOMElements = () => {

    $task = document.querySelector('.todoInput');
    $alertInfo = document.querySelector('.alertInfo');
    $btnAdd = document.querySelector('.addBtn');
    $ulList = document.querySelector('.todoList ul');

    // elements for popup window
    $popup = document.querySelector('.popup');
    $popupInfo = document.querySelector('.popupInfo');
    $popupInput = document.querySelector('.popupInput');
    $addPopupBtn = document.querySelector('.accept');
    $closeToDoBtn = document.querySelector('.cancel');

    $allTasks = $ulList.getElementsByTagName('li');
};

// metoda do nasluchiwania zdarzen
const prepareDOMEvents = () => {
    
    $btnAdd.addEventListener('click', addNewTask);
    $ulList.addEventListener('click', checkClick);
    $closeToDoBtn.addEventListener('click', closePopup);
    $addPopupBtn.addEventListener('click', changeTask);
    $task.addEventListener('keyup', enterCheck);
};


document.addEventListener('DOMContentLoaded', main);