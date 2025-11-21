export const options = [
  { flags: '-h, --help', desc: 'Show this help message' },
  { flags: '-v, --version', desc: 'Show CLI version' },
  { flags: '-d, --dry-run', desc: 'Run commands in dry-run mode (no changes applied)' },
  { flags: '-D, --debug', desc: 'Enable verbose debug logging' },
] as const;

export const knownFlags = options.flatMap((o) => o.flags.split(',').map((f) => f.trim()));
