const glob = require('glob');  // Correctly importing glob
const fs = require('fs');
const path = require('path');

// Using glob.sync for synchronous operation
glob("src/**/*.ts", function (err, files) {
    if (err) {
        console.error("Error finding files:", err);
        return;
    }

    if (files.length === 0) {
        console.error('No files found');
        return;
    }

    files.forEach(file => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                console.error("Error reading file:", err);
                return;
            }

            let updatedData = data;

            // Add your error-fixing logic here
            // Example: Fix incorrect type declarations
            updatedData = updatedData.replace(/async\s*\(/g, 'async function (');
            
            // Example: Fix missing semicolons or other issues
            updatedData = updatedData.replace(/someErrorPattern/g, 'fix');  // Adjust this pattern to match your actual errors

            // Write the updated data back to the file
            fs.writeFile(file, updatedData, 'utf8', (err) => {
                if (err) {
                    console.error("Error writing to file:", err);
                } else {
                    console.log(`Fixed file: ${file}`);
                }
            });
        });
    });
});
