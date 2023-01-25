/**
 * Find "package.json" files, starting from "input"
 * @param input Input Path to start searching from
 * @param base Base path, combined with input to form an absolute path (default: `process.cwd()`)
 * @param fileName The filename to search for (default: `package.json`)
 */
export declare function findAsync(input: string, base?: string, fileName?: string): AsyncGenerator<string, void, void>;
export declare const find: typeof findAsync;
/**
 * Find "package.json" files, starting from "input"
 * @param input Input Path to start searching from
 * @param base Base path, combined with input to form an absolute path (default: `process.cwd()`)
 * @param fileName The filename to search for (default: `package.json`)
 */
export declare function findSync(input: string, base?: string, fileName?: string): Generator<string, void, void>;
