import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { PromptConfig } from '../types';
import promptsConfig from '../config/prompts.config.json';

export function Dashboard() {
  const navigate = useNavigate();
  const prompts = promptsConfig as PromptConfig[];

  const handlePromptSelect = (promptId: string) => {
    navigate(`/builder/${promptId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Prompt Builder
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Choose a prompt template to get started. Fill out a simple form and generate high-quality prompts in seconds.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prompts.map((prompt) => (
          <Card
            key={prompt.id}
            prompt={prompt}
            onClick={() => handlePromptSelect(prompt.id)}
          />
        ))}
      </div>

      {prompts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            No prompts available
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Add some prompt configurations to get started.
          </p>
        </div>
      )}
    </div>
  );
}
