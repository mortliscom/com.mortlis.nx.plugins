import { getWorkspaceLayout, names, Tree } from '@nrwl/devkit';
import { ApplicationGeneratorSchema } from '../schema';
import { NormalisedSchema } from '../typings/NormalisedSchema';

export function normaliseOptions(
  tree: Tree,
  options: ApplicationGeneratorSchema
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
