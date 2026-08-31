# LM

This is a luxury storefront project for the LM brand.

## Local preview

Open `index.html` in a browser or run a local static server:

```bash
cd /Users/sagardahane/Desktop/LM
python3 -m http.server 8000
```

Then open http://localhost:8000

## GitHub

After authenticating GitHub CLI, run:

```bash
gh auth login
gh repo create LM --public --source=. --remote=origin --push
```
