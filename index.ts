import * as core from '@actions/core';
import * as github from '@actions/github';
import * as gitHubPages from 'gh-pages';

const repoToken = core.getInput('repo-token', {required: true});
const siteDirectory = core.getInput('site-directory');
const deployBranch = core.getInput('deploy-branch');
const commitMessage = core.getInput('commit-message');

console.log(JSON.stringify(github.context));

gitHubPages.publish(
	siteDirectory,
	{
		branch: deployBranch,
		repo: `https://${repoToken}@github.com/${}.git`,
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
