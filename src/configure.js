import ora from 'ora';
import inquirer from 'inquirer';

// Utils
import { 
    replaceInFile, 
    renameFile, 
    getFileAsJSON, 
    writeJSONToFile, 
    checkDependencies, 
    generateUniqueScopeSuffix,
 } from './utils/index.js';

// Constants
import { CLONE_DIR, TEMPLATE_COMPONENT_TAG } from './consts/index.js';

export async function configure(options) {
    let spinner;
    let { vendorPrefix, label, scope } = options;
    try {

        // Check dependencies
        await checkDependencies();

        // Getting user inputs
        if (!vendorPrefix) {
            vendorPrefix = (await inquirer.prompt([
                {
                    type: 'input',
                    name: 'vendorPrefix',
                    message: 'Enter vendor prefix:',
                }
            ])).vendorPrefix;
        }
        if (!label) {
            label = (await inquirer.prompt([
                {
                    type: 'input',
                    name: 'label',
                    message: 'Enter component label:',
                }
            ])).label;
        }
        if (!scope) {
            scope = (await inquirer.prompt([
                {
                    type: 'input',
                    name: 'scope',
                    message: 'Enter component application scope (optional, will be auto-generated if not provided):',
                }
            ])).scope;
        }

        // Saving config
        writeJSONToFile(`${CLONE_DIR}/uif.wrapper.config.json`, { vendorPrefix, label, scope });

        // Adjusting template

        const randomSuffix = generateUniqueScopeSuffix(5);
        const normalizedComponentTag = `x-${vendorPrefix}-${randomSuffix}`;
        const normalizedScopeName    = `x_${vendorPrefix}_${randomSuffix}`;

        spinner = ora('Adjusting template...').start();

        // Updating now-ui.json
        const nowuiJSON = getFileAsJSON(`${CLONE_DIR}/now-ui.json`);

        // Scope
        nowuiJSON.scopeName = scope || normalizedScopeName;

        // Component tag and label
        const componentTag = Object.keys(nowuiJSON.components)[0];
        nowuiJSON.components[normalizedComponentTag] = nowuiJSON.components[componentTag]
        delete nowuiJSON.components[componentTag];
        nowuiJSON.components[normalizedComponentTag].uiBuilder.label = label;

        writeJSONToFile(`${CLONE_DIR}/now-ui.json`, nowuiJSON);

        // Updating source files
        replaceInFile(`${CLONE_DIR}/src/index.js`, TEMPLATE_COMPONENT_TAG, normalizedComponentTag);
        replaceInFile(`${CLONE_DIR}/example/element.js`, TEMPLATE_COMPONENT_TAG, normalizedComponentTag);
        replaceInFile(`${CLONE_DIR}/src/${TEMPLATE_COMPONENT_TAG}/index.js`, TEMPLATE_COMPONENT_TAG, normalizedComponentTag);
        renameFile(
            `${CLONE_DIR}/src/${TEMPLATE_COMPONENT_TAG}`,
            `${CLONE_DIR}/src/${normalizedComponentTag}`
        );

        // Upating package.json
        const packageJSON = getFileAsJSON(`${CLONE_DIR}/package.json`);
        packageJSON.name = `${normalizedComponentTag}`;
        packageJSON.description = `UIF React wrapper for ${normalizedComponentTag}`;
        writeJSONToFile(`${CLONE_DIR}/package.json`, packageJSON);

        spinner.succeed('Template adjusted successfully!');


    }
    catch (error) {
        if (spinner) {
            spinner.fail('❌ Something went wrong: ' + error.message);
        } else {
            console.error('❌ Something went wrong: ' + error.message);
        }
    }
}