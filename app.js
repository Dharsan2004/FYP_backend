const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to enable CORS
app.use(cors());

// Define the endpoint to get image URLs
app.get('/api/images', async (req, res) => {
  const api_key = "cf826b41e9a3169af321e0f8281eaba86740aa78d3a4dd32e62aa3744cb06219"; // Your API key

  console.log(req.query);

  const query = req.query.query + " herb";  // Get the search query from query params
  console.log(query);

  const params = new URLSearchParams({
    q: query,
    tbm: "isch",
    ijn: "0",
    api_key: api_key
  });

  try {
    const response = await fetch(`https://serpapi.com/search.json?${params}`);
    const data = await response.json();

    // Extract image URLs
    const imagesResults = data.images_results || [];

    // Get the first image URL if available
    const firstImageUrl = imagesResults.length > 0 ? imagesResults[0].original : null;

    // Send the first image URL as a JSON response
    if (firstImageUrl) {
      res.json({ imageUrl: firstImageUrl });
    } else {
      res.status(404).json({ error: 'No images found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

const extractScientificInfo = (responseText) => {

    try {
      const parsedData = JSON.parse(responseText);
  
      // Extract name and description
      const scientificName = parsedData.name || 'Unknown'; // Default to 'Unknown' if not available
      const description = parsedData.description || 'No description available'; // Default description
  
      // Return the result as JSON format
      return { scientificName, description };
    } catch (error) {
      console.error('Error parsing JSON:', error);
      throw new Error('Invalid JSON format');
    }
  };
  

// Function to fetch the scientific name from the Vext API
async function fetchScientificName(query) {
  const apiKey = 'GqiPEyGF.5040IPVWiCGiV5FPaGxGKmQMEZzRO1jk';
  const endpoint = 'https://payload.vextapp.com/hook/V4KR8LUOGE/catch/GqiPEyGF.5040IPVWiCGiV5FPaGxGKmQMEZzRO1jk';

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Apikey': `Api-Key ${apiKey}`, // Fixed the header syntax
    },
    body: JSON.stringify({ payload: query }),
  });

  if (response.ok) {
    const data = await response.json();
    console.log('Vext API Response:', data);

    // Extract scientific name and description
    const scientificName = data.text.name;
    const description = data.text.description;
    // Return the information in JSON format
    return { scientificName, description };
  } else {
    console.error('Error communicating with the bot:', response.statusText);
    throw new Error('Error fetching scientific name');
  }
}

// Define a new endpoint to get the scientific name
app.get('/api/scientific-name', async (req, res) => {
  const query = req.query.query; // Get the search query from query params

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {
    const scientificNameInfo = await fetchScientificName(query);
    res.json(scientificNameInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch scientific name' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
