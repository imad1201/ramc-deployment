// batchApiCalls.js
const axios = require('axios');
const async = require('async');

// Example API requests with a valid URL
const apiRequests = [
  { url: 'https://jsonplaceholder.typicode.com/todos/1' },
  { url: 'https://jsonplaceholder.typicode.com/todos/2' },
  { url: 'https://jsonplaceholder.typicode.com/todos/3' },
];

// Function to process API requests in batches
function processApiRequests() {
  async.eachLimit(apiRequests, 5, async (request) => {
    try {
      const response = await axios.get(request.url);
      console.log(`Received data from ${request.url}`, response.data);
    } catch (error) {
      console.error(`Error with request to ${request.url}`, error.message);
    }
  }, (err) => {
    if (err) {
      console.error('Error processing API requests:', err);
    } else {
      console.log('All API requests processed.');
    }
  });
}

// Run the batch processing
processApiRequests();
