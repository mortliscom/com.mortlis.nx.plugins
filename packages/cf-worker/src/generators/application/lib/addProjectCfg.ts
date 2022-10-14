import { NormalisedSchema } from './normaliseOptions';
import {
  addProjectConfiguration,
  joinPathFragments,
  ProjectConfiguration,
  Tree,
} from '@nrwl/devkit';

export function addProjectCfg(host: Tree, options: NormalisedSchema) {
  const targets: Record<string, any> = {};

  targets.build = {
    executor: '@com.mortlis.nx.plugins/cf-worker:build',
  };

  const project: ProjectConfiguration = {
    root: options.projectRoot,
    sourceRoot: `${options.projectRoot}/src`,
    projectType: 'application',
    targets,
    tags: options.parsedTags,
  };

  addProjectConfiguration(host, options.projectName, {
    ...project,
  });
}
