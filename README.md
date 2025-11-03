
# Timezone Conversion Challenge

A RocketPy WebDev challenge to give you hands-on experience on fixing some of common issues faced while developing the next generation of rocket simulator.

## Problem

The API returns dates in UTC format, but users need to see and edit them in their local timezone. When saving, dates must be converted back to UTC for the API.

Currently, timezone conversion is broken:
1. UTC dates from API are displayed directly in datetime inputs as if they were local time
2. Local datetime input values are sent to API as if they were already UTC

## Task

Fix the timezone conversion functions in `src/timezoneUtils.ts`:

### `convertUTCToLocal(utcDate: Date): string`
- Input: Date object in UTC timezone (from API)
- Output: String in "YYYY-MM-DDTHH:mm" format in user's local timezone
- Purpose: Convert API dates for display in datetime-local inputs

### `convertLocalToUTC(localDatetimeString: string): Date`
- Input: String from datetime-local input (user's local timezone)
- Output: Date object in UTC timezone (for API)
- Purpose: Convert user input back to UTC for API submission

## Setup

```bash
npm install
npm start
```

## Testing

1. Open browser dev tools console for timezone conversion logs
2. Load an environment from the simulations
3. Verify datetime input shows correct local time, not UTC time
4. Modify the datetime and save
5. Check console logs to verify API receives correct UTC time

## Success Criteria

- Datetime input shows local time corresponding to UTC time from API
- API receives correct UTC equivalent when datetime is changed
- Round-trip conversion (UTC → Local → UTC) preserves original time

## Stuck somewhere?

- Reach out to us on Discord/WhatsApp/Email and we'll be happy to help!

## Submission

1. Create branch: `solution/your-name`
2. Implement fixes in `src/timezoneUtils.ts`
3. Test thoroughly
4. Submit Pull Request with tag `[SOLUTION]` including your name and email in description
- [datetime-local input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local)
- [JavaScript Timezone Handling](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset)

## 🚀 Ready to Start?

1. Open `src/timezoneUtils.ts`
2. Replace the placeholder implementations
3. Test your solution with the provided test cases
4. Verify the datetime inputs show correct local times
5. Submit your solution as a Pull Request

Good luck! 🍀