import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { useState } from 'react';
import BookModal from './BookModal';

const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <article className="border-2 border-gray-300 rounded-xl p-4 m-4 shadow-sm hover:shadow-lg transition duration-300 relative">
      <span className="absolute top-2 right-2 px-3 py-1 text-sm bg-sky-600 text-white rounded-full font-semibold">
        {book.publishYear}
      </span>
      
      <p className="text-xs text-gray-400 break-all">{book._id}</p>
      
      <div className="flex items-center gap-2 mt-2">
        <PiBookOpenTextLight className="text-sky-600 text-xl" />
        <h3 className="font-medium">{book.title}</h3>
      </div>

      <div className="flex items-center gap-2 mt-1">
        <BiUserCircle className="text-sky-600 text-xl" />
        <h4 className="text-sm text-gray-700">{book.author}</h4>
      </div>

      <div className="flex justify-around items-center gap-4 mt-6">
        <BiShow
          title="Quick View"
          className="text-2xl text-blue-600 cursor-pointer hover:text-black"
          onClick={() => setShowModal(true)}
        />
          <BsInfoCircle
          title="Quick View"
          className="text-2xl text-blue-600 cursor-pointer hover:text-black"
          onClick={() => setShowModal(true)}
        />
        <Link to={`/books/edit/${book._id}`} title="Edit Book">
          <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-black" />
        </Link>
        <Link to={`/books/delete/${book._id}`} title="Delete Book">
          <MdOutlineDelete className="text-2xl text-red-600 hover:text-black" />
        </Link>
      </div>

      {showModal && <BookModal book={book} onClose={() => setShowModal(false)} />}
    </article>
  );
};

export default BookSingleCard;
