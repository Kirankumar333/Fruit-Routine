/**
 * FRUIT ROUTINE BANGALORE — AUTOMATED GOOGLE SHEETS & GOOGLE DRIVE DISPATCH SCRIPT
 * 
 * Features:
 * 1. Appends all customer order details to Google Sheets in real-time.
 * 2. Saves the actual Payment Screenshot image file into a Google Drive folder ("Fruit Routine Payment Proofs").
 * 3. Adds a clickable "View Screenshot" link inside Google Sheets.
 * 4. Sends an instant email notification to info.fruitroutine@gmail.com with the screenshot attached.
 * 
 * Quick 2-Minute Setup Instructions:
 * 1. Open Google Sheets (https://sheets.google.com) and create a sheet named "Fruit Routine Orders".
 * 2. In Row 1, add these headers:
 *    A1: Timestamp
 *    B1: Order ID
 *    C1: Customer Name
 *    D1: Phone
 *    E1: Plan
 *    F1: Amount (₹)
 *    G1: Delivery Address
 *    H1: Pincode
 *    I1: First Delivery (7-9 AM)
 *    J1: UPI UTR Number
 *    K1: Payment Screenshot Link
 *    L1: Order Status
 * 3. Go to Extensions -> Apps Script.
 * 4. Paste this entire code and click "Deploy" -> "New Deployment".
 * 5. Select type: "Web App", Execute as: "Me", Who has access: "Anyone".
 * 6. Click "Deploy" and copy the Web App URL (https://script.google.com/macros/s/..../exec).
 * 7. Open your Fruit Routine Admin Portal (admin.html -> Cloud Automations) and paste your Web App URL.
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    var screenshotUrl = "Attached via WhatsApp";
    var imageBlob = null;

    // Save screenshot to Google Drive if base64 data is present
    if (data.screenshot && data.screenshot.indexOf("data:image") !== -1) {
      try {
        var folderName = "Fruit Routine Payment Proofs";
        var folders = DriveApp.getFoldersByName(folderName);
        var folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(folderName);
        
        var contentType = data.screenshot.substring(5, data.screenshot.indexOf(";"));
        var base64Data = data.screenshot.substring(data.screenshot.indexOf("base64,") + 7);
        var decodedBytes = Utilities.base64Decode(base64Data);
        var fileName = (data.orderId || "Order") + "_PaymentProof.jpg";
        
        imageBlob = Utilities.newBlob(decodedBytes, contentType, fileName);
        var file = folder.createFile(imageBlob);
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        screenshotUrl = file.getUrl();
      } catch(driveErr) {
        screenshotUrl = "Saved (Drive Error: " + driveErr.toString() + ")";
      }
    }

    // Append row to Google Sheets
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
      screenshotUrl,
      data.status || "New Order"
    ]);

    // Send instant email notification to admin
    var adminEmail = "info.fruitroutine@gmail.com";
    var emailSubject = "🍓 New Fruit Routine Order: " + (data.orderId || "New") + " (" + (data.plan || "Subscription") + ")";
    var emailBody = "New Morning Fruit Bowl Subscription Placed!\n\n" +
                    "Order ID: " + data.orderId + "\n" +
                    "Customer: " + data.name + " (" + data.phone + ")\n" +
                    "Plan: " + data.plan + " - ₹" + data.amount + "\n" +
                    "Delivery Address: " + data.address + " (PIN: " + data.pincode + ")\n" +
                    "First Delivery: " + data.startDate + " between 7:00 AM – 9:00 AM\n" +
                    "UPI UTR Ref: " + (data.utr || "N/A") + "\n" +
                    "Payment Screenshot: " + screenshotUrl + "\n\n" +
                    "The customer is also sending their screenshot directly via WhatsApp (+91 9480020516).";

    try {
      if (imageBlob) {
        MailApp.sendEmail({
          to: adminEmail,
          subject: emailSubject,
          body: emailBody,
          attachments: [imageBlob]
        });
      } else {
        MailApp.sendEmail(adminEmail, emailSubject, emailBody);
      }
    } catch(mailErr) {
      Logger.log("Mail send error: " + mailErr);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ "status": "success", "screenshotUrl": screenshotUrl }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(error) {
    return ContentService
      .createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ "status": "active", "service": "Fruit Routine Google Sheets & Drive Webhook" }))
    .setMimeType(ContentService.MimeType.JSON);
}
