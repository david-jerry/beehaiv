// Helper function to get the current date in YYYY-MM-DD format
export const getCurrentDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0]; // Format the date to YYYY-MM-DD
};

export const oneDay = 24 * 60 * 60 * 1000;
