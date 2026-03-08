import { copyFileSync, readdirSync, rmSync, statSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Utils
import { getFileAsJSON, writeJSONToFile, clearFileContent } from './utils/index.js';

// Constants
import { CLONE_DIR } from './consts/index.js';

// Get __dirname in ES module context (the CLI)
const __dirname = dirname(fileURLToPath(import.meta.url));

export async function clean() {
    const templatesDir = join(__dirname, './templates');

    // Clean MyReactApp.js
    copyFileSync(join(templatesDir, 'MyReactApp.js'), `./src/components/MyReactApp.js`);
    copyFileSync(join(templatesDir, 'AGENT.md'), `./AGENT.md`);
    copyFileSync(join(templatesDir, 'CLAUDE.md'), `./CLAUDE.md`);
    copyFileSync(join(templatesDir, 'GEMINI.md'), `./GEMINI.md`);

    // Clean now-ui.json
    const nowuiJSON = getFileAsJSON(`${CLONE_DIR}/now-ui.json`);
    const componentTag = Object.keys(nowuiJSON.components)[0];
    nowuiJSON.components[componentTag].uiBuilder.description = 'Example description.';
    nowuiJSON.components[componentTag].actions = [];
    nowuiJSON.components[componentTag].properties = [];
    writeJSONToFile(`${CLONE_DIR}/now-ui.json`, nowuiJSON);

    // Cleaning src/components directory
    const componentsDir = './src/components';
    const components = readdirSync(componentsDir);
    for (const component of components) {
        if (statSync(`${componentsDir}/${component}`).isDirectory()) {
            rmSync(`${componentsDir}/${component}`, { recursive: true, force: true });
        }
    }

    // Clear README.md
    clearFileContent(`${CLONE_DIR}/README.md`);

    console.log('Project cleaned successfully!');
}