import type { CoreConfig, CoreResult } from '../index.js';
export interface FunctionDevOptions extends CoreConfig {
    flags: {
        port?: number;
    };
}
export declare function functionDevCore(options: FunctionDevOptions): Promise<CoreResult>;
