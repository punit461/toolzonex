'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Chip, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface StatusCode {
  code: number;
  phrase: string;
  description: string;
}

const STATUS_CODES: StatusCode[] = [
  { code: 100, phrase: 'Continue', description: 'The initial part of a request has been received and the client should continue sending the rest.' },
  { code: 101, phrase: 'Switching Protocols', description: 'The server is switching protocols as requested by the client, such as upgrading to WebSocket.' },
  { code: 102, phrase: 'Processing', description: 'The server has received the request and is processing it, but no response is available yet.' },
  { code: 103, phrase: 'Early Hints', description: 'Used to return some response headers before the final HTTP message, such as preload hints.' },
  { code: 200, phrase: 'OK', description: 'The request succeeded and the response contains the requested data.' },
  { code: 201, phrase: 'Created', description: 'The request succeeded and a new resource was created as a result.' },
  { code: 202, phrase: 'Accepted', description: 'The request has been accepted for processing, but processing is not yet complete.' },
  { code: 203, phrase: 'Non-Authoritative Information', description: 'The returned metadata is not exactly the same as from the origin server, often via a proxy.' },
  { code: 204, phrase: 'No Content', description: 'The request succeeded but there is no content to return, such as after a successful delete.' },
  { code: 205, phrase: 'Reset Content', description: 'Tells the client to reset the document that sent the request, such as clearing a form.' },
  { code: 206, phrase: 'Partial Content', description: 'Used when a range request returns only part of a resource, common in video streaming and downloads.' },
  { code: 300, phrase: 'Multiple Choices', description: 'The request has more than one possible response, and the client should choose one.' },
  { code: 301, phrase: 'Moved Permanently', description: 'The requested resource has been permanently moved to a new URL.' },
  { code: 302, phrase: 'Found', description: 'The resource temporarily resides at a different URL; the original URL should still be used for future requests.' },
  { code: 303, phrase: 'See Other', description: 'The response to the request can be found at another URL using a GET request.' },
  { code: 304, phrase: 'Not Modified', description: 'The resource has not changed since the last request, so the client can use its cached version.' },
  { code: 305, phrase: 'Use Proxy', description: 'The requested resource must be accessed through the proxy given in the response (deprecated).' },
  { code: 307, phrase: 'Temporary Redirect', description: 'The resource is temporarily at a different URL, and the same request method must be reused.' },
  { code: 308, phrase: 'Permanent Redirect', description: 'The resource has permanently moved to a new URL, and the same request method must be reused.' },
  { code: 400, phrase: 'Bad Request', description: 'The server cannot process the request due to a client error, such as malformed syntax.' },
  { code: 401, phrase: 'Unauthorized', description: 'Authentication is required and has either failed or not been provided.' },
  { code: 402, phrase: 'Payment Required', description: 'Reserved for future use; originally intended for digital payment systems.' },
  { code: 403, phrase: 'Forbidden', description: 'The server understood the request but refuses to authorize it, regardless of authentication.' },
  { code: 404, phrase: 'Not Found', description: 'The server cannot find the requested resource.' },
  { code: 405, phrase: 'Method Not Allowed', description: 'The request method is known by the server but is not supported by the target resource.' },
  { code: 406, phrase: 'Not Acceptable', description: 'The server cannot produce a response matching the list of acceptable formats given by the client.' },
  { code: 407, phrase: 'Proxy Authentication Required', description: 'The client must first authenticate itself with the proxy.' },
  { code: 408, phrase: 'Request Timeout', description: 'The server timed out waiting for the request from the client.' },
  { code: 409, phrase: 'Conflict', description: 'The request conflicts with the current state of the target resource, such as an edit conflict.' },
  { code: 410, phrase: 'Gone', description: 'The requested resource is no longer available and will not be available again.' },
  { code: 411, phrase: 'Length Required', description: 'The server refuses to accept the request without a defined Content-Length header.' },
  { code: 412, phrase: 'Precondition Failed', description: 'One or more conditions in the request headers were not met by the server.' },
  { code: 413, phrase: 'Payload Too Large', description: 'The request body is larger than the server is willing or able to process.' },
  { code: 414, phrase: 'URI Too Long', description: 'The requested URI is longer than the server is willing to interpret.' },
  { code: 415, phrase: 'Unsupported Media Type', description: 'The request payload format is not supported by the server for this method or resource.' },
  { code: 416, phrase: 'Range Not Satisfiable', description: 'The requested byte range cannot be fulfilled for the target resource.' },
  { code: 417, phrase: 'Expectation Failed', description: 'The expectation given in the request Expect header could not be met by the server.' },
  { code: 418, phrase: "I'm a Teapot", description: 'A well-known April Fools joke status code from RFC 2324, indicating the server refuses to brew coffee because it is a teapot.' },
  { code: 421, phrase: 'Misdirected Request', description: 'The request was directed at a server that is not able to produce a response for this combination of scheme and authority.' },
  { code: 422, phrase: 'Unprocessable Entity', description: 'The request was well-formed but contains semantic errors that prevent it from being processed.' },
  { code: 423, phrase: 'Locked', description: 'The requested resource is locked and cannot currently be accessed.' },
  { code: 424, phrase: 'Failed Dependency', description: 'The request failed because it depended on another request that itself failed.' },
  { code: 425, phrase: 'Too Early', description: 'The server is unwilling to risk processing a request that might be replayed.' },
  { code: 426, phrase: 'Upgrade Required', description: 'The server refuses to perform the request using the current protocol and requires an upgrade.' },
  { code: 428, phrase: 'Precondition Required', description: 'The origin server requires the request to be conditional, to prevent lost updates.' },
  { code: 429, phrase: 'Too Many Requests', description: 'The client has sent too many requests in a given amount of time (rate limiting).' },
  { code: 431, phrase: 'Request Header Fields Too Large', description: 'The server refuses to process the request because its header fields are too large.' },
  { code: 451, phrase: 'Unavailable For Legal Reasons', description: 'The resource is unavailable due to a legal demand, such as government censorship.' },
  { code: 500, phrase: 'Internal Server Error', description: 'The server encountered an unexpected condition that prevented it from fulfilling the request.' },
  { code: 501, phrase: 'Not Implemented', description: 'The server does not support the functionality required to fulfill the request.' },
  { code: 502, phrase: 'Bad Gateway', description: 'The server, acting as a gateway or proxy, received an invalid response from an upstream server.' },
  { code: 503, phrase: 'Service Unavailable', description: 'The server is currently unable to handle the request, often due to maintenance or overload.' },
  { code: 504, phrase: 'Gateway Timeout', description: 'The server, acting as a gateway or proxy, did not receive a timely response from an upstream server.' },
  { code: 505, phrase: 'HTTP Version Not Supported', description: 'The server does not support the HTTP protocol version used in the request.' },
  { code: 506, phrase: 'Variant Also Negotiates', description: 'The server has an internal configuration error involving transparent content negotiation.' },
  { code: 507, phrase: 'Insufficient Storage', description: 'The server is unable to store the representation needed to complete the request.' },
  { code: 508, phrase: 'Loop Detected', description: 'The server detected an infinite loop while processing the request.' },
  { code: 509, phrase: 'Bandwidth Limit Exceeded', description: 'The server has exceeded its bandwidth limit (a common non-standard extension used by some hosts).' },
  { code: 510, phrase: 'Not Extended', description: 'Further extensions to the request are required for the server to fulfill it.' },
  { code: 511, phrase: 'Network Authentication Required', description: 'The client needs to authenticate to gain network access, such as with a captive portal.' },
];

