/**
 * main.ts - make.fun ai-happy-01 entry publisher
 * 
 * This program copies entry.png from the current directory to the destination output directory.
 * Output directory is specified by MAKEFUN_OUTPUT_DIR environment variable, or defaults to /output.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';

function main() {
    const outputDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
    const sourceFile = path.join(import.meta.dirname || __dirname, 'entry.png');
    const targetFile = path.join(outputDir, 'entry.png');

    if (!fs.existsSync(sourceFile)) {
        console.error(`Error: Source file ${sourceFile} does not exist.`);
        process.exit(1);
    }

    // Ensure output directory exists
    fs.mkdirSync(outputDir, { recursive: true });

    // Copy file synchronously
    fs.copyFileSync(sourceFile, targetFile);

    // Integrity check
    const sourceStat = fs.statSync(sourceFile);
    const targetStat = fs.statSync(targetFile);
    if (sourceStat.size !== targetStat.size) {
        console.error(`Error: File size mismatch. Source size (${sourceStat.size}) does not match target size (${targetStat.size}).`);
        process.exit(1);
    }
}

main();
