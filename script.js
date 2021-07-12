 let library = new Array;
 let container = document.getElementById("container")
 let form = document.getElementById("form");
 let nwBook = document.getElementById("nwBook");

 
// constructeur d'objet "book"
    class Book {
        //constructor
   constructor(title, autor, pages, readed){
       this.title = title;
       this.autor = autor;
       this.pages = pages;
       this.readed = readed;
   }
       info(){
           let bookDiv = {
               title : document.createElement("div"),
               autor : document.createElement("div"),
               pages : document.createElement("div"),
               readed : document.createElement("div")
           }
           return bookDiv;
       }
   }


   //créer le formualire de départ
   function createForm(){
    let bgForm = document.createElement("div");
    container.appendChild(bgForm);
    bgForm.classList.add("containerFormstyle");
    let form = document.createElement("form");
    bgForm.appendChild(form);
    form.classList.add("formstyle");
    let title = document.createElement("input");
    title.classList.add("champs");
    title.setAttribute("id", "title");
    title.setAttribute("placeholder", "Title");
    let author = document.createElement("input");
    author.classList.add("champs");
    author.setAttribute("id", "author");
    author.setAttribute("placeholder", "Author");
    let pages = document.createElement("input");
    pages.classList.add("champs");
    pages.setAttribute("type", "number");
    pages.setAttribute("id", "pages");
    pages.setAttribute("placeholder", "Pages");
    let readedTxt = document.createElement("div");
    readedTxt.textContent = "Readed ?";
    readedTxt.classList.add("readedTxt");
    let readed = document.createElement("input");
    readed.setAttribute("type", "checkbox");
    readed.setAttribute("id", "readed");
    let submit = document.createElement("input");
    submit.classList.add("champs");
    submit.setAttribute("id", "submit");
    submit.setAttribute("type", "submit");
    form.appendChild(title);
    form.appendChild(author);
    form.appendChild(pages);
    form.appendChild(readed);
    form.appendChild(readedTxt);
    form.appendChild(submit);
    // `${!form}`.addEventListener("click", () => deleteForm(title, author, pages, readed, submit, form, bgForm));
    form.addEventListener("submit", (e) => createBook(e, title.value, author.value, pages.value, readed));
    form.addEventListener("submit", () => deleteForm(title, author, pages, readed, submit, form, bgForm));
}
    function deleteForm(title, author, pages, readed, submit, form, bgForm){
        title.parentElement.removeChild(title);
        author.parentElement.removeChild(author);
        pages.parentElement.removeChild(pages);
        readed.parentElement.removeChild(readed);
        submit.parentElement.removeChild(submit);
        form.parentElement.removeChild(form);
        bgForm.parentElement.removeChild(bgForm);
    }
    // récupère les données du formulaire pour créer un nouveau book à l'aide du constructeur 
    function createBook(e, title, author, pages, readed){
        e.preventDefault();
        let isReaded = readed.checked ? "readed" : "unreaded";
        if(!title || !author || !pages){
            alert("error : fill up all the form please");
            createForm()
            return;
        }
        let nouveauBook = new Book(title, author, pages, isReaded);
        addBookToLibrary(nouveauBook);
        console.log(library);
    
    }

    // ajoute le nouveau book a la fin de l'array "library" et créer visuellemnet le book sur la page
   function addBookToLibrary(currentBook) {
     library.push(currentBook);
     let bookDiv = currentBook.info()
     currentBook.div = document.createElement("div");
     containerBook.appendChild(currentBook.div);
     currentBook.div.classList.add("book");
     createButtons(currentBook);
     currentBook.div.appendChild(bookDiv.title);
     bookDiv.title.classList.add("bookCard");
     bookDiv.title.setAttribute("id", "titleBook");
     bookDiv.title.textContent = currentBook.title;

     currentBook.div.appendChild(bookDiv.autor);
     bookDiv.autor.classList.add("bookCard")
     bookDiv.autor.setAttribute("id", "autorBook");
     bookDiv.autor.textContent = currentBook.autor;

     currentBook.div.appendChild(bookDiv.pages);
     bookDiv.pages.classList.add("bookCard")
     bookDiv.pages.setAttribute("id", "pagesBook");
     bookDiv.pages.textContent = currentBook.pages + " pages";

     currentBook.div.appendChild(bookDiv.readed);
     bookDiv.readed.classList.add("bookCard")
     bookDiv.readed.setAttribute("id", `readedBook${library.indexOf(currentBook)}`);
     bookDiv.readed.classList.add("readedBook");
     bookDiv.readed.textContent = currentBook.readed;
     
   }

   function createButtons(book){
    let dlt = document.createElement("button");
    let read = document.createElement("button");
    read.classList.add("read");
    dlt.classList.add("delete");
    book.div.appendChild(dlt);
    book.div.appendChild(read);
    read.addEventListener("click", function(){
        if (book.readed === "readed"){
            book.readed = "unreaded";
            let readedShow = document.getElementById(`readedBook${library.indexOf(book)}`);
            readedShow.textContent = book.readed;
        }
        else{
            book.readed = "readed";
            let readedShow = document.getElementById(`readedBook${library.indexOf(book)}`);
            readedShow.textContent = book.readed;
        }
    });
    dlt.addEventListener("click", function(){
        library.splice(library.indexOf(book), 1);
        containerBook.removeChild(book.div);
        book.div.removeChild(dlt);
    });
}
nwBook.addEventListener("click", createForm);



