import { readFileSync, writeFileSync, renameSync, rmSync, readdirSync } from 'fs';
import { customAlphabet } from 'nanoid'
import { execSync } from 'child_process';

export const replaceInFile = (filePath, search, replace) => {
    const content = readFileSync(filePath, 'utf-8');
    const updated = content.replaceAll(search, replace);
    writeFileSync(filePath, updated);
};

export const renameFile = (oldPath, newPath) => {
    renameSync(oldPath, newPath);
}

export const validateTargetDir = async (dir, inquirer) => {

    const files = readdirSync(dir);
    if (files.length > 0) {
        const { confirm } = (await inquirer.prompt([
            {
                type: 'confirm',
                name: 'confirm',
                message: 'Current directory is not empty. Continue and delete all files?',
            }
        ]));

        // Denied by user, exit process
        if (!confirm) {
            process.exit(0);
        }
        
        // User confirmed, delete all files in the directory
        for (const file of files) {
            rmSync(`${dir}/${file}`, { recursive: true, force: true });
        }

    }
}

export const getFileAsJSON = (filePath) => {
    const json = JSON.parse(readFileSync(filePath, 'utf-8'));
    return json;
}

export const writeJSONToFile = (filePath, json) => {
    const content = JSON.stringify(json, null, 2);
    writeFileSync(filePath, content);
}

export const generateUniqueScopeSuffix = (length) => {
    return customAlphabet('abcdefghijklmnopqrstuvwxyz', length || 5)();
}

export const checkDependencies = async () => {

    try {
        const snc = execSync('snc version', { stdio: 'pipe' }).toString();
        let sncJSON;

        try {
            sncJSON = JSON.parse(snc);
        }
         catch (error) {
            throw new Error(
                'ServiceNow CLI (snc) is not installed or not in PATH, or returned invalid output. ' +
                'Install it from: [https://www.servicenow.com/docs/bundle/zurich-application-development/page/build/servicenow-cli/task/download-cli.html]. ' +
                'If it is installed, ensure it is working correctly by running: snc version'
            );
         }        

        if (!sncJSON.snc) {
            throw new Error(
                'ServiceNow CLI (snc) is not installed or not in PATH, or returned invalid output. ' +
                'Install it from: [https://www.servicenow.com/docs/bundle/zurich-application-development/page/build/servicenow-cli/task/download-cli.html]. ' +
                'If it is installed, ensure it is working correctly by running: snc version'
            );
        }
        if (!sncJSON.extensions['ui-component']) {
            throw new Error('ServiceNow CLI UI Component extension is not installed. Install it by running: snc extension install ui-component');
        }
    } catch (error) {
        throw error;
    }

}

export const clearFileContent = (filePath) => {
    writeFileSync(filePath, '');
}