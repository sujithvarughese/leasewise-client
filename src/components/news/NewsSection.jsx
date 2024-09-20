import  { useState, useEffect } from 'react'
import NewsTile from './NewsTile.jsx'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import useSubmit from '../../hooks/useSubmit.js'
import Stack from '@mui/material/Stack'

const NewsSection = ({ articles }) => {


  const [featuredArticle, setFeaturedArticle] = useState(null)

  useEffect(() => {
    const featured = articles?.shift()
    setFeaturedArticle(featured)
  }, [])


  return (
    <Box  display="flex">
      <Container>
        <CssBaseline />
        <Toolbar />
        <h3>Latest Real Estate News</h3>
        <Stack flexDirection="row" gap={2}>
          {articles.map((article, index) =>
            <NewsTile
              key={index}
              source={article.source.name}
              title={article.title}
              url={article.url}
              urlToImage={article.urlToImage}
              date={article.publishedAt}
            />
          )}
        </Stack>
      </Container>

    </Box>
  )
}

export default NewsSection