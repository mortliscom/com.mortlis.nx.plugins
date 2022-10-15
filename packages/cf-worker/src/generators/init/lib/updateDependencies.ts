import { addDependenciesToPackageJson, Tree } from '@nrwl/devkit';
import {
  wranglerVersion,
  eslintConfigNextVersion,
  cloudflareWorkersTypes,
} from '../../../utils/versions';

export function updateDependencies(host: Tree) {
  return addDependenciesToPackageJson(
    host,
    {
      wrangler: wranglerVersion,
      '@cloudflare/workers-types': cloudflareWorkersTypes,
    },
    {
      'eslint-config-next': eslintConfigNextVersion,
    }
  );
}
