// TIMEZONE CONVERSION UTILITIES
// 
// 🚨 CHALLENGE: Complete the functions below to handle timezone conversion properly
// 
// PROBLEM:
// - The API returns dates in UTC format
// - Users see and edit dates in their local timezone  
// - When saving, dates must be converted back to UTC for the API
// - Currently this conversion is NOT happening correctly
//
// YOUR TASK:
// 1. Implement convertUTCToLocal() to show UTC dates in user's local timezone
// 2. Implement convertLocalToUTC() to convert user input back to UTC for API
// 3. Test with different timezones to ensure it works correctly

/**
 * Converts a UTC date to local timezone for display in datetime-local input
 * 
 * @param utcDate - Date object in UTC timezone (from API)
 * @returns string in format "YYYY-MM-DDTHH:mm" in user's local timezone
 * 
 * HINT: datetime-local inputs expect "YYYY-MM-DDTHH:mm" format in local timezone
 * HINT: Consider timezone offset when converting
 */
export function convertUTCToLocal(utcDate: Date): string {
  // TODO: Implement this function
  // Currently this is WRONG - it shows UTC time as if it were local time
  
  // ❌ BROKEN IMPLEMENTATION (what exists now):
  return utcDate.toISOString().slice(0, 16);
  
  // ✅ YOUR IMPLEMENTATION HERE:
  // Replace the line above with correct timezone conversion
  // The result should show the same moment in time, but in user's local timezone
}

/**
 * Converts local datetime input back to UTC for API submission
 * 
 * @param localDatetimeString - String from datetime-local input (local timezone)
 * @returns Date object in UTC timezone (for API)
 * 
 * HINT: datetime-local gives you local time, but Date constructor might interpret it differently
 * HINT: You need to account for the user's timezone offset
 */
export function convertLocalToUTC(localDatetimeString: string): Date {
  // TODO: Implement this function
  // Currently this is WRONG - it treats local time as if it were UTC
  
  // ❌ BROKEN IMPLEMENTATION (what exists now):
  return new Date(localDatetimeString);
  
  // ✅ YOUR IMPLEMENTATION HERE:
  // Replace the line above with correct timezone conversion
  // The result should represent the same local moment in UTC
}

/**
 * Helper function to format dates for display (already implemented correctly)
 * This shows you what the expected behavior should be
 */
export function formatDateForDisplay(date: Date): string {
  return date.toLocaleString();
}

/**
 * Test helper to check your implementation
 * Run this to verify your functions work correctly
 */
export function testTimezoneConversion() {
  console.log('🧪 Testing timezone conversion...');
  console.log('User timezone offset (minutes):', new Date().getTimezoneOffset());
  
  // Test with a known UTC date
  const testUTCDate = new Date('2025-12-15T14:00:00.000Z'); // 2:00 PM UTC
  console.log('Original UTC date:', testUTCDate.toISOString());
  console.log('Local display should be:', testUTCDate.toLocaleString());
  
  // Test your conversion functions
  const localString = convertUTCToLocal(testUTCDate);
  console.log('convertUTCToLocal result:', localString);
  
  const backToUTC = convertLocalToUTC(localString);
  console.log('convertLocalToUTC result:', backToUTC.toISOString());
  
  // Verify round-trip conversion
  const matches = Math.abs(testUTCDate.getTime() - backToUTC.getTime()) < 1000; // Within 1 second
  console.log('✅ Round-trip conversion successful:', matches);
  
  if (!matches) {
    console.log('❌ Conversion failed! Original and final times don\'t match.');
    console.log('Expected:', testUTCDate.toISOString());
    console.log('Got:', backToUTC.toISOString());
  }
}