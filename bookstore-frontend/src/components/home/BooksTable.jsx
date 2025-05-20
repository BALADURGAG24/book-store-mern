import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { useState } from 'react';
import BookModal from './BookModal'; // Assuming BookModal is the modal you want to show

const BooksTable = ({ books }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null); // State to store the selected book for the modal

  if (!books.length) {
    return (
      <p className="text-center text-gray-500 mt-6">
        No books available. Try adding some!
      </p>
    );
  }

  const handleModalOpen = (book) => {
    setSelectedBook(book); // Set the selected book when the icon is clicked
    setShowModal(true); // Show the modal
  };

  const handleModalClose = () => {
    setShowModal(false); // Close the modal
    setSelectedBook(null); // Reset selected book
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-sky-100 text-sky-800">
            <th scope="col" className="border border-slate-300 p-2 rounded-md">No</th>
            <th scope="col" className="border border-slate-300 p-2 rounded-md">Title</th>
            <th scope="col" className="border border-slate-300 p-2 rounded-md max-md:hidden">Author</th>
            <th scope="col" className="border border-slate-300 p-2 rounded-md max-md:hidden">Publish Year</th>
            <th scope="col" className="border border-slate-300 p-2 rounded-md">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr
              key={book._id}
              className="hover:bg-sky-50 transition-colors"
            >
              <td className="border border-slate-200 p-2 text-center">{index + 1}</td>
              <td className="border border-slate-200 p-2 text-center">{book.title}</td>
              <td className="border border-slate-200 p-2 text-center max-md:hidden">{book.author}</td>
              <td className="border border-slate-200 p-2 text-center max-md:hidden">{book.publishYear}</td>
              <td className="border border-slate-200 p-2 text-center">
                <div className="flex justify-center items-center gap-4">
                  <BsInfoCircle
                    title="Quick View"
                    className="text-2xl text-blue-600 cursor-pointer hover:text-black"
                    onClick={() => handleModalOpen(book)} // Open modal with selected book
                  />
                  <Link to={`/books/edit/${book._id}`} title="Edit Book">
                    <AiOutlineEdit className="text-xl text-yellow-600 hover:text-yellow-800" />
                  </Link>
                  <Link to={`/books/delete/${book._id}`} title="Delete Book">
                    <MdOutlineDelete className="text-xl text-red-600 hover:text-red-800" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && selectedBook && (
        <BookModal book={selectedBook} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default BooksTable;
