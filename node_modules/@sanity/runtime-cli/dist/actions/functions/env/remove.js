import config from '../../../config.js';
import getHeaders from '../../../utils/get-headers.js';
const { apiUrl } = config;
export async function remove(id, key, auth) {
    const response = await fetch(`${apiUrl}vX/functions/${id}/envvars/${key}`, {
        headers: getHeaders(auth),
        method: 'DELETE',
    });
    const json = response.ok ? undefined : await response.json();
    return {
        ok: response.ok,
        error: response.ok ? null : json?.error?.message,
    };
}
