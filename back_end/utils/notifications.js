// const admin = require("../config/firebase");

// const sendNotification = async (deviceToken, title, body) => {
//   if (!deviceToken) return;

//   const message = {
//     token: deviceToken,
//     notification: { title, body },
//   };

//   try {
//     await admin.messaging().send(message);
//     console.log("✅ Notification sent successfully!");
//   } catch (error) {
//     console.error("❌ Error sending notification:", error);
//   }
// };

// module.exports = sendNotification;
