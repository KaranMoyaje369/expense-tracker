import React, { useState } from "react";
import ExpenseInput from "./ExpenseInput";
import { IoCloseCircle } from "react-icons/io5";

const AddExpense = ({ addExpense, budget, totalExpenses }) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div>
      <button
        className="border bg-blue-700 text-white rounded-full py-2 px-4 font-bold "
        onClick={togglePopup}
      >
        Add Expense
      </button>

      {/* Popup without background */}
      <div
        className={`${
          showPopup ? "opacity-100" : "opacity-0 pointer-events-none"
        } transition-opacity duration-300 ease-in-out fixed inset-0 flex justify-center items-center z-50`}
      >
        <div className="bg-white shadow-lg m-5 p-6 py-10 rounded-md  relative">
          <ExpenseInput
            addExpense={addExpense}
            budget={budget}
            totalExpenses={totalExpenses}
          />
          <IoCloseCircle
            onClick={togglePopup}
            className="absolute top-2 right-2 text-2xl cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
