# Define the path to your project directory
$projectPath = "C:\Users\imad\OneDrive\Desktop\RAMC-Deployment\ramc-erp"

# Define the test files to search through (all .ts files inside the test directories)
$testFiles = Get-ChildItem -Path "$projectPath\src" -Recurse -Filter *.ts

# Define the regular expressions to fix async syntax and missing imports
$asyncRegex = 'beforeEach\s*async\s*{'
$asyncReplace = 'beforeEach(async () => {'

$importRegex = 'import\s*{\s*([a-zA-Z0-9, ]+)\s*}\s*from\s*\'(\.\./entities/.+?)\''
$importReplace = 'import { $1 } from \'' + $projectPath + '/src/entities/$2\''

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
