import React, { useRef } from 'react';
import { Button } from './Button';
import { copyToClipboard, selectText } from '../lib/clipboard';
import { useToast } from './Toast';

interface PreviewProps {
  content: string;
  onCopy?: () => void;
}

export function Preview({ content, onCopy }: PreviewProps) {
  const previewRef = useRef<HTMLPreElement>(null);
  const { showToast } = useToast();

  const handleCopy = async () => {
    const result = await copyToClipboard(content);
    
    if (result.ok) {
      showToast({
        message: 'Copied to clipboard!',
        type: 'success'
      });
      onCopy?.();
    } else {
      // Show fallback instructions
      showToast({
        message: 'Please manually copy the text below',
        type: 'error',
        duration: 5000
      });
      
      // Focus and select the text for manual copying
      if (previewRef.current) {
        previewRef.current.focus();
        selectText(previewRef.current);
      }
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Preview
        </h3>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleCopy}
          disabled={!content.trim()}
        >
          Copy
        </Button>
      </div>
      
      <div className="relative">
        <pre
          ref={previewRef}
          className="w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-gray-100 whitespace-pre-wrap font-mono max-h-96 overflow-y-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
          tabIndex={0}
          role="textbox"
          aria-label="Generated prompt preview"
          aria-readonly="true"
        >
          {content || 'Your generated prompt will appear here...'}
        </pre>
        
        {!content.trim() && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              Fill out the form to see your prompt preview
            </p>
          </div>
        )}
      </div>
      
      {content.trim() && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Click "Copy" or select the text above to copy manually
        </p>
      )}
    </div>
  );
}
