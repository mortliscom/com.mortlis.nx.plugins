import { generateFiles, names, offsetFromRoot, Tree } from '@nrwl/devkit';
import path = require('path');
import { NormalisedSchema } from '../typings/NormalisedSchema';

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
