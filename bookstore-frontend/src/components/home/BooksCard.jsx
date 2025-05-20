import BookSingleCard from './BookSingleCard';

const BooksCard = ({ books }) => {
  return (
    <div className="mt-6">
      {books.length === 0 ? (
        <p className="text-center text-gray-500">No books available.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {books.map((item) => (
            <BookSingleCard key={item._id} book={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BooksCard;
