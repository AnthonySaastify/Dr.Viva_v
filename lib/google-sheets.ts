import { google } from "googleapis"

const SPREADSHEET_ID = "1R7U3iKwTgxLONcliIXqZR45LV8S_aHf_J8Mqam9eWYo"
const SHEET_NAME = "Tasks"

export interface TaskData {
  title: string
  description: string
  status?: string
  scheduledDate?: string
}

// Helper function to properly format the private key
function formatPrivateKey(key: string): string {
  if (!key) return ""

  // Remove any extra quotes and whitespace
  let formattedKey = key.trim().replace(/^["']|["']$/g, "")

  // Replace literal \n with actual newlines
  formattedKey = formattedKey.replace(/\\n/g, "\n")

  // Ensure proper PEM format
  if (!formattedKey.includes("-----BEGIN PRIVATE KEY-----")) {
    console.error("Private key doesn't appear to be in PEM format")
  }

  return formattedKey
}

// Helper function to create authenticated Google Sheets client
async function createSheetsClient() {
  try {
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL
    const privateKey = process.env.GOOGLE_PRIVATE_KEY

    if (!clientEmail || !privateKey) {
      throw new Error(
        "Missing Google Sheets credentials. Please check GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY environment variables.",
      )
    }

    console.log("Google Sheets Auth Debug:", {
      hasClientEmail: !!clientEmail,
      hasPrivateKey: !!privateKey,
      clientEmailLength: clientEmail?.length,
      privateKeyLength: privateKey?.length,
      privateKeyStart: privateKey?.substring(0, 50) + "...",
    })

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: formatPrivateKey(privateKey),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })

    const sheets = google.sheets({ version: "v4", auth })
    return sheets
  } catch (error) {
    console.error("Error creating Google Sheets client:", error)
    throw error
  }
}

export async function appendTaskToSheet(data: TaskData) {
  try {
    console.log("Attempting to append task to sheet:", data)

    const sheets = await createSheetsClient()

    // Format timestamp
    const timestamp = new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })

    // Prepare row data: Timestamp, Title, Description, Status, Scheduled Date
    const rowData = [timestamp, data.title, data.description, data.status || "Pending", data.scheduledDate || ""]

    console.log("Appending row data:", rowData)

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:E`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [rowData],
      },
    })

    console.log("Successfully appended to sheet:", response.data)
    return { success: true, data: response.data }
  } catch (error) {
    console.error("Detailed Google Sheets append error:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code,
    })
    return { success: false, error: `Google Sheets error: ${error.message}` }
  }
}

export async function updateTaskStatus(rowIndex: number, newStatus: string) {
  try {
    const sheets = await createSheetsClient()

    // Update status column (column D)
    const response = await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!D${rowIndex}`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[newStatus]],
      },
    })

    return { success: true, data: response.data }
  } catch (error) {
    console.error("Error updating task status:", error)
    return { success: false, error: error.message }
  }
}

export async function getAllTasks() {
  try {
    const sheets = await createSheetsClient()

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:E`,
    })

    const rows = response.data.values || []

    // Skip header row and convert to objects
    const tasks = rows.slice(1).map((row, index) => ({
      id: index + 2, // Row number (accounting for header)
      timestamp: row[0] || "",
      title: row[1] || "",
      description: row[2] || "",
      status: row[3] || "Pending",
      scheduledDate: row[4] || "",
    }))

    return { success: true, tasks }
  } catch (error) {
    console.error("Error fetching tasks from Google Sheet:", error)
    return { success: false, error: error.message, tasks: [] }
  }
}

export async function initializeTasksSheet() {
  try {
    console.log("Initializing Tasks sheet...")

    const sheets = await createSheetsClient()

    // Check if Tasks sheet exists
    console.log("Checking if spreadsheet exists...")
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
    })

    console.log("Spreadsheet found:", spreadsheet.data.properties?.title)

    const tasksSheet = spreadsheet.data.sheets?.find((sheet) => sheet.properties?.title === SHEET_NAME)

    if (!tasksSheet) {
      console.log("Tasks sheet not found, creating...")
      // Create Tasks sheet
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: SHEET_NAME,
                },
              },
            },
          ],
        },
      })
      console.log("Tasks sheet created successfully")
    } else {
      console.log("Tasks sheet already exists")
    }

    // Check if header row exists
    console.log("Checking for header row...")
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A1:E1`,
    })

    if (!response.data.values || response.data.values.length === 0) {
      console.log("Header row not found, adding...")
      // Add header row
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A1:E1`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [["Timestamp", "Title", "Description", "Status", "Scheduled Date"]],
        },
      })

      // Get the sheet ID for formatting
      const updatedSpreadsheet = await sheets.spreadsheets.get({
        spreadsheetId: SPREADSHEET_ID,
      })
      const updatedTasksSheet = updatedSpreadsheet.data.sheets?.find((sheet) => sheet.properties?.title === SHEET_NAME)

      if (updatedTasksSheet?.properties?.sheetId !== undefined) {
        // Format header row
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId: SPREADSHEET_ID,
          requestBody: {
            requests: [
              {
                repeatCell: {
                  range: {
                    sheetId: updatedTasksSheet.properties.sheetId,
                    startRowIndex: 0,
                    endRowIndex: 1,
                    startColumnIndex: 0,
                    endColumnIndex: 5,
                  },
                  cell: {
                    userEnteredFormat: {
                      textFormat: {
                        bold: true,
                      },
                      backgroundColor: {
                        red: 0.9,
                        green: 0.9,
                        blue: 0.9,
                      },
                    },
                  },
                  fields: "userEnteredFormat(textFormat,backgroundColor)",
                },
              },
            ],
          },
        })
      }
      console.log("Header row added and formatted successfully")
    } else {
      console.log("Header row already exists")
    }

    console.log("Sheet initialization completed successfully")
    return { success: true }
  } catch (error) {
    console.error("Detailed sheet initialization error:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code,
    })
    return { success: false, error: error.message }
  }
}

// Add alias export for compatibility
export const appendToGoogleSheet = appendTaskToSheet
