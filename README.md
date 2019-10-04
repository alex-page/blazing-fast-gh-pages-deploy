# Blazing fast GitHub Pages deploy

> 🔥 The most blazingest action to deploy your GitHub pages website


## Why did you make another action to deploy to GitHub pages?

This GitHub action uses JavaScript for maximum speed 🚀.
> Using a [JavaScript action](https://help.github.com/en/articles/about-actions#javascript-actions) simplifies the action code and executes faster than a Docker container action. 


## Usage

1. Create a new workflow by adding `.github/workflows/deploy.yml` to your project.
2. Create a [personal access token](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line)
3. [Create a secret](https://help.github.com/en/articles/virtual-environments-for-github-actions#creating-and-using-secrets-encrypted-variables) containing the personal access token, call it `GH_PAT`
4. Modify the [workflow options](#workflow-options) for your project

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
        uses: alex-page/blazing-fast-gh-pages-deploy@v1.0.1
        with:
          repo-token: ${{ secrets.GH_PAT }}
```


## Workflow options

If you want a more custom experience you can add these values. For more detailed explanation of the workflow file, check out the [GitHub documentation](https://help.github.com/en/articles/configuring-a-workflow#creating-a-workflow-file).

| Setting | Description | Default value | Required |
| --- | --- | --- | --- |
| `repo-token` | The personal access token | `${{ secrets.GH_PAT }}` | `true` |
| `site-directory` | The site directory | `_site` | `true` |
| `commit-message` | The commit message for the branch | Deployed using Blazing fast GitHub Pages deploy action | `true` |
| `deploy-branch` | The branch to deploy the built website to | `gh-pages` | `true` |

## Release History

- v1.0.2 - Use head_commit instead of pusher for when there is no push event
- v1.0.1 - Return on error
- v1.0.0 - Remove required name and email. Fix breaking bug with incorrect repository URL.
- v0.0.1 - TypesScript, use callback instead of async
- v0.0.0 - Initial release
