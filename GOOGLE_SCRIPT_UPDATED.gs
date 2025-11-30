function doPost(e) {
  try {
    // Parse the incoming data - support JSON body, form-encoded data, and URL parameters
    let data;
    if (e.postData && e.postData.contents) {
      const contentType = e.postData.type || "";
      const contents = e.postData.contents;
      
      // Check if it's JSON
      if (contentType.includes("application/json") || contents.trim().startsWith("{")) {
        try {
          data = JSON.parse(contents);
        } catch (parseError) {
          return ContentService.createTextOutput("Error parsing JSON: " + parseError.toString());
        }
      } else if (contentType.includes("application/x-www-form-urlencoded") || contents.includes("=")) {
        // Handle form-encoded data (URLSearchParams)
        data = {};
        const params = contents.split("&");
        for (let i = 0; i < params.length; i++) {
          const pair = params[i].split("=");
          const key = decodeURIComponent(pair[0]);
          let value = decodeURIComponent(pair[1] || "");
          // Try to parse JSON values (like sourceData)
          if (value.startsWith("{") || value.startsWith("[")) {
            try {
              value = JSON.parse(value);
            } catch (e) {
              // Keep as string if not valid JSON
            }
          }
          data[key] = value;
        }
      } else {
        // Fallback: try to parse as JSON, otherwise treat as form data
        try {
          data = JSON.parse(contents);
        } catch (parseError) {
          // If JSON parsing fails, try form-encoded
          data = {};
          const params = contents.split("&");
          for (let i = 0; i < params.length; i++) {
            const pair = params[i].split("=");
            const key = decodeURIComponent(pair[0]);
            let value = decodeURIComponent(pair[1] || "");
            if (value.startsWith("{") || value.startsWith("[")) {
              try {
                value = JSON.parse(value);
              } catch (e) {
                // Keep as string
              }
            }
            data[key] = value;
          }
        }
      }
    } else {
      // Handle URL parameters (fallback for form submissions)
      data = e.parameter;
    }
    
    const type = data.type;
    
    // Get spreadsheet ID
    const ssId = PropertiesService.getScriptProperties().getProperty('key');
    if (!ssId) {
      return ContentService.createTextOutput("Spreadsheet ID not configured");
    }
    
    const ss = SpreadsheetApp.openById(ssId);
    
    // Handle backward compatibility: if no type is provided but email exists, treat as waitlist
    if (!type && data.email && !data.name && !data.message) {
      // Old format: just email (waitlist)
      const email = data.email;
      if (!email) {
        return ContentService.createTextOutput("Email required");
      }
      
      let sheet = ss.getSheetByName('Sheet1');
      if (!sheet) {
        sheet = ss.insertSheet('Sheet1');
        sheet.appendRow(['Email', 'Timestamp']);
      }
      
      sheet.appendRow([email, new Date()]);
      return ContentService.createTextOutput("Thanks! You're on the waitlist.");
    }
    
    if (!type) {
      return ContentService.createTextOutput("Type parameter required");
    }
    
    if (type === "waitlist") {
      // Handle waitlist submission
      const email = data.email;
      if (!email) {
        return ContentService.createTextOutput("Email required");
      }
      
      let sheet = ss.getSheetByName('Sheet1');
      if (!sheet) {
        // Auto-create Sheet1 if it doesn't exist
        sheet = ss.insertSheet('Sheet1');
        sheet.appendRow(['Email', 'Timestamp']); // Add headers
      }
      
      // Append: [email, timestamp]
      sheet.appendRow([email, new Date()]);
      
      return ContentService.createTextOutput("Thanks! You're on the waitlist.");
      
    } else if (type === "contact") {
      // Handle contact form submission
      const name = data.name;
      const email = data.email;
      const message = data.message;
      
      // Validation
      if (!name || !email || !message) {
        return ContentService.createTextOutput("All fields (name, email, message) are required");
      }
      
      let sheet = ss.getSheetByName('Sheet2');
      if (!sheet) {
        // Auto-create Sheet2 if it doesn't exist
        sheet = ss.insertSheet('Sheet2');
        // Add headers: Name, Email, Message, Timestamp
        sheet.appendRow(['Name', 'Email', 'Message', 'Timestamp']);
      }
      
      // Append: [Name, Email, Message, Timestamp]
      sheet.appendRow([name, email, message, new Date()]);
      
      return ContentService.createTextOutput("Thanks! Your message has been received.");
      
    } else {
      return ContentService.createTextOutput("Invalid type. Use 'waitlist' or 'contact'");
    }
    
  } catch (error) {
    // Log error for debugging
    console.error("Error in doPost:", error);
    return ContentService.createTextOutput("Error processing request: " + error.toString());
  }
}

function onOpen() {
  // Store spreadsheet ID when script is opened
  PropertiesService.getScriptProperties()
    .setProperty('key', SpreadsheetApp.getActiveSpreadsheet().getId());
}

