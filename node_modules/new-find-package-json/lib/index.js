"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findSync = exports.find = exports.findAsync = void 0;
const path = require("path");
const fs_1 = require("fs");
const debug = require("debug");
const log = debug('new-find-package-json:main');
/**
 * Find "package.json" files, starting from "input"
 * @param input Input Path to start searching from
 * @param base Base path, combined with input to form an absolute path (default: `process.cwd()`)
 * @param fileName The filename to search for (default: `package.json`)
 */
async function* findAsync(input, base, fileName) {
    log(`findSync: called with "${input}" and "${base}" and "${fileName}"`);
    base = !!base ? base : '';
    const useFileName = !!fileName ? fileName : 'package.json';
    const useBase = !!base || path.isAbsolute(base) ? base : process.cwd();
    let testPath = path.resolve(useBase, input);
    let wasRoot = false;
    while (testPath) {
        // Exectue search for "package.json" even on "/" | "C:"
        if (testPath === path.parse(testPath).root) {
            wasRoot = true;
        }
        const testFile = path.resolve(testPath, useFileName);
        log(`findSync: testing path "${testFile}"`);
        const result = await statPathAsync(testFile);
        if (!!result && result.isFile()) {
            log(`findSync: path exists and is file "${testFile}"`);
            yield testFile;
            log(`findSync: after yield`);
        }
        // stop looping after having searched root, because there is no more going up
        if (wasRoot) {
            break;
        }
        testPath = path.resolve(testPath, '..');
    }
}
exports.findAsync = findAsync;
exports.find = findAsync;
/**
 * Find "package.json" files, starting from "input"
 * @param input Input Path to start searching from
 * @param base Base path, combined with input to form an absolute path (default: `process.cwd()`)
 * @param fileName The filename to search for (default: `package.json`)
 */
function* findSync(input, base, fileName) {
    log(`findSync: called with "${input}" and "${base}" and "${fileName}"`);
    base = !!base ? base : '';
    const useFileName = !!fileName ? fileName : 'package.json';
    const useBase = !!base || path.isAbsolute(base) ? base : process.cwd();
    let testPath = path.resolve(useBase, input);
    let wasRoot = false;
    while (testPath) {
        // Exectue search for "package.json" even on "/" | "C:"
        if (testPath === path.parse(testPath).root) {
            wasRoot = true;
        }
        const testFile = path.resolve(testPath, useFileName);
        log(`findSync: testing path "${testFile}"`);
        const result = statPathSync(testFile);
        if (!!result && result.isFile()) {
            log(`findSync: path exists and is file "${testFile}"`);
            yield testFile;
            log(`findSync: after yield`);
        }
        // stop looping after having searched root, because there is no more going up
        if (wasRoot) {
            break;
        }
        testPath = path.resolve(testPath, '..');
    }
}
exports.findSync = findSync;
/**
 * Run "fs.promises.stat", but return "undefined" if error is "ENOENT"
 * follows symlinks
 * @param path The Path to Stat
 * @throws if the error is not "ENOENT"
 */
function statPathSync(path) {
    var _a;
    try {
        return (0, fs_1.statSync)(path);
    }
    catch (err) {
        if (err != undefined && err != null && ((_a = err) === null || _a === void 0 ? void 0 : _a.code) === 'ENOENT') {
            return undefined; // catch the error if the directory dosnt exist, without throwing an error
        }
        throw err;
    }
}
/**
 * Run "fs.promises.stat", but return "undefined" if error is "ENOENT"
 * follows symlinks
 * @param path The Path to Stat
 * @throws if the error is not "ENOENT"
 */
async function statPathAsync(path) {
    return fs_1.promises.stat(path).catch((err) => {
        if (err.code === 'ENOENT') {
            return undefined; // catch the error if the directory dosnt exist, without throwing an error
        }
        throw err;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkJBQTZCO0FBQzdCLDJCQUE2RDtBQUM3RCwrQkFBK0I7QUFFL0IsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7QUFFaEQ7Ozs7O0dBS0c7QUFDSSxLQUFLLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFhLEVBQUUsSUFBYSxFQUFFLFFBQWlCO0lBQzlFLEdBQUcsQ0FBQywwQkFBMEIsS0FBSyxVQUFVLElBQUksVUFBVSxRQUFRLEdBQUcsQ0FBQyxDQUFDO0lBRXhFLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUMxQixNQUFNLFdBQVcsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQztJQUMzRCxNQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3ZFLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzVDLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQztJQUVwQixPQUFPLFFBQVEsRUFBRTtRQUNmLHVEQUF1RDtRQUN2RCxJQUFJLFFBQVEsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRTtZQUMxQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1NBQ2hCO1FBRUQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsV0FBVyxD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