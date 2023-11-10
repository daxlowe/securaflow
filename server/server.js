const express = require('express');
const routes = require('./routes/routes');
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

const app = express();

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
    audience: '{yourApiIdentifier}',
    issuerBaseURL: `https://{yourDomain}/`,
});

app.use(express.json());
app.use('/api', routes);

/* PUBLIC ROUTES */
// This route doesn't need authentication, use this template for public routes
app.get('/api/public', function(req, res) {
    res.json({
      message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
    });
});

/* PROTECTED ROUTES */
// This route needs authentication
app.get('/api/private', checkJwt, function(req, res) {
    res.json({
      message: 'Hello from a private endpoint! You need to be authenticated to see this.'
    });
});

/* SCOPED PROTECTED ROUTES */
const checkScopes = requiredScopes('read:messages'); // read:messages scope is just a generic example

app.get('/api/private-scoped', checkJwt, checkScopes, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
  });
});

// ... setup other middleware, error handling, etc.

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
