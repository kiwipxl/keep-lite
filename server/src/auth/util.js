module.exports = {
  genResponseHTML,
};

// On successful or failed authentication, we want to send our client to this
// HTML page that posts them a message with data (user on success, error message otherwise).
function genResponseHTML(message) {
  return `
    <html>
    <head>
    <script>
    window.opener.postMessage(${message}, '*');
    console.log('posted message to parent window');
    window.close();
    </script>
    </head>

    <body>
    ${message}
    </body>
    </html>
    `;
}
