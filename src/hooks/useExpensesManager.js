import { useState, useMemo, useCallback, useEffect } from "react";
import { toast } from "react-toastify";

const useExpensesManager = (initialBudget = 1000) => {
  // Load budget from local storage or fallback to initialBudget
  const [budget, setBudget] = useState(() => {
    const savedBudget = localStorage.getItem("budget");
    return savedBudget ? parseFloat(savedBudget) : initialBudget;
  });

  // Load expenses from local storage or initialize as an empty array
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");

  // Persist budget changes to local storage
  useEffect(() => {
    localStorage.setItem("budget", budget);
  }, [budget]);

  // Add expense logic with budget check
  const addExpense = useCallback(
    (name, category, amount) => {
      toast.dismiss();
      const parsedAmount = parseFloat(amount);

      if (
        parsedAmount + expenses.reduce((total, e) => total + e.amount, 0) >
        budget
      ) {
        toast.error("Expense exceeds the budget. Cannot add expense.");
        return;
      }

      setExpenses((prev) => {
        const newExpenses = [
          ...prev,
          { id: Date.now(), name, category, amount: parsedAmount },
        ];
        localStorage.setItem("expenses", JSON.stringify(newExpenses));
        return newExpenses;
      });

      toast.success("Expense added successfully!");
    },
    [budget, expenses]
  );

  // Update expense logic with budget check
  const updateExpense = useCallback(
    (id, updatedName, updatedCategory, updatedAmount) => {
      toast.dismiss();
      const parsedUpdatedAmount = parseFloat(updatedAmount);

      const otherExpensesTotal = expenses
        .filter((expense) => expense.id !== id)
        .reduce((total, expense) => total + expense.amount, 0);

      if (otherExpensesTotal + parsedUpdatedAmount > budget) {
        toast.error(
          "Updated expense exceeds the budget. Cannot update expense."
        );
        return;
      }

      setExpenses((prev) => {
        const updatedExpenses = prev.map((expense) =>
          expense.id === id
            ? {
                ...expense,
                name: updatedName,
                category: updatedCategory,
                amount: parsedUpdatedAmount,
              }
            : expense
        );
        localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
        return updatedExpenses;
      });

      toast.success("Expense updated successfully!");
    },
    [budget, expenses]
  );

  // Delete expense logic
  const deleteExpense = useCallback((id) => {
    toast.dismiss();
    setExpenses((prev) => {
      const updatedExpenses = prev.filter((expense) => expense.id !== id);
      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
      return updatedExpenses;
    });
    toast.success("Expense deleted successfully!");
  }, []);

  // Filtered expenses
  const filterExpenses = useMemo(() => {
    return expenses
      .filter(
        (expense) =>
          expense.name &&
          typeof expense.name === "string" &&
          expense.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((expense) =>
        filter === "All" ? true : expense.category === filter
      );
  }, [expenses, filter, searchQuery]);

  // Calculate total expenses
  const totalExpeneses = useMemo(() => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  }, [expenses]);

  useEffect(() => {
    if (totalExpeneses > budget) {
      toast.dismiss();
      toast.error("You have exceeded your budget.");
    }
  }, [totalExpeneses, budget]);

  return {
    budget,
    setBudget, // This updates the budget and persists to local storage
    searchQuery,
    setSearchQuery,
    filter,
    setFilter,
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    filterExpenses,
    totalExpeneses,
  };
};

export default useExpensesManager;
