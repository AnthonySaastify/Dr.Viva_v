"use server"

import { appendTaskToSheet, updateTaskStatus, getAllTasks, initializeTasksSheet } from "@/lib/google-sheets"

export async function createTaskAction(formData: FormData) {
  try {
    // Initialize the sheet first
    const initResult = await initializeTasksSheet()
    if (!initResult.success) {
      return { success: false, error: `Failed to initialize sheet: ${initResult.error}` }
    }

    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const scheduledDate = formData.get("scheduledDate") as string

    if (!title || !description) {
      return { success: false, error: "Title and description are required" }
    }

    const result = await appendTaskToSheet({
      title,
      description,
      scheduledDate,
      status: "Pending",
    })

    if (result.success) {
      return { success: true, message: "Task created successfully!" }
    } else {
      return { success: false, error: result.error }
    }
  } catch (error) {
    console.error("Error in createTaskAction:", error)
    return { success: false, error: `Server error: ${error.message}` }
  }
}

export async function updateTaskStatusAction(taskId: number, newStatus: string) {
  try {
    const result = await updateTaskStatus(taskId, newStatus)

    if (result.success) {
      return { success: true, message: "Task status updated successfully!" }
    } else {
      return { success: false, error: result.error }
    }
  } catch (error) {
    console.error("Error in updateTaskStatusAction:", error)
    return { success: false, error: `Server error: ${error.message}` }
  }
}

export async function fetchTasksAction() {
  try {
    // Initialize the sheet first
    const initResult = await initializeTasksSheet()
    if (!initResult.success) {
      return { success: false, error: `Failed to initialize sheet: ${initResult.error}`, tasks: [] }
    }

    const result = await getAllTasks()

    if (result.success) {
      return { success: true, tasks: result.tasks }
    } else {
      return { success: false, error: result.error, tasks: [] }
    }
  } catch (error) {
    console.error("Error in fetchTasksAction:", error)
    return { success: false, error: `Server error: ${error.message}`, tasks: [] }
  }
}
