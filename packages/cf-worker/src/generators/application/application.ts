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
import { Schema } from './schema';
import { NormaliseOptions, NormalisedSchema } from './lib/normaliseOptions';

function addFiles(tree: Tree, options: NormalisedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
  };
  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    options.projectRoot,
    templateOptions
  );
}

export default async function applicationGenerator(tree: Tree, schema: Schema) {
  const options = NormaliseOptions(tree, schema);

  addProjectConfiguration(tree, options.projectName, {
    root: options.projectRoot,
    projectType: 'application',
    sourceRoot: `${options.projectRoot}/src`,
    targets: {
      build: {
        executor: '@com.mortlis.nx.plugins/cf-worker:build',
      },
    },
    tags: options.parsedTags,
  });
  addFiles(tree, options);
  await formatFiles(tree);
}

export const applicationSchematic = convertNxGenerator(applicationGenerator);
