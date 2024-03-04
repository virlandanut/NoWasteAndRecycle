export const getUtilizatori = async () => {
  try {
    const response = await fetch(process.env.API_BASE + "/api/utilizatori");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};