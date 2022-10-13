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
import { ApplicationSchema } from './schema';
import { normaliseOptions, NormalisedSchema } from './lib/normaliseOptions';
import { initGenerator } from '../init/init';
import { addProject } from './lib/addProject';
import { setDefaults } from './lib/setDefaults';

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
  host: Tree,
  schema: ApplicationSchema
) {
  const options = normaliseOptions(host, schema);

  const nextTask = initGenerator(host, { ...options });

  addProject(host, options);

  setDefaults(host, options);

  if (!options.skipFormat) {
    await formatFiles(host);
  }

  await addProjectConfiguration(host, options.projectName, {
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
  addFiles(host, options);
}

export const applicationSchematic = convertNxGenerator(applicationGenerator);
