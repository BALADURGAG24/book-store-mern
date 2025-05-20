import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/books', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Created successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.error(error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <BackButton />
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-8">
        <h1 className="text-4xl font-bold text-center text-sky-700 mb-6">Create a New Book</h1>

        {loading && (
          <div className="flex justify-center my-6">
            <Spinner />
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-lg text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-300 transition"
              placeholder="Enter book title"
            />
          </div>
          <div>
            <label className="block text-lg text-gray-700 mb-2">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-300 transition"
              placeholder="Enter author name"
            />
          </div>
          <div>
            <label className="block text-lg text-gray-700 mb-2">Publish Year</label>
            <input
              type="number"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-300 transition"
              placeholder="Enter year"
            />
          </div>
          <div className="text-center">
            <button
              onClick={handleSaveBook}
              className="mt-4 bg-sky-500 hover:bg-sky-600 text-white text-lg font-medium px-6 py-3 rounded-xl shadow-md transition duration-300"
            >
              Save Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBooks;
