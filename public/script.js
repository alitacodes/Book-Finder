const API_KEY = "AIzaSyBhBqi0Gj6aKHuqI_e5lJVBL3ko28KRcYA";
const RANDOM_BOOK_QUERY = "self development"; // Example query for "Random Book of the Day"

// Function to fetch and display books based on search query
async function searchBooks() {
  const query = document.getElementById("search").value;
  if (!query) {
    alert("Please enter a book name to search.");
    return;
  }

  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${API_KEY}`
    );
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      resultsDiv.innerHTML = ""; // Clear the loading message
      data.items.forEach((book) => {
        const bookCard = document.createElement("div");
        bookCard.className = "book-card";

        // Search result Book details
        const title = book.volumeInfo.title || "No Title Available";
        const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Unknown Author";
        const thumbnail = book.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/128x193?text=No+Image";
        const previewLink = book.volumeInfo.previewLink || "#";

        // HTML structure for each book
        bookCard.innerHTML = `
          <div class="book-card">
            <img src="${thumbnail}" alt="${title}" />
            <h3>${title}</h3>
            <p><strong>Author(s):</strong> ${authors}</p>
            <p><a href="${previewLink}" target="_blank">Read More</a></p>
          </div>
        `;
        resultsDiv.appendChild(bookCard);
      });
    } else {
      resultsDiv.innerHTML = "<p>No books found. Try a different query.</p>";
    }
  } catch (error) {
    resultsDiv.innerHTML = "<p>Error fetching book data. Please try again later.</p>";
    console.error("Error fetching books:", error);
  }
}

// Function to fetch and display a random book
async function displayRandomBook() {
  const randomBookDiv = document.getElementById("about-random-book");
  randomBookDiv.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${RANDOM_BOOK_QUERY}&key=${API_KEY}`
    );
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.items.length);
      const book = data.items[randomIndex];

      // Random Book Details
      const title = book.volumeInfo.title || "No Title Available";
      const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Unknown Author";
      const description = book.volumeInfo.description || "No description available.";
      const thumbnail = book.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/128x193?text=No+Image";

      randomBookDiv.innerHTML = `
        <div class="random-book-card">
          <img src="${thumbnail}" alt="${title}" />
          <h3>${title}</h3>
          <p><strong>Author(s):</strong> ${authors}</p>
          <p><strong>Description:</strong>${description}</p>
        </div>
      `;
    } else {
      randomBookDiv.innerHTML = "<p>No random book found. Try refreshing the page.</p>";
    }
  } catch (error) {
    randomBookDiv.innerHTML = "<p>Cannot fetch book. Please try again later.</p>";
    console.error("Cannot fetch book:", error);
  }
}

// Function to toggle the visibility of the synopsis
function toggleSynopsis(index) {
  const synopsisElement = document.getElementById(`synopsis-${index}`);
  if (synopsisElement) {
    synopsisElement.classList.toggle("see-synopsis");
  }
}

// Initialize the random book on page load
window.onload = () => {
  displayRandomBook();
};
