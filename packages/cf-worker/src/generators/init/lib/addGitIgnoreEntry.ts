import { Tree } from 'nx/src/generators/tree';
import ignore from 'ignore';

export function addGitIgnoreEntry(tree: Tree) {
  if (!tree.exists('.gitignore')) {
    return;
  }

  let content = tree.read('.gitignore', 'utf-8').trimEnd();

  const ig = ignore();
  ig.add(tree.read('.gitignore', 'utf-8'));

  if (!ig.ignores('.wrangler')) {
    content = `${content}\n\n# Wrangler\n.wrangler\n`;
  }

  tree.write('.gitignore', content);
}
