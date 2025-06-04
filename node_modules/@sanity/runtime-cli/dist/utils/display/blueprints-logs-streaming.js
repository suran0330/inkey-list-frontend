import chalk from 'chalk';
import { isNewerLog, streamLogs } from '../../actions/blueprints/logs.js';
import { formatLogEntry } from './logs-formatting.js';
/**
 * Sets up log streaming for operations like deploy or destroy with spinner integration
 * @param config Configuration for log streaming
 * @returns A cleanup function for closing the log stream
 */
export async function setupLogStreaming(config) {
    const { stackId, auth, log, showBanner, after } = config;
    let newestTimestamp = new Date().getTime();
    const onLogReceived = (logEntry) => {
        if (!isNewerLog(logEntry, newestTimestamp))
            return;
        newestTimestamp = new Date(logEntry.timestamp).getTime();
        log(formatLogEntry(logEntry, true));
    };
    const onStreamOpen = () => {
        if (showBanner)
            log(`Streaming logs... ${chalk.bold('ctrl+c')} to cancel`);
    };
    const onStreamError = (error) => {
        log(`${chalk.yellow('Stream error:')} ${error}`);
    };
    return streamLogs({
        stackId,
        after,
        auth,
        onLog: onLogReceived,
        onOpen: onStreamOpen,
        onError: onStreamError,
    });
}
