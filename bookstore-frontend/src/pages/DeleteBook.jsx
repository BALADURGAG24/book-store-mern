import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book deleted successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error deleting book', { variant: 'error' });
        console.error(error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white p-6">
      <BackButton />
      <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-8 mt-10 border border-red-200">
        <h1 className="text-4xl font-bold text-center text-red-600 mb-6">Delete Book</h1>

        {loading ? (
          <div className="flex justify-center my-6">
            <Spinner />
          </div>
        ) : (
          <>
            <p className="text-center text-xl text-gray-700 mb-8">
              Are you sure you want to delete this book? This action cannot be undone.
            </p>

            <button
              onClick={handleDeleteBook}
              className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold rounded-xl shadow-md transition duration-300"
            >
              Yes, Delete It
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DeleteBook;
