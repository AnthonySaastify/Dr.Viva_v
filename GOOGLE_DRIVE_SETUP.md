# Google Drive Integration Setup Guide

This guide will help you set up Google Drive integration for your project, including Google Cloud credentials, OAuth configuration, environment variables, and testing.

---

## 1. Set Up Google Cloud Credentials

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project or select your existing project.
3. Navigate to **APIs & Services > Library** and enable:
   - Google Drive API
   - (Optional) Google Sheets API (if using Sheets)
4. Go to **APIs & Services > Credentials**.
5. Click **Create Credentials** and select **OAuth client ID**:
   - Application type: **Web application**
   - Add your local and production URLs to the **Authorized JavaScript origins** (e.g., `http://localhost:3000`, `https://yourdomain.com`).
   - Add your callback URL to **Authorized redirect URIs** (e.g., `http://localhost:3000`, `https://yourdomain.com`).
   - Save and copy the **Client ID** and **Client Secret**.
6. (Optional, for server-to-server or Sheets access) Click **Create Credentials** and select **Service Account**:
   - Follow the prompts and download the JSON key file.
   - Note the **client_email** and **private_key** from the JSON.

---

## 2. Configure OAuth and API Keys

- **OAuth Client ID**: Used for authenticating users in the browser (frontend).
- **API Key**: Used for accessing public Google APIs (frontend).
- **Service Account**: Used for backend access (e.g., Google Sheets API).

**Where to find them:**
- OAuth Client ID/API Key: Google Cloud Console > APIs & Services > Credentials
- Service Account Email/Private Key: In the downloaded JSON file

---

## 3. Set Environment Variables

Create a `.env.local` file in your project root (do not commit this file):

```
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id
NEXT_PUBLIC_GOOGLE_API_KEY=your-api-key
GOOGLE_CLIENT_EMAIL=your-service-account-email
GOOGLE_PRIVATE_KEY=your-service-account-private-key
GOOGLE_SHEETS_ID=your-sheet-id
```

- Replace the values with your actual credentials.
- For deployment (e.g., Vercel), add these variables in your platform's environment settings.
- **Note:** If your private key contains line breaks, replace `\n` with actual newlines or escape as needed for your platform.

---

## 4. Test the Integration

### Locally
1. Start your development server: `npm run dev` or `pnpm dev`.
2. Open your app and trigger a Google Drive action (e.g., open the Google Drive modal).
3. Authenticate with your Google account when prompted.
4. Test listing, uploading, and selecting files.

### In Production
1. Deploy your app (e.g., to Vercel).
2. Ensure all environment variables are set in the deployment platform.
3. Visit your production URL and repeat the tests above.
4. If you encounter authentication issues, double-check your OAuth consent screen, redirect URIs, and environment variables.

---

## Troubleshooting
- **gapi not loaded**: Ensure the Google API script is loaded before using Drive features.
- **Invalid credentials**: Double-check your client ID, API key, and service account details.
- **OAuth errors**: Make sure your redirect URIs and origins are correctly set in the Google Cloud Console.
- **Permission errors**: Ensure the correct scopes are enabled and the user has access to the relevant Drive/Sheets resources.

---

For more details, see the [Google Drive API documentation](https://developers.google.com/drive/api/v3/about-auth) and [Google Cloud Console](https://console.cloud.google.com/). 