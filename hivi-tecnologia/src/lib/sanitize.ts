import sanitizeHtml from 'sanitize-html';

// Tags and attributes allowed in blog post content.
// Blocks <script>, <iframe>, inline event handlers (onerror, onclick, etc.)
// and javascript: URLs on all attributes.
const ALLOWED_TAGS = [
  'h2', 'h3', 'h4',
  'p', 'br', 'hr',
  'strong', 'em', 'u', 's', 'code', 'pre', 'blockquote',
  'ul', 'ol', 'li',
  'a', 'img',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'figure', 'figcaption',
];

const ALLOWED_ATTRIBUTES: sanitizeHtml.IOptions['allowedAttributes'] = {
  a: ['href', 'title', 'target', 'rel'],
  img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
  td: ['colspan', 'rowspan'],
  th: ['colspan', 'rowspan'],
  '*': ['class'],
};

export function sanitizePostHtml(dirty: string): string {
  return sanitizeHtml(dirty, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRIBUTES,
    allowedSchemes: ['https', 'mailto'],
    allowedSchemesByTag: {
      img: ['https', 'data'],
    },
    // Force rel="noopener noreferrer" on all external links
    transformTags: {
      a: (tagName, attribs) => ({
        tagName,
        attribs: {
          ...attribs,
          rel: 'noopener noreferrer',
          ...(attribs.href?.startsWith('http') ? { target: '_blank' } : {}),
        },
      }),
    },
  });
}
