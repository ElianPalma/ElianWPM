import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxVisiblePages = 5;

  const getPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (totalPages > maxVisiblePages && endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      pages.push(renderPageNumber(1));
      if (startPage > 2) {
        pages.push(<span key="start-ellipsis" className="px-2 text-gray-500">…</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(renderPageNumber(i));
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="end-ellipsis" className="px-2 text-gray-500">…</span>);
      }
      pages.push(renderPageNumber(totalPages));
    }

    return pages;
  };

  const baseBtn = 'min-w-[2.75rem] px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 border';

  const renderPageNumber = (number) => (
    <button
      key={number}
      onClick={() => onPageChange(number)}
      aria-label={`Página ${number}`}
      aria-current={currentPage === number ? 'page' : undefined}
      className={`${baseBtn} ${
        currentPage === number
          ? 'border-transparent bg-gradient-to-br from-blue-600 via-violet-600 to-cyan-500 text-white shadow-[0_8px_24px_-8px_rgba(99,102,241,0.8)]'
          : 'border-white/10 bg-white/[0.04] text-gray-300 hover:border-blue-400/60 hover:text-white'
      }`}
    >
      {number}
    </button>
  );

  const navBtn = `${baseBtn} border-white/10 bg-white/[0.04] text-gray-300 hover:border-blue-400/60 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-white/10 disabled:hover:text-gray-300`;

  return (
    <nav className="flex items-center justify-center gap-2 mt-14 flex-wrap" aria-label="Paginación de proyectos">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={navBtn}
      >
        « Anterior
      </button>

      {getPageNumbers()}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={navBtn}
      >
        Siguiente »
      </button>
    </nav>
  );
};

export default Pagination;
