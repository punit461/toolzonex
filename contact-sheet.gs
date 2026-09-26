/**
 * ToolZoneX — Contact Form Receiver
 * Google Apps Script → Google Sheets + Email notification
 *
 * Deploy as:  Extensions → Apps Script → Deploy → New Deployment
 *             Type: Web App | Execute as: Me | Access: Anyone
 *
 * After deploying, copy the /exec URL into your .env:
 *   NEXT_PUBLIC_CONTACT_SHEET_URL=https://script.google.com/macros/s/.../exec
 *
 * NOTE: this file is the reference copy. Editing it here does nothing on its
 * own — paste the contents into the Apps Script editor and re-deploy for the
 * change to take effect.
 *
 * Bot protection: the site renders a Cloudflare Turnstile widget and sends its
 * token as `turnstileToken`. This script is where that token actually gets
 * checked — the site is a static export with no server of its own, so without
 * the check below a bot can skip the page and POST straight to this endpoint.
 * Add the widget's secret key under Project Settings → Script Properties as
 * TURNSTILE_SECRET. If that property is absent the check is skipped, so the
 * form keeps working before the key is set up.
 */

const NOTIFY_EMAIL = 'punit@toolzonex.com';
const SHEET_NAME   = 'Contacts'; // rename to whatever your sheet tab is called

// Hostnames the widget is allowed to be solved on, so the site key can't be
// reused on someone else's domain to spam this endpoint.
const ALLOWED_HOSTNAMES = ['toolzonex.com', 'www.toolzonex.com'];

/**
 * Returns true when the submission should be accepted. Verifies the Turnstile
 * token against Cloudflare's siteverify API.
 */
function isHumanSubmission(data) {
  const secret = PropertiesService.getScriptProperties().getProperty('TURNSTILE_SECRET');
  if (!secret) return true; // not configured yet — don't reject real people

  const response = UrlFetchApp.fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'post',
    payload: { secret: secret, response: data.turnstileToken || '' },
    muteHttpExceptions: true,
  });

  if (response.getResponseCode() !== 200) return false;

  const result = JSON.parse(response.getContentText());
  return result.success === true
    && result.action === 'contact'
    && ALLOWED_HOSTNAMES.indexOf(result.hostname) !== -1;
}

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

    // Drop unverified submissions before they reach the sheet or your inbox.
    // The browser can't see this response (the form POSTs with mode:'no-cors'),
    // which is fine: a real visitor always has a valid token.
    if (!isHumanSubmission(data)) {
      console.warn('Rejected submission: Turnstile verification failed');
      return ContentService
        .createTextOutput(JSON.stringify({ status: 'rejected' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

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

// ── Retention: delete messages older than RETENTION_DAYS ─────────────────────
// The Privacy Policy promises contact messages are deleted 12 months after our
// last exchange. This removes sheet rows older than that (measured from the
// submission time, which is never later than the last exchange). Set it to run
// daily: Apps Script editor → Triggers → Add Trigger → purgeOldContacts →
// Time-driven → Day timer. The notification copies in the email inbox need
// deleting there as well (a mailbox retention policy, or by hand).
const RETENTION_DAYS = 365;

function purgeOldContacts() {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = book.getSheetByName(SHEET_NAME) || book.getActiveSheet();
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return; // header only

  const cutoff = Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000;
  const stamps = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  // Bottom-up, so deleting a row doesn't shift the ones still to check.
  for (let i = stamps.length - 1; i >= 0; i--) {
    const time = new Date(stamps[i][0]).getTime();
    if (!isNaN(time) && time < cutoff) sheet.deleteRow(i + 2);
  }
}

// ── Health check — visit the /exec URL in browser to confirm it's live ───────
function doGet() {
  return ContentService
    .createTextOutput('ToolZoneX contact endpoint is live ✓')
    .setMimeType(ContentService.MimeType.TEXT);
}
