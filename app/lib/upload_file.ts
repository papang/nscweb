'use server';

import fs from 'node:fs/promises';
import path from 'node:path';
import { hash } from 'node:crypto';

export async function uploadFileAction(formData: FormData) {
  const file = formData.get('file') as File;
  
  if (!file || file.size === 0) {
    throw new Error('No file uploaded.');
  }

  const targetPath = '/public/upload';
  const targetImagePath = '/upload';

  // Convert File to Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const uploadDir = path.join(process.cwd(), targetPath);
  await fs.mkdir(uploadDir, { recursive: true });

  const fileext = path.extname(file.name); 
  const hashfilename = hash('sha-1', file.name, 'hex') + fileext; 
  
  const filePath = path.join(uploadDir, hashfilename);
  await fs.writeFile(filePath, buffer);

  return { success: true, filename: hashfilename, filepath: (targetImagePath + "/" + hashfilename) };
}