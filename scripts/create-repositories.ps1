# Define the directory path for the repositories
$repositoriesDir = "C:\Users\imad\OneDrive\Desktop\RAMC-Deployment\ramc-erp\src\hrms\repositories"

# Create the directory if it doesn't exist
if (-not (Test-Path -Path $repositoriesDir)) {
    New-Item -Path $repositoriesDir -ItemType Directory
    Write-Host "Repositories directory created at $repositoriesDir"
}

# List of repository files to be created
$repositoryFiles = @(
    "attendance.repository.ts",
    "employee.repository.ts",
    "leave-request.repository.ts",
    "payroll.repository.ts"
)

# Create placeholder repository files
foreach ($file in $repositoryFiles) {
    $filePath = Join-Path -Path $repositoriesDir -ChildPath $file

    # Check if file already exists
    if (-not (Test-Path -Path $filePath)) {
        # Create the file with basic repository structure
        $content = @"
import { EntityRepository, Repository } from 'typeorm';
import { Employee } from '../entities/employee.entity';  # Adjust entity imports accordingly

@EntityRepository(Employee)
export class EmployeeRepository extends Repository<Employee> {
    // Add custom queries here if needed
}
"@

        # Write the content to the file
        Set-Content -Path $filePath -Value $content
        Write-Host "Created repository file: $filePath"
    }
    else {
        Write-Host "File $filePath already exists."
    }
}

Write-Host "Repositories setup completed."
