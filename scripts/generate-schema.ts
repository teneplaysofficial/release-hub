import z from 'zod';
import { ConfigSchema } from '../src/types/schema/config';
import { writeFileSync } from 'fs';

writeFileSync(
  'schema/release-hub.schema.json',
  JSON.stringify(
    z.toJSONSchema(ConfigSchema, {
      target: 'draft-7',
    }),
    null,
    2,
  ) + '\n',
);
