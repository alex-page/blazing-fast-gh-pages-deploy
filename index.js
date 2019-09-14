const core = require('@actions/core');
const gitHubPages = require('gh-pages');

const repoToken = core.getInput('repo-token');
const siteDirectory = core.getInput('site-directory');
const deployBranch = core.getInput('deploy-branch');
const commitName = core.getInput('commit-name');
const commitEmail = core.getInput('commit-email');
const commitMessage = core.getInput('commit-message');

(async () => {
	try {
		await new Promise((resolve, reject) => gitHubPages.publish(
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
					reject(error);
				}

				resolve();
			}
		));

		console.log(`✅ Successfully deployed to GitHub pages: ${siteDirectory} directory pushed to ${deployBranch} branch`);
	} catch (error) {
		console.error(`❌ Failed to deploy to GitHub pages: ${siteDirectory} directory failed to push to ${deployBranch} branch\n${error}`);
	}
})();
