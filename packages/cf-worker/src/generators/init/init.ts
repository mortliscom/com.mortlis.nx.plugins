import {
  addProjectConfiguration,
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
import { addGitIgnoreEntry } from './lib/addGitIgnoreEntry';
import { updateDependencies } from './lib/updateDependencies';
import { InitGeneratorSchema } from './schema';

export default async function (tree: Tree, options: InitGeneratorSchema) {
  const tasks: GeneratorCallback[] = [];

  const installTask = updateDependencies(tree);
  tasks.push(installTask);

  addGitIgnoreEntry(tree);

  return runTasksInSerial(...tasks);
}
