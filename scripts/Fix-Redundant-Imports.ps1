# Path to your project directory
$projectDirectory  = "C:\Users\imad\OneDrive\Desktop\RAMC-Deployment"

# File extensions to search for
$fileExtensions = "*.ts"

# Search for all TypeScript files in the project
$tsFiles = Get-ChildItem -Path $projectDirectory -Recurse -Filter $fileExtensions

# Define the imports that are frequently duplicated
$redundantImports = @(
    "import { Injectable } from '@nestjs/common';",
    "import { Controller } from '@nestjs/common';",
    "import { InjectRepository } from '@nestjs/typeorm';"
)

# Iterate through all files and process them
foreach ($file in $tsFiles) {
    $fileContent = Get-Content $file.FullName

    # Check for redundant imports and remove them
    foreach ($import in $redundantImports) {
        $fileContent = $fileContent -replace "^\s*$import\s*$", ""
    }

    # Remove duplicate imports (keep only one occurrence)
    $fileContent = $fileContent -replace "import\s{.*}\sfrom\s'@nestjs/common';.*", "import { Injectable, Controller } from '@nestjs/common';"

    # Save the updated content back to the file if changes were made
    Set-Content -Path $file.FullName -Value $fileContent
}

Write-Host "Redundant imports have been removed and files updated."
