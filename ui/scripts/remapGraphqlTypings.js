/* eslint-disable */
const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');
const interfacePattern = /export (?:interface|enum)\s*(.*?)\s*{/g;
const argv = process.argv.slice(2);
const args = argv.reduce((result, current) => {
    const [key, value] = current.split('=');
    if (key && value) {
        result[key] = value;
    }
    return result;
}, {});
const getMappings = async () => {
    if (args.mappings && (await fs.pathExists(args.mappings))) {
        const mappingsContent = await fs.readFile(args.mappings, 'UTF8');
        const mappings = mappingsContent
            .split(/[\r\n]/)
            .filter((line) => !!line && !line.startsWith('//') && line.includes('='))
            .reduce((result, current) => {
                const [before, after] = current.split('=');
                if (before && after) {
                    result[before] = after;
                }
                return result;
            }, {});
        console.log(`Parsed ${Object.keys(mappings).length} mapping(s)`);
        return mappings;
    }
    return [];
};
const convertLineIfNecessary = (line, mappings, refactoredWords) => {
    const match = interfacePattern.exec(line);
    if (match && match.length) {
        const interfaceName = match[1];
        let replacement = _.upperFirst(interfaceName.includes('_') ? _.camelCase(interfaceName) : interfaceName);
        if (mappings[replacement]) {
            replacement = mappings[replacement];
        }
        refactoredWords.push([interfaceName, replacement]);
        line = line.replace(interfaceName, replacement);
    }
    return line;
};
const getResultString = async (mappings) => {
    if (args.input && (await fs.pathExists(args.input))) {
        const originalContent = await fs.readFile(args.input, 'UTF8');
        const lines = originalContent.split(/[\n]/);
        let resultString = '';
        let changes = 0;
        const refactoredWords = []; // [ [before, after], [before, after], ... ]
        for (const line of lines) {
            const outputLine = convertLineIfNecessary(line, mappings, refactoredWords);
            if (line !== outputLine) {
                changes++;
            }
            resultString += `\n${outputLine}`;
        }
        console.log(`Made ${changes} interface name change(s)`);
        for (const [before, after] of refactoredWords) {
            const pattern = new RegExp(String.raw`\s*:\s*(\(?)(ReadonlyArray<\(?)?(\b${before}\b)(\)?>)?`, 'g');
            resultString = resultString.replace(pattern, `: $1$2${after}$4`);
        }
        console.log(`Refactored changes in the rest of the updated file`);
        return resultString;
    }
};
const writeOrPrintResult = async (resultString) => {
    if (args.write && args.write === 'true') {
        if (args.output && (await fs.pathExists(path.dirname(args.output)))) {
            console.log(`Writing output to ${path.resolve(args.output)}`);
            await fs.writeFile(args.output, resultString);
        }
    } else {
        console.log(resultString);
        console.log(
            `\n\n--- This result was not written to file. Use write=true and provide an output path arg to write the result to a file ---`
        );
    }
};
const run = async () => {
    const mappings = await getMappings();
    const resultString = await getResultString(mappings);
    await writeOrPrintResult(resultString);
};
run();
