import {
  readWorkspaceConfiguration,
  Tree,
  updateWorkspaceConfiguration,
} from '@nrwl/devkit';

import { NormalisedSchema } from './normaliseOptions';

export function setDefaults(host: Tree, options: NormalisedSchema) {
  const workspace = readWorkspaceConfiguration(host);

  if (!workspace.defaultProject) {
    workspace.defaultProject = options.projectName;
  }

  workspace.generators = workspace.generators || {};
  workspace.generators['@mortliscom/cf-worker'] =
    workspace.generators['@mortliscom/cf-worker'] || {};
  const prev = workspace.generators['@mortliscom/cf-worker'];

  workspace.generators = {
    ...workspace.generators,
    '@mortliscom/cf-worker': {
      ...prev,
      application: {
        ...prev.application,
      },
    },
  };
  updateWorkspaceConfiguration(host, workspace);
}
