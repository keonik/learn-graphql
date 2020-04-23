const { spawn } = require('child_process');
const { resolve } = require('path');
const os = require('os');
const apolloPath = resolve(os.platform() === 'win32' ? './node_modules/.bin/apollo.cmd' : './node_modules/.bin/apollo');
const endpoint = process.env.GRAPHQL_HOST || 'http://localhost:9000/graphql';
const outputPath = resolve('./src/typings/_graphql.ts');
const gqlGlob = resolve('./src/**/*.{ts,tsx}');
const proc = spawn(apolloPath, [
    'client:codegen',
    outputPath,
    '--outputFlat',
    '--no-addTypename',
    '--target=typescript',
    `--endpoint`,
    endpoint,
    `--includes=${gqlGlob}`,
    '--useReadOnlyTypes',
]);
proc.stdout.setEncoding('utf8');
proc.stdout.pipe(process.stdout);
proc.stderr.pipe(process.stderr);
proc.on('close', (code) => {
    console.log(`Apollo codegen exit with code: ${code}`);
});
