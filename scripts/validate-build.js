#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

console.log("🔍 Running build validation checks...\n");

const checks = [
  {
    name: "TypeScript Type Check",
    command: "npx tsc --noEmit",
    description: "Checking for TypeScript errors",
  },
  {
    name: "ESLint Check",
    command: "npm run lint",
    description: "Checking for linting errors",
  },
  {
    name: "Build Test",
    command: "npm run build",
    description: "Testing production build",
  },
];

let allPassed = true;

for (const check of checks) {
  try {
    console.log(`⏳ ${check.description}...`);
    execSync(check.command, { stdio: "pipe" });
    console.log(`✅ ${check.name} passed\n`);
  } catch (error) {
    console.log(`❌ ${check.name} failed`);
    console.log(`Error: ${error.message}\n`);
    allPassed = false;
  }
}

if (allPassed) {
  console.log("🎉 All validation checks passed! Ready for deployment.");
  process.exit(0);
} else {
  console.log(
    "🚫 Some validation checks failed. Please fix the issues before deploying."
  );
  process.exit(1);
}
