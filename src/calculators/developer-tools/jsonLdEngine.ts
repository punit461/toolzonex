export interface JsonLdResult {
  output: string;
  error?: string;
}

const REMOTE_CONTEXT_ERROR =
  'This tool only works with an inline @context object. A remote @context URL (e.g. "https://schema.org/") would require a live network fetch, which isn\'t reliable in a browser-based tool (it depends on the target server allowing CORS). Replace the URL with the equivalent context as a JSON object.';

async function loadJsonLd(): Promise<any> {
  const mod = await import('jsonld');
  return (mod as { default?: unknown }).default ?? mod;
}

const offlineDocumentLoader = async (url: string) => {
  throw new Error(`Remote @context/document loading is disabled in this tool (attempted to load "${url}").`);
};

function containsRemoteContext(value: unknown): boolean {
  if (Array.isArray(value)) return value.some(containsRemoteContext);
  if (value && typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    if ('@context' in obj) {
      const ctx = obj['@context'];
      const ctxList = Array.isArray(ctx) ? ctx : [ctx];
      if (ctxList.some((c) => typeof c === 'string' && /^https?:\/\//i.test(c))) return true;
    }
    return Object.values(obj).some(containsRemoteContext);
  }
  return false;
}

function parseJson(text: string, label: string): { value?: unknown; error?: string } {
  try {
    return { value: JSON.parse(text) };
  } catch (e) {
    return { error: `Invalid JSON in ${label}: ${e instanceof Error ? e.message : String(e)}` };
  }
}

function processingError(e: unknown): string {
  return `JSON-LD processing failed: ${e instanceof Error ? e.message : String(e)}`;
}

export async function jsonLdToCompacted(doc: string, context?: string): Promise<JsonLdResult> {
  const parsedDoc = parseJson(doc, 'document');
  if (parsedDoc.error) return { output: '', error: parsedDoc.error };

  let activeContext: unknown;
  if (context && context.trim()) {
    const parsedContext = parseJson(context, 'context');
    if (parsedContext.error) return { output: '', error: parsedContext.error };
    activeContext = parsedContext.value;
  } else {
    const docObj = parsedDoc.value as Record<string, unknown> | null;
    activeContext = docObj && typeof docObj === 'object' && '@context' in docObj ? docObj['@context'] : {};
  }

  if (containsRemoteContext(parsedDoc.value) || containsRemoteContext({ '@context': activeContext })) {
    return { output: '', error: REMOTE_CONTEXT_ERROR };
  }

  try {
    const jsonld = await loadJsonLd();
    const result = await jsonld.compact(parsedDoc.value, activeContext, { documentLoader: offlineDocumentLoader });
    return { output: JSON.stringify(result, null, 2) };
  } catch (e) {
    return { output: '', error: processingError(e) };
  }
}

export async function jsonLdToExpanded(doc: string): Promise<JsonLdResult> {
  const parsedDoc = parseJson(doc, 'document');
  if (parsedDoc.error) return { output: '', error: parsedDoc.error };
  if (containsRemoteContext(parsedDoc.value)) return { output: '', error: REMOTE_CONTEXT_ERROR };

  try {
    const jsonld = await loadJsonLd();
    const result = await jsonld.expand(parsedDoc.value, { documentLoader: offlineDocumentLoader });
    return { output: JSON.stringify(result, null, 2) };
  } catch (e) {
    return { output: '', error: processingError(e) };
  }
}

export async function jsonLdToFlattened(doc: string): Promise<JsonLdResult> {
  const parsedDoc = parseJson(doc, 'document');
  if (parsedDoc.error) return { output: '', error: parsedDoc.error };
  if (containsRemoteContext(parsedDoc.value)) return { output: '', error: REMOTE_CONTEXT_ERROR };

  try {
    const jsonld = await loadJsonLd();
    const result = await jsonld.flatten(parsedDoc.value, null, { documentLoader: offlineDocumentLoader });
    return { output: JSON.stringify(result, null, 2) };
  } catch (e) {
    return { output: '', error: processingError(e) };
  }
}

export async function jsonLdToFramed(doc: string, frame: string): Promise<JsonLdResult> {
  const parsedDoc = parseJson(doc, 'document');
  if (parsedDoc.error) return { output: '', error: parsedDoc.error };
  const parsedFrame = parseJson(frame, 'frame');
  if (parsedFrame.error) return { output: '', error: parsedFrame.error };

  if (containsRemoteContext(parsedDoc.value) || containsRemoteContext(parsedFrame.value)) {
    return { output: '', error: REMOTE_CONTEXT_ERROR };
  }

  try {
    const jsonld = await loadJsonLd();
    const result = await jsonld.frame(parsedDoc.value, parsedFrame.value, { documentLoader: offlineDocumentLoader });
    return { output: JSON.stringify(result, null, 2) };
  } catch (e) {
    return { output: '', error: processingError(e) };
  }
}

export async function jsonLdToNQuads(doc: string): Promise<JsonLdResult> {
  const parsedDoc = parseJson(doc, 'document');
  if (parsedDoc.error) return { output: '', error: parsedDoc.error };
  if (containsRemoteContext(parsedDoc.value)) return { output: '', error: REMOTE_CONTEXT_ERROR };

  try {
    const jsonld = await loadJsonLd();
    const result = await jsonld.toRDF(parsedDoc.value, {
      format: 'application/n-quads',
      documentLoader: offlineDocumentLoader,
    });
    return { output: result };
  } catch (e) {
    return { output: '', error: processingError(e) };
  }
}

export async function jsonLdToNormalized(doc: string): Promise<JsonLdResult> {
  const parsedDoc = parseJson(doc, 'document');
  if (parsedDoc.error) return { output: '', error: parsedDoc.error };
  if (containsRemoteContext(parsedDoc.value)) return { output: '', error: REMOTE_CONTEXT_ERROR };

  try {
    const jsonld = await loadJsonLd();
    const result = await jsonld.normalize(parsedDoc.value, {
      algorithm: 'URDNA2015',
      format: 'application/n-quads',
      documentLoader: offlineDocumentLoader,
    });
    return { output: result };
  } catch (e) {
    return { output: '', error: processingError(e) };
  }
}
