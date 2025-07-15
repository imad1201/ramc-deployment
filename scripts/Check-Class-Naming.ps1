# Define the path to the src directory
$sourceDirectory = "C:\Users\imad\OneDrive\Desktop\RAMC-Deployment"

# Function to check TypeScript files for missing class names
function Check-Classes {
    # Get all TypeScript files recursively
    $tsFiles = Get-ChildItem -Path $sourceDirectory -Recurse -Filter "*.ts"

    # Loop through each file
    foreach ($file in $tsFiles) {
        # Read the file content
        $content = Get-Content $file.FullName

        # Check for class declarations without names
        $pattern = 'export\s+class\s+[\s\S]*\{'
        if ($content -match $pattern) {
            # Match found, check if there is no class name
            $classesWithoutName = Select-String -InputObject $content -Pattern 'export\s+class\s+[\s\S]*\{'
            
            foreach ($match in $classesWithoutName) {
                # Check if class has no name (missing class name check)
                if ($match.Line -match 'export\s+class\s+[\s\S]*\{') {
                    Write-Host "Missing class name in file: $($file.FullName)"
                    # Suggest the correct naming structure
                    Write-Host "Adding class name to the file: $($file.FullName)"
                    
                    # Add a generic name if missing (you can refine this to add specific names if needed)
                    $newContent = $content -replace 'export\s+class\s+\s*\{', 'export class ClassName {'
                    
                    # Write the new content back to the file
                    Set-Content -Path $file.FullName -Value $newContent
                    Write-Host "Class name added in file: $($file.FullName)"
                }
            }
        }
    }
}

# Run the check function
Check-Classes

Write-Host "Class name check and fixes complete."
