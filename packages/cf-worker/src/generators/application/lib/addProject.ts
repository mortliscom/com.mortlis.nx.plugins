import { NormalisedSchema } from './normaliseOptions';
import {
  addProjectConfiguration,
  joinPathFragments,
  ProjectConfiguration,
  Tree,
} from '@nrwl/devkit';

export function addProject(host: Tree, options: NormalisedSchema) {
  const targets: Record<string, any> = {};

  targets.build = {
    builder: '@nrwl/next:build',
    outputs: ['{options.outputPath}'],
    defaultConfiguration: 'production',
    options: {
      root: options.projectRoot,
      outputPath: joinPathFragments('dist', options.projectRoot),
    },
    configurations: {
      development: {
        outputPath: options.projectRoot,
      },
      production: {},
    },
  };

  targets.serve = {
    builder: '@nrwl/next:server',
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

  targets.export = {
    builder: '@nrwl/next:export',
    options: {
      buildTarget: `${options.projectName}:build:production`,
    },
  };

  const project: ProjectConfiguration = {
    root: options.projectRoot,
    sourceRoot: options.projectRoot,
    projectType: 'application',
    targets,
    tags: options.parsedTags,
  };

  addProjectConfiguration(host, options.projectName, {
    ...project,
  });
}
