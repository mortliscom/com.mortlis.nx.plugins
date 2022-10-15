import { Tree } from '@nrwl/devkit';
import { NormalisedSchema } from './normaliseOptions';
import {
  tsconfigContent,
  fetchHandlerContent,
  scheduledHandlerContent,
} from './filesContent';

export function wranglerInit(host: Tree, options: NormalisedSchema) {
  let wranglerConfigContent = `name = "${options.projectName}"\n`;
  wranglerConfigContent += `compatibility_date = "${new Date()
    .toISOString()
    .substring(0, 10)}"\n`;

  host.write(`${options.projectRoot}/wrangler.toml`, wranglerConfigContent);
  host.write(`${options.projectRoot}/tsconfig.json`, tsconfigContent);
  
  if (options.template == 'fetch-handler') {
    host.write(`${options.projectRoot}/src/index.ts`, fetchHandlerContent);
  } else if (options.template == 'scheduled-handler') {
    host.write(`${options.projectRoot}/src/index.ts`, scheduledHandlerContent);
  }

  return;
}
