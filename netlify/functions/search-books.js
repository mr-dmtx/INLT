exports.handler = async function (event) {
  const query = event.queryStringParameters?.q || '';
  if (!query) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Query parameter q is required.' })
    };
  }

  const apiKey = process.env.GOOGLE_BOOKS_API_KEY || '';
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${encodeURIComponent(apiKey)}&maxResults=5`;

  try {
    const response = await fetch(url);
    const text = await response.text();
    return {
      statusCode: response.status,
      headers: { 'Content-Type': 'application/json' },
      body: text
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro ao buscar livros.' })
    };
  }
};