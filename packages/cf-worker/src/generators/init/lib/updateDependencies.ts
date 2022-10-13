import { addDependenciesToPackageJson, Tree } from '@nrwl/devkit';
import {
  wranglerVersion,
  eslintConfigNextVersion,
} from '../../../utils/versions';

function updateDependencies(host: Tree) {
  return addDependenciesToPackageJson(
    host,
    {
      wrangler: wranglerVersion,
    },
    {
      'eslint-config-next': eslintConfigNextVersion,
    }
  );
}
