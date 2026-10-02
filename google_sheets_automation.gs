/**
 * FRUIT ROUTINE BANGALORE — AUTOMATED GOOGLE SHEETS & EMAIL DISPATCH SCRIPT
 * 
 * Instructions to set up:
 * 1. Open Google Sheets (https://sheets.google.com) and create a new sheet named "Fruit Routine Orders".
 * 2. In Row 1, create the following headers:
 *    A1: Timestamp | B1: Order ID | C1: Customer Name | D1: Phone | E1: Plan | F1: Amount | G1: Delivery Address | H1: Pincode | I1: Start Date | J1: UTR Ref | K1: Status
 * 3. Go to Extensions -> Apps Script.
 * 4. Paste this code and click Deploy -> New Deployment.
 * 5. Select type: "Web App", Execute as: "Me", Who has access: "Anyone".
 * 6. Copy the Web App URL and paste it into the Fruit Routine Admin Portal (admin.html -> Automation Settings)!
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Append row to Google Sheet
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString("en-IN", {timeZone: "Asia/Kolkata"}),
      data.orderId || "N/A",
      data.name || "N/A",
      data.phone || "N/A",
      data.plan || "N/A",
      data.amount || "N/A",
      data.address || "N/A",
      data.pincode || "N/A",
      data.startDate || "N/A",
      data.utr || "N/A",
      data.status || "New Order"
    ]);

    // Optional: Send instant email notification to admin
    var adminEmail = "info.fruitroutine@gmail.com";
    var emailSubject = "🍓 New Fruit Routine Order: " + data.orderId + " (" + data.plan + ")";
    var emailBody = "New Morning Fruit Bowl Subscription Placed!\n\n" +
                    "Order ID: " + data.orderId + "\n" +
                    "Customer: " + data.name + " (" + data.phone + ")\n" +
                    "Plan: " + data.plan + " - ₹" + data.amount + "\n" +
                    "Delivery Address: " + data.address + " (PIN: " + data.pincode + ")\n" +
                    "First Delivery Date: " + data.startDate + " (7:00 AM - 9:00 AM)\n" +
                    "UTR / UPI Ref: " + (data.utr || "Attached via WhatsApp") + "\n\n" +
                    "View complete details in Fruit Routine Admin Portal.";
                    
    try {
      MailApp.sendEmail(adminEmail, emailSubject, emailBody);
    } catch(mailErr) {
      Logger.log("Mail send error: " + mailErr);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ "status": "success", "message": "Order synced successfully to Google Sheets & Email" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(error) {
    return ContentService
      .createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ "status": "active", "service": "Fruit Routine Google Sheets Webhook" }))
    .setMimeType(ContentService.MimeType.JSON);
}
