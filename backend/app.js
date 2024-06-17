const express = require("express"); // Import Express framework
const axios = require("axios"); // Import Axios for HTTP requests
require("dotenv").config(); // Import dotenv to load environment variables from .env file

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

const API_KEY = process.env.ALLOY_API_KEY; // Get API key from environment variables
const BASE_URL = "https://embedded.runalloy.com/2024-03"; // Base URL for Alloy API

// Create a new user in Alloy Embedded
app.post("/create-user", async (req, res) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/users`,
      { username: req.body.username },
      { headers: { Authorization: `Bearer ${API_KEY}` } } // Pass API key in the headers
    );
    res.json(response.data); // Returns a userId for the created user
  } catch (error) {
    console.error("Error creating user:", error.message); // Log error message
    res.status(500).json({ error: error.message }); // Send error response
  }
});

// List integrations
app.get("/integrations", async (req, res) => {
  const userId = req.query.userId; // Get userId from query parameters
  try {
    const response = await axios.get(
      `${BASE_URL}/integrations?userId=${userId}`, // Request integrations for the user
      { headers: { Authorization: `Bearer ${API_KEY}` } } // Pass API key in the headers
    );
    res.json(response.data); // Send the response data back to the client
  } catch (error) {
    console.error("Error fetching integrations:", error.message); // Log error message
    res.status(500).json({ error: error.message }); // Send error response
  }
});

// Display and collect auth fields from the user
app.get("/auth-fields", async (req, res) => {
  const appName = req.query.appName; // Get the APP_NAME to integrate with
  try {
    const response = await axios.get(
      `${BASE_URL}/metadata/credentials/${appName}`, // Request the authfields required for the integration
      { headers: { Authorization: `Bearer ${API_KEY}` } } // Pass API key in the headers
    );
    res.json(response.data); // Send req'd auth fields to the client
  } catch (error) {
    console.error("Error fetching Auth Fields:", error.message); // Log error message
    res.status(500).json({ error: error.message }); // Send error response
  }
});

// Get a credential Id
app.get("/credentialid", async (req, res) => {
  const userId = req.query.userId; // Get userId from query parameters
  const appName = req.query.appName; // Get appName from query parameters
  const shopifyShopSubdomain = req.query.shopifyShopSubdomain; // Get shopify Shop subdomain from query parameters
  try {
    const response = await axios.get(
      `${BASE_URL}/headless/oauthurl?userId=${userId}&app=${appName}&shopSubdomain=${shopifyShopSubdomain}`, // Request the authfields required for the integration
      { headers: { Authorization: `Bearer ${API_KEY}` } } // Pass API key in the headers
    );
    res.json(response.data); // returns the OAuth url to redirect the user to allowing them to grant permission to your app using OAuth
  } catch (error) {
    console.error("Error fetching OAuth URL:", error.message); // Log error message
    res.status(500).json({ error: error.message }); // Send error response
  }
});

// Start installation and Get installationID
app.post("/startinstallation", async (req, res) => {
  const userId = req.body.userId; // Get userId from query parameters
  const credentialId = req.body.credentialId; // Get appName from query parameters
  const integrationId = req.body.integrationId; // Get shopify Shop subdomain from query parameters
  try {
    const response = await axios.post(
      `${BASE_URL}/headless/startinstallation`, // Start the installation process
      { userId, credentialId, integrationId },
      { headers: { Authorization: `Bearer ${API_KEY}` } } // Pass API key in the headers
    );
    res.json(response.data); // returns the installationID
  } catch (error) {
    console.error("Error fetching installationID:", error.message); // Log error message
    res.status(500).json({ error: error.message }); // Send error response
  }
});

// Completing the installation
app.post("/completeinstallation", async (req, res) => {
  const installationId = req.body.installationId; // Get shopify Shop subdomain from query parameters
  try {
    const response = await axios.post(
      `${BASE_URL}/headless/startinstallation`, // Start the installation process
      { installationId },
      { headers: { Authorization: `Bearer ${API_KEY}` } } // Pass API key in the headers
    );
    res.json(response.data); // returns the installation status
  } catch (error) {
    console.error("Error completing the installation:", error.message); // Log error message
    res.status(500).json({ error: error.message }); // Send error response
  }
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
