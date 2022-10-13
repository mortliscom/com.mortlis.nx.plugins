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
import * as path from 'path';
import { InitGeneratorSchema } from './schema';

interface NormalizedSchema extends InitGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}

export async function InitGenerator(tree: Tree, options: InitGeneratorSchema) {
  await formatFiles(tree);
}

export default InitGenerator;
export const InitSchematic = convertNxGenerator(InitGenerator);
