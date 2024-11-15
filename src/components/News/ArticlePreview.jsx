import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Box,
  Link,
  useTheme,
  useMediaQuery,
  Paper
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ArticlePreview = ({ article, onClose, open }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (!article) return null;

  const Content = () => (
    <>
      <Box
        component="img"
        src={article.urlToImage || "/api/placeholder/400/300"}
        alt={article.title}
        sx={{
          width: '100%',
          height: 300,
          objectFit: 'cover',
          mb: 2
        }}
      />
      <Typography variant="h5" gutterBottom>
        {article.title}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="subtitle2" color="text.secondary">
          {article.author}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {new Date(article.publishedAt).toLocaleDateString()}
        </Typography>
      </Box>
      <Typography variant="body1" paragraph>
        {article.content}
      </Typography>
      <Link
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        color="primary"
      >
        Read full article
      </Link>
    </>
  );

  if (isMobile) {
    return (
      <Dialog
        fullScreen
        open={open}
        onClose={onClose}
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Content />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Paper
      sx={{
        position: 'fixed',
        top: 64,
        right: 0,
        width: '50%',
        height: 'calc(100vh - 64px)',
        overflow: 'auto',
        p: 3,
        display: open ? 'block' : 'none'
      }}
      elevation={4}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8
        }}
      >
        <CloseIcon />
      </IconButton>
      <Content />
    </Paper>
  );
};

export default ArticlePreview;
