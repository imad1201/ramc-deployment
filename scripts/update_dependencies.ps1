# Navigate to your project directory
Set-Location -Path "C:\Users\imad\OneDrive\Desktop\RAMC-Deployment"

# Ensure you are in the right directory
Write-Host "Navigating to the project directory: $PWD"

# Step 1: Update all dependencies
Write-Host "Updating all dependencies..."
npm update

# Step 2: Update any outdated packages and install the latest versions
Write-Host "Checking for outdated packages..."
npm outdated

# Step 3: Update specific packages (optional)
Write-Host "Updating all packages to the latest version..."
npm install -g npm-check-updates
npx npm-check-updates -u  # Automatically updates the version in package.json

# Step 4: Install updated dependencies
Write-Host "Installing updated dependencies..."
npm install

# Step 5: Verify that the packages are up to date
Write-Host "Verifying that all packages are up to date..."
npm outdated
