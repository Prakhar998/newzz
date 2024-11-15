const API_KEY = '2aeeb4541e414e68b72eb778c0cbd244'; 
const BASE_URL = 'https://newsapi.org/v2/top-headlines';

export const fetchTopHeadlines = async ({ 
  category = 'general',
  country = 'us',
  page = 1,
  pageSize = 20
}) => {
  try {
    const queryParams = new URLSearchParams({
      category,
      country,
      page,
      pageSize,
      apiKey: API_KEY
    });

    const response = await fetch(`${BASE_URL}?${queryParams}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return {
      articles: data.articles,
      totalResults: data.totalResults
    };
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};