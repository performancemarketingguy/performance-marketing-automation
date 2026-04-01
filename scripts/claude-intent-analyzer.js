/**
 * @description Exporting Search Terms for Claude AI Intent Mapping
 * @author PerformanceMarketingGuy
 */

function main() {
  const QUERY = "SELECT Query, Impressions, Clicks, Cost, Conversions " +
                "FROM SEARCH_QUERY_PERFORMANCE_REPORT " +
                "WHERE Conversions > 0 " +
                "DURING LAST_30_DAYS";

  const report = AdsApp.report(QUERY);
  Logger.log("Report generated. Ready for Claude AI analysis...");
  
  // Data is now ready to be sent to Claude via API or n8n Webhook
  // for high-intent categorization.
}
