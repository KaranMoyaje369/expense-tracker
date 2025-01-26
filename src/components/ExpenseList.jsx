import React, { useState } from "react";
import EditExpense from "./EditExpense"; // New component for the popup
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const ExpenseList = ({ expenses, updateExpense, deleteExpense }) => {
  const [editMode, setEditMode] = useState(false);
  const [editExpenseData, setEditExpenseData] = useState(null);

  const handleEdit = (expense) => {
    setEditExpenseData(expense); // Save expense data for editing
    setEditMode(true); // Show edit popup
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );
    if (confirmDelete) {
      deleteExpense(id); // Call deleteExpense function from props
    }
  };

  return (
    <div className="w-full h-[200px] overflow-y-auto">
      <table className="w-full border-collapse border border-gray-300 text-left">
        {/* Table Header */}
        <thead className="bg-blue-700 text-white text-center sticky top-0 z-10">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Budget Name</th>
            <th className="border border-gray-300 px-4 py-2">
              Budget Category
            </th>
            <th className="border border-gray-300 px-4 py-2">Budget Price</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td className="border border-gray-300 px-4 py-2">
                {expense.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {expense.category}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {expense.amount.toFixed(2)}
              </td>
              <td className="border border-gray-300 flex flex-col md:flex-row items-center gap-2 justify-center py-2">
                <button
                  className="bg-blue-500 text-white p-2 rounded"
                  onClick={() => handleEdit(expense)} // Open edit popup
                >
                  <FaEdit />
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded"
                  onClick={() => handleDelete(expense.id)} // Trigger delete
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Expense Popup */}
      {editMode && (
        <EditExpense
          expense={editExpenseData}
          updateExpense={updateExpense}
          setEditMode={setEditMode}
        />
      )}
    </div>
  );
};

export default ExpenseList;
