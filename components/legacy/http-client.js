import http from 'node:http';
import https from 'node:https';

function getTransport(protocol) {
  if (protocol === 'https:') {
    return https;
  }

  if (protocol === 'http:') {
    return http;
  }

  throw new Error(`Unsupported protocol: ${protocol}`);
}

function parseResponseBody(responseBody) {
  if (!responseBody) {
    return null;
  }

  try {
    return JSON.parse(responseBody);
  } catch {
    return responseBody;
  }
}

export function requestJson(method, targetUrl, body, options = {}) {
  const { headers = {}, timeoutMs = 10000 } = options;
  const url = new URL(targetUrl);
  const transport = getTransport(url.protocol);
  const payload = body ? JSON.stringify(body) : null;

  return new Promise((resolve, reject) => {
    const request = transport.request(
      {
        protocol: url.protocol,
        hostname: url.hostname,
        port: url.port || undefined,
        path: `${url.pathname}${url.search}`,
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {}),
          ...headers
        },
        timeout: timeoutMs
      },
      response => {
        let responseBody = '';

        response.setEncoding('utf8');
        response.on('data', chunk => {
          responseBody += chunk;
        });

        response.on('end', () => {
          resolve({
            statusCode: response.statusCode || 500,
            headers: response.headers,
            body: parseResponseBody(responseBody)
          });
        });
      }
    );

    request.on('timeout', () => {
      request.destroy(new Error(`Request timed out after ${timeoutMs}ms`));
    });

    request.on('error', reject);

    if (payload) {
      request.write(payload);
    }

    request.end();
  });
}

export function postJson(targetUrl, body, options = {}) {
  return requestJson('POST', targetUrl, body, options);
}
