import z from 'zod';

export const stageEnum = z.enum(['.', '-A', '-f', '-u']);
export const commitArgsEnum = z.enum(['--no-verify']);
export const pushArgsEnum = z.enum(['--follow-tags', '--no-verify']);

const AuthorSchema = z.object({
  name: z.string().default('github-actions[bot]').describe('Git author name.'),
  email: z
    .string()
    .default('41898282+github-actions[bot]@users.noreply.github.com')
    .describe('Git author email.'),
});

const CommitSchema = z.object({
  enabled: z
    .boolean()
    .default(true)
    .describe('Whether to create a git commit for the version bump.'),
  message: z
    .string()
    .default('chore: bump version to {{version}}')
    .describe(
      'The commit message to use for the version bump. Use {{version}} as a placeholder for the new version.',
    ),
  args: z
    .union([z.array(z.string()), z.array(commitArgsEnum)])
    .default([])
    .describe('Additional arguments to pass to the git commit command.'),
});

const TagSchema = z.object({
  enabled: z.boolean().default(true).describe('Whether to create a git tag for the new version.'),
  majorTag: z
    .boolean()
    .default(false)
    .describe(
      'Create or update a floating major tag (e.g. `v1`). Skipped automatically for prerelease versions.',
    ),
  majorMinorTag: z
    .boolean()
    .default(false)
    .describe(
      'Create or update a floating major.minor tag (e.g. `v1.0`). Skipped automatically for prerelease versions.',
    ),
  annotation: z
    .string()
    .default('Release {{version}}')
    .describe(
      'The annotation message to use for the git tag. Use {{version}} as a placeholder for the new version.',
    ),
});

const PushSchema = z.object({
  enabled: z
    .boolean()
    .default(true)
    .describe('Whether to push the commit and tag to the remote repository.'),
  args: z
    .union([z.array(z.string()), z.array(pushArgsEnum)])
    .default(['--follow-tags'])
    .describe('Additional arguments to pass to the git push command.'),
});

export const GitSchema = z
  .object({
    requireCleanWorkingTree: z
      .boolean()
      .default(true)
      .describe('Fail if the working directory has uncommitted changes.'),
    requireUpstreamBranch: z
      .boolean()
      .default(true)
      .describe('Fail if the current branch has no upstream configured.'),
    allowedBranches: z
      .array(z.string())
      .default([])
      .describe('List of branches allowed to run this command. Empty means any branch.'),
    requireDefaultBranch: z
      .boolean()
      .default(true)
      .describe('Ensure the current branch is the default branch.'),
    defaultBranch: z.string().default('main').describe('Name of the default branch.'),
    author: AuthorSchema.partial()
      .default(AuthorSchema.parse({}))
      .describe('Temporary git author to use for commit and tag. Does not modify git config.'),
    stage: z
      .union([stageEnum, z.array(z.string()), z.array(stageEnum)])
      .default('.')
      .describe('Files or options to stage before committing (maps to `git add`).'),
    commit: CommitSchema.partial()
      .default(CommitSchema.parse({}))
      .describe('Commit configuration for version bump releases.'),
    tag: TagSchema.partial()
      .default(TagSchema.parse({}))
      .describe('Tagging configuration for git releases.'),
    push: PushSchema.partial()
      .default(PushSchema.parse({}))
      .describe('Push configuration for publishing commits and tags to the remote repository.'),
  })
  .describe('Git-specific configuration options.')
  .superRefine((cfg, ctx) => {
    if (cfg.tag?.enabled === false && (cfg.tag?.majorTag || cfg.tag?.majorMinorTag)) {
      ctx.addIssue({
        path: ['tag'],
        message: 'Major or major.minor tags require tag.enabled to be true.',
        code: 'custom',
      });
    }
  });
