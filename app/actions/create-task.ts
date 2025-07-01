"use server"

import { appendToGoogleSheet } from "@/lib/google-sheets"

export async function createTaskAction(formData: FormData) {
  try {
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const priority = formData.get("priority") as string

    if (!title || !description || !priority) {
      return {
        success: false,
        error: "All fields are required",
      }
    }

    const taskData = {
      title,
      description,
      priority,
      createdAt: new Date().toISOString(),
    }

    // Save to Google Sheets
    const result = await appendToGoogleSheet(taskData)

    if (!result.success) {
      return {
        success: false,
        error: "Failed to save task to Google Sheets",
      }
    }

    return {
      success: true,
      message: "Task created and saved to Google Sheets successfully!",
    }
  } catch (error) {
    console.error("Error creating task:", error)
    return {
      success: false,
      error: "An unexpected error occurred",
    }
  }
}
