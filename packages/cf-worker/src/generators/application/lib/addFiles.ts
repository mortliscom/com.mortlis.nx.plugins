import { names, offsetFromRoot, generateFiles, Tree } from '@nrwl/devkit';
import { NormalisedSchema } from './normaliseOptions';
import * as path from 'path';

export function addFiles(tree: Tree, options: NormalisedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
  };
  generateFiles(
    tree,
    path.join(__dirname, '../files'),
    options.projectRoot,
    templateOptions
  );
}
