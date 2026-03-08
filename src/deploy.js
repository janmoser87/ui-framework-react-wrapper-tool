
import ora from 'ora';
import { spawnSync } from 'child_process';

// Constants
import { CLONE_DIR } from './consts/index.js';

export async function deploy(options) {
    let spinner;
    try {
        const args = ['ui-component', 'deploy', '--force'];
        if (options.profile) {
            args.push('--profile', options.profile);
        }

        spinner = ora('Running deployment...').start();
        const result = spawnSync('snc', args, { cwd: CLONE_DIR, stdio: 'inherit' });
        if (result.status !== 0) {
            throw new Error(`snc exited with code ${result.status}`);
        }
        spinner.succeed('Deployment completed successfully!');
    }
    catch (error) {
        spinner.fail('❌ Something went wrong: ' + error.message);
    }
}