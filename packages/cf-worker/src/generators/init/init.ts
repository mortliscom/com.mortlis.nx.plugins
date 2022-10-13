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
import * as path from 'path';
import { InitSchema } from './schema';
import { updateDependencies } from './lib/updateDependencies';

interface NormalizedSchema extends InitSchema {}

export async function InitGenerator(host: Tree, schema: InitSchema) {
  const tasks: GeneratorCallback[] = [];

  const installTask = updateDependencies(host);
}

export default InitGenerator;
export const InitSchematic = convertNxGenerator(InitGenerator);
