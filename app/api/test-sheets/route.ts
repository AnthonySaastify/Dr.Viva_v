import { NextResponse } from 'next/server'
import { appendTaskToSheet, getAllTasks, initializeTasksSheet } from '@/lib/google-sheets'

export async function GET() {
  try {
    console.log('Testing Google Sheets integration...')
    
    // Test 1: Initialize sheet
    console.log('1. Testing sheet initialization...')
    const initResult = await initializeTasksSheet()
    if (!initResult.success) {
      return NextResponse.json({ 
        success: false, 
        error: `Sheet initialization failed: ${initResult.error}` 
      }, { status: 500 })
    }
    console.log('✅ Sheet initialization successful')
    
    // Test 2: Add a test task
    console.log('2. Testing task creation...')
    const testTask = {
      title: 'Test Task - ' + new Date().toLocaleString(),
      description: 'This is a test task to verify Google Sheets integration',
      status: 'Pending',
      scheduledDate: new Date().toISOString().split('T')[0]
    }
    
    const addResult = await appendTaskToSheet(testTask)
    if (!addResult.success) {
      return NextResponse.json({ 
        success: false, 
        error: `Task creation failed: ${addResult.error}` 
      }, { status: 500 })
    }
    console.log('✅ Task creation successful')
    
    // Test 3: Fetch all tasks
    console.log('3. Testing task retrieval...')
    const fetchResult = await getAllTasks()
    if (!fetchResult.success) {
      return NextResponse.json({ 
        success: false, 
        error: `Task retrieval failed: ${fetchResult.error}` 
      }, { status: 500 })
    }
    console.log('✅ Task retrieval successful')
    
    return NextResponse.json({
      success: true,
      message: 'All Google Sheets tests passed!',
      data: {
        tasksCount: fetchResult.tasks.length,
        latestTask: testTask,
        allTasks: fetchResult.tasks.slice(-5) // Last 5 tasks
      }
    })
    
  } catch (error) {
    console.error('Google Sheets test failed:', error)
    return NextResponse.json({ 
      success: false, 
      error: `Test failed: ${error instanceof Error ? error.message : 'Unknown error'}` 
    }, { status: 500 })
  }
} 