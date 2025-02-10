#!/bin/bash
set -e

# Fetch the current version from package.json using Node.js
CURRENT_VERSION=$(node -p "require('./package.json').version")

# Get the commit message and branch name from the arguments
COMMIT_MESSAGE="$1"
BRANCH_NAME="$2"

if [ "$BRANCH_NAME" == "main" ]; then
  echo "On main branch. Determining version bump..."

  # Extract the major, minor, and patch numbers
  IFS='.' read -r MAJOR MINOR PATCH <<< "$CURRENT_VERSION"

  # Determine the version bump based on the commit message
  if [[ "$COMMIT_MESSAGE" == *"[major]"* ]]; then
    ((MAJOR++))
    MINOR=0
    PATCH=0
    BUMP_TYPE="major"
  elif [[ "$COMMIT_MESSAGE" == *"[minor]"* ]]; then
    ((MINOR++))
    PATCH=0
    BUMP_TYPE="minor"
  elif [[ "$COMMIT_MESSAGE" == *"[patch]"* ]]; then
    ((PATCH++))
    BUMP_TYPE="patch"
  else
    echo "No version bump keyword found in commit message. Exiting."
    exit 0
  fi

  # Construct the new version
  NEW_VERSION="$MAJOR.$MINOR.$PATCH"
  echo "Bumping version to $NEW_VERSION ($BUMP_TYPE release)"

  # Update the version in package.json using Node.js
  node -e "
    const fs = require('fs');
    const packageJson = require('./package.json');
    packageJson.version = '$NEW_VERSION';
    fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
  "

  # Output the new version for GitHub Actions
  echo "NEW_VERSION=$NEW_VERSION" >> $GITHUB_OUTPUT

  # Commit the version bump
  git add package.json
  git commit -m "Bump version to $NEW_VERSION"

  # Create a new tag
  git tag "v$NEW_VERSION"
  git push origin main --tags

else
  echo "On branch '$BRANCH_NAME'. Setting version to include branch name."

  IFS='.' read -r MAJOR MINOR PATCH <<< "$CURRENT_VERSION"

  # Sanitize branch name by replacing slashes with dashes
  SAFE_BRANCH_NAME=$(echo "$BRANCH_NAME" | tr '/' '-')

  # Construct the new version with branch name suffix
  NEW_VERSION="$MAJOR.$MINOR.$PATCH-$SAFE_BRANCH_NAME"
  echo "Setting version to $NEW_VERSION"

  # Update the version in package.json using Node.js
  node -e "
    const fs = require('fs');
    const packageJson = require('./package.json');
    packageJson.version = '$NEW_VERSION';
    fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
  "

  # Output the new version for GitHub Actions
  echo "NEW_VERSION=$NEW_VERSION" >> $GITHUB_OUTPUT

  # Commit the version update
  git add package.json
  git commit -m "Set version to $NEW_VERSION"

  # Push changes to the current branch
  git push origin "$BRANCH_NAME"
fi
