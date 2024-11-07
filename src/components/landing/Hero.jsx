import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import coverIMG from "../../assets/images/landing/cover.jpeg"
import TOS from "../../assets/terms-and-conditions.pdf"
import { useNavigate } from 'react-router-dom'
import Image from 'mui-image'
import bgImage from '../../assets/images/landing/leasewise-landing-bg.jpeg'
import { DemoButton } from '../../index.js'
import DemoButtonHero from '../nav/DemoButtonHero.jsx'
const Hero = () => {

  const navigate = useNavigate()
  const navigateToSignUp = () => {
    navigate("/sign-up")
  }

  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        height: "100vh"
      })}
    >
      {/*<Box position="absolute" sx={{ opacity: "25%"}}>
        <Image src={bgImage} alt="bg" />
      </Box>*/}

      <Box
          id="image"
          sx={(theme) => ({
            zIndex: "-100",
            position: "absolute",
            opacity: "90%",
            mt: -5,
            alignSelf: 'center',
            height: "100vh",
            width: '100%',
            backgroundImage:'url("/static/images/leasewise-landing-bg.png")',
            backgroundSize: 'cover',
            backgroundPosition: "center",
            borderRadius: '10px',
            outline: '1px solid',
            outlineColor:
              theme.palette.mode === 'light'
                ? alpha('#BFCCD9', 0.5)
                : alpha('#9CCCFC', 0.1),
            boxShadow:
              theme.palette.mode === 'light'
                ? `0 0 12px 8px ${alpha('#9CCCFC', 0.2)}`
                : `0 0 24px 12px ${alpha('#033363', 0.2)}`,
          })}
        ></Box>
      <Container
        sx={{
          zIndex: "1000",
          display: 'grid',
          placeItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
          height: "80vh"
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
          <Typography
            variant="h5"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
              textAlign: 'center',
              color: "white"
              // fontSize: 'clamp(3.5rem, 10vw, 4rem)',
            }}
          >
            RENTAL PROPERTY SOFTWARE&nbsp;
            <Typography
              component="span"
              variant="h5"
              sx={{
                // fontSize: 'clamp(3rem, 10vw, 4rem)',
                color:'dodgerblue',
              }}
            >
              MANAGEMENT
            </Typography>
          </Typography>
          <Typography
            variant="h3"
            textAlign="center"
            color="text.secondary"
            sx={{ alignSelf: 'center', width: '100%', zIndex: "100", color: "white" }}
          >
            Make self-managing rentals simple.
          </Typography>
          <Box sx={{ placeSelf: "center"}}>
            <DemoButtonHero />
          </Box>

        </Stack>

        {/*<Box
          id="image"
          sx={(theme) => ({
            mt: { xs: 8, sm: 10 },
            alignSelf: 'center',
            height: { xs: 200, sm: 700 },
            width: '100%',
            backgroundImage:'url("/static/images/cover.jpeg")',
            backgroundSize: 'cover',
            borderRadius: '10px',
            outline: '1px solid',
            outlineColor:
              theme.palette.mode === 'light'
                ? alpha('#BFCCD9', 0.5)
                : alpha('#9CCCFC', 0.1),
            boxShadow:
              theme.palette.mode === 'light'
                ? `0 0 12px 8px ${alpha('#9CCCFC', 0.2)}`
                : `0 0 24px 12px ${alpha('#033363', 0.2)}`,
          })}
        ></Box>*/}

      </Container>
    </Box>
  );
};

export default Hero;
