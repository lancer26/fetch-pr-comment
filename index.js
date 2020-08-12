const core = require('@actions/core');
const github = require('@actions/github');

try {

  const repository = process.env.GITHUB_REPOSITORY;
  const [owner, repo] = repository.split("/");


  const octokit = github.getOctokit(process.env.GITHUB_TOKEN);

  const { data: comments } = await octokit.issues.listComments({
    owner: owner,
    repo: repo,
    issue_number: process.env.prNumber,
  });

  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);

  const firstCommnet = JSON.stringify(comments[0], undefined, 2);
  console.log(`first comments ${firstCommnet}`)
} catch (error) {
  core.setFailed(error.message);
}