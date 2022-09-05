console.log("this is index.js");

// constructor book is a one object
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

// display constuctor

function Display() {

}


// Add method to display prototype 
Display.prototype.add = function(book){
    console.log("adding to UI");
    let tableBody = document.getElementById('tableBody');
    let uistring = `<tr>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                    </tr>`;
    tableBody.innerHTML += uistring;  // jo ama plus ni sign no lakhiye to aapane te overwite kari de 
}

//Implimantiong the clear function
Display.prototype.clear = function(){
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();  // reset function form ni field ne reset kari de 
}

// Implimanting validate function
Display.prototype.validate = function(book){  
    // koi form ne blank no rakhi shake te mate validate function create karyu
    if(book.name.length <2 || book.author.length<2){
        return false;
    } 
    else{
        return true;
    }
}

// Implimanting show functon
Display.prototype.show = function(type,displayMessage){
    let message = document.getElementById('message');
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>Message</strong>${displayMessage}
                             You should check in on some of those fields below.
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;
    setTimeout(() => {
        message.innerHTML = '';  // 2 sec pachi automatic te invisible thai jashe settimeout na use thi
    }, 2000);
}


// Making event listner
// Add submit event listerner to form libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log("You have submited libreary form"); // form no defualt behaviour jyare te submit thay tyare te auto maticaly reload thai jay

    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;


    let fiction = document.getElementById('fiction');
    let programing = document.getElementById('programing');
    let cooking = document.getElementById('cooking');

    if (fiction.checked) {
        // .checked function check kare ke te select che ke nai
        type = fiction.value;
    }
    else if (programing.value) {
        type = programing.value;
    }
    else if (cooking.value) {
        type = cooking.value;
    }

    let book = new Book(name, author, type);  // aa function thi object bane
    console.log(book);

    let display = new Display();  // display no object bani gyo

    if(display.validate(book)){
        display.add(book);
        display.clear(); // jyare form ne aapane fill kari ne submit kariye etale tema content lakheloj rahe che te lakhan ne clear karva mte nu function banavyu
        display.show('success','Your book has been success fully added ');
    }
    else{
        // show error to the user
        display.show('danger','sorry you can not add book.');
    }

    e.preventDefault();  // this function is use for do not reload our page after using the submit button
}



// function for adding form information into localStorage
