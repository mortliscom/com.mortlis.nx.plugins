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

  targets.serve = {
    builder: '@com.mortlis.nx.plugins/cf-worker:dev',
    defaultConfiguration: 'development',
    options: {
      buildTarget: `${options.projectName}:build`,
      dev: true,
    },
    configurations: {
      development: {
        buildTarget: `${options.projectName}:build:development`,
        dev: true,
      },
      production: {
        buildTarget: `${options.projectName}:build:production`,
        dev: false,
      },
    },
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
