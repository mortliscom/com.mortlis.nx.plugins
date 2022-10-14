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
import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';
import * as path from 'path';
import { ApplicationSchema } from './schema';
import { normaliseOptions, NormalisedSchema } from './lib/normaliseOptions';
import { initGenerator } from '../init/init';
import { addProjectCfg } from './lib/addProjectCfg';
import { setDefaults } from './lib/setDefaults';
//import { addFiles } from './lib/addFiles';

function normalizeOptions(
  tree: Tree,
  options: ApplicationSchema
): NormalisedSchema {
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
  const options = normalizeOptions(host, schema);

  const initTask = await initGenerator(host, { ...options });

  addProjectCfg(host, options);

  addFiles(host, options);

  setDefaults(host, options);

  if (!options.skipFormat) {
    await formatFiles(host);
  }

  return runTasksInSerial(initTask);
}

export const applicationSchematic = convertNxGenerator(applicationGenerator);
