import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';

const ShowBook = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-sky-700">Books List</h1>
        <Link
          to="/books/create"
          className="flex items-center gap-2 text-white bg-sky-600 hover:bg-sky-700 px-4 py-2 rounded-lg shadow-lg transition"
          title="Add New Book"
        >
          <MdOutlineAddBox className="text-2xl" />
          <span className="font-semibold">Add Book</span>
        </Link>
      </div>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setShowType('table')}
          className={`px-6 py-2 rounded-lg transition shadow ${
            showType === 'table'
              ? 'bg-sky-600 text-white'
              : 'bg-white border border-sky-300 text-sky-600 hover:bg-sky-100'
          }`}
        >
          Table View
        </button>
        <button
          onClick={() => setShowType('card')}
          className={`px-6 py-2 rounded-lg transition shadow ${
            showType === 'card'
              ? 'bg-sky-600 text-white'
              : 'bg-white border border-sky-300 text-sky-600 hover:bg-sky-100'
          }`}
        >
          Card View
        </button>
      </div>

      <div>
        {loading ? (
          <div className="flex justify-center mt-10">
            <Spinner />
          </div>
        ) : showType === 'table' ? (
          <BooksTable books={books} />
        ) : (
          <BooksCard books={books} />
        )}
      </div>
    </div>
  );
};

export default ShowBook;
