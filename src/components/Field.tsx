import React from 'react';
import { FieldConfig } from '../types';

interface FieldProps {
  field: FieldConfig;
  value: string | number | boolean;
  onChange: (value: string | number | boolean) => void;
  error?: string;
}

export function Field({ field, value, onChange, error }: FieldProps) {
  const { key, label, type, required, min, max, options, placeholder, helpText } = field;
  
  const baseInputClasses = 'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors';
  const errorClasses = error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600';
  const inputClasses = `${baseInputClasses} ${errorClasses} bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`;

  const renderInput = () => {
    switch (type) {
      case 'text':
        return (
          <input
            type="text"
            id={key}
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={inputClasses}
            required={required}
            minLength={min}
            maxLength={max}
          />
        );

      case 'textarea':
        return (
          <textarea
            id={key}
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`${inputClasses} min-h-[100px] resize-y`}
            required={required}
            minLength={min}
            maxLength={max}
            rows={4}
          />
        );

      case 'select':
        return (
          <select
            id={key}
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            className={inputClasses}
            required={required}
          >
            <option value="">Select {label.toLowerCase()}...</option>
            {options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'number':
        return (
          <input
            type="number"
            id={key}
            value={value as number}
            onChange={(e) => onChange(Number(e.target.value))}
            placeholder={placeholder}
            className={inputClasses}
            required={required}
            min={min}
            max={max}
          />
        );

      case 'checkbox':
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              id={key}
              checked={value as boolean}
              onChange={(e) => onChange(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor={key} className="ml-2 text-sm text-gray-900 dark:text-gray-100">
              {label}
            </label>
          </div>
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {options?.map((option) => (
              <div key={option} className="flex items-center">
                <input
                  type="radio"
                  id={`${key}-${option}`}
                  name={key}
                  value={option}
                  checked={value === option}
                  onChange={(e) => onChange(e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor={`${key}-${option}`} className="ml-2 text-sm text-gray-900 dark:text-gray-100">
                  {option}
                </label>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  if (type === 'checkbox') {
    return (
      <div className="space-y-1">
        {renderInput()}
        {helpText && (
          <p className="text-xs text-gray-500 dark:text-gray-400">{helpText}</p>
        )}
        {error && (
          <p className="text-xs text-red-600 dark:text-red-400" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <label htmlFor={key} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderInput()}
      {helpText && (
        <p className="text-xs text-gray-500 dark:text-gray-400">{helpText}</p>
      )}
      {error && (
        <p className="text-xs text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
