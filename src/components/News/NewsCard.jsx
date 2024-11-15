// src/components/News/NewsCard.jsx
import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Box,
  Chip
} from '@mui/material';

const NewsCard = ({ article, onClick }) => {
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return 'Date unavailable';
    }
  };

  return (
    <Card 
      sx={{ 
        mb: 2,
        '&:hover': {
          boxShadow: 6,
        },
        transition: 'box-shadow 0.3s ease-in-out'
      }}
    >
      <CardActionArea onClick={() => onClick(article)}>
        <CardMedia
          component="img"
          height="200"
          image={article.urlToImage || "/api/placeholder/400/300"}
          alt={article.title}
          sx={{
            objectFit: 'cover'
          }}
        />
        <CardContent>
          <Typography 
            gutterBottom 
            variant="h6" 
            component="h2"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              lineHeight: 1.3,
              minHeight: '2.6em'
            }}
          >
            {article.title}
          </Typography>
          
          {article.source?.name && (
            <Chip
              label={article.source.name}
              size="small"
              sx={{ mb: 1 }}
            />
          )}

          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              mb: 2,
              minHeight: '4.5em'
            }}
          >
            {article.description || 'No description available'}
          </Typography>

          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 'auto'
            }}
          >
            <Typography 
              variant="caption" 
              color="text.secondary"
              sx={{
                maxWidth: '50%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {article.author || 'Unknown author'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatDate(article.publishedAt)}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default NewsCard;