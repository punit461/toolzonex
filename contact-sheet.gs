/**
 * ToolZoneX — Contact Form Receiver
 * Google Apps Script → Google Sheets + Email notification
 *
 * Deploy as:  Extensions → Apps Script → Deploy → New Deployment
 *             Type: Web App | Execute as: Me | Access: Anyone
 *
 * After deploying, copy the /exec URL into your .env:
 *   VITE_CONTACT_SHEET_URL=https://script.google.com/macros/s/.../exec
 */

const NOTIFY_EMAIL = 'punit461bharadwaj@gmail.com';
const SHEET_NAME   = 'Contacts'; // rename to whatever your sheet tab is called

// ── Receives POST from the React contact form ─────────────────────
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet()
      .getSheetByName(SHEET_NAME) || SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Add header row if the sheet is brand new
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Subject', 'Message']);
      sheet.getRange(1, 1, 1, 5).setFontWeight('bold');
    }

    // Parse JSON body (sent by the React form)
    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name    || '',
      data.email   || '',
      data.subject || '(no subject)',
      data.message || '',
    ]);

    // ── Email notification to you ─────────────────────────────────
    // Comment this block out if you don't want email alerts.
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: '[ToolZoneX] New contact: ' + (data.subject || 'No subject'),
      body: [
        'You received a new contact form submission.',
        '',
        'Name:    ' + data.name,
        'Email:   ' + data.email,
        'Subject: ' + data.subject,
        '',
        'Message:',
        data.message,
        '',
        '---',
        'Submitted at ' + (data.timestamp || new Date().toISOString()),
      ].join('\n'),
    });

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    // Even if there's an error, log it so you can debug in Apps Script → Executions
    console.error('doPost error:', err.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── Health check — visit the /exec URL in browser to confirm it's live ───────
function doGet() {
  return ContentService
    .createTextOutput('ToolZoneX contact endpoint is live ✓')
    .setMimeType(ContentService.MimeType.TEXT);
}
