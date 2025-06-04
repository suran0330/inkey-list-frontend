import { dev } from '../../actions/functions/dev.js';
export async function functionDevCore(options) {
    const { log, flags } = options;
    const { port = 8080 } = flags;
    try {
        await dev(Number(port));
        log(`Server is running on http://localhost:${port}\n`);
        return {
            success: true,
            // hold the line...
            streaming: new Promise(() => { }),
        };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        log(`Error starting server: ${errorMessage}`);
        return {
            success: false,
            error: errorMessage,
        };
    }
}
