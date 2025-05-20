import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('title'); // Default sort by title
  const [sortOrder, setSortOrder] = useState('asc'); // Default sort order is ascending

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        const allBooks = response.data.data;
        setBooks(allBooks);
        setFilteredBooks(allBooks);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term)
    );
    setFilteredBooks(filtered);
  }, [searchTerm, books]);

  // Sorting function
  const handleSort = (field) => {
    const newSortOrder = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newSortOrder);

    const sortedBooks = [...filteredBooks].sort((a, b) => {
      if (a[field] < b[field]) return sortOrder === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredBooks(sortedBooks);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-sky-50 to-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <h1 className="text-4xl font-bold text-sky-700">Books Library</h1>
        <Link
          to="/books/create"
          className="flex items-center gap-2 bg-sky-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-sky-700 transition"
          title="Add a new book"
        >
          <MdOutlineAddBox className="text-2xl" />
          <span>Add Book</span>
        </Link>
      </div>

      {/* Search & View Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-sky-300 px-4 py-2 rounded-lg w-full md:max-w-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <div className="flex gap-4">
          <button
            onClick={() => setShowType('table')}
            className={`px-6 py-2 rounded-lg transition duration-300 ${
              showType === 'table'
                ? 'bg-sky-600 text-white'
                : 'bg-white border border-sky-300 text-sky-600 hover:bg-sky-100'
            }`}
          >
            Table View
          </button>
          <button
            onClick={() => setShowType('card')}
            className={`px-6 py-2 rounded-lg transition duration-300 ${
              showType === 'card'
                ? 'bg-sky-600 text-white'
                : 'bg-white border border-sky-300 text-sky-600 hover:bg-sky-100'
            }`}
          >
            Card View
          </button>
        </div>
      </div>

      {/* Sort Options */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => handleSort('title')}
          className={`px-6 py-2 rounded-lg transition duration-300 ${
            sortField === 'title'
              ? 'bg-sky-600 text-white'
              : 'bg-white border border-sky-300 text-sky-600 hover:bg-sky-100'
          }`}
        >
          Sort by Title {sortField === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        <button
          onClick={() => handleSort('author')}
          className={`px-6 py-2 rounded-lg transition duration-300 ${
            sortField === 'author'
              ? 'bg-sky-600 text-white'
              : 'bg-white border border-sky-300 text-sky-600 hover:bg-sky-100'
          }`}
        >
          Sort by Author {sortField === 'author' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center mt-12">
          <Spinner />
        </div>
      ) : filteredBooks.length === 0 ? (
        <p className="text-center text-gray-500 text-xl mt-12">No books found.</p>
      ) : showType === 'table' ? (
        <BooksTable books={filteredBooks} />
      ) : (
        <BooksCard books={filteredBooks} />
      )}
    </div>
  );
};

export default Home;
