import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Field } from '../components/Field';
import { Preview } from '../components/Preview';
import { useToast } from '../components/Toast';
import { PromptConfig, FormValues } from '../types';
import { validateForm } from '../lib/validation';
import { compileTemplate } from '../lib/compileTemplate';
import { copyToClipboard } from '../lib/clipboard';
import { saveFormDraft, getFormDraft, clearFormDraft } from '../lib/storage';
import promptsConfig from '../config/prompts.config.json';

export function Builder() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  
  const prompt = useMemo(() => {
    const prompts = promptsConfig as PromptConfig[];
    return prompts.find(p => p.id === id);
  }, [id]);

  const [formValues, setFormValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);

  // Load draft on mount
  useEffect(() => {
    if (prompt?.id) {
      const draft = getFormDraft(prompt.id);
      if (draft) {
        setFormValues(draft);
        showToast({
          message: 'Draft restored',
          type: 'info',
          duration: 2000
        });
      }
    }
  }, [prompt?.id]); // Removed showToast from dependencies

  // Save draft on form changes
  useEffect(() => {
    if (prompt?.id && Object.keys(formValues).length > 0) {
      const timeoutId = setTimeout(() => {
        saveFormDraft(prompt.id, formValues);
      }, 1000); // Debounce saves

      return () => clearTimeout(timeoutId);
    }
  }, [formValues, prompt?.id]);

  if (!prompt) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">❓</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Prompt Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The prompt template you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate('/')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const handleFieldChange = (fieldKey: string, value: string | number | boolean) => {
    setFormValues(prev => ({
      ...prev,
      [fieldKey]: value
    }));

    // Clear error for this field
    if (errors[fieldKey]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldKey];
        return newErrors;
      });
    }
  };

  const handleReset = () => {
    setFormValues({});
    setErrors({});
    if (prompt.id) {
      clearFormDraft(prompt.id);
    }
    showToast({
      message: 'Form reset',
      type: 'info',
      duration: 2000
    });
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Validate form
    const validationErrors = validateForm(prompt.fields, formValues);
    if (validationErrors.length > 0) {
      const errorMap = validationErrors.reduce((acc, error) => {
        acc[error.field] = error.message;
        return acc;
      }, {} as Record<string, string>);
      
      setErrors(errorMap);
      setIsGenerating(false);
      showToast({
        message: 'Please fix the errors below',
        type: 'error'
      });
      return;
    }

    // Generate prompt
    const generatedPrompt = compileTemplate(prompt.template, formValues);
    
    // Copy to clipboard
    const result = await copyToClipboard(generatedPrompt);
    
    if (result.ok) {
      showToast({
        message: 'Prompt copied to clipboard!',
        type: 'success'
      });
      
      // Clear draft after successful generation
      if (prompt.id) {
        clearFormDraft(prompt.id);
      }
    } else {
      showToast({
        message: result.error || 'Failed to copy to clipboard',
        type: 'error',
        duration: 5000
      });
    }
    
    setIsGenerating(false);
  };

  const generatedPrompt = useMemo(() => {
    if (Object.keys(formValues).length === 0) return '';
    return compileTemplate(prompt.template, formValues);
  }, [prompt.template, formValues]);

  const hasRequiredFields = prompt.fields.some(field => field.required);
  const requiredFieldsFilled = prompt.fields
    .filter(field => field.required)
    .every(field => {
      const value = formValues[field.key];
      return value !== undefined && value !== '' && value !== null;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 mb-4"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>
        
        <div className="flex items-center space-x-3 mb-2">
          <div className="text-3xl">{prompt.icon}</div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {prompt.title}
          </h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {prompt.description}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              Fill out the form
            </h2>
            
            <div className="space-y-4">
              {prompt.fields.map((field) => (
                <Field
                  key={field.key}
                  field={field}
                  value={formValues[field.key] || ''}
                  onChange={(value) => handleFieldChange(field.key, value)}
                  error={errors[field.key]}
                />
              ))}
            </div>

            <div className="flex space-x-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                onClick={handleGenerate}
                loading={isGenerating}
                disabled={hasRequiredFields && !requiredFieldsFilled}
                className="flex-1"
              >
                Create Prompt
              </Button>
              <Button
                variant="secondary"
                onClick={handleReset}
                disabled={Object.keys(formValues).length === 0}
              >
                Reset
              </Button>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
            <Preview
              content={generatedPrompt}
              onCopy={() => {
                if (prompt.id) {
                  clearFormDraft(prompt.id);
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
