// const express = require('express');
// const cors = require('cors');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware to enable CORS
// app.use(cors());

// // Define the endpoint to get image URLs
// app.get('/api/images', async (req, res) => {
//   const api_key = "cf826b41e9a3169af321e0f8281eaba86740aa78d3a4dd32e62aa3744cb06219"; // Your API key

//   console.log(req.query);

//   const query = req.query.query + " herb";  // Get the search query from query params
//   console.log(query);

//   const params = new URLSearchParams({
//     q: query,
//     tbm: "isch",
//     ijn: "0",
//     api_key: api_key
//   });   

//   try {
//     const response = await fetch(`https://serpapi.com/search.json?${params}`);
//     const data = await response.json();

//     // Extract image URLs
//     const imagesResults = data.images_results || [];

//     // Get the first image URL if available
//     const firstImageUrl = imagesResults.length > 0 ? imagesResults[0].original : null;

//     // Send the first image URL as a JSON response
//     if (firstImageUrl) {
//       res.json({ imageUrl: firstImageUrl });
//     } else {
//       res.status(404).json({ error: 'No images found' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to fetch images' });
//   }
// });

// const extractScientificInfo = (responseText) => {

//     try {
//       const parsedData = JSON.parse(responseText);
  
//       // Extract name and description
//       const scientificName = parsedData.name || 'Unknown'; // Default to 'Unknown' if not available
//       const description = parsedData.description || 'No description available'; // Default description
  
//       // Return the result as JSON format
//       return { scientificName, description };
//     } catch (error) {
//       console.error('Error parsing JSON:', error);
//       throw new Error('Invalid JSON format');
//     }
//   };
  

// // Function to fetch the scientific name from the Vext API
// async function fetchScientificName(query) {
//   const apiKey = 'tT0Yo0P6.YVwAVISgsO9dWsyZyH6wInLFPE3bPpXm';
//   const endpoint = 'https://payload.vextapp.com/hook/IJN0TUZPUS/catch/tT0Yo0P6.YVwAVISgsO9dWsyZyH6wInLFPE3bPpXm';

//   const response = await fetch(endpoint, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Apikey': `Api-Key ${apiKey}`, // Fixed the header syntax
//     },
//     body: JSON.stringify({ payload: query }),
//   });

//   if (response.ok) {
//     const data = await response.json();
//     console.log('Vext API Response:', data);

//     // Extract scientific name and description
//     const scientificName = data.text.name;
//     const description = data.text.description;
//     // Return the information in JSON format
//     return { scientificName, description };
//   } else {
//     console.error('Error communicating with the bot:', response.statusText);
//     throw new Error('Error fetching scientific name');
//   }
// }

// // Define a new endpoint to get the scientific name
// app.get('/api/scientific-name', async (req, res) => {
//   const query = req.query.query; // Get the search query from query params

//   if (!query) {
//     return res.status(400).json({ error: 'Query is required' });
//   }

//   try {
//     const scientificNameInfo = await fetchScientificName(query);
//     res.json(scientificNameInfo);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to fetch scientific name' });
//   }
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



//NEW CODE



const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to enable CORS
app.use(cors());



app.get('/api/Gimages', async (req, res) => {
  const query = req.query.query; // Get the search query from query parameters

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    // Make a request to the custom API
    const apiUrl = `https://image-scrape-zk2o.onrender.com/get-images?query=${encodeURIComponent(query)}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch data from the API. Status: ${response.status}`);
    }

    const data = await response.json();

    // Extract the first image URL if available
    const imageUrls = data.image_urls || [];
    const firstImageUrl = imageUrls.length > 0 ? imageUrls[0] : null;

    if (firstImageUrl) {
      res.json({ imageUrl: firstImageUrl });
    } else {
      res.status(404).json({ error: 'No images found' });
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});




// Define the endpoint to get image URLs
app.get('/api/images', async (req, res) => {
  const api_key = "cf826b41e9a3169af321e0f8281eaba86740aa78d3a4dd32e62aa3744cb06219"; // Your API key

  const query = req.query.query + " herb";  // Get the search query from query params

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

// Function to fetch the scientific name from the Vext API
async function fetchScientificName(query) {
  const apiKey = 'tT0Yo0P6.YVwAVISgsO9dWsyZyH6wInLFPE3bPpXm';
  const endpoint = 'https://payload.vextapp.com/hook/IJN0TUZPUS/catch/tT0Yo0P6.YVwAVISgsO9dWsyZyH6wInLFPE3bPpXm';

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

    // Extract scientific name and detailed answer
    const scientificName = data.text.scientific_name || "Unknown";
    const generalInfo = data.text.general_info || "No general info available.";
    const intents = data.text.intents || [];
    const detailedAnswer = data.text.detailed_answer || null;
    const fallbackAnswer = data.text.fallback_answer || "No detailed answer available.";

    // Check if all required intents are present
    const requiredIntents = [
      "Scientific Name", 
      "Genus", 
      "Species", 
      "Family", 
      "Synonym", 
      "Statewise Availability", 
      "Phytochemicals", 
      "Ailments Cured", 
      "Plant Parts and Method of Use", 
      "Vernacular Name"
    ];

    const hasAllIntents = intents.length == 10;

    return {
      scientificName,
      generalInfo,
      detailedAnswer: detailedAnswer,
      intents: intents,
      hasAllIntents
    };
  } else {
    console.error('Error communicating with the Vext API:', response.statusText);
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

    // Only fetch image if all intents are present
    if (scientificNameInfo.intents) {
      //const imageResponse = await fetch(`https://serpapi.com/search.json?q=${encodeURIComponent(scientificNameInfo.scientificName + " herb")}&tbm=isch&ijn=0&api_key=cf826b41e9a3169af321e0f8281eaba86740aa78d3a4dd32e62aa3744cb06219`);
      //const imageData = await imageResponse.json();
      //const imagesResults = imageData.images_results || [];
      //const firstImageUrl = imagesResults.length > 0 ? imagesResults[0].original : null;
      res.json({
        ...scientificNameInfo,
      });
    } else {
      res.json(scientificNameInfo); // No image if intents are missing
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch scientific name or image' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
