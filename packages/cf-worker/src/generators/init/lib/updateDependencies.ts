import { addDependenciesToPackageJson, Tree } from '@nrwl/devkit';
import {
  cloudflareWorkersTypes,
  eslintConfigVersion,
  wranglerVersion,
} from '../../application/utils/versions';

export function updateDependencies(tree: Tree) {
  return addDependenciesToPackageJson(
    tree,
    {
      wrangler: wranglerVersion,
      '@cloudflare/workers-types': cloudflareWorkersTypes,
    },
    {
      'eslint-config-next': eslintConfigVersion,
    }
  );
}
