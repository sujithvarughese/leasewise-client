
import Typography from '@mui/material/Typography';

import businessInsiderLogo from "../../assets/images/landing/logos/business_insider.png"
import forbesLogo from "../../assets/images/landing/logos/forbes.svg"
import realtorComLogo from "../../assets/images/landing/logos/realtor_com.png"
import wsjLogo from "../../assets/images/landing/logos/wsj.svg"
import realtyTimesLogo from "../../assets/images/landing/logos/realty_times.png"

import Stack from "@mui/material/Stack";
import {Container} from "@mui/material";


const logos = [forbesLogo, realtorComLogo, wsjLogo, realtyTimesLogo, businessInsiderLogo];



const Magazines = () => {

  return (
    <Container id="logoCollection" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        align="center"
        color="text.secondary"
      >
        As Seen In
      </Typography>
      <Stack flexDirection="row" justifyContent="space-around" alignItems="center">
        {logos.map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt={`Company number ${index + 1}`}
            style={{ width: "15%" }}
          />
        ))}
      </Stack>
    </Container>
  );
};

export default Magazines;