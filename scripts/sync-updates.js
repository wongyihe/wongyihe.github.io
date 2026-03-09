#!/usr/bin/env node

/**
 * Script to sync updates.md content into updates.ts
 * Run this script whenever you update updates.md
 * Usage: node scripts/sync-updates.js
 */

const fs = require('fs');
const path = require('path');

const markdownPath = path.join(__dirname, '../src/data/updates.md');
const tsPath = path.join(__dirname, '../src/data/updates.ts');

// Read the markdown file
const markdownContent = fs.readFileSync(markdownPath, 'utf-8');

// Escape the markdown content for use in a template string
const escapedContent = markdownContent
  .replace(/`/g, '\\`')
  .replace(/\${/g, '\\${');

// Generate the TypeScript file content
const tsContent = `import React from 'react';

// Simple markdown parser that converts markdown links to React elements
function parseMarkdownToNode(markdown: string): React.ReactNode {
  // Parse markdown links: [text](url)
  const linkRegex = /\\[([^\\]]+)\\]\\(([^)]+)\\)/g;
  const parts: (string | React.ReactElement)[] = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(markdown)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push(markdown.slice(lastIndex, match.index));
    }
    
    // Add the link element
    parts.push(
      React.createElement(
        'a',
        {
          key: match.index,
          href: match[2],
          target: '_blank',
          rel: 'noopener noreferrer',
          className: 'underline hover:text-gray-600',
        },
        match[1]
      )
    );
    
    lastIndex = linkRegex.lastIndex;
  }
  
  // Add remaining text after the last link
  if (lastIndex < markdown.length) {
    parts.push(markdown.slice(lastIndex));
  }
  
  // If no links found, return the original string
  if (parts.length === 0) {
    return markdown;
  }
  
  // Return a fragment with all parts
  return React.createElement(React.Fragment, null, ...parts);
}

// Markdown content - AUTO-GENERATED from updates.md
// DO NOT EDIT THIS DIRECTLY - edit updates.md instead and run: npm run sync-updates
const updatesMarkdown = \`${escapedContent}\`;

// Parse markdown content into React nodes
function parseMarkdownToNodes(markdown: string): React.ReactNode[] {
  // Split by lines and process
  const lines = markdown.split('\\n').map(l => l.trim()).filter(l => l.length > 0);
  const updates: React.ReactNode[] = [];
  
  for (const line of lines) {
    // Skip markdown headers
    if (line.startsWith('#') && !line.includes(' - ')) {
      continue;
    }
    
    // If line has a date header format (## Date), extract date and content
    if (line.startsWith('## ')) {
      const parts = line.split('\\n');
      if (parts.length >= 2) {
        const date = parts[0].replace('## ', '');
        const content = parts.slice(1).join(' ');
        updates.push(parseMarkdownToNode(\`\${content} - \${date}\`));
        continue;
      }
    }
    
    // Otherwise, treat each line as an update (dates may be at the end with " - ")
    updates.push(parseMarkdownToNode(line));
  }
  
  return updates;
}

export const updates: React.ReactNode[] = parseMarkdownToNodes(updatesMarkdown);
`;

// Write the TypeScript file
fs.writeFileSync(tsPath, tsContent, 'utf-8');

console.log('✅ Successfully synced updates.md to updates.ts');
