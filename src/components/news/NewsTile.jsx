import Image from 'mui-image'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Link from '@mui/material/Link'

const NewsTile = ({ source, title, url, urlToImage, date }) => {

  const monthString = ["January", "February","March","April","May","June","July","August","September","October","November", "December"]
  const month = Number(date.substring(5, 7))
  const day = date.substring(8, 10)
  const year = date.substring(0,4)

  return (
    <Paper elevation={16} sx={{ border: "none", margin: "6px", height: "240px", borderRadius: "8px"}}>
      <Box>
        <Image
          src={urlToImage}
          alt="image"

          height={120}
          sx={{ borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}
        />
      </Box>

      <Box p={1}>
        <Typography textAlign="left" fontWeight={700}>{source}</Typography>
        <Typography textAlign="left" color="gray" fontSize={12}>{monthString[month - 1]} {day}, {year}</Typography>
        <Link href={url} target="_blank" rel="noreferrer" textAlign="left">
          <Typography
            fontSize={14}
            sx={{
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
            }}
          >{title}</Typography>
        </Link>

      </Box>
    </Paper>
  )
}

export default NewsTile