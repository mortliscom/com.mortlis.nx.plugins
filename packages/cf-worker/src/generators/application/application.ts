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
import { addFiles } from './lib/addFiles';
import { normaliseOptions } from './lib/normaliseOptions';
import { projectConfiguration } from './lib/projectConfiguration';
import { ApplicationGeneratorSchema } from './schema';

export async function applicationGenerator(
  tree: Tree,
  options: ApplicationGeneratorSchema
) {
  const normalisedOptions = normaliseOptions(tree, options);
  //projectConfiguration(tree, normalisedOptions);
  //addFiles(tree, normalisedOptions);
  await formatFiles(tree);
}
export const applicationSchematic = convertNxGenerator(applicationGenerator);
