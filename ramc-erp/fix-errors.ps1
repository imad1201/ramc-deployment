# Set the path for the project
$projectPath = "C:\Users\imad\OneDrive\Desktop\RAMC-Deployment\ramc-erp"

# Define the regular expression for async syntax fix (incorrect usage of async)
$asyncRegex = 'beforeEach\s*\(\s*async\s*\{'
$asyncReplace = 'beforeEach(async () => {'

# Define the regular expression for import path fix
$importRegex = "import\s*{\s*([a-zA-Z0-9, ]+)\s*}\s*from\s*'(\.\./entities/.+?)'"
$importReplace = "import {`$1} from '$projectPath/src/entities/`$2"

# Get all the test files (assuming they are in 'src' folder)
$testFiles = Get-ChildItem -Path $projectPath -Recurse -Filter *.spec.ts

# Loop through all the test files and apply fixes
foreach ($file in $testFiles) {
    # Read the content of the file
    $content = Get-Content $file.FullName

    # Fix async syntax by replacing the incorrect usage of `async {`
    $content = $content -replace $asyncRegex, $asyncReplace

    # Fix the import paths
    $content = $content -replace $importRegex, {
        param ($matches)
        # Adjust the import paths for entities (assuming src/entities)
        return "import { $($matches.Groups[1].Value) } from '$projectPath/src/entities/$($matches.Groups[2].Value)'"
    }

    # Save the fixed content back into the file
    Set-Content -Path $file.FullName -Value $content
}

Write-Host "All fixes applied successfully!"
