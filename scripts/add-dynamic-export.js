#!/usr/bin/env node

/**
 * Script pour ajouter 'export const dynamic = "force-dynamic";' 
 * aux routes API qui utilisent createClient de @/lib/supabase/server
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const API_DIR = path.join(process.cwd(), 'app', 'api');

function findRouteFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      files.push(...findRouteFiles(fullPath));
    } else if (entry.name === 'route.ts' || entry.name === 'route.js') {
      files.push(fullPath);
    }
  }
  
  return files;
}

function needsDynamicExport(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Vérifier si le fichier utilise createClient de server
  const usesServerClient = content.includes('@/lib/supabase/server') || 
                          content.includes('createClient') ||
                          content.includes('cookies');
  
  // Vérifier si dynamic n'est pas déjà exporté
  const hasDynamic = content.includes('export const dynamic');
  
  return usesServerClient && !hasDynamic;
}

function addDynamicExport(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Trouver la position après les imports
  const importEnd = content.lastIndexOf('import');
  if (importEnd === -1) return false;
  
  const nextLine = content.indexOf('\n', importEnd);
  if (nextLine === -1) return false;
  
  // Vérifier si dynamic existe déjà
  if (content.includes('export const dynamic')) {
    return false;
  }
  
  // Ajouter après les imports
  const before = content.substring(0, nextLine + 1);
  const after = content.substring(nextLine + 1);
  
  const newContent = before + 
    '\n// Force dynamic rendering (required for cookies)\n' +
    'export const dynamic = \'force-dynamic\';\n' +
    after;
  
  fs.writeFileSync(filePath, newContent, 'utf8');
  return true;
}

// Trouver tous les fichiers route.ts
const routeFiles = findRouteFiles(API_DIR);
console.log(`Found ${routeFiles.length} route files`);

let updated = 0;
for (const file of routeFiles) {
  if (needsDynamicExport(file)) {
    if (addDynamicExport(file)) {
      console.log(`✓ Updated: ${path.relative(process.cwd(), file)}`);
      updated++;
    }
  }
}

console.log(`\nUpdated ${updated} files`);

