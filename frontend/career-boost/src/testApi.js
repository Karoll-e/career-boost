// src/testApi.js
const testApi = async () => {
    try {
      const response = await fetch("https://career-boost.onrender.com/");
      const data = await response.json();
      console.log("Respuesta del backend:", data);
    } catch (error) {
      console.error("Error conectando con backend:", error);
    }
  };
  
  export default testApi;
  