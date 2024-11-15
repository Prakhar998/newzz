import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  CssBaseline, 
  ThemeProvider, 
  createTheme,
  CircularProgress,
  Alert,
  Pagination,
  Typography
} from '@mui/material';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import NewsCard from './components/News/NewsCard';
import ArticlePreview from './components/News/ArticlePreview';
import { fetchTopHeadlines } from './services/newsApi';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

const App = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [category, setCategory] = useState('general');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 20;

  const categories = [
    { id: 'general', name: 'General' },
    { id: 'business', name: 'Business' },
    { id: 'entertainment', name: 'Entertainment' },
    { id: 'health', name: 'Health' },
    { id: 'science', name: 'Science' },
    { id: 'sports', name: 'Sports' },
    { id: 'technology', name: 'Technology' }
  ];

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const { articles, totalResults } = await fetchTopHeadlines({
          category,
          page,
          pageSize
        });
        setArticles(articles);
        setTotalPages(Math.ceil(totalResults / pageSize));
      } catch (err) {
        setError('Failed to load news. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [category, page]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1); // Reset to first page when changing categories
    setSelectedArticle(null); // Close article preview
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Header onMenuClick={() => setIsMenuOpen(true)} />
        
        <Sidebar
          open={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          categories={categories}
          selectedCategory={category}
          onCategorySelect={handleCategoryChange}
        />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pt: 10,
            px: 3,
            width: selectedArticle ? '50%' : '100%',
            transition: 'width 0.3s ease-in-out'
          }}
        >
          <Container maxWidth="lg">
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : articles.length === 0 ? (
              <Typography variant="h6" sx={{ textAlign: 'center', py: 4 }}>
                No articles found for this category.
              </Typography>
            ) : (
              <>
                {articles.map((article, index) => (
                  <NewsCard
                    key={`${article.title}-${index}`}
                    article={article}
                    onClick={setSelectedArticle}
                  />
                ))}

                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  py: 4,
                  width: '100%'
                }}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                  />
                </Box>
              </>
            )}
          </Container>
        </Box>

        <ArticlePreview
          article={selectedArticle}
          open={Boolean(selectedArticle)}
          onClose={() => setSelectedArticle(null)}
        />
      </Box>
    </ThemeProvider>
  );
};

export default App;