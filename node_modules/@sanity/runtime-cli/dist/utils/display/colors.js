import chalk from 'chalk';
export { info, niceId, warn, severe } from './presenters.js';
/** @deprecated Use `chalk.bold` directly */
export function bold(str) {
    return chalk.bold(str);
}
/** @deprecated Use `chalk.underline` directly */
export function underline(str) {
    return chalk.underline(str);
}
/** @deprecated Use `chalk.dim` directly */
export function dim(str) {
    return chalk.dim(str);
}
/** @deprecated Use `chalk.blue` directly */
export function blue(str) {
    return chalk.blue(str);
}
/** @deprecated Use `chalk.green` directly */
export function green(str) {
    return chalk.green(str);
}
/** @deprecated Use `chalk.red` directly */
export function red(str) {
    return chalk.red(str);
}
/** @deprecated Use `chalk.yellow` directly */
export function yellow(str) {
    return chalk.yellow(str);
}
