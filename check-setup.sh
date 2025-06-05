#!/bin/bash

# =============================================================================
# SETUP VERIFICATION SCRIPT
# =============================================================================
# This script checks if all required tools are properly installed and configured
# Usage: ./check-setup.sh
# =============================================================================

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

print_header() {
    echo -e "${BLUE}"
    echo "=============================================="
    echo "🔧 SETUP VERIFICATION SCRIPT"
    echo "=============================================="
    echo -e "${NC}"
}

check_tool() {
    local tool=$1
    local name=$2
    local install_info=$3
    
    if command -v "$tool" &> /dev/null; then
        echo -e "${GREEN}✅ $name is installed${NC}"
        if [ "$tool" = "node" ]; then
            echo -e "   Version: $(node --version)"
        elif [ "$tool" = "npm" ]; then
            echo -e "   Version: $(npm --version)"
        elif [ "$tool" = "git" ]; then
            echo -e "   Version: $(git --version)"
        elif [ "$tool" = "gh" ]; then
            echo -e "   Version: $(gh --version | head -n1)"
        fi
        return 0
    else
        echo -e "${RED}❌ $name is NOT installed${NC}"
        echo -e "${YELLOW}   Install: $install_info${NC}"
        return 1
    fi
}

check_gh_auth() {
    echo -e "${PURPLE}Checking GitHub CLI authentication...${NC}"
    if gh auth status &> /dev/null; then
        echo -e "${GREEN}✅ GitHub CLI is authenticated${NC}"
        echo -e "   User: $(gh api user --jq .login 2>/dev/null || echo 'Unknown')"
        return 0
    else
        echo -e "${RED}❌ GitHub CLI is NOT authenticated${NC}"
        echo -e "${YELLOW}   Run: gh auth login${NC}"
        return 1
    fi
}

check_project_structure() {
    echo -e "${PURPLE}Checking project structure...${NC}"
    if [ -f "package.json" ]; then
        echo -e "${GREEN}✅ package.json found${NC}"
        if command -v jq &> /dev/null; then
            echo -e "   Project: $(jq -r .name package.json 2>/dev/null || echo 'Unknown')"
        fi
        return 0
    else
        echo -e "${RED}❌ package.json NOT found${NC}"
        echo -e "${YELLOW}   This doesn't appear to be a Node.js project directory${NC}"
        return 1
    fi
}

check_cursor() {
    echo -e "${PURPLE}Checking code editor...${NC}"
    if command -v cursor &> /dev/null; then
        echo -e "${GREEN}✅ Cursor is available${NC}"
        return 0
    elif command -v code &> /dev/null; then
        echo -e "${YELLOW}⚠️  VS Code found (Cursor not found)${NC}"
        echo -e "   VS Code will be used instead of Cursor"
        return 0
    else
        echo -e "${RED}❌ Neither Cursor nor VS Code found${NC}"
        echo -e "${YELLOW}   Install Cursor: https://cursor.sh/${NC}"
        return 1
    fi
}

main() {
    print_header
    
    local all_good=true
    
    echo -e "${BLUE}Checking required tools...${NC}"
    echo ""
    
    # Check Node.js
    if ! check_tool "node" "Node.js" "https://nodejs.org/"; then
        all_good=false
    fi
    
    # Check npm
    if ! check_tool "npm" "npm" "Comes with Node.js"; then
        all_good=false
    fi
    
    # Check Git
    if ! check_tool "git" "Git" "https://git-scm.com/"; then
        all_good=false
    fi
    
    # Check GitHub CLI
    if ! check_tool "gh" "GitHub CLI" "https://cli.github.com/"; then
        all_good=false
    fi
    
    echo ""
    
    # Check GitHub authentication
    if ! check_gh_auth; then
        all_good=false
    fi
    
    echo ""
    
    # Check project structure
    if ! check_project_structure; then
        all_good=false
    fi
    
    echo ""
    
    # Check code editor
    check_cursor
    
    echo ""
    echo -e "${BLUE}=============================================="
    
    if [ "$all_good" = true ]; then
        echo -e "${GREEN}🎉 ALL CHECKS PASSED!"
        echo -e "You're ready to use the setup script!${NC}"
        echo ""
        echo -e "${BLUE}To run the setup script:${NC}"
        echo "./setup-new-project.sh"
    else
        echo -e "${RED}❌ SOME CHECKS FAILED"
        echo -e "Please install missing tools before using the setup script${NC}"
    fi
    
    echo -e "${BLUE}==============================================${NC}"
}

main "$@" 