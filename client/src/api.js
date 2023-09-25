export async function fetchResponse(chat) {
    try {
      const response = await fetch('http://localhost:3080', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chat }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      return response;
    } catch (error) {
      console.error('Error fetching response:', error);
      throw error; // Re-throw the error to be handled in the calling function
    }
  }
  