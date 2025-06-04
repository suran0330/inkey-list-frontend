import type { AuthParams } from '../types.js';
export interface LogStreamingConfig {
    stackId: string;
    after?: string;
    auth: AuthParams;
    showBanner?: boolean;
    log: (message: string) => void;
}
/**
 * Sets up log streaming for operations like deploy or destroy with spinner integration
 * @param config Configuration for log streaming
 * @returns A cleanup function for closing the log stream
 */
export declare function setupLogStreaming(config: LogStreamingConfig): Promise<() => void>;
