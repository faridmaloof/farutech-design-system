#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

program
  .name('farutech-sdk')
  .description('CLI for Farutech SDK management')
  .version('1.0.0');

program
  .command('init')
  .description('Initialize SDK in current project')
  .action(() => {
    console.log('Initializing Farutech SDK...');
    
    // Crear .npmrc si no existe
    const npmrcContent = `@farutech:registry=https://npm.pkg.github.com\n`;
    fs.writeFileSync('.npmrc', npmrcContent, { flag: 'a' });
    
    // Agregar script al package.json
    const packagePath = path.join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    packageJson.scripts = {
      ...packageJson.scripts,
      'sdk:update': 'node ./node_modules/@farutech/design-system/scripts/update.js',
      'sdk:dev': 'npm install @farutech/design-system@dev',
      'sdk:prod': 'npm install @farutech/design-system@latest'
    };
    
    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
    console.log('✅ SDK initialized');
  });

program
  .command('update <env>')
  .description('Update SDK to specific environment')
  .action((env) => {
    const validEnvs = ['dev', 'qa', 'staging', 'prod'];
    if (!validEnvs.includes(env)) {
      console.error(`❌ Invalid environment. Use: ${validEnvs.join(', ')}`);
      process.exit(1);
    }
    
    const tag = env === 'prod' ? 'latest' : env;
    console.log(`Updating SDK to ${tag}...`);
    
    execSync(`npm install @farutech/design-system@${tag}`, { stdio: 'inherit' });
    console.log(`✅ SDK updated to ${tag}`);
  });

program
  .command('status')
  .description('Check current SDK version')
  .action(() => {
    try {
      const packagePath = path.join(process.cwd(), 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      const sdkVersion = packageJson.dependencies['@farutech/design-system'];
      
      console.log(`📦 Current SDK: ${sdkVersion}`);
      
      // Mostrar últimas versiones disponibles
      console.log('\n📊 Available versions:');
      execSync('npm view @farutech/design-system dist-tags', { stdio: 'inherit' });
    } catch (error) {
      console.error('❌ Error checking SDK status');
    }
  });

program.parse();