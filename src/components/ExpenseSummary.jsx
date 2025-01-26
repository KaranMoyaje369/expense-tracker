import React from "react";

const ExpenseSummary = ({ totalExpeneses, budget }) => {
  let remainingAmount = budget - totalExpeneses;

  return (
    <div className="tracking-widest">
      <h3 className="text-2xl font-bold mb-2 uppercase text-blue-700">
        Summary
      </h3>
      <div className="flex flex-col justify-center gap-2 font-semibold uppercase">
        <div className="flex flex-col justify-between md:flex-row gap-1 text-xl ">
          <p className="text-blue-700">Total Expenses:</p>
          <p className="text-blue-700">{totalExpeneses.toFixed(2)}</p>
        </div>
        <div className="flex flex-col justify-between md:flex-row gap-1 text-xl">
          <p className="text-blue-700">Remaining Budget:</p>
          <p className="text-blue-700">{remainingAmount.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default ExpenseSummary;
