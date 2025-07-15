// Simulate a large array of data
const largeArray = new Array(1000000).fill('data');  // Array with 1,000,000 items
const chunkSize = 10000;  // Process in chunks of 10,000 elements

// Function to process each chunk
const processChunks = () => {
  for (let i = 0; i < largeArray.length; i += chunkSize) {
    const chunk = largeArray.slice(i, i + chunkSize);  // Extract a chunk from the array
    // Process the chunk (you can replace this with your logic)
    console.log(`Processing chunk ${i / chunkSize + 1}:`, chunk);
  }
};

// Call the function to start processing
processChunks();
