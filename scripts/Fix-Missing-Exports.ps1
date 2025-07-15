# Path to your project directory
$sourceDirectory = "C:\Users\imad\OneDrive\Desktop\RAMC-Deployment\ramc-erp"

# File extensions to search for
$fileExtensions = "*.ts"

# Search for all TypeScript files in the project directory
$tsFiles = Get-ChildItem -Path $projectDirectory -Recurse -Filter $fileExtensions

# Define pattern to detect classes without 'export' keyword
$classPattern = 'class\s+([a-zA-Z0-9_]+)\s+{'

# Iterate through all TypeScript files
foreach ($file in $tsFiles) {
    # Skip files that are not in the 'entities' folder
    if ($file.FullName -match "entities") {
        
        # Read the content of the file
        $fileContent = Get-Content $file.FullName

        # Find all classes in the file that are missing the 'export' keyword
        $classes = [regex]::Matches($fileContent, $classPattern)
        
        # Add the 'export' keyword before the class definition if it's missing
        foreach ($match in $classes) {
            $className = $match.Groups[1].Value
            $exportPattern = "class $className"
            
            # If the class does not already have the export keyword, add it
            if ($fileContent -notmatch "export\s+class\s+$className") {
                $fileContent = $fileContent -replace $exportPattern, "export $exportPattern"
            }
        }

        # Save the updated file content back
        Set-Content -Path $file.FullName -Value $fileContent
    }
}

Write-Host "Missing export keywords have been added to all relevant classes in the entities folder."
