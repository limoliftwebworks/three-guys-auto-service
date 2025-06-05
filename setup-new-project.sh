#!/bin/bash

# =============================================================================
# NEW PROJECT SETUP SCRIPT
# =============================================================================
# This script COPIES the current project to a new directory and sets it up
# Usage: ./setup-new-project.sh [project-name] [github-username]
# Example: ./setup-new-project.sh my-awesome-site myusername
# =============================================================================

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Function to print colored output
print_step() {
    echo -e "${BLUE}📋 STEP: ${1}${NC}"
}

print_success() {
    echo -e "${GREEN}✅ SUCCESS: ${1}${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  WARNING: ${1}${NC}"
}

print_error() {
    echo -e "${RED}❌ ERROR: ${1}${NC}"
}

print_info() {
    echo -e "${PURPLE}ℹ️  INFO: ${1}${NC}"
}

# Check if required tools are installed
check_requirements() {
    print_step "Checking requirements..."
    
    # Check if gh CLI is installed
    if ! command -v gh &> /dev/null; then
        # Try to find gh in Windows Program Files
        if [ -f "/c/Program Files/GitHub CLI/gh.exe" ]; then
            print_info "Found GitHub CLI in Program Files"
            export PATH="$PATH:/c/Program Files/GitHub CLI"
        elif [ -f "/c/Program Files (x86)/GitHub CLI/gh.exe" ]; then
            print_info "Found GitHub CLI in Program Files (x86)"
            export PATH="$PATH:/c/Program Files (x86)/GitHub CLI"
        else
            print_error "GitHub CLI (gh) is not found in PATH. Please ensure it's installed and try these steps:"
            print_info "1. Close and reopen Git Bash"
            print_info "2. If that doesn't work, add GitHub CLI to your PATH manually"
            print_info "3. Or run this command in PowerShell: winget install GitHub.cli"
            exit 1
        fi
    fi
    
    # Check if gh is authenticated
    if ! gh auth status &> /dev/null; then
        print_error "GitHub CLI is not authenticated. Please run: gh auth login"
        exit 1
    fi
    
    # Check if git is installed
    if ! command -v git &> /dev/null; then
        print_error "Git is not installed. Please install Git first."
        exit 1
    fi
    
    # Check if npm is installed
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install Node.js and npm first."
        exit 1
    fi
    
    print_success "All requirements met!"
}

# Get project name and GitHub username
get_project_info() {
    # Use command line argument or prompt for project name
    if [ -z "$1" ]; then
        echo -e "${YELLOW}Enter the new project name (e.g., my-awesome-website):${NC}"
        read -r PROJECT_NAME
    else
        PROJECT_NAME="$1"
    fi
    
    # Use command line argument or prompt for GitHub username
    if [ -z "$2" ]; then
        echo -e "${YELLOW}Enter your GitHub username:${NC}"
        read -r GITHUB_USERNAME
    else
        GITHUB_USERNAME="$2"
    fi
    
    # Validate inputs
    if [ -z "$PROJECT_NAME" ] || [ -z "$GITHUB_USERNAME" ]; then
        print_error "Project name and GitHub username are required!"
        exit 1
    fi
    
    # Set project directory path
    CURRENT_DIR=$(pwd)
    PARENT_DIR=$(dirname "$CURRENT_DIR")
    PROJECT_DIR="$PARENT_DIR/$PROJECT_NAME"
    
    print_info "Project Name: $PROJECT_NAME"
    print_info "GitHub Username: $GITHUB_USERNAME"
    print_info "Current Directory: $CURRENT_DIR"
    print_info "New Project Directory: $PROJECT_DIR"
}

