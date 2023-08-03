// mockLocalStorage.js

// Define the mock object for localStorage
const mockLocalStorage = {
    data: {},
    getItem: function(key) {
      return this.data[key];
    },
    setItem: function(key, value) {
      this.data[key] = value;
    },
    // Add other localStorage methods if needed
  };
  
  // Export the mock object so that it can be used in other files
  export default mockLocalStorage;
  