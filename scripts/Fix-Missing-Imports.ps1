# PowerShell Script to Verify and Fix Missing Imports

# Directory where the project files are located
$projectDir = "C:\Users\imad\OneDrive\Desktop\RAMC-Deployment\ramc-erp"

# List of files that should have specific imports
$requiredImports = @(
    "Injectable",
    "InjectRepository",
    "Controller",
    "CreateAttendanceDto",
    "UpdateAttendanceDto",
    "Attendance",
    "Employee",
    "Payroll",
    "LeaveRequest"
)

# Iterate over the .ts files and check for missing imports
$tsFiles = Get-ChildItem -Path $projectDir -Recurse -Filter "*.ts"

foreach ($file in $tsFiles) {
    $content = Get-Content $file.FullName
    $missingImports = $requiredImports | Where-Object { $content -notcontains $_ }

    if ($missingImports) {
        Write-Host "Missing imports in $($file.Name):"
        $missingImports | ForEach-Object { Write-Host " - $_" }
        
        # Fix for missing imports (this part can be adjusted as per need)
        if ($missingImports -contains "Injectable") {
            Add-Content -Path $file.FullName -Value "`nimport { Injectable } from '@nestjs/common';"
        }
        if ($missingImports -contains "InjectRepository") {
            Add-Content -Path $file.FullName -Value "`nimport { InjectRepository } from '@nestjs/typeorm';"
        }
        if ($missingImports -contains "Controller") {
            Add-Content -Path $file.FullName -Value "`nimport { Controller } from '@nestjs/common';"
        }
        if ($missingImports -contains "Attendance") {
            Add-Content -Path $file.FullName -Value "`nimport { Attendance } from '../entities/attendance.entity';"
        }
        if ($missingImports -contains "Employee") {
            Add-Content -Path $file.FullName -Value "`nimport { Employee } from '../entities/employee.entity';"
        }
        if ($missingImports -contains "Payroll") {
            Add-Content -Path $file.FullName -Value "`nimport { Payroll } from '../entities/payroll.entity';"
        }
        if ($missingImports -contains "LeaveRequest") {
            Add-Content -Path $file.FullName -Value "`nimport { LeaveRequest } from '../entities/leave-request.entity';"
        }
    }
}

Write-Host "Import Fixing Process Completed"
