export interface FieldConfig {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'number' | 'checkbox' | 'radio';
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: string;
  options?: string[];
  placeholder?: string;
  helpText?: string;
}

export interface PromptConfig {
  id: string;
  title: string;
  icon: string;
  description: string;
  template: string;
  fields: FieldConfig[];
  tags: string[];
}

export interface FormValues {
  [key: string]: string | number | boolean;
}

export interface ValidationError {
  field: string;
  message: string;
}

export type Theme = 'light' | 'dark' | 'system';
