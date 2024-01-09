// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "api/*.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/api/proxy.js?target=$1"
    }
  ]
}

// api/proxy.js
const https = require("https");

module.exports = (req, res) => {
  const { target } = req.query;
  const options = {
    hostname: "copilot.microsoft.com",
    port: 443,
    path: `/${target}`,
    method: "GET",
    headers: req.headers
  };
  const proxy = https.request(options, (response) => {
    res.writeHead(response.statusCode, response.headers);
    response.pipe(res, { end: true });
  });
  req.pipe(proxy, { end: true });
};

// public/index.html
<html>
  <head>
    <title>Proxy Website</title>
  </head>
  <body>
    <h1>Welcome to Proxy Website</h1>
    <p>This is a simple proxy website that can access copilot.microsoft.com.</p>
    <p>Try to sign in with your Microsoft account or Entra ID account below:</p>
    <form action="/" method="get">
      <input type="text" name="account" placeholder="Enter your account" />
      <input type="submit" value="Sign in" />
    </form>
  </body>
</html>
