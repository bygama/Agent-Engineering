# Deploy helper

Run the deploy in this order:

1. `npm test`
2. `git push origin main`
3. Watch the pipeline in GitHub Actions.
4. If it fails, roll back with the previous tag.
