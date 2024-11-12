const navLinks = document.querySelectorAll(".nav-link");

//* Change the color of the links on the  nav bar when clicked on
function changeColor(link) {
  // Reset the color for all links first
  document.querySelectorAll(".nav-link").forEach((navLink) => {
    navLink.style.color = ""; // Reset the color
  });
  link.style.color = "#e7c074";
}

const categoryLinks = document.querySelectorAll(".category-link");

//* Change the color of the links on the  nav bar when clicked on
function setBorder(link) {
  // Reset the color for all links first
  document.querySelectorAll(".category-link").forEach((navLink) => {
    navLink.style.color = ""; // Reset the color
    navLink.style.border = ""; // Reset the border
  });

  link.style.color = "#000000";
  link.style.borderBottom = "3px solid #925f22"; // Add a bottom border
}

//* Get the featured books data
async function fetchFeaturedBooks() {
  try {
    const response = await fetch(
      "https://wolnelektury.pl/api/authors/adam-mickiewicz/kinds/liryka/parent_books/"
    );
    const books = await response.json();

    // Get the last 4 books
    const lastFourBooks = books.slice(-4);

    // Create and insert book cards into the container
    const bookContainer = document.getElementById("book-container");

    lastFourBooks.forEach((book) => {
      // Create a new column for each book
      const col = document.createElement("div");
      col.className = "col-12 col-md-3 my-3";

      // Create the book card
      const bookCard = `
        <div class="book-card p-4 mb-5">
          <img src="${book.simple_thumb}" alt="${book.title}" class="img-fluid book-thumble">
        </div>
        <h5 class="book-title">${book.title}</h5>
        <p class="text-muted author">${book.author}</p>
      `;

      col.innerHTML = bookCard; // Set the inner HTML of the column
      bookContainer.appendChild(col); // Append the column to the container
    });
  } catch (error) {
    console.error("Error fetching the book data:", error);
  }
}
fetchFeaturedBooks();

//* Get the Best selling book data
document.addEventListener("DOMContentLoaded", () => {
  fetch("https://wolnelektury.pl/api/books/studnia-i-wahadlo/")
    .then((response) => response.json())
    .then((books) => {
      const bestSellingBook = books;

      document.getElementById("best-selling-image").src = bestSellingBook.cover;
      document.getElementById("best-selling-title").textContent =
        bestSellingBook.title;
      document.getElementById(
        "best-selling-author"
      ).textContent = `By ${bestSellingBook.authors[0].name}`;

      const descriptionElement = document.getElementById(
        "best-selling-description"
      );
      const descriptionHtml = bestSellingBook.fragment_data?.html;
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = descriptionHtml;
      descriptionElement.textContent = tempDiv.textContent;
    })
    .catch((error) => {
      console.error("Error fetching best-selling book:", error);
    });
});

//* Get the Popular book data
async function fetchPopularBooks() {
  try {
    const response = await fetch(
      "https://wolnelektury.pl/api/authors/adam-mickiewicz/kinds/liryka/parent_books/"
    );
    const books = await response.json();

    // Get the first 8 books
    const lastFourBooks = books.slice(-8); // Slicing to get the first 8 books

    // Create and insert book cards into the container
    const bookContainer = document.getElementById("popular-books-container");

    lastFourBooks.forEach((book) => {
      // Create a new column for each book
      const col = document.createElement("div");
      col.className = "col-12 col-lg-3 my-3";

      // Create the book card
      const bookCard = `
      <div class="outer">
        <div class="book-card p-4 mb-5">
          <img src="${book.simple_thumb}" alt="${book.title}" class="img-fluid">
          <div class="add-to-cart-container container">
            <h5>Add To Cart</h5>
          </div>  
        </div>
      </div>
        <h5 class="book-title">${book.title}</h5>
        <p class="text-muted">${book.author}</p>
        
      `;

      col.innerHTML = bookCard; // Set the inner HTML of the column
      bookContainer.appendChild(col); // Append the column to the container
    });
  } catch (error) {
    console.error("Error fetching the book data:", error);
  }
}

fetchPopularBooks();
