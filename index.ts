import * as core from '@actions/core';
import * as github from '@actions/github';
import * as gitHubPages from 'gh-pages';

const repoToken = core.getInput('repo-token', {required: true});
const siteDirectory = core.getInput('site-directory', {required: true});
const deployBranch = core.getInput('deploy-branch', {required: true});
const commitMessage = core.getInput('commit-message', {required: true});

const {head_commit: headCommit, repository} = github.context.payload;

console.log(headCommit, repository);

gitHubPages.publish(
	siteDirectory,
	{
		branch: deployBranch,
		repo: `https://${repoToken}@github.com/${repository && repository.full_name}.git`,
		user: {
			name: headCommit.author.username,
			email: headCommit.author.email
		},
		dotfiles: true,
		message: commitMessage
	},
	error => {
		if (error) {
			core.setFailed(`❌ Failed to deploy to GitHub pages: ${siteDirectory} directory failed to push to ${deployBranch} branch\n${error}`);
			return;
		}

		console.log(`✅ Successfully deployed to GitHub pages. The ${siteDirectory} directory has been pushed to ${deployBranch} branch`);
	}
);
