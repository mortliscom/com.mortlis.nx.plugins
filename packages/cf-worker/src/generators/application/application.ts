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
import { normaliseOptions } from './lib/normaliseOptions';

interface NormalizedSchema extends Schema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}

function normalizeOptions(tree: Tree, options: Schema): NormalizedSchema {
  const name = names(options.name).fileName;
  const projectDirectory = options.directory
    ? `${names(options.directory).fileName}/${name}`
    : name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectRoot = `${getWorkspaceLayout(tree).appsDir}/${projectDirectory}`;
  const parsedTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : [];

  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
  };
}

function addFiles(tree: Tree, options: NormalizedSchema) {
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
  const normalisedOptions = normaliseOptions(tree, options);
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
