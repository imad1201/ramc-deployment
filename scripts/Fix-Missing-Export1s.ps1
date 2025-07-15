# Define the source directory of your project
$sourceDirectory = "C:\Users\imad\OneDrive\Desktop\RAMC-Deployment\ramc-erp"

# Step 1: Update tsconfig.json to include ES2015 and lib definitions
$tsconfigPath = "$sourceDirectory\tsconfig.json"

if (Test-Path $tsconfigPath) {
    $tsconfigContent = Get-Content $tsconfigPath -Raw

    # Update tsconfig.json if necessary
    if ($tsconfigContent -notmatch '"lib": \["es2015", "dom"\]') {
        $tsconfigContent = $tsconfigContent -replace '"lib": \[.*\]', '"lib": ["es2015", "dom"]'
        Set-Content -Path $tsconfigPath -Value $tsconfigContent
        Write-Host "Updated tsconfig.json to include ES2015 and lib."
    }
} else {
    Write-Host "tsconfig.json not found."
}

# Step 2: Fix Duplicate Imports (Injectable, Controller)
$tsFiles = Get-ChildItem -Path $sourceDirectory -Recurse -Filter "*.ts"

foreach ($file in $tsFiles) {
    $content = Get-Content $file.FullName -Raw

    # Remove duplicate imports (Injectable, Controller)
    $content = $content -replace "(import {.*} from '@nestjs/common';\s*){2,}", '$1'

    # Ensure correct import of 'Promise' and async functions
    if ($content -match "async .*\(") {
        $content = $content -replace "async (.*\()", "async $1(): Promise<any> {"
        Write-Host "Updated async function return types in $($file.FullName)"
    }

    # Fix common missing imports like Attendance, Employee, Payroll, LeaveRequest
    $missingImports = @("Attendance", "Employee", "Payroll", "LeaveRequest")
    foreach ($import in $missingImports) {
        if ($content -notmatch "import { $import }") {
            $content = "import { $import } from '../entities/$import.entity';" + "`r`n" + $content
            Write-Host "Added missing import for $import in $($file.FullName)"
        }
    }

    Set-Content -Path $file.FullName -Value $content
    Write-Host "Fixed issues in $($file.FullName)"
}

# Step 3: Fix Import Paths (relative path for entities and other modules)
foreach ($file in $tsFiles) {
    $content = Get-Content $file.FullName -Raw

    # Ensure correct import paths for entities (relative path)
    $content = $content -replace "import { (Attendance|Employee|Payroll|LeaveRequest) } from '\.\./entities/.*';", "import { $1 } from '../entities/$1.entity';"

    Set-Content -Path $file.FullName -Value $content
    Write-Host "Fixed import paths in $($file.FullName)"
}

# Step 4: Remove duplicate identifiers (Injectable, Controller) from the same file
foreach ($file in $tsFiles) {
    $content = Get-Content $file.FullName -Raw

    # Remove duplicate 'Injectable' or 'Controller' identifiers in the same file
    $content = $content -replace "(class|interface|enum) (Injectable|Controller)(.*)\s*\2", '$1 $2$3'

    Set-Content -Path $file.FullName -Value $content
    Write-Host "Removed duplicate identifiers in $($file.FullName)"
}

Write-Host "PowerShell script completed. Please run 'npx tsc' to check for any remaining issues."
