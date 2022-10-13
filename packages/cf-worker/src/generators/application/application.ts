import {
  addProjectConfiguration,
  convertNxGenerator,
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
  Tree,
} from '@nrwl/devkit';
import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';
import * as path from 'path';
import { ApplicationSchema } from './schema';
import { normaliseOptions, NormalisedSchema } from './lib/normaliseOptions';
import { initGenerator } from '../init/init';
import { addProjectCfg } from './lib/addProjectCfg';
import { setDefaults } from './lib/setDefaults';
import { addFiles } from './lib/addFiles';

export default async function applicationGenerator(
  host: Tree,
  schema: ApplicationSchema
) {
  const options = normaliseOptions(host, schema);

  const nextTask = await initGenerator(host, { ...options });

  addFiles(host, options);

  addProjectCfg(host, options);

  setDefaults(host, options);

  if (!options.skipFormat) {
    await formatFiles(host);
  }

  return runTasksInSerial(nextTask);
}

export const applicationSchematic = convertNxGenerator(applicationGenerator);
