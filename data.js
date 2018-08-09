var books = [];

const db = firebase.database();

db.ref("/books").on("child_added", function(data){
    books.push(data.val());
});

db.ref("/books").on("child_changed", function(data){
    books[getBook(data.val().key)] = data.val();
})

db.ref("/books").on("child_removed", function(data) {
    books.splice(getBook(product_key), 1);
})


var getBook = function(keyId){
    for(var i = 0; i < books.length; i++)
        if(books[i].key == keyId)
            return i;
}

var addBook = function(book) {
    var newBook = db.ref(`/books`).push();
    book.key = newBook.key;
    newBook.set(book);
}

var editBook = function(key, book) {
    db.ref(`/books/${key}`).set(book);
}

var delBook = function(key) {
    db.ref(`/books/${key}`).remove();
}
