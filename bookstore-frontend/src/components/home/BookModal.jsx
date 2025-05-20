import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { useEffect } from 'react';

const BookModal = ({ book, onClose }) => {
  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!book) return null;

  return (
    <div
      className='fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center'
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='w-[90%] max-w-xl max-h-[90vh] overflow-y-auto bg-white rounded-xl p-6 relative shadow-lg'
      >
        {/* Close Icon */}
        <AiOutlineClose
          className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer hover:scale-110 transition-transform'
          onClick={onClose}
          title="Close modal"
        />

        {/* Book Metadata */}
        <div className='mb-2'>
          <span className='inline-block px-3 py-1 bg-sky-200 text-sm rounded-full font-medium'>
            Published: {book.publishYear || 'Unknown'}
          </span>
          <p className='text-xs text-gray-400 mt-1'>{book._id}</p>
        </div>

        {/* Book Title */}
        <div className='flex items-center gap-2 mt-4'>
          <PiBookOpenTextLight className='text-sky-300 text-2xl' />
          <h2 className='text-xl font-semibold text-gray-800'>
            {book.title || 'Untitled'}
          </h2>
        </div>

        {/* Author */}
        <div className='flex items-center gap-2 mt-2'>
          <BiUserCircle className='text-sky-300 text-2xl' />
          <h3 className='text-lg text-gray-600'>{book.author || 'Unknown Author'}</h3>
        </div>

        {/* Description Placeholder */}
        <div className='mt-6 text-sm text-gray-700 space-y-2'>
          <p>
            <strong>Description:</strong> This is a placeholder text. You can
            customize this section to show reviews, summary, or metadata.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
            quibusdam reprehenderit voluptatem optio.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
