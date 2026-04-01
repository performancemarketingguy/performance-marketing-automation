/**
 * @description Google Ads Script to send Search Terms to Claude AI via Make.com
 * @author PerformanceMarketingGuy
 */

function main() {
  // 1. PASTE YOUR MAKE.COM URL BELOW (Keep the quotes!)
  const webhookUrl = "https://hook.eu1.make.com/tzay1yl33cqbhyba8goa93emv7m11vsr";

  // 2. Query data (Filtering for Cost > 10 to save credits)
  const report = AdsApp.report(
    "SELECT Query, Impressions, Clicks, Cost, Conversions " +
    "FROM SEARCH_QUERY_PERFORMANCE_REPORT " +
    "WHERE Cost > 10 " +
    "DURING LAST_30_DAYS"
  );

  const rows = report.rows();
  
  while (rows.hasNext()) {
    const row = rows.next();
    
    const payload = {
      accountName: AdsApp.currentAccount().getName(),
      searchTerm: row['Query'],
      cost: row['Cost'],
      conversions: row['Conversions'],
      clicks: row['Clicks']
    };

    const options = {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify(payload)
    };

    // 3. Sending the data to Make.com
    try {
      UrlFetchApp.fetch(webhookUrl, options);
      Logger.log("Sent: " + row['Query']);
    } catch (e) {
      Logger.log("Error: " + e.toString());
    }
  }
}
