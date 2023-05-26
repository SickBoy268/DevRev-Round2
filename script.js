// Sample book data
const books = [
  { title: "Book 1", author: "Author 1", subject: "Subject 1", date: "2021-01-01" },
  { title: "Book 2", author: "Author 2", subject: "Subject 2", date: "2021-01-02" },
  { title: "Book 3", author: "Author 3", subject: "Subject 3", date: "2021-01-03" },
  { title: "Book 4", author: "Author 4", subject: "Subject 4", date: "2021-01-04" },
  { title: "Book 5", author: "Author 5", subject: "Subject 5", date: "2021-01-05" },
  { title: "Book 6", author: "Author 6", subject: "Subject 6", date: "2021-01-06" },
  { title: "Book 7", author: "Author 7", subject: "Subject 7", date: "2021-01-07" },
  { title: "Book 8", author: "Author 8", subject: "Subject 8", date: "2021-01-08" },
  { title: "Book 9", author: "Author 9", subject: "Subject 9", date: "2021-01-09" },
  { title: "Book 10", author: "Author 10", subject: "Subject 10", date: "2021-01-10" },
  { title: "Book 11", author: "Author 11", subject: "Subject 11", date: "2021-01-11" },
  { title: "Book 12", author: "Author 12", subject: "Subject 12", date: "2021-01-12" },
  { title: "Book 13", author: "Author 13", subject: "Subject 13", date: "2021-01-13" },
  { title: "Book 14", author: "Author 14", subject: "Subject 14", date: "2021-01-14" },
  { title: "Book 15", author: "Author 15", subject: "Subject 15", date: "2021-01-15" },
  { title: "Book 16", author: "Author 16", subject: "Subject 16", date: "2021-01-16" },
  { title: "Book 17", author: "Author 17", subject: "Subject 17", date: "2021-01-17" },
  { title: "Book 18", author: "Author 18", subject: "Subject 18", date: "2021-01-18" },
  { title: "Book 19", author: "Author 19", subject: "Subject 19", date: "2021-01-19" },
  { title: "Book 20", author: "Author 20", subject: "Subject 20", date: "2021-01-20" },
  { title: "Book 1", author: "Author 1", subject: "Subject 1", date: "2021-01-01" },
  { title: "Book 9", author: "Author 9", subject: "Subject 9", date: "2021-01-09" },
  { title: "Book 16", author: "Author 16", subject: "Subject 16", date: "2021-01-16" },
  // ... Add more books as needed
];

const booksPerPage = 12; // Number of books to display per page
let currentPage = 1; // Current page number
let loading = false; // Loading flag to prevent multiple requests
let scrollContainer; // Reference to the scrollable container

// Initialize the scrollable container and display the initial book list
window.addEventListener("DOMContentLoaded", () => {
  scrollContainer = document.getElementById("scrollContainer");
  displayBookList(books, currentPage);

  const filterForm = document.getElementById("filter-form");
  filterForm.addEventListener("submit", handleFilterFormSubmit);

  const goBackButton = document.getElementById("home-button");
  goBackButton.addEventListener("click", goBackToIndex);
});

// Go back to the index page
function goBackToIndex(event) {
  event.preventDefault();
  window.location.href = "index.html";
}


// Handle filter form submission
function handleFilterFormSubmit(event) {
  event.preventDefault();

  const filterTitle = document.getElementById("title-filter").value.trim().toLowerCase();
  const filterAuthor = document.getElementById("author-filter").value.trim().toLowerCase();
  const filterSubject = document.getElementById("subject-filter").value.trim().toLowerCase();
  const filterDate = document.getElementById("date-filter").value.trim();

  const filteredBooks = books.filter((book) => {
    const lowerCaseTitle = book.title.toLowerCase();
    const lowerCaseAuthor = book.author.toLowerCase();
    const lowerCaseSubject = book.subject.toLowerCase();
    const bookDate = new Date(book.date);

    // Apply filters based on input values
    if (filterTitle && !lowerCaseTitle.includes(filterTitle)) {
      return false;
    }
    if (filterAuthor && !lowerCaseAuthor.includes(filterAuthor)) {
      return false;
    }
    if (filterSubject && !lowerCaseSubject.includes(filterSubject)) {
      return false;
    }
    if (filterDate && bookDate.toISOString().slice(0, 10) !== filterDate) {
      return false;
    }

    return true;
  });

  // Reset the current page to 1 and display the filtered book list
  currentPage = 1;
  displayBookList(filteredBooks, currentPage);
}

