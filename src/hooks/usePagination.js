import { useState, useEffect } from 'react';

export const usePagination = (itemList, itemQuantityPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(itemList.length / itemQuantityPerPage);

  const lowerLimit = (currentPage - 1) * itemQuantityPerPage;
  const upperLimit = currentPage * itemQuantityPerPage - 1;

  const listSlice = itemList.slice(lowerLimit, upperLimit + 1);

  const nextPage = () => {
    const newPage = currentPage + 1;
    if (newPage <= totalPages) setCurrentPage(newPage);
  };

  const previousPage = () => {
    const newPage = currentPage - 1;
    if (newPage >= 1) setCurrentPage(newPage);
  };

  const changePageTo = (newPage) => {
    if (newPage < 1) setCurrentPage(1);
    else if (newPage > totalPages) setCurrentPage(totalPages);
    else setCurrentPage(newPage);
  };

  let startPage = Math.max(currentPage - 3, 1);
  let endPage = Math.min(currentPage + 3, totalPages);

  if (endPage - startPage < 6) {
    if (currentPage < 4) {
      endPage = Math.min(startPage + 6, totalPages);
    } else {
      startPage = Math.max(endPage - 6, 1);
    }
  }

  const pages = Array(endPage - startPage + 1)
    .fill()
    .map((_, i) => startPage + i);

  useEffect(() => {
    changePageTo(currentPage);
  }, [itemList, itemQuantityPerPage]);

  return {
    currentPage,
    listSlice,
    pages,
    nextPage,
    previousPage,
    changePageTo,
    hasNextPage: currentPage < totalPages,
  };
};
