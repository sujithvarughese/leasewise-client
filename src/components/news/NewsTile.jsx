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
    <Paper elevation={16} sx={{ border: "none"}}>
      <Box>
        <Image
          src={urlToImage}
          alt="image"
          width={160}
          height={120}
          sx={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
        />
      </Box>

      <Box>
        <Typography textAlign="left" fontWeight={700}>{source}</Typography>
        <Link href={url} target="_blank" rel="noreferrer"textAlign="left">{title.substring(0, 40)}</Link>
        <Typography
          textAlign="left"
          color="gray"
        >{monthString[month - 1]} {day}, {year}</Typography>
      </Box>
    </Paper>
  )
}

export default NewsTile