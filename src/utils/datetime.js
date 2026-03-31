/**
 * Date/Time utility functions for astronomical calculations
 */

/**
 * Convert calendar date to Julian Day Number
 * Based on Meeus algorithm (Astronomical Algorithms)
 */
export function toJulianDay(year, month, day, hours = 0, minutes = 0, seconds = 0) {
  const decimalDay = day + (hours + minutes / 60 + seconds / 3600) / 24;

  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }

  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);

  return Math.floor(365.25 * (y + 4716)) +
         Math.floor(30.6001 * (m + 1)) +
         decimalDay + B - 1524.5;
}

/**
 * Convert local time to UTC given timezone offset in hours
 */
export function localToUTC(year, month, day, hours, minutes, timezoneOffset) {
  let utcHours = hours - timezoneOffset;
  let utcDay = day;
  let utcMonth = month;
  let utcYear = year;

  if (utcHours < 0) {
    utcHours += 24;
    utcDay -= 1;
    if (utcDay < 1) {
      utcMonth -= 1;
      if (utcMonth < 1) {
        utcMonth = 12;
        utcYear -= 1;
      }
      utcDay = daysInMonth(utcYear, utcMonth);
    }
  } else if (utcHours >= 24) {
    utcHours -= 24;
    utcDay += 1;
    if (utcDay > daysInMonth(utcYear, utcMonth)) {
      utcDay = 1;
      utcMonth += 1;
      if (utcMonth > 12) {
        utcMonth = 1;
        utcYear += 1;
      }
    }
  }

  return { year: utcYear, month: utcMonth, day: utcDay, hours: utcHours, minutes };
}

function daysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

/**
 * Get timezone offset in hours for common timezones
 */
export function getTimezoneOffset(timezone) {
  const offsets = {
    'Asia/Seoul': 9,
    'Asia/Tokyo': 9,
    'Asia/Shanghai': 8,
    'Asia/Kolkata': 5.5,
    'Asia/Dubai': 4,
    'Asia/Singapore': 8,
    'Asia/Bangkok': 7,
    'Asia/Jakarta': 7,
    'Asia/Manila': 8,
    'Asia/Kuala_Lumpur': 8,
    'Asia/Ho_Chi_Minh': 7,
    'Asia/Taipei': 8,
    'Asia/Hong_Kong': 8,
    'Asia/Phnom_Penh': 7,
    'Asia/Hanoi': 7,
    'Europe/London': 0,
    'Europe/Paris': 1,
    'Europe/Berlin': 1,
    'Europe/Rome': 1,
    'Europe/Madrid': 1,
    'Europe/Moscow': 3,
    'America/New_York': -5,
    'America/Chicago': -6,
    'America/Los_Angeles': -8,
    'America/Toronto': -5,
    'America/Vancouver': -8,
    'Australia/Sydney': 11,
    'Pacific/Auckland': 13,
  };
  return offsets[timezone] ?? 9; // Default to KST
}

/**
 * Calculate Julian centuries from J2000.0
 */
export function julianCenturies(jd) {
  return (jd - 2451545.0) / 36525.0;
}