# Copy current project to new directory
copy_project() {
    print_step "Copying current project to new directory..."
    
    # Check if target directory already exists
    if [ -d "$PROJECT_DIR" ]; then
        print_error "Directory $PROJECT_DIR already exists!"
        echo -e "${YELLOW}Do you want to remove it and continue? (y/N)${NC}"
        read -r REMOVE_CONFIRM
        if [[ $REMOVE_CONFIRM =~ ^[Yy]$ ]]; then
            rm -rf "$PROJECT_DIR"
            print_info "Removed existing directory"
        else
            print_info "Operation cancelled"
            exit 0
        fi
    fi
    
    # Copy everything except .git, node_modules, and some common ignore patterns
    mkdir -p "$PROJECT_DIR"
    
    # Use rsync if available, otherwise use cp
    if command -v rsync &> /dev/null; then
        rsync -av --progress "$CURRENT_DIR/" "$PROJECT_DIR/" \
            --exclude='.git' \
            --exclude='.next' \
            --exclude='dist' \
            --exclude='build'
    else
        # Fallback to cp
        cp -r "$CURRENT_DIR"/* "$PROJECT_DIR/" 2>/dev/null || true
        cp -r "$CURRENT_DIR"/.[^.]* "$PROJECT_DIR/" 2>/dev/null || true
        
        # Remove unwanted directories/files from copy
        [ -d "$PROJECT_DIR/.git" ] && rm -rf "$PROJECT_DIR/.git"
        [ -d "$PROJECT_DIR/.next" ] && rm -rf "$PROJECT_DIR/.next"
    fi
    
    print_success "Project copied to: $PROJECT_DIR"
}

# Update package.json with new project name
update_package_json() {
    print_step "Updating package.json with new project name..."
    
    cd "$PROJECT_DIR"
    
    if [ -f "package.json" ]; then
        # Update the name field in package.json
        if command -v jq &> /dev/null; then
            # Use jq if available (more reliable)
            jq --arg name "$PROJECT_NAME" '.name = $name' package.json > tmp.json && mv tmp.json package.json
        else
            # Fallback to sed
            if [[ "$OSTYPE" == "darwin"* ]]; then
                # macOS sed
                sed -i '' "s/\"name\": \".*\"/\"name\": \"$PROJECT_NAME\"/" package.json
            else
                # Linux/Windows sed
                sed -i "s/\"name\": \".*\"/\"name\": \"$PROJECT_NAME\"/" package.json
            fi
        fi
        print_success "Updated package.json name to: $PROJECT_NAME"
    else
        print_warning "package.json not found"
    fi
}

# Initialize new git repository
init_new_git() {
    print_step "Initializing new git repository..."
    
    cd "$PROJECT_DIR"
    
    git init
    git add .
    git commit -m "Initial commit: $PROJECT_NAME setup"
    
    print_success "Initialized new git repository with initial commit"
}

# Create GitHub repository
create_github_repo() {
    print_step "Creating GitHub repository..."
    
    cd "$PROJECT_DIR"
    
    # Create the repository on GitHub
    gh repo create "$GITHUB_USERNAME/$PROJECT_NAME" --public --source=. --remote=origin --push
    
    print_success "Created GitHub repository: https://github.com/$GITHUB_USERNAME/$PROJECT_NAME"
}

# Create additional branches
create_branches() {
    print_step "Creating additional branches..."
    
    cd "$PROJECT_DIR"
    
    # Create and push Branch A
    git checkout -b "branch-a"
    git push -u origin branch-a
    print_success "Created and pushed branch-a"
    
    # Create and push Branch B
    git checkout -b "branch-b"
    git push -u origin branch-b
    print_success "Created and pushed branch-b"
    
    # Switch back to main
    git checkout main
    print_success "Switched back to main branch"
    
    print_info "Available branches: main, branch-a, branch-b"
}

# Install dependencies
install_dependencies() {
    print_step "Installing npm dependencies..."
    
    cd "$PROJECT_DIR"
    
    npm install
    
    print_success "Dependencies installed successfully!"
}

# Open Cursor in new window
open_cursor() {
    print_step "Opening Cursor in new editor window..."
    
    # Try different ways to open Cursor
    if command -v cursor &> /dev/null; then
        cursor "$PROJECT_DIR" &
        print_success "Opened Cursor in new window"
    elif command -v code &> /dev/null; then
        code "$PROJECT_DIR" &
        print_success "Opened VS Code in new window (Cursor not found)"
    else
        print_warning "Cursor/VS Code not found in PATH. Please open the project manually."
        print_info "Project location: $PROJECT_DIR"
    fi
}

# Create project structure summary
create_summary() {
    print_step "Creating project summary..."
    
    cd "$PROJECT_DIR"
    
    cat > PROJECT_SETUP_SUMMARY.md << EOF
# Project Setup Summary

## Project Details
- **Project Name**: $PROJECT_NAME
- **GitHub Repository**: https://github.com/$GITHUB_USERNAME/$PROJECT_NAME
- **Setup Date**: $(date)
- **Project Location**: $PROJECT_DIR

## Branches Created
- \`main\` (default branch)
- \`branch-a\` 
- \`branch-b\`

## What Was Done
1. ✅ Copied project from: $CURRENT_DIR
2. ✅ Updated project name in package.json
3. ✅ Initialized new git repository
4. ✅ Created GitHub repository
5. ✅ Created additional branches (branch-a, branch-b)
6. ✅ Installed npm dependencies
7. ✅ Opened project in Cursor/VS Code

## Quick Commands
\`\`\`bash
# Navigate to project
cd "$PROJECT_DIR"

# Switch between branches
git checkout main
git checkout branch-a
git checkout branch-b

# Push changes
git add .
git commit -m "Your commit message"
git push

# Install dependencies (if needed)
npm install

# Start development server
npm run dev
\`\`\`

## GitHub Repository
Your project is now available at:
https://github.com/$GITHUB_USERNAME/$PROJECT_NAME

## Original Project
Your original project remains untouched at:
$CURRENT_DIR

Happy coding! 🚀
EOF

    print_success "Created PROJECT_SETUP_SUMMARY.md with project details"
}

# Main execution function
main() {
    echo -e "${PURPLE}"
    echo "=============================================="
    echo "🚀 NEW PROJECT SETUP AUTOMATION SCRIPT 🚀"
    echo "=============================================="
    echo -e "${NC}"
    
    # Check if we're in a valid project directory
    if [ ! -f "package.json" ]; then
        print_error "No package.json found. Please run this script in a valid Node.js project directory."
        exit 1
    fi
    
    # Get project information
    get_project_info "$1" "$2"
    
    # Confirm before proceeding
    echo -e "${YELLOW}"
    echo "⚠️  This will:"
    echo "   - COPY current project to: $PROJECT_DIR"
    echo "   - Rename copied project to: $PROJECT_NAME"
    echo "   - Create new GitHub repo: $GITHUB_USERNAME/$PROJECT_NAME"
    echo "   - Create branches: main, branch-a, branch-b"
    echo "   - Install dependencies and open Cursor"
    echo ""
    echo "🔒 Your ORIGINAL project will remain UNTOUCHED!"
    echo ""
    echo "Do you want to continue? (y/N)"
    echo -e "${NC}"
    
    read -r CONFIRM
    if [[ ! $CONFIRM =~ ^[Yy]$ ]]; then
        print_info "Operation cancelled by user"
        exit 0
    fi
    
    # Execute all steps
    check_requirements
    copy_project
    update_package_json
    init_new_git
    create_github_repo
    create_branches
    install_dependencies
    open_cursor
    create_summary
    
    echo -e "${GREEN}"
    echo "=============================================="
    echo "🎉 PROJECT SETUP COMPLETED SUCCESSFULLY! 🎉"
    echo "=============================================="
    echo -e "${NC}"
    
    print_info "Original Project: $CURRENT_DIR (UNTOUCHED)"
    print_info "New Project: $PROJECT_DIR"
    print_info "GitHub: https://github.com/$GITHUB_USERNAME/$PROJECT_NAME"
    print_info "Summary: Check PROJECT_SETUP_SUMMARY.md in new project"
    
    echo -e "${BLUE}Next steps:${NC}"
    echo "1. Navigate to project: cd \"$PROJECT_DIR\""
    echo "2. Start development: npm run dev"
    echo "3. Make changes and commit: git add . && git commit -m 'Your message'"
    echo "4. Push changes: git push"
}

# Run the main function with all arguments
main "$@" 