import React from 'react';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';

export function About() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          About Prompt Builder
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Learn more about this application and how to extend it.
        </p>
      </div>

      <div className="space-y-8">
        {/* What is Prompt Builder */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            What is Prompt Builder?
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-400">
              Prompt Builder is a fast, static web application that helps you generate high-quality prompts 
              through simple, intuitive forms. Whether you're a developer, writer, marketer, or educator, 
              you can quickly create structured prompts tailored to your specific needs.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              The app is built with modern web technologies (Vite, React, TypeScript) and designed to be 
              fast, accessible, and mobile-friendly. All processing happens client-side, so your data 
              never leaves your browser.
            </p>
          </div>
        </div>

        {/* How to Use */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            How to Use
          </h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-sm font-medium text-blue-600 dark:text-blue-400">
                1
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100">Choose a Template</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Browse the dashboard and select a prompt template that matches your needs.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-sm font-medium text-blue-600 dark:text-blue-400">
                2
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100">Fill the Form</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Complete the simple form with your specific requirements and details.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-sm font-medium text-blue-600 dark:text-blue-400">
                3
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100">Generate & Copy</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Click "Create Prompt" to generate your custom prompt and copy it to your clipboard.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Adding New Prompts */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Adding New Prompts
          </h2>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              Prompt Builder is designed to be easily extensible. To add new prompt templates, 
              simply edit the <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">prompts.config.json</code> file 
              in the <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">src/config/</code> directory.
            </p>
            
            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                Configuration Structure
              </h3>
              <pre className="text-sm text-gray-600 dark:text-gray-400 overflow-x-auto">
{`{
  "id": "unique-id",
  "title": "Display Name",
  "icon": "📝",
  "description": "Brief description",
  "template": "Your template with {{variables}}",
  "fields": [
    {
      "key": "variable",
      "label": "Field Label",
      "type": "text|textarea|select|number",
      "required": true,
      "placeholder": "Helper text"
    }
  ],
  "tags": ["category", "type"]
}`}
              </pre>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                💡 Template Tips
              </h3>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <li>• Use <code>{`{{variable}}`}</code> syntax for dynamic content</li>
                <li>• Variable names must match field keys exactly</li>
                <li>• Support for text, textarea, select, number, checkbox, and radio fields</li>
                <li>• Required fields are validated before prompt generation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Technical Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Built With</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Vite (build tool)</li>
                <li>• React 18 (UI framework)</li>
                <li>• TypeScript (type safety)</li>
                <li>• React Router (routing)</li>
                <li>• Tailwind CSS (styling)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Features</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Hash-based routing</li>
                <li>• Dark/light theme</li>
                <li>• Form draft auto-save</li>
                <li>• Clipboard integration</li>
                <li>• Mobile responsive</li>
                <li>• Accessibility compliant</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Get Started */}
        <div className="text-center">
          <Button onClick={() => navigate('/')} size="lg">
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}
