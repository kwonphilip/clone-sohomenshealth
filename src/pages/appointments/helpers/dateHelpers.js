/**
 * dateHelpers.js — Date utilities for the appointment calendar.
 *
 * This module is intentionally kept free of React imports so it can be
 * unit-tested in isolation without a rendering environment.
 */

/**
 * Builds the full calendar grid for a given year + month as an array of week
 * arrays, where each week contains exactly 7 cells (one per day, Sun → Sat).
 *
 * Cells that fall outside the month (leading/trailing days needed to complete
 * the first and last week rows) are represented as `null`. These nulls keep
 * every date aligned under the correct weekday column header without rendering
 * any content in those slots.
 *
 * Example — April 2026 (April 1 is a Wednesday, dayIndex=3):
 *   Week 1: [null, null, null, Apr 1, Apr 2, Apr 3, Apr 4]
 *   Week 2: [Apr 5, …, Apr 11]
 *   ...
 *   Week 5: [Apr 26, Apr 27, Apr 28, Apr 29, Apr 30, null, null]
 *
 * @param {number} year  - Full 4-digit year (e.g. 2026).
 * @param {number} month - Month index, 0-based (0 = Jan, 11 = Dec).
 * @returns {(Date|null)[][]} Array of 7-element week arrays.
 */
export function getCalendarWeeks(year, month) {
  const cells = [];

  // Leading nulls: align the 1st of the month with its weekday column.
  // getDay() returns 0 (Sun) … 6 (Sat), so we prepend that many nulls.
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  for (let i = 0; i < firstDayOfWeek; i++) cells.push(null);

  // Fill every calendar day of the month with a midnight-normalised Date.
  // new Date(year, month + 1, 0) gives the last day of the month.
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(year, month, d));
  }

  // Trailing nulls to complete the final partial week row.
  while (cells.length % 7 !== 0) cells.push(null);

  // Slice the flat cell array into 7-element week sub-arrays.
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}
