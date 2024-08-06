import fetch from "node-fetch";

export default class PushNotification {
  /**
   * Constructs a new instance of the PushNotification class.
   *
   * This constructor initializes the PushNotification class with specified protocol,
   * host, and port, which are used to construct the base URL of the API to send push notifications.
   * Defaults are provided for protocol and port.
   *
   * @param {Object} options - The options object containing protocol, host, and port.
   * @param {string} options.host - The host of the API (e.g., "localhost" or "api.example.com").
   * @param {string} [options.protocol="https"] - The protocol of the API (e.g., "http" or "https").
   * @param {number} [options.port=5000] - The port of the API (e.g., 80, 443, 3000).
   *
   * @throws {Error} - Throws an error if host, protocol, or port is not provided or if the URL is invalid.
   */
  constructor({ host, protocol = "http", port = 5000 }) {
    if (!host) {
      throw new Error("Host is required and cannot be empty.");
    }
    if (!protocol) {
      throw new Error("Protocol is required and cannot be empty.");
    }
    if (!port) {
      throw new Error("Port is required and cannot be empty.");
    }

    this.apiUrl = `${protocol}://${host}:${port}`;

    // Validate the constructed URL
    try {
      new URL(this.apiUrl);
    } catch (error) {
      throw new Error(
        "Invalid URL constructed from provided protocol, host, and port."
      );
    }
  }

  /**
   * Sends a push notification to specified FCM (Firebase Cloud Messaging) tokens.
   *
   * This method sends a notification with a given title and body to a list of FCM tokens.
   * It makes an HTTP POST request to the API endpoint specified in the environment variables.
   * If the request is successful and the response status indicates success, the method returns
   * the data received from the API. If the status indicates failure, the method returns `false`.
   * In case of an error during the request, an error is thrown.
   *
   * @param {string} title - The title of the push notification.
   * @param {string} body - The body content of the push notification.
   * @param {string[]} fcmTokens - An array of FCM tokens to which the notification should be sent.
   * @param {Object} [data={}] - An optional data object to include in the notification.
   *
   * @returns {Object|boolean} - Returns the data from the API response if successful, or `false` if the response indicates failure.
   *
   * @throws {Error} - Throws an error if there is an issue with the request or response.
   */
  async sendNotification(title, body, fcmTokens, data = {}) {
    try {
      // Validate title
      if (typeof title !== "string" || title.trim() === "") {
        throw new Error("Title must be a non-empty string.");
      }

      // Validate body
      if (typeof body !== "string" || body.trim() === "") {
        throw new Error("Body must be a non-empty string.");
      }

      // Validate fcmTokens
      if (
        !Array.isArray(fcmTokens) ||
        fcmTokens.some(
          (token) => typeof token !== "string" || token.trim() === ""
        )
      ) {
        throw new Error("FCM tokens must be an array of non-empty strings.");
      }
      // Make a POST request to the API URL to send the notification
      const response = await fetch(`${this.apiUrl}/api/send`, {
        method: "POST", // HTTP method for the request
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title, // Title of the notification
          body: body, // Body content of the notification
          fcm_tokens: fcmTokens, // Array of FCM tokens to which the notification should be sent
          data: data, // Data object to include in the notification
        }),
      });
      // Check if the response status indicates success
      if (response.status) {
        // Parse the JSON response
        const data = await response.json();
        if (data.data.successCount > 0) {
          return data.data; // Return the data from the response if successful
        } else {
          return false;
        }
      } else {
        return false; // Return false if the response status indicates failure
      }
    } catch (error) {
      // Catch and throw any errors that occur during the request
      throw new Error(error); // Wrap the error in a new Error object and throw it
    }
  }
}
