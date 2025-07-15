# Set the base path to the source and test directories
$srcDirectory = "C:\Users\imad\OneDrive\Desktop\RAMC-Deployment\ramc-erp\src"
$testDirectory = "C:\Users\imad\OneDrive\Desktop\RAMC-Deployment\ramc-erp\test"

# Define the function to create test files
function Create-TestFileIfNeeded {
    param (
        [string]$sourceFile,
        [string]$testDirectory
    )

    # Get the relative path of the source file
    $relativePath = $sourceFile.Substring($srcDirectory.Length)
    
    # Build the test file path (same relative path but in the test directory)
    $testFilePath = Join-Path $testDirectory $relativePath
    $testFilePath = [System.IO.Path]::ChangeExtension($testFilePath, ".spec.ts")
    
    # Check if the test file exists
    if (-Not (Test-Path $testFilePath)) {
        # Create the directory if it doesn't exist
        $testFileDir = [System.IO.Path]::GetDirectoryName($testFilePath)
        if (-Not (Test-Path $testFileDir)) {
            New-Item -ItemType Directory -Force -Path $testFileDir
        }

        # Create the test file with a basic template
        $testFileContent = @"
import { $($sourceFile.Split('\')[-1].Split('.')[0]) } from '../../src/$($relativePath)';

describe('$($sourceFile.Split('\')[-1])', () => {
  it('should be tested properly', () => {
    expect($($sourceFile.Split('\')[-1].Split('.')[0])).toBeDefined();
  });
});
"@

        # Write the template to the test file
        Set-Content -Path $testFilePath -Value $testFileContent

        Write-Host "Test file created: $testFilePath"
    } else {
        Write-Host "Test file already exists: $testFilePath"
    }
}

# Get all .ts files from the source directory and iterate over them
$sourceFiles = Get-ChildItem -Path $srcDirectory -Recurse -Filter *.ts

# Loop through each source file and create corresponding test files if needed
foreach ($sourceFile in $sourceFiles) {
    Create-TestFileIfNeeded -sourceFile $sourceFile.FullName -testDirectory $testDirectory
}

Write-Host "Test file creation process completed."