function statusColor(code: number): 'info' | 'success' | 'warning' | 'error' | 'default' {
  if (code < 200) return 'info';
  if (code < 300) return 'success';
  if (code < 400) return 'warning';
  if (code < 500) return 'error';
  return 'error';
}

const HttpStatusCodeLookupContent = () => {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return STATUS_CODES;
    return STATUS_CODES.filter(
      (s) => String(s.code).includes(q) || s.phrase.toLowerCase().includes(q) || s.description.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <Box>
      <TextField
        label="Search by code or keyword"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        fullWidth
        placeholder="e.g. 404, redirect, rate limit"
        sx={{ mb: 3 }}
      />

      <Stack spacing={1.5}>
        {results.length === 0 && (
          <Typography color="text.secondary">No status codes match your search.</Typography>
        )}
        {results.map((s) => (
          <Paper key={s.code} variant="outlined" sx={{ p: 2, display: 'flex', gap: 2, alignItems: 'flex-start' }}>
            <Chip label={s.code} color={statusColor(s.code)} sx={{ fontWeight: 'bold', minWidth: 56 }} />
            <Box>
              <Typography variant="subtitle1" fontWeight={600}>{s.phrase}</Typography>
              <Typography variant="body2" color="text.secondary">{s.description}</Typography>
            </Box>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

const HttpStatusCodeLookup = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the HTTP Status Code Lookup</Typography>
      <Typography variant="body1">
        Search for an HTTP status code by its number (like &quot;404&quot;) or by a keyword (like
        &quot;redirect&quot; or &quot;rate limit&quot;) to see its standard reason phrase and a plain-English
        explanation of when it&apos;s used. The list covers {STATUS_CODES.length} standard status codes
        across the full 1xx-5xx range.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Searching &quot;429&quot; shows <strong>429 Too Many Requests</strong> — returned when a client has
        sent too many requests in a given time window, commonly used for API rate limiting.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Quickly checking what an unfamiliar HTTP status code means while debugging an API.</li>
          <li>Looking up the correct status code to return from your own API for a specific scenario.</li>
          <li>Studying the standard HTTP status code ranges for a course or certification.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What do the different number ranges mean?</strong> 1xx codes are informational, 2xx codes indicate success, 3xx codes indicate redirection, 4xx codes indicate a client error, and 5xx codes indicate a server error — the first digit always tells you the general category.</li>
          <li><strong>Is 418 &quot;I&apos;m a Teapot&quot; a real status code?</strong> Yes — it originates from RFC 2324, an April Fools&apos; joke RFC from 1998 about a Hyper Text Coffee Pot Control Protocol, but it has since been kept in the registry and is occasionally used intentionally by some servers and frameworks as an easter egg.</li>
          <li><strong>Does this list cover every possible status code?</strong> It covers the most commonly referenced standard codes across the full range, including some rarer and non-standard ones like 509. A small number of obscure or vendor-specific codes outside common use may not be included.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/http-status-code-lookup" content={content}>
      <HttpStatusCodeLookupContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default HttpStatusCodeLookup;
