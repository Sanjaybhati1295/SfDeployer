export default function handler(req, res) {
  // Serve an HTML page that reads the token from URL and 
  // postMessages it back to the extension window
  res.setHeader('Content-Type', 'text/html');
  res.send(`
    <!DOCTYPE html>
    <html>
    <head><title>SF Deployer – Connecting...</title></head>
    <body>
      <script>
        const params = new URLSearchParams(
          window.location.hash.slice(1) || window.location.search.slice(1)
        );
        const token = params.get('access_token');
        const instanceUrl = params.get('instance_url');

        if (token && window.opener) {
          window.opener.postMessage({
            type: 'SF_DEPLOYER_OAUTH_CALLBACK',
            accessToken: token,
            instanceUrl: decodeURIComponent(instanceUrl || '')
          }, '*');
          document.body.innerHTML = '<p>✓ Connected! Closing...</p>';
          setTimeout(() => window.close(), 1000);
        }
      </script>
      <p>Completing authentication...</p>
    </body>
    </html>
  `);
}
