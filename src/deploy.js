
import ora from 'ora';
import { execSync } from 'child_process';

// Constants
import { CLONE_DIR } from './consts/index.js';

export async function deploy(options) {
    let spinner;
    try {
        const profileFlag = options.profile ? `--profile ${options.profile}` : '';

        spinner = ora('Running deployment...').start();
        execSync(`snc ui-component deploy --force ${profileFlag}`, { cwd: CLONE_DIR, stdio: 'inherit' });
        spinner.succeed('Deployment completed successfully!');
    }
    catch (error) {
        spinner.fail('❌ Something went wrong: ' + error.message);
    }
}