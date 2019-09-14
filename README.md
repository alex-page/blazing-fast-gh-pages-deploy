# Blazing fast GitHub Pages deploy

> 🔥 The most blazingest action to deploy your GitHub pages website


## Why did you make another action to deploy to GitHub pages?

This GitHub action uses JavaScript only for [maximum speed](https://help.github.com/en/articles/about-actions#javascript-actions) 🚀


## Usage

1. Create a new workflow by adding `.github/workflows/deploy.yml` to your project.
2. Create a [personal access token](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line)
3. [Create a secret](https://help.github.com/en/articles/virtual-environments-for-github-actions#creating-and-using-secrets-encrypted-variables) containing the personal access token, call it `GH_PAT`
4. Modify the `with:` options for your project

Here is an example `deploy.yml` file:

```yml
name: Blazing fast GitHub Pages deploy

on:
  push:
    branches:
    - master

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - name: npm install, test and build
        run: |
          npm install
          npm run test
          npm run build
      - name: Deploy site to gh-pages branch
        uses: alex-page/blazing-fast-gh-pages-deploy@v0.0.0
        with:
          repo-token: ${{ secrets.GH_PAT }}
          commit-name: 'Alex Page'
          commit-email: 'alex@alexpage.com.au'
```


## Workflow options

If you want a more custom experience you can tweak these values. For more detailed explanation of the workflow file, check out the [GitHub documentation](https://help.github.com/en/articles/configuring-a-workflow#creating-a-workflow-file).

| Setting | Description | Values |
| --- | --- | --- |
| `repo-token` | The personal access token | `${{ secrets.GH_PAT }}` |
| `site-directory` | The name of the project | `Backlog` |
| `commit-name` | The name of the user doing the deploy commit | `Alex Page` |
| `commit-email` | The email of the user doing the deploy commit | `alex@alepage.com.au` |
| `commit-message` | The commit message for the branch | `Deployed using Blazing fast GitHub Pages deploy action` |


## Release History

- v0.0.0 - Initial release
