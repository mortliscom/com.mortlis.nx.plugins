import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
  Tree,
} from '@nrwl/devkit';
import * as path from 'path';
import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';
import { addFiles } from './lib/addFiles';
import { normaliseOptions } from './lib/normaliseOptions';
import { projectConfiguration } from './lib/projectConfiguration';
import { ApplicationGeneratorSchema } from './schema';

export default async function (
  tree: Tree,
  options: ApplicationGeneratorSchema
) {
  const normalisedOptions = normaliseOptions(tree, options);
  console.log(normalisedOptions);
  //const initTask = await initGenerator(tree, { ...normalisedOptions });

  projectConfiguration(tree, normalisedOptions);
  addFiles(tree, normalisedOptions);
  await formatFiles(tree);

  //return runTasksInSerial(initTask);
}
