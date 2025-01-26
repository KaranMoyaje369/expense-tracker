import { useState } from "react";
import { toast } from "react-toastify";
import useExpensesManger from "../hooks/useExpensesManager";

const ExpenseInput = ({ addExpense }) => {
  let { budget, totalExpenses } = useExpensesManger();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");

  // Function to handle adding the expense
  const handleAdd = () => {
    toast.dismiss();
    if (!name || !amount) {
      // Validation: show toast if name or amount is missing
      toast.error("Please enter both name and amount.");
    } else if (totalExpenses + parseFloat(amount) > budget) {
      // Check if the total expense exceeds the budget
      toast.error("Total expenses exceed the budget. Cannot add expense.");
    } else {
      addExpense(name, category, amount);
      setName("");
      setAmount("");
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-5">
      <div className="flex justify-between items-center gap-4">
        <div>
          <input
            type="text"
            className="border border-blue-700 outline-none w-full py-2 px-4"
            placeholder="Enter Expense Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <select
            className="border border-blue-700 py-2 px-4 outline-none w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Food">Food</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Travel">Travel</option>
            <option value="Hospital">Hospital</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="border border-blue-700">
        <input
          type="number"
          className="outline-none w-full p-2"
          placeholder="Enter Expense Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="flex justify-center items-center mt-5 ">
        <button
          className="border w-1/2 p-2 rounded-full bg-blue-700 text-white font-bold"
          onClick={handleAdd}
        >
          ADD
        </button>
      </div>
    </div>
  );
};

export default ExpenseInput;
