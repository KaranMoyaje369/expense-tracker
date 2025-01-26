import React, { useState } from "react";

const EditExpense = ({ expense, updateExpense, setEditMode }) => {
  const [editAmount, setEditAmount] = useState(expense.amount);
  const [editName, setEditName] = useState(expense.name);
  const [editCategory, setEditCategory] = useState(expense.category);

  const handleUpdate = () => {
    if (!editName || !editAmount) {
      alert("Please fill all fields");
      return;
    }
    updateExpense(expense.id, editName, editCategory, editAmount);
    setEditMode(false); // Close the edit popup
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Edit Expense</h2>
        <div>
          <label className="block mb-2">Expense Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded mb-4"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-2">Category</label>
          <select
            className="w-full p-2 border rounded mb-4"
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value)}
          >
            <option value="Food">Food</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Travel">Travel</option>
            <option value="Hospital">Hospital</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block mb-2">Amount</label>
          <input
            type="number"
            className="w-full p-2 border rounded mb-4"
            value={editAmount}
            onChange={(e) => setEditAmount(e.target.value)}
          />
        </div>
        <div className="flex justify-between">
          <button
            className="bg-red-500 text-white p-2 rounded"
            onClick={() => setEditMode(false)}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white p-2 rounded"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditExpense;