// Display initial book list and counts
function displayBookList(books, page) {
  const bookList = document.getElementById("book-list");
  bookList.innerHTML = "";

  const startIndex = (page - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const currentPageBooks = books.slice(startIndex, endIndex);

  currentPageBooks.forEach((book) => {
    const bookItem = document.createElement("div");
    bookItem.classList.add("book-card");
    bookItem.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Subject: ${book.subject}</p>
      <p>Date: ${book.date}</p>
    `;
    bookList.appendChild(bookItem);
  });

  displayPagination(books.length, page);
  displayBookCounts(books);
}

// Handle page click event
function handlePageClick(event) {
  event.preventDefault();
  if (loading) {
    return;
  }
  const page = parseInt(event.target.dataset.page);
  if (page === currentPage) {
    return;
  }
  currentPage = page;
  displayBookList(books, currentPage);
}

// Display pagination links
function displayPagination(totalBooks, currentPage) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(totalBooks / booksPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const pageLink = document.createElement("li");
    pageLink.innerHTML = `
      <a class="page-link" href="#" data-page="${i}">${i}</a>
    `;
    if (i === currentPage) {
      pageLink.classList.add("active");
    }
    pagination.appendChild(pageLink);
  }

  // Add event listeners to page links
  const pageLinks = document.querySelectorAll(".page-link");
  pageLinks.forEach((link) => {
    link.addEventListener("click", handlePageClick);
  });
}


// Display book counts
function displayBookCounts(books) {
  const titleCount = document.getElementById("title-count");
  const authorCount = document.getElementById("author-count");
  const subjectCount = document.getElementById("subject-count");
  const dateCount = document.getElementById("date-count");

  const uniqueTitles = new Set(books.map(({ title }) => title));
  const uniqueAuthors = new Set(books.map(({ author }) => author));
  const uniqueSubjects = new Set(books.map(({ subject }) => subject));
  const uniqueDates = new Set(books.map(({ date }) => date));

  titleCount.textContent = `Title Count: ${uniqueTitles.size}`;
  authorCount.textContent = `Author Count: ${uniqueAuthors.size}`;
  subjectCount.textContent = `Subject Count: ${uniqueSubjects.size}`;
  dateCount.textContent = `Publish Date Count: ${uniqueDates.size}`;
}

// Load more books on scroll
scrollContainer.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
  const threshold = scrollHeight * 0.8; // Trigger the loading process when the user reaches the bottom 20%

  if (scrollTop + clientHeight >= threshold && !loading) {
    loading = true;
    loadMoreBooks();
  }
});

// Simulate loading more books
function loadMoreBooks() {
  const books = []; // Initialize an empty array to store books
  const loadingDiv = document.getElementById("loading");
  loadingDiv.style.display = "block"; // Show the loading message

  // Simulate an asynchronous request to fetch additional books
  setTimeout(() => {
    const additionalBooks = [
      // Additional books to be appended
      { title: "Book 11", author: "Author 11", subject: "Subject 11", date: "2021-11-01" },
      { title: "Book 12", author: "Author 12", subject: "Subject 12", date: "2021-12-01" },
      // ... Add more books as needed
    ];

    // Append the additional books to the existing book list
    books.push(...additionalBooks);
    displayBookList(books, currentPage);

    loadingDiv.style.display = "none"; // Hide the loading message
    loading = false; // Reset the loading flag
  }, 1000); // Simulated loading time
}
