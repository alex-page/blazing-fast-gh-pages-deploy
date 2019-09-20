import * as core from '@actions/core';
import * as github from '@actions/github';
import * as gitHubPages from 'gh-pages';

const repoToken = core.getInput('repo-token', {required: true});
const siteDirectory = core.getInput('site-directory', {required: true});
const deployBranch = core.getInput('deploy-branch', {required: true});
const commitMessage = core.getInput('commit-message', {required: true});

const octokit = new github.GitHub(repoToken);

const {pusher, repository} = github.context.payload;

const owner = (repository && repository.owner.login) || '';
const repo = (repository && repository.name) || '';

(async () => {
	try {
		await new Promise((resolve, reject) => {
			gitHubPages.publish(
				siteDirectory,
				{
					branch: deployBranch,
					repo: `https://x-access-token:${repoToken}@github.com/${owner}/${repo}.git`,
					user: {
						name: pusher.name,
						email: pusher.email
					},
					dotfiles: true,
					message: commitMessage
				},
				error => {
					if (error) {
						reject(error);
					}

					resolve();
				}
			);
		});

		await octokit.repos.requestPageBuild({owner, repo});

		console.log(`✅ Successfully deployed to GitHub pages. The ${siteDirectory} directory has been pushed to ${deployBranch} branch`);
	} catch (error) {
		core.setFailed(`❌ Failed to deploy to GitHub pages: ${siteDirectory} directory failed to push to ${deployBranch} branch\n${error}`);
	}
})();
