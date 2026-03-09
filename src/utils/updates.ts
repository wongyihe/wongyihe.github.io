import React from 'react';
import { parseUpdatesMarkdown } from './markdownToReact';
import updatesMarkdown from '../data/updates.md?raw';

export const updates: React.ReactNode[] = parseUpdatesMarkdown(updatesMarkdown);
