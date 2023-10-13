export function createResponse(params: unknown) {
  return ContentService.createTextOutput(JSON.stringify(params)).setMimeType(
    ContentService.MimeType.JSON
  );
}
