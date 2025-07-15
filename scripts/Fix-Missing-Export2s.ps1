$sourceDirectory = "C:\Users\imad\OneDrive\Desktop\RAMC-Deployment\ramc-erp"

# Fix async return types and duplicate imports
$tsFiles = Get-ChildItem -Path $sourceDirectory -Recurse -Filter "*.ts"

foreach ($file in $tsFiles) {
    $content = Get-Content $file.FullName -Raw

    # Fix missing return types for async functions
    $content = $content -replace "(async .*\()([^{]*)(\{)", "async ${1}${2}: Promise<any> {"

    # Ensure correct import of 'Promise'
    if ($content -match "async .*\(") {
        $content = $content -replace "async (.*\()", "async ${1}(): Promise<any> {"
    }

    # Remove duplicate imports (Injectable, Controller, etc.)
    $content = $content -replace "(import {.*} from '@nestjs/common';\s*){2,}", '$1'

    # Ensure correct imports for entities (Attendance, Employee, Payroll, LeaveRequest)
    $missingImports = @("Attendance", "Employee", "Payroll", "LeaveRequest")
    foreach ($import in $missingImports) {
        if ($content -notmatch "import { $import }") {
            $content = "import { $import } from '../entities/$import.entity';" + "`r`n" + $content
            Write-Host "Added missing import for $import in $($file.FullName)"
        }
    }

    # Fix entity import paths
    $content = $content -replace "import { (Attendance|Employee|Payroll|LeaveRequest) } from '\.\./entities/.*';", "import { $1 } from '../entities/$1.entity';"

    # Remove duplicate identifiers in the same file (Injectable, Controller)
    $content = $content -replace "(class|interface|enum) (Injectable|Controller)(.*)\s*\2", '${1} $2$3'

    Set-Content -Path $file.FullName -Value $content
    Write-Host "Fixed issues in $($file.FullName)"
}

Write-Host "Fixing process complete. Please try running 'npx tsc --noEmit' again to check for errors."
