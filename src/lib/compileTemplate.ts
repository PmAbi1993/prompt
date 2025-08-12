export interface FieldValue {
  [key: string]: string | number | boolean;
}

export function compileTemplate(template: string, values: FieldValue): string {
  let compiled = template;
  
  // Replace {{key}} placeholders with sanitized field values
  Object.entries(values).forEach(([key, value]) => {
    const placeholder = new RegExp(`{{${key}}}`, 'g');
    const sanitizedValue = sanitizeValue(value);
    compiled = compiled.replace(placeholder, sanitizedValue);
  });
  
  // Clean up any remaining placeholders
  compiled = compiled.replace(/{{[^}]+}}/g, '');
  
  // Normalize whitespace and newlines
  compiled = compiled.replace(/\n\s*\n\s*\n/g, '\n\n'); // Collapse multiple newlines
  compiled = compiled.trim();
  
  return compiled;
}

function sanitizeValue(value: string | number | boolean): string {
  if (typeof value === 'string') {
    // Escape any potential HTML and normalize whitespace
    return value
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .trim();
  }
  
  return String(value);
}

export function validateTemplate(template: string): { valid: boolean; placeholders: string[] } {
  const placeholderRegex = /{{([^}]+)}}/g;
  const placeholders: string[] = [];
  let match;
  
  while ((match = placeholderRegex.exec(template)) !== null) {
    placeholders.push(match[1].trim());
  }
  
  return {
    valid: placeholders.length > 0,
    placeholders: [...new Set(placeholders)] // Remove duplicates
  };
}
