import { useMemo } from "react";

/**
 * Custom hook to get all transactions.
 * @param {Transaction[]} transactions - The array of transactions.
 * @returns {Transaction[]} - The filtered list of transactions.
 */
export const useAllTransactions = (
  transactions: Transaction[]
): Transaction[] => {
  // Use useMemo to cache the transactions
  const cachedTransactions = useMemo(() => {
    // Simply return the transactions array, optionally you could add filtering logic here.
    return transactions;
  }, [transactions]);

  return cachedTransactions;
};


