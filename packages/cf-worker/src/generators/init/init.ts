import {
  addProjectConfiguration,
  convertNxGenerator,
  formatFiles,
  generateFiles,
  GeneratorCallback,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
  Tree,
} from '@nrwl/devkit';
import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';
import * as path from 'path';
import { InitSchema } from './schema';
import { updateDependencies } from './lib/updateDependencies';
import { addGitIgnoreEntry } from '../../utils/addGitIgnoreEntry';

interface NormalisedSchema extends InitSchema {}

export async function initGenerator(host: Tree, schema: InitSchema) {
  const tasks: GeneratorCallback[] = [];

  const installTask = updateDependencies(host);
  tasks.push(installTask);

  addGitIgnoreEntry(host);

  return runTasksInSerial(...tasks);
}

export default initGenerator;
export const InitSchematic = convertNxGenerator(initGenerator);
