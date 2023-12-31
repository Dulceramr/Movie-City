import React from 'react';
import "./Pagination.css";
import { PaginationProps } from "../../types/types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {

  // Función para generar el rango de páginas a mostrar
  const generatePageNumbers = () => {
    const numbers = [];

    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) {
        numbers.push(i);
      }
      return numbers;
    }

    let start = currentPage - 5; // Empezamos 5 páginas antes de la actual
    let end = currentPage + 4;   // Terminamos 4 páginas después de la actual

    // Ajustes para asegurarnos que no nos salimos del rango de páginas disponibles
    if (start < 1) {
      end -= (start - 1);
      start = 1;
    }

    if (end > totalPages) {
      start -= (end - totalPages);
      end = totalPages;
    }

    for (let i = start; i <= end; i++) {
      numbers.push(i);
    }

    return numbers;
  };

  const pageNumbers = generatePageNumbers();

  const handlePageChange = (page:number) => {
    onPageChange(page);
    window.scroll(0,625);
  };

  return (
    <div className='pagination-container'>
      {currentPage > 1 && <button className="large-button" onClick={() => handlePageChange(currentPage - 1)}>
      <FontAwesomeIcon icon={faCaretLeft} />
        </button>}
      
      {pageNumbers.map(number => (
        <button 
          key={number}
          onClick={() => handlePageChange(number)}
          className={number === currentPage ? 'button-current-page' : 'button'}
          >
          {number}
        </button>
      ))}

      {currentPage < totalPages && <button className="large-button" 
      onClick={() => handlePageChange(currentPage + 1)}>
        <FontAwesomeIcon icon={faCaretRight} />
        </button>}
    </div>
  );
};

export default Pagination;