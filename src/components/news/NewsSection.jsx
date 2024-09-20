import  { useState, useEffect } from 'react'
import NewsTile from './NewsTile.jsx'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import useSubmit from '../../hooks/useSubmit.js'
import Stack from '@mui/material/Stack'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const NewsSection = ({ articles }) => {


  const [featuredArticle, setFeaturedArticle] = useState(null)

  useEffect(() => {
    const featured = articles?.shift()
    setFeaturedArticle(featured)
  }, [])

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3
    }
  };
  return (
    <Box display="flex">
      <Container>

        <h3>Latest Real Estate News</h3>
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          containerClass="container"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite={false}
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={responsive}>
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
        </Carousel>
      </Container>

    </Box>
  )
}

export default NewsSection