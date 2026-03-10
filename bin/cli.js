#!/usr/bin/env node
import { program } from 'commander';

// Actions
import { configure } from '../src/configure.js';
import { dev } from '../src/dev.js';
import { clean } from '../src/clean.js';
import { deploy } from '../src/deploy.js';
import { fetch } from '../src/fetch.js';

program
    .name('uif-react-wrapper')
    .version('1.0.0');

program
    .command('fetch')
    .description('Fetch the latest UIF React wrapper template')
    .action(async (options) => {
        await fetch(options);
    });

program
    .command('dev')
    .description('Run the development server for the UIF React wrapper project')
    .action(async (options) => {
        await dev(options);
    });

program
    .command('configure')
    .description('Configures the project with your settings and adjusts the template accordingly')
    .option('--vendor-prefix <prefix>', 'Vendor prefix for the component')
    .option('--label <label>', 'Label of the component')
    .option('--scope <scope>', 'Scope of the component application (optional, will be auto-generated if not provided)')
    .action(async (options) => {
        await configure(options);
    });

program
    .command('clean')
    .description('Clean the build artifacts for the UIF React wrapper project')
    .action(async (options) => {
        await clean(options);
    });

program
    .command('deploy')
    .description('Deploy the UIF React wrapper project to ServiceNow. This command is a wrapper around snc ui-component deploy --force')
    .option('--profile <profile>', 'snc authentication profile')
    .action(async (options) => {
        await deploy(options);
    });

program.parse();