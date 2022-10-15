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
import { ApplicationGeneratorSchema } from './schema';
import { normaliseOptions } from './lib/normaliseOptions';
import { projectConfiguration } from './lib/projectConfiguration';
import { addFiles } from './lib/addFiles';

interface NormalizedSchema extends ApplicationGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}

export default async function (
  tree: Tree,
  options: ApplicationGeneratorSchema
) {
  const normalisedOptions = normaliseOptions(tree, options);

  projectConfiguration(tree, normalisedOptions);

  addFiles(tree, normalisedOptions);
  
  await formatFiles(tree);
}
