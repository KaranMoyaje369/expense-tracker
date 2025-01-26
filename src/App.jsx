import React, { useEffect, useState } from "react";
import ExpenseList from "./components/ExpenseList";
import ExpenseSummary from "./components/ExpenseSummary";
import useExpensesManger from "./hooks/useExpensesManager";
import useDebounce from "./hooks/useDebounce";
import { FaHandPointRight } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import AddExpense from "./components/AddExpense";
import { ToastContainer } from "react-toastify";

const App = () => {
  const [error, setError] = useState("");

  // custom hook
  let {
    budget,
    setBudget,
    addExpense,
    totalExpeneses,
    filterExpenses,
    setFilter,
    setSearchQuery,
    updateExpense,
    deleteExpense,
  } = useExpensesManger();

  const handleBudgetChange = (e) => {
    const value = e.target.value;
    // Validate the input (ensure it is a number and greater than 0)
    if (parseFloat(value) <= 0) {
      setError("Please enter a valid amount greater than zero.");
    } else {
      setError(""); // Clear the error message
      setBudget(parseFloat(value)); // Update the budget in the manager
    }
  };

  // state to hold the Search Tearm
  const [searchTerm, setSearchTerm] = useState("");
  let searchDebounce = useDebounce(searchTerm, 300);

  // useEffect Hooks To handle The SideEffects
  useEffect(() => {
    setSearchQuery(searchDebounce);
  }, [searchDebounce, setSearchQuery]);

  return (
    <>
      <div className="flex justify-around items-center bg-white shadow-md  tracking-widest uppercase py-3 px-4 mb-5 ">
        <div>
          <h1 className="text-xl md:text-3xl font-bold  text-blue-700">
            Expense Tracker
          </h1>
        </div>
        <div>
          <AddExpense
            addExpense={addExpense}
            budget={budget}
            totalExpeneses={totalExpeneses}
          />
        </div>
      </div>

      <div className="p-5 tracking-wider">
        <div className=" bg-white shadow-md p-2 mb-5">
          <div className="flex flex-col md:flex-row gap-8 justify-around items-center">
            {/* search and filter functionality */}
            <div className="flex flex-col md:flex-row items-center gap-4 p-2">
              <div className="border border-blue-700  flex justify-center items-center p-2">
                <input
                  type="text"
                  id="search"
                  className="border-none outline-none"
                  placeholder="search.."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <label htmlFor="search">
                  <FaSearch className="text-blue-700" />
                </label>
              </div>

              <div className="border border-blue-700 p-2">
                <select onChange={(e) => setFilter(e.target.value)}>
                  <option value="All">All</option>
                  <option value="Food">Food</option>
                  <option value="Entertainment">Entertainment </option>
                  <option value="Travel">Travel</option>
                  <option value="Hospital">Hospital</option>
                  <option value="other">other</option>
                </select>
              </div>
            </div>

            {/* budget input start */}
            <div className="space-y-5">
              <input
                type="text"
                className="border border-blue-700 outline-none py-2 px-4 w-full rounded-full"
                placeholder="Enter Your Budget"
                id="budget"
                onChange={handleBudgetChange}
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="flex justify-center items-center gap-8">
                <h2 className=" text-xl font-bold text-blue-700">
                  Your Current Budget
                </h2>
                <div className="flex items-center text-3xl gap-4">
                  <FaHandPointRight className="text-orange-500" />
                  <p className="text-blue-900"> {budget}</p>
                </div>
              </div>
            </div>
            {/* budget input end */}
          </div>
        </div>

        <div className="bg-white shadow-md p-5">
          <div className="space-y-5">
            <ExpenseSummary totalExpeneses={totalExpeneses} budget={budget} />
            <ExpenseList
              expenses={filterExpenses}
              updateExpense={updateExpense}
              deleteExpense={deleteExpense}
            />
          </div>
        </div>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={true}
          theme="light"
        />
      </div>
    </>
  );
};

export default App;
