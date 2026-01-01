# Git Setup Instructions

## Step 1: Configure Git Identity

You need to set your name and email. Choose one:

### Option A: Set globally (for all repositories)
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Option B: Set only for this repository
```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

## Step 2: Make Initial Commit

After setting your identity, run:
```bash
git commit -m "Initial commit: Travel affiliate website MVP"
```

## Step 3: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the "+" icon in the top right → "New repository"
3. Name it (e.g., "tap-website" or "travel-affiliate-website")
4. **Don't** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

## Step 4: Connect and Push

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add the remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Alternative: Using SSH

If you prefer SSH (and have SSH keys set up):

```bash
git remote add origin git@github.com:YOUR_USERNAME/REPO_NAME.git
git push -u origin main
```

## Quick One-Liner Setup

If you want to set identity and commit in one go:

```bash
# Set identity (replace with your info)
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Commit
git commit -m "Initial commit: Travel affiliate website MVP"
```

Then follow Steps 3-4 above to push to GitHub.

