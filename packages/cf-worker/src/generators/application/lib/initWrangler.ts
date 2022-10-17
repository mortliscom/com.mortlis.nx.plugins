import { Tree } from '@nrwl/devkit';
import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';
import { NormalisedSchema } from '../typings/NormalisedSchema';

export function initWrangler(tree: Tree, options: NormalisedSchema) {
  let wranglerTomlContent = `name = ${options.name}\n`;
  wranglerTomlContent += `compatibility_date = "${new Date()
    .toISOString()
    .substring(0, 10)}"`;
  const tsConfigContent = tree.read(
    './packages/cf-worker/src/generators/application/utils/files/tsconfig.json.template'
  );

  let indexJsTemplate = '';

  // switch (options.template) {
  //   case 'fetch-handler':
  //     indexJsTemplate = tree.read(
  //       'packages/cf-worker/src/generators/application/utils/files/fetchHandler.ts.template',
  //       'utf-8'
  //     );
  //     break;
  //   case 'scheduled-handler':
  //     indexJsTemplate = tree.read(
  //       'packages/cf-worker/src/generators/application/utils/files/scheduledHandler.ts.template',
  //       'utf-8'
  //     );
  //     break;
  //   default:
  //     break;
  // }

  console.log(tsConfigContent);

  tree.write(`${options.projectRoot}/wrangler.toml`, wranglerTomlContent);
  // Fix: Does not write to tsconfig; tsconfigocontent reader is broken; wrong path persumaby
  tree.write(`${options.projectRoot}/tsconfig.json`, tsConfigContent);
  //tree.write(`${options.projectRoot}/src/index.ts`, indexJsTemplate);
}
