function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const CONTENT_TYPES = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>`;

const ROOT_RELS = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>`;

function coreProps(title: string): string {
  const now = new Date().toISOString();
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:title>${escapeXml(title)}</dc:title>
  <dc:creator>ToolZoneX</dc:creator>
  <cp:lastModifiedBy>ToolZoneX</cp:lastModifiedBy>
  <dcterms:created xsi:type="dcterms:W3CDTF">${now}</dcterms:created>
  <dcterms:modified xsi:type="dcterms:W3CDTF">${now}</dcterms:modified>
</cp:coreProperties>`;
}

const APP_PROPS = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties">
  <Application>ToolZoneX PDF to Word</Application>
</Properties>`;

/**
 * Builds the word/document.xml body from per-page plain text, one <w:p> paragraph per line and
 * a page break between PDF pages. This intentionally carries only text — no fonts, layout, or
 * images from the source PDF, since real layout-preserving conversion needs a rendering engine
 * this stack doesn't have.
 */
function buildDocumentXmlBody(pages: string[]): string {
  const parts: string[] = [];
  pages.forEach((pageText, pageIndex) => {
    const lines = pageText.length ? pageText.split('\n') : [''];
    lines.forEach((line) => {
      const runs = line.trim()
        ? `<w:r><w:t xml:space="preserve">${escapeXml(line)}</w:t></w:r>`
        : '<w:r><w:br/></w:r>';
      parts.push(`<w:p>${runs}</w:p>`);
    });
    if (pageIndex < pages.length - 1) {
      parts.push('<w:p><w:r><w:br w:type="page"/></w:r></w:p>');
    }
  });
  return parts.join('\n    ');
}

function documentXml(pages: string[]): string {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    ${buildDocumentXmlBody(pages)}
    <w:sectPr>
      <w:pgSz w:w="12240" w:h="15840"/>
      <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720" w:gutter="0"/>
    </w:sectPr>
  </w:body>
</w:document>`;
}

/** Builds a minimal, valid .docx (Word Open XML) file from per-page plain text using JSZip. */
export async function buildDocxFromPages(pages: string[], title: string): Promise<Uint8Array> {
  type JSZipInstance = import('jszip');
  const JSZipModule: unknown = await import('jszip');
  const JSZipCtor = (JSZipModule as { default?: new () => JSZipInstance }).default ?? (JSZipModule as new () => JSZipInstance);
  const zip = new JSZipCtor();

  zip.file('[Content_Types].xml', CONTENT_TYPES);
  zip.file('_rels/.rels', ROOT_RELS);
  zip.file('docProps/core.xml', coreProps(title));
  zip.file('docProps/app.xml', APP_PROPS);
  zip.file('word/document.xml', documentXml(pages));

  return zip.generateAsync({ type: 'uint8array' });
}
