
import ora from 'ora';
import { execSync } from 'child_process';

// Constants
import { CLONE_DIR } from './consts/index.js';

export async function dev(options) {
    let spinner;
    try {
        spinner = ora('Running development server...').start();
        execSync('npm run start', { cwd: CLONE_DIR, stdio: 'inherit' });
        spinner.succeed('Development server started successfully!');
    }
    catch (error) {
        spinner.fail('❌ Something went wrong: ' + error.message);
    }
}