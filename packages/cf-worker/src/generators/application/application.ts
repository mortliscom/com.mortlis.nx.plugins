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

export default async function applicationGenerator(
  tree: Tree,
  options: Schema
) {
  const normalisedOptions = NormaliseOptions(tree, options);
  addProjectConfiguration(tree, normalisedOptions.projectName, {
    root: normalisedOptions.projectRoot,
    projectType: 'application',
    sourceRoot: `${normalisedOptions.projectRoot}/src`,
    targets: {
      build: {
        executor: '@com.mortlis.nx.plugins/cf-worker:build',
      },
    },
    tags: normalisedOptions.parsedTags,
  });
  addFiles(tree, normalisedOptions);
  await formatFiles(tree);
}

export const applicationSchematic = convertNxGenerator(applicationGenerator);
