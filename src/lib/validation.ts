export interface ValidationError {
  field: string;
  message: string;
}

export interface FieldConfig {
  key: string;
  label: string;
  type: string;
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: string;
  options?: string[];
  placeholder?: string;
  helpText?: string;
}

export function validateField(field: FieldConfig, value: any): ValidationError | null {
  const { key, label, type, required, min, max, pattern, options } = field;
  
  // Check required fields
  if (required && (!value || (typeof value === 'string' && value.trim() === ''))) {
    return { field: key, message: `${label} is required` };
  }
  
  // Skip validation if field is empty and not required
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return null;
  }
  
  // Type-specific validation
  switch (type) {
    case 'text':
    case 'textarea':
      if (typeof value !== 'string') {
        return { field: key, message: `${label} must be text` };
      }
      if (min && value.length < min) {
        return { field: key, message: `${label} must be at least ${min} characters` };
      }
      if (max && value.length > max) {
        return { field: key, message: `${label} must be no more than ${max} characters` };
      }
      if (pattern && !new RegExp(pattern).test(value)) {
        return { field: key, message: `${label} format is invalid` };
      }
      break;
      
    case 'number':
      const numValue = Number(value);
      if (isNaN(numValue)) {
        return { field: key, message: `${label} must be a number` };
      }
      if (min !== undefined && numValue < min) {
        return { field: key, message: `${label} must be at least ${min}` };
      }
      if (max !== undefined && numValue > max) {
        return { field: key, message: `${label} must be no more than ${max}` };
      }
      break;
      
    case 'select':
      if (options && !options.includes(String(value))) {
        return { field: key, message: `${label} must be one of: ${options.join(', ')}` };
      }
      break;
      
    case 'checkbox':
      if (typeof value !== 'boolean') {
        return { field: key, message: `${label} must be checked or unchecked` };
      }
      break;
  }
  
  return null;
}

export function validateForm(fields: FieldConfig[], values: Record<string, any>): ValidationError[] {
  const errors: ValidationError[] = [];
  
  fields.forEach(field => {
    const error = validateField(field, values[field.key]);
    if (error) {
      errors.push(error);
    }
  });
  
  return errors;
}
