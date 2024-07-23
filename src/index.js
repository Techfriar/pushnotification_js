import axios from "axios";
export default class PushNotification {
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
   *
   * @returns {Object|boolean} - Returns the data from the API response if successful, or `false` if the response indicates failure.
   *
   * @throws {Error} - Throws an error if there is an issue with the request or response.
   */
  async sendNotification(title, body, fcmTokens) {
    try {
      // Make a POST request to the API URL to send the notification
      const response = await axios({
        method: "POST", // HTTP method for the request
        url: "http://localhost:3001/api/send", // API URL to send the notification, appended with "/send"
        data: {
          // Data to be sent in the request body
          title: title, // Title of the notification
          body: body, // Body content of the notification
          fcm_tokens: fcmTokens, // Array of FCM tokens to which the notification should be sent
        },
      });
      // Check if the response status indicates success
      if (response.data.status) {
        return response.data.data; // Return the data from the response if successful
      } else {
        return false; // Return false if the response status indicates failure
      }
    } catch (error) {
      // Catch and throw any errors that occur during the request
      throw new Error(error); // Wrap the error in a new Error object and throw it
    }
  }
}
