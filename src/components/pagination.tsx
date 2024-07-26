import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => (
  <nav aria-label="Page navigation">
    <ul className="pagination justify-content-center mt-4">
      {[...Array(totalPages)].map((_, index) => (
        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(index + 1)}>
            {index + 1}
          </button>
        </li>
      ))}
    </ul>
  </nav>
);

export default Pagination;
