import {
  Tree,
  ProjectConfiguration,
  addProjectConfiguration,
} from '@nrwl/devkit';
import { NormalisedSchema } from '../typings/NormalisedSchema';

export function projectConfiguration(tree: Tree, options: NormalisedSchema) {
  const targets: Record<string, any> = {};

  targets.serve = {
    executor: '@com.mortlis.nx.plugins/cf-worker:server',
  };

  const project: ProjectConfiguration = {
    root: options.projectRoot,
    sourceRoot: `${options.projectRoot}/src`,
    projectType: 'application',
    targets,
    tags: options.parsedTags,
  };

  addProjectConfiguration(tree, options.projectName, { ...project });
}
