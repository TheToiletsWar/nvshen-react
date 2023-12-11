/* eslint-disable @typescript-eslint/no-var-requires */
const {
  readFileSync,
  existsSync,
  mkdirSync,
  createReadStream,
  createWriteStream,
} = require('fs');
const { createGzip } = require('zlib');
const { resolve, join } = require('path');
const { spawnSync } = require('child_process');
const { platform } = require('os');
const root = resolve(__dirname, '../');
const imagePath = join(root, 'images');
const npmCmd = platform().startsWith('win') ? 'npm.cmd' : 'npm';
const env = {
  DOCKER_HOST: readFileSync(join(__dirname, 'docker.sock'), 'utf-8'),
};
const version = process.argv[2] ? 'latest' : process.env.npm_package_version;
const name = process.env.npm_package_name;
const tag = `${name}:${version}`;
const fileName = `${name}-${version}.tar`;

!existsSync(imagePath) && mkdirSync(imagePath);
spawnSync(npmCmd, ['run', 'build'], {
  cwd: root,
  stdio: 'inherit',
});
spawnSync('docker', ['build', '-t', tag, '--no-cache', root], {
  cwd: join(__dirname),
  stdio: 'inherit',
  env,
});
if (version === 'latest') {
  spawnSync('docker', ['save', '-o', join(imagePath, fileName), tag], {
    cwd: join(__dirname),
    stdio: 'inherit',
    env,
  });
} else {
  spawnSync('docker', ['tag', tag, `${name}:latest`], {
    cwd: join(__dirname),
    stdio: 'inherit',
    env,
  });
  spawnSync(
    'docker',
    ['save', '-o', join(imagePath, fileName), tag, `${name}:latest`],
    {
      cwd: join(__dirname),
      stdio: 'inherit',
      env,
    },
  );
}
createReadStream(join(imagePath, fileName))
  .pipe(createGzip())
  .pipe(createWriteStream(join(imagePath, `${fileName}.gz`)));
