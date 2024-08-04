import {
  FaChevronLeft,
  FaChevronRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from 'react-icons/fa';
import css from './Pagination.module.scss';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}
const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  return (
    <div className={css.pagination}>
      <button
        type="button"
        className={css.pageButton}
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        <FaAngleDoubleLeft />
      </button>
      <button
        type="button"
        className={css.pageButton}
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        <FaChevronLeft />
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          type="button"
          key={index + 1}
          className={`${css.pageButton} ${
            index + 1 === currentPage ? css.active : ''
          }`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        type="button"
        className={css.pageButton}
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        <FaChevronRight />
      </button>
      <button
        type="button"
        className={css.pageButton}
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        <FaAngleDoubleRight />
      </button>
    </div>
  );
};

export default Pagination;
