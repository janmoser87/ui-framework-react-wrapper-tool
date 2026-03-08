import degit from 'degit';
import ora from 'ora';
import inquirer from 'inquirer';
import { execSync } from 'child_process';

// Utils
import { validateTargetDir } from './utils/index.js';

// Constants
import { TEMPLATE_REPO, CLONE_DIR } from './consts/index.js';

export async function fetch(options) {
    let spinner;
    try {

        // Validate target directory
        await validateTargetDir(CLONE_DIR, inquirer);

        // Download template
        spinner = ora('Downloading template...').start();
        const emitter = degit(TEMPLATE_REPO, { force: true });
        await emitter.clone(CLONE_DIR);
        spinner.succeed('Template downloaded successfully!');

        // Install dependencies
        spinner = ora('Installing dependencies...').start();
        execSync('npm install', { cwd: CLONE_DIR, stdio: 'inherit' });
        spinner.succeed('Dependencies installed successfully!');

    }
    catch (error) {
        if (spinner) {
            spinner.fail('❌ Something went wrong: ' + error.message);
        } else {
            console.error('❌ Something went wrong: ' + error.message);
        }
    }
}