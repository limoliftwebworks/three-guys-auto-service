# 🚀 Project Setup Automation Instructions

## For Non-Coding Team Members

This script automates the entire project setup process so you don't have to worry about technical details!

## ⚠️ IMPORTANT: One-Time Setup Required

Before using this script for the first time, you need to install and set up GitHub CLI:

### 1. Install GitHub CLI

- **Windows**: Download from https://cli.github.com/ or run: `winget install GitHub.cli`
- **Mac**: Run: `brew install gh`
- **Linux**: Run: `sudo apt install gh` or `sudo yum install gh`

### 2. Authenticate with GitHub

Run this command and follow the prompts:

```bash
gh auth login
```

Choose:

- GitHub.com
- HTTPS
- Yes (authenticate Git with GitHub credentials)
- Login with a web browser

## 🎯 How to Use the Script

### Method 1: Simple Command (Recommended)

```bash
./setup-new-project.sh
```

The script will ask you for:

- Project name (e.g., `awesome-tree-service`)
- Your GitHub username

### Method 2: One-Line Command

```bash
./setup-new-project.sh "my-project-name" "your-github-username"
```

## 📋 What the Script Does Automatically

1. ✅ **Cleans up** - Removes old node_modules and package-lock.json
2. ✅ **Renames project** - Updates the project name everywhere
3. ✅ **Creates new Git repo** - Fresh start with no old history
4. ✅ **Creates GitHub repository** - Automatically creates and connects to GitHub
5. ✅ **Creates branches** - Makes main, branch-a, and branch-b
6. ✅ **Installs dependencies** - Runs npm install automatically
7. ✅ **Opens Cursor** - Opens the project in a new Cursor window
8. ✅ **Creates summary** - Generates a PROJECT_SETUP_SUMMARY.md file

## 🔧 Example Usage

```bash
# Navigate to your existing project folder
cd /path/to/your/current/project

# Run the automation script
./setup-new-project.sh "davis-tree-new-client" "yourusername"
```

## 🎉 After the Script Runs

The script will:

- Create a new GitHub repository
- Open Cursor with your project ready to go
- Generate a summary file with all the details

You can immediately start working by running:

```bash
npm run dev
```

## 🚨 Safety Features

- **Confirmation prompt** - Script asks before making changes
- **Requirements check** - Verifies all tools are installed
- **Error handling** - Stops if something goes wrong
- **Colored output** - Easy to see what's happening

## 📞 Need Help?

If you see any errors:

1. Take a screenshot of the error message
2. Check if GitHub CLI is installed and authenticated
3. Make sure you're in a valid Node.js project folder (has package.json)
4. Contact the development team

## 🔄 Common Commands After Setup

```bash
# Switch branches
git checkout main
git checkout branch-a
git checkout branch-b

# Start development server
npm run dev

# Save your work
git add .
git commit -m "Describe what you changed"
git push
```

## 🛡️ What Gets Backed Up

- Your GitHub repository is automatically created
- All your code is safely stored on GitHub
- Multiple branches are created for different work streams

---

**Remember**: This script is designed to be foolproof for non-technical users. Just run it and follow the prompts! 🎯
