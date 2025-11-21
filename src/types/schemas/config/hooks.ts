import z from 'zod';

export const HooksSchema = z
  .record(
    z.string().regex(/^(before|after):(init|version|commit|tag|push|publish(?::(npm|jsr))?)$/, {
      error: 'Hook key must match pattern',
    }),
    z.union([z.string(), z.array(z.string())]),
  )
  .describe(
    'Shell commands to run at various lifecycle stages. Each key is a lifecycle hook name and the value is the command(s) to run.',
  );
