# pushnotification_js

`pushnotification_js` is a JavaScript package for sending push notifications.
This package provides a simple interface to send notifications to a list of devices.

## Installation

To use this package, first install it via npm:

Using npm:

```bash
npm install git+https://github.com/Techfriar/pushnotification_js.git
```

Using yarn:

```bash
yarn add git+https://github.com/Techfriar/pushnotification_js.git
```

## Install from any other branches

Using npm:

```bash
npm install git+https://github.com/Techfriar/pushnotification_js.git#development
```

Using yarn:

```bash
yarn add git+https://github.com/Techfriar/pushnotification_js.git#development
```

## Usage

1. **Import the package:**

```javascript
import PushNotification from "pushnotification_js";
```

2. **Create an instance of `PushNotification`:**

```javascript
const pushNotification = new PushNotification('<Your Docker Container URL>/api'); // Docker Container URL
```

3. **Send a notification:**

```javascript
const title = "Notification Title";
const body = "Notification Body";
const fcmTokens = [];

const send = await pushNotification.sendNotification(
  title,
  body,
  fcmTokens
);
```

- `title`: The title of the push notification.
- `body`: The body content of the push notification.
- `fcmTokens`: An array of FCM tokens to which the notification should be sent.

The `sendNotification` method returns the data from the API response if the notification was sent successfully, or `false` if there was a failure.
