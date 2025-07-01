import React, { useEffect, useState } from 'react';
import googleDriveService, { DriveFile } from '../services/googleDriveService';

// Props for the modal
interface GoogleDriveModalProps {
  open: boolean;
  onClose: () => void;
  subject: string;
  onFileSelect: (file: DriveFile) => void;
}

// --- Modal Styles for Large, Dark, Modern Look ---
const modalStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const contentStyle: React.CSSProperties = {
  background: '#151a23',
  borderRadius: 16,
  minWidth: 700,
  maxWidth: '90vw',
  color: '#fff',
  boxShadow: '0 8px 40px rgba(0,0,0,0.25)',
  padding: 0,
  position: 'relative',
  fontFamily: 'Inter, sans-serif',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '24px 32px 0 32px',
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
};

const folderIconStyle: React.CSSProperties = {
  color: '#fbbf24',
  fontSize: 32,
  marginRight: 16,
};

const titleBlockStyle: React.CSSProperties = {
  flex: 1,
};

const titleStyle: React.CSSProperties = {
  fontWeight: 700,
  fontSize: 20,
  marginBottom: 2,
  display: 'flex',
  alignItems: 'center',
};

const subtitleStyle: React.CSSProperties = {
  fontSize: 13,
  color: '#cbd5e1',
  marginBottom: 0,
};

const badgeStyle: React.CSSProperties = {
  background: '#dc2626',
  color: '#fff',
  borderRadius: 12,
  padding: '2px 12px',
  fontSize: 13,
  fontWeight: 600,
  marginLeft: 16,
  display: 'flex',
  alignItems: 'center',
};

const closeBtnStyle: React.CSSProperties = {
  position: 'absolute',
  top: 18,
  right: 24,
  background: 'none',
  color: '#fff',
  border: 'none',
  fontSize: 22,
  fontWeight: 700,
  cursor: 'pointer',
  padding: 0,
  lineHeight: 1,
};

const bodyStyle: React.CSSProperties = {
  padding: '32px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: 320,
};

const refreshBtnStyle: React.CSSProperties = {
  background: 'none',
  border: '1px solid #3b82f6',
  color: '#fff',
  borderRadius: 8,
  padding: '6px 18px',
  fontWeight: 600,
  fontSize: 16,
  cursor: 'pointer',
  marginBottom: 24,
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  alignSelf: 'flex-start',
};

const centerIconStyle: React.CSSProperties = {
  fontSize: 48,
  color: '#64748b',
  marginBottom: 16,
};

const centerTextStyle: React.CSSProperties = {
  textAlign: 'center',
  fontSize: 20,
  fontWeight: 600,
  marginBottom: 8,
};

const centerSubTextStyle: React.CSSProperties = {
  textAlign: 'center',
  fontSize: 15,
  color: '#cbd5e1',
  marginBottom: 16,
};

const listStyle: React.CSSProperties = {
  textAlign: 'left',
  color: '#cbd5e1',
  fontSize: 15,
  margin: '0 auto',
  maxWidth: 420,
};

/**
 * GoogleDriveModal
 * A reusable modal for browsing, selecting, and uploading files to DataBase for a given subject.
 * Handles authentication, file listing, and upload. Integrates with googleDriveService.
 */
const GoogleDriveModal: React.FC<GoogleDriveModalProps> = ({ open, onClose, subject, onFileSelect }) => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Load gapi and authenticate if needed
  useEffect(() => {
    if (!open) return;
    setError(null);
    setLoading(true);
    googleDriveService
      .initGapi()
      .then(() => {
        if (!googleDriveService.isSignedIn()) {
          return googleDriveService.signIn();
        }
      })
      .then(() => loadFiles())
      .catch(() => {
        setError('DataBase authentication failed.');
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, subject]);

  // Load files for the subject's folder
  const loadFiles = async () => {
    setLoading(true);
    setError(null);
    try {
      // Ensure folder exists for subject
      const folderId = await googleDriveService.ensureFolderForSubject(subject);
      // List files in the folder
      const files = await googleDriveService.listDriveFiles(`'${folderId}' in parents`);
      setFiles(files);
    } catch {
      setError('Failed to load files from DataBase.');
    } finally {
      setLoading(false);
    }
  };

  // Handle file selection
  const handleFileClick = (file: DriveFile) => {
    onFileSelect(file);
    onClose();
  };

  // Handle file upload
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    setError(null);
    try {
      const file = e.target.files[0];
      const folderId = await googleDriveService.ensureFolderForSubject(subject);
      await googleDriveService.uploadFileToFolder(file, folderId);
      await loadFiles(); // Refresh list
    } catch {
      setError('File upload failed.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  if (!open) return null;

  return (
    <div style={modalStyle}>
      <div style={contentStyle}>
        {/* Header with icon, title, subtitle, badge, close */}
        <div style={headerStyle}>
          <span style={folderIconStyle}>
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path fill="#fbbf24" d="M2 6.5A2.5 2.5 0 0 1 4.5 4h3.879a2.5 2.5 0 0 1 1.768.732l1.586 1.586A.5.5 0 0 0 12.207 7H19.5A2.5 2.5 0 0 1 22 9.5v8A2.5 2.5 0 0 1 19.5 20h-15A2.5 2.5 0 0 1 2 17.5v-11Z"/></svg>
          </span>
          <div style={titleBlockStyle}>
            <div style={titleStyle}>DataBase - {subject}</div>
            <div style={subtitleStyle}>Access and manage your study materials in DataBase (Subject-specific folder)</div>
          </div>
          <span style={badgeStyle}><span style={{fontSize:18,marginRight:6}}>●</span>Not Connected</span>
          <button style={closeBtnStyle} onClick={onClose} title="Close">×</button>
        </div>
        {/* Body with refresh, center icon, info/error */}
        <div style={bodyStyle}>
          <button style={refreshBtnStyle}>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path fill="#3b82f6" d="M17.65 6.35A7.95 7.95 0 0 0 12 4V1l-4 4 4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8a1 1 0 1 0 1.74 1A7.98 7.98 0 0 0 20 12c0-2.21-.9-4.21-2.35-5.65ZM6 12c0-1.01.25-1.97.7-2.8a1 1 0 1 0-1.74-1A7.98 7.98 0 0 0 4 12c0 2.21.9 4.21 2.35 5.65A7.95 7.95 0 0 0 12 20v3l4-4-4-4v3c-3.31 0-6-2.69-6-6Z"/></svg>
            Refresh
          </button>
          <div style={centerIconStyle}>
            <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#64748b" strokeWidth="2" fill="none"/><path d="M12 8v4" stroke="#64748b" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="16" r="1" fill="#64748b"/></svg>
          </div>
          <div style={centerTextStyle}>DataBase Not Available</div>
          <div style={centerSubTextStyle}>DataBase integration is not configured for this deployment.</div>
          <ul style={listStyle}>
            <li>• Add <b>NEXT_PUBLIC_GOOGLE_CLIENT_ID</b> to environment variables</li>
            <li>• Add <b>NEXT_PUBLIC_GOOGLE_API_KEY</b> to environment variables</li>
            <li>• Configure OAuth in Google Cloud Console</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GoogleDriveModal; 