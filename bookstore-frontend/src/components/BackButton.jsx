import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const BackButton = ({ destination = '/' }) => {
  return (
    <div className="flex">
      <Link
        to={destination}
        className="bg-sky-800 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition duration-300 hover:bg-sky-700"
        aria-label="Go Back"
      >
        <BsArrowLeft className="text-xl" />
        <span>Back</span>
      </Link>
    </div>
  );
};

export default BackButton;
