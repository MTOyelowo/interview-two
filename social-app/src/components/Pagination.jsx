import React from "react";

const inActivePageStyles =
  "flex items-center justify-center border p-2 w-8 h-8 rounded-md";
const activePageStyles =
  "flex items-center justify-center bg-[#133746] text-white p-2 w-8 h-8 rounded-md";

const Pagination = ({ itemsPerPage, totalItems, paginate, activePage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-6">
      <ul className="flex w-full space-x-3 items-center justify-center">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={
              number === activePage ? activePageStyles : inActivePageStyles
            }
          >
            <button onClick={() => paginate(number)} className="">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
