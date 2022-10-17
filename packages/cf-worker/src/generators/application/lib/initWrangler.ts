import { Tree } from '@nrwl/devkit';
import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';
import { spawn } from 'child_process';
import { NormalisedSchema } from '../typings/NormalisedSchema';

export function initWrangler(tree: Tree, options: NormalisedSchema) {
  let wranglerTomlContent = `name = ${options.name}\n`;
  wranglerTomlContent += `compatibility_date = "${new Date()
    .toISOString()
    .substring(0, 10)}"`;
  let tsConfigContent = tree.read('packages/cf-worker/src/generators/application/utils/tsconfig.json', 'utf-8');
  
  let indexTemplate = "";

  if (options.)
}
