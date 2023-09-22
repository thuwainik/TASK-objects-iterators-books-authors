const authors = require("./authors.json");
const books = require("./books.json");

/**************************************************************
 * getBookById(bookId, books):
 * - receives a bookId
 * - recieves an array of book objects
 * - returns the book object that matches that id
 * - returns undefined if no matching book is found
 ****************************************************************/
function getBookById(bookId, books) {
  // Your code goes here
  return books.find((e) => e.id == bookId);
}
// console.log(getBookById(12, books));

/**************************************************************
 * getAuthorByName(authorName, authors):
 * - receives an authorName
 * - recieves an array of author objects
 * - returns the author that matches that name (CASE INSENSITIVE)
 * - returns undefined if no matching author is found
 ****************************************************************/
function getAuthorByName(authorName, authors) {
  // Your code goes here
  return authors.find((e) => e.name == authorName);
}
// console.log(getAuthorByName("J.K. Rowling", authors));

/**************************************************************
 * bookCountsByAuthor(authors):
 * - receives an array of authors
 * - returns an array of objects with the format:
 *    [{ author: <NAME>, bookCount: <NUMBER_OF_BOOKS> }]
 ****************************************************************/
function bookCountsByAuthor(authors) {
  // Your code goes here
  let auth = [];
  authors.forEach((e) => {
    let obj = {};
    obj.author = e.name;
    obj.bookCount = e.books.length;
    auth.push(obj);
  });
  return auth;
}
// console.log(bookCountsByAuthor(authors));

/**************************************************************
 * booksByColor(books):
 * - receives an array of books
 * - returns an object where the keys are colors
 *   and the values are arrays of book titles:
 *    { <COLOR>: [<BOOK_TITLES>] }
 ****************************************************************/
function booksByColor(books) {
  // Your code goes here
  const colors = {};
  let coloArr = [];

  books.forEach((e) => {
    if (!coloArr.includes(e.color)) {
      coloArr.push(e.color);

      let x = [];
      books.forEach((j) => {
        if (j.color == e.color) {
          x.push(j.title);
        }
      });

      colors[e.color] = x;
    }
  });

  return colors;
}
// console.log(booksByColor(books));

/**************************************************************
 * titlesByAuthorName(authorName, authors, books):
 * - receives an authorName
 * - recieves an array of author objects
 * - recieves an array of book objects
 * - returns an array of the titles of the books written by that author:
 *    ["The Hitchhikers Guide", "The Meaning of Liff"]
 ****************************************************************/
function titlesByAuthorName(authorName, authors, books) {
  // Your code goes here
  // let x = [];
  // authors.forEach((e) => {
  //   if (e.name == authorName) {
  //     books.forEach((j) => {
  //       if (e.books.includes(j.id)) {
  //         x.push(j.title);
  //       }
  //     });
  //   }
  // });
  // return x;
  const x = getAuthorByName(authorName, authors);
  return x.books.map((e) => getBookById(e, books).title);
}
// console.log(titlesByAuthorName("George R.R. Martin", authors, books));

/**************************************************************
 * mostProlificAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author with the most books
 *
 * Note: assume there will never be a tie
 ****************************************************************/
function mostProlificAuthor(authors) {
  // Your code goes here
  const arr = authors.sort((a, b) => a.books.length - b.books.length);
  return arr[arr.length - 1].name;
}
// console.log(mostProlificAuthor(authors));

/**************************************************************
 * relatedBooks(bookId, authors, books):
 * - receives a bookId
 * - receives a list of authors
 * - receives a list of books
 * - returns a list of the titles of all the books by
 *   the same author as the book with bookId
 *   (including the original book)
 *
 * e.g. Let's send in bookId 37 ("The Shining Girls" by Lauren Beukes):
 *      relatedBooks(37);
 * We should get back all of Lauren Beukes's books:
 *      ["The Shining Girls", "Zoo City"]
 *
 * NOTE: YOU NEED TO TAKE INTO ACCOUNT BOOKS WITH MULTIPLE AUTHORS
 *
 * e.g. Let's send in bookId 46 ("Good Omens" by Terry Pratchett and Neil Gaiman):
 *      relatedBooks(46);
 * We should get back all of Neil Gaiman's books AND all of Terry Pratchett's books:
 *      ["Good Omens", "Good Omens", "Neverwhere", "Coraline", "The Color of Magic", "The Hogfather", "Wee Free Men", "The Long Earth", "The Long War", "The Long Mars"]
 *
 * BONUS: REMOVE DUPLICATE BOOKS
 ****************************************************************/
function relatedBooks(bookId, authors, books) {
  // Your code goes here
  let x = [];
  getBookById(bookId, books).authors.forEach((e) => {
    x.push(e.id);
  });

  let y = [];
  authors
    .filter((e) => x.includes(e.id))
    .forEach((e) => {
      y.push(...e.books);
    });
  let z = [];
  books
    .filter((e) => y.includes(e.id))
    .forEach((e) => {
      z.push(e.title);
    });

  return z;
}
// console.log(relatedBooks(46, authors, books));

/**************************************************************
 * friendliestAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author that has
 *   co-authored the greatest number of books
 ****************************************************************/
function friendliestAuthor(authors) {
  // const coAuth2 = books
  // .filter((e) => e.authors.length > 1)
  // .map((e) => e.authors)
  // .flat();

  // const coAuth = [];
  // books
  //   .filter((e) => e.authors.length > 1)
  //   .forEach((e) => coAuth.push(...e.authors));
  let dBooks = [];
  authors.map((e) => e.books).forEach((e) => dBooks.push(...e));
  dBooks = dBooks.filter((e) => dBooks.includes(e, dBooks.indexOf(e) + 1));
  dBooks = dBooks.filter((item, index) => dBooks.indexOf(item) === index);
  let coBooks = [];
  dBooks.forEach((e) =>
    coBooks.push(...authors.filter((x) => x.books.includes(e)))
  );

  coBooks.sort((a, b) => a.id - b.id);
  let count = {};
  let temp = [];
  coBooks.forEach((e) => {
    if (count[e.name]) {
      count[e.name] += 1;
    } else {
      count[e.name] = 1;
      e.count = 0;
      temp.push(e);
    }
  });
  for (let i = 0; i < temp.length; i++) {
    temp[i].count = Object.values(count)[i];
  }
  temp.sort((a, b) => b.count - a.count);
  return temp[0].name;
  // let temp_ = { count: 0 };
  // for (key in count) {
  //   if (temp_.count > count[key]) {
  //     temp_ = temp_;
  //   } else {
  //     temp_ = { count: count[key], name: key };
  //   }
  // }
  // return temp_.name;
  //   console.log(friendliestAuthor(authors));
  // };
}

console.log(friendliestAuthor(authors));

module.exports = {
  getBookById,
  getAuthorByName,
  bookCountsByAuthor,
  booksByColor,
  titlesByAuthorName,
  mostProlificAuthor,
  relatedBooks,
  friendliestAuthor,
};
