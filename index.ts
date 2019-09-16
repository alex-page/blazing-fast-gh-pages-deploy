import * as core from '@actions/core';
import * as gitHubPages from 'gh-pages';

const repoToken = core.getInput('repo-token', {required: true});
const commitName = core.getInput('commit-name', {required: true});
const commitEmail = core.getInput('commit-email', {required: true});
const siteDirectory = core.getInput('site-directory');
const deployBranch = core.getInput('deploy-branch');
const commitMessage = core.getInput('commit-message');

gitHubPages.publish(
	siteDirectory,
	{
		branch: deployBranch,
		repo: `https://${repoToken}@github.com/alex-page/alex-page.git`,
		user: {
			name: commitName,
			email: commitEmail
		},
		dotfiles: true,
		message: commitMessage
	},
	error => {
		if (error) {
			core.setFailed(`❌ Failed to deploy to GitHub pages: ${siteDirectory} directory failed to push to ${deployBranch} branch\n${error}`);
		}

		console.log(`✅ Successfully deployed to GitHub pages: ${siteDirectory} directory pushed to ${deployBranch} branch`);
	}
);
