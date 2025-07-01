// googleDriveService.ts
// Service for Google Drive integration: OAuth, file listing, upload, and subject-folder mapping.
// Uses Google API client (gapi) for browser-based authentication and Drive operations.

// NOTE: This service is intended for use in React apps (browser environment).
// Make sure to load the gapi script in your HTML or dynamically before using these functions.

// Types
export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  parents?: string[];
}

export interface SubjectFolderMap {
  [subject: string]: string; // subject name -> folder ID
}

// Google API config (replace with your own credentials)
const CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';
const API_KEY = 'YOUR_GOOGLE_API_KEY';
const SCOPES = 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.metadata.readonly';
const DISCOVERY_DOCS = [
  'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
];

// --- Google OAuth Authentication ---
export async function initGapi(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject('Not in browser');
    if ((window as any).gapi) {
      (window as any).gapi.load('client:auth2', async () => {
        try {
          await (window as any).gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES,
          });
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    } else {
      reject('gapi not loaded');
    }
  });
}

export function signIn(): Promise<void> {
  return (window as any).gapi.auth2.getAuthInstance().signIn();
}

export function signOut(): Promise<void> {
  return (window as any).gapi.auth2.getAuthInstance().signOut();
}

export function isSignedIn(): boolean {
  return (window as any).gapi.auth2.getAuthInstance().isSignedIn.get();
}

export function getCurrentUser(): any {
  return (window as any).gapi.auth2.getAuthInstance().currentUser.get();
}

// --- List Files and Folders ---
export async function listDriveFiles(query = '', pageSize = 20): Promise<DriveFile[]> {
  const response = await (window as any).gapi.client.drive.files.list({
    q: query,
    pageSize,
    fields: 'files(id, name, mimeType, parents)',
  });
  return response.result.files as DriveFile[];
}

export async function listFolders(): Promise<DriveFile[]> {
  // Only folders
  return listDriveFiles(`mimeType = 'application/vnd.google-apps.folder'`);
}

// --- Upload File to Folder ---
export async function uploadFileToFolder(file: File, folderId: string): Promise<DriveFile> {
  const metadata = {
    name: file.name,
    parents: [folderId],
  };
  const accessToken = (window as any).gapi.auth.getToken().access_token;
  const form = new FormData();
  form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
  form.append('file', file);

  const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,parents', {
    method: 'POST',
    headers: new Headers({ Authorization: 'Bearer ' + accessToken }),
    body: form,
  });
  if (!response.ok) throw new Error('Upload failed');
  return response.json();
}

// --- Subject to Folder Mapping ---
// Example: { Math: 'folderId1', Science: 'folderId2' }
let subjectFolderMap: SubjectFolderMap = {};

export function setSubjectFolderMap(map: SubjectFolderMap) {
  subjectFolderMap = map;
}

export function getFolderIdForSubject(subject: string): string | undefined {
  return subjectFolderMap[subject];
}

// --- Utility: Ensure Folder Exists for Subject ---
export async function ensureFolderForSubject(subject: string, parentId?: string): Promise<string> {
  // Check if folder exists
  const folders = await listDriveFiles(
    `mimeType = 'application/vnd.google-apps.folder' and name = '${subject}'${parentId ? ` and '${parentId}' in parents` : ''}`
  );
  if (folders.length > 0) return folders[0].id;
  // Create folder
  const response = await (window as any).gapi.client.drive.files.create({
    resource: {
      name: subject,
      mimeType: 'application/vnd.google-apps.folder',
      parents: parentId ? [parentId] : undefined,
    },
    fields: 'id',
  });
  return response.result.id;
}

/**
 * Mapping from study subjects to Google Drive folder IDs.
 * Update these IDs to match your actual Drive folder structure.
 */
export const SUBJECT_FOLDER_MAP: SubjectFolderMap = {
  'Anatomy & Histology': 'your-folder-id-1',
  'Physiology': 'your-folder-id-2',
  'Biochemistry': 'your-folder-id-3',
  'Medical Ethics': 'your-folder-id-4',
  // Add more subjects and their corresponding folder IDs as needed
};

// --- Export all functions for React use ---
export default {
  initGapi,
  signIn,
  signOut,
  isSignedIn,
  getCurrentUser,
  listDriveFiles,
  listFolders,
  uploadFileToFolder,
  setSubjectFolderMap,
  getFolderIdForSubject,
  ensureFolderForSubject,
}; 