# 🕐 Timezone Conversion Challenge

A React TypeScript coding challenge focused on fixing timezone conversion issues when handling dates from APIs.

## 🎯 Problem Statement

You're working on a rocket simulation project where:
- **The API returns all dates in UTC format**
- **Users need to see and edit dates in their local timezone**
- **When saving, dates must be converted back to UTC for the API**

Currently, the timezone conversion is **NOT working correctly**, causing confusion for users in different timezones.

## 🚨 The Bug

The current implementation has these issues:

1. **Display Issue**: UTC dates from the API are shown directly in datetime inputs as if they were local time
2. **Saving Issue**: Local datetime input values are sent to the API as if they were already UTC

This means a user in New York sees "2:00 PM" when the API says "2:00 PM UTC" (which should display as "10:00 AM" in EST).

## 📋 Your Task

Fix the timezone conversion functions in `src/timezoneUtils.ts`:

### 1. `convertUTCToLocal(utcDate: Date): string`
- **Input**: A Date object in UTC timezone (from API)
- **Output**: String in format "YYYY-MM-DDTHH:mm" in user's local timezone
- **Purpose**: Convert API dates for display in datetime-local inputs

### 2. `convertLocalToUTC(localDatetimeString: string): Date`
- **Input**: String from datetime-local input (user's local timezone)
- **Output**: Date object in UTC timezone (for API)
- **Purpose**: Convert user input back to UTC for API submission

## 🧪 Testing Your Solution

1. **Run the test function**: Open browser dev tools console and look for timezone conversion logs
2. **Load an environment**: Click "Load Environment" on any simulation
3. **Check the datetime input**: It should show the correct local time, not UTC time
4. **Modify the datetime**: Change the time in the input field
5. **Save and verify**: Check console logs to see what the API receives (should be correct UTC)

### Success Criteria
- ✅ Datetime input shows local time corresponding to the UTC time from API
- ✅ When you change the datetime input, the API receives the correct UTC equivalent
- ✅ Round-trip conversion (UTC → Local → UTC) preserves the original time

## 🛠️ Setup Instructions

### For CodeSandbox:
1. Import this project into CodeSandbox
2. The dependencies should install automatically
3. Open the app and start working on the timezone functions

### For Local Development:
```bash
# Install dependencies
npm install

# Start development server
npm start

# Open browser to http://localhost:3000
```

## 📁 Project Structure

```
src/
├── App.tsx              # Main app component
├── SimulationForm.tsx   # Main form with datetime inputs
├── timezoneUtils.ts     # 🚨 YOUR TASK: Fix these functions
├── mockAPI.ts          # Simulates backend API behavior
├── types.ts            # TypeScript interfaces
└── index.tsx           # App entry point
```

## 💡 Hints

### Understanding the Problem
- `datetime-local` inputs work in the user's local timezone
- The API expects and returns UTC timestamps
- JavaScript's Date object represents a moment in time (UTC internally)
- `Date.prototype.getTimezoneOffset()` returns the offset in minutes

### Key Concepts
- **UTC to Local**: Subtract the timezone offset when displaying
- **Local to UTC**: Add the timezone offset when sending to API
- **Format**: datetime-local expects "YYYY-MM-DDTHH:mm" format

### Useful Methods
- `date.getTimezoneOffset()` - Returns offset in minutes (positive for timezones behind UTC)
- `date.toISOString().slice(0, 16)` - Formats date for datetime-local input (but in UTC!)
- `new Date(dateString)` - Creates Date object (interpretation depends on format)

## 🔍 Understanding the Test Cases

The mock API includes:
- **Test Simulation 1**: Launch date of `2025-12-15T14:00:00.000Z` (2:00 PM UTC)
- **Test Simulation 2**: Launch date of `2025-12-20T18:30:00.000Z` (6:30 PM UTC)

When you load these environments:
- A user in EST should see `9:00 AM` and `1:30 PM` respectively
- A user in PST should see `6:00 AM` and `10:30 AM` respectively
- A user in UTC should see `2:00 PM` and `6:30 PM` respectively

## ⚠️ Common Pitfalls

1. **Don't confuse timezone offset direction**: `getTimezoneOffset()` returns positive values for timezones behind UTC
2. **Don't forget about DST**: Timezone offsets can change throughout the year
3. **Don't use `toLocaleString()` for datetime-local**: It doesn't give the right format
4. **Don't assume UTC when parsing**: `new Date("2025-12-15T14:00")` might be interpreted as local time

## 🎉 Bonus Challenges

Once you've fixed the basic functionality:

1. **Add timezone display**: Show the user's current timezone in the UI
2. **Add timezone selection**: Let users choose a different timezone to work in
3. **Handle edge cases**: Test with dates during DST transitions
4. **Add validation**: Ensure dates are reasonable (not in the past, etc.)

## 📚 Learning Resources

- [MDN Date Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
- [datetime-local input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local)
- [JavaScript Timezone Handling](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset)

## 🚀 Ready to Start?

1. Open `src/timezoneUtils.ts`
2. Replace the placeholder implementations
3. Test your solution with the provided test cases
4. Verify the datetime inputs show correct local times

Good luck! 🍀