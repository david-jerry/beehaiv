// Helper function to get the current date in YYYY-MM-DD format
export const getCurrentDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0]; // Format the date to YYYY-MM-DD
};

export const oneDay = 24 * 60 * 60 * 1000;

export const baseUrl = "https://beehaiv-api.jeremiahedavid.online/api/v1"
export const domain = "https://beehaiv.jeremiahedavid.online"