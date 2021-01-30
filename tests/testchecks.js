const semver = require('semver');
const package = require('../package.json');
const minNode = package && package.testRun && package.testRun.node || '8.0.0';
const curNode = semver.clean(process.version);

if (!semver.satisfies(curNode, minNode)) {
  console.warn('test %sWARN%s %snosup%s SKIPPING: Unsuported Node version for test (%s)',
    '\u001b[43m\u001b[30m', // Yellow Bg Black Fg
    '\u001b[0m', // Reset colors
    '\u001b[35;1m', // Ligth Purple Fg
    '\u001b[0m', // Reset colors
    minNode
  );
  process.exit(4);
}
