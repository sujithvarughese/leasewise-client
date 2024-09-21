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
import Paper from '@mui/material/Paper'

const NewsSection = ({ articles }) => {


  const [featuredArticle, setFeaturedArticle] = useState(null)

  useEffect(() => {
    const featured = articles?.shift()
    setFeaturedArticle(featured)
  }, [])

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1200 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 1199, min: 900 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 899, min: 600 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 599, min: 0 },
      items: 2
    }
  };
  return (

    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <h3>Latest Real Estate News</h3>
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          focusOnSelect={false}
          infinite={false}
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={responsive}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
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
    </Paper>


  )
}

export default NewsSection