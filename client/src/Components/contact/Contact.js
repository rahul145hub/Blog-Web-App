import { Box, styled, Typography, Link } from '@mui/material';
import { Email, LinkedIn } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url(https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80);
    width: 100%;
    height: 60vh;
    background-position: left 0px top -100px;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
`;


const Contact = () => {
   return (
      <Box>
         <Banner />
         <Wrapper>
            <Typography variant="h3">Getting in touch is easy!</Typography>
            <Text variant="h5">
               Reach out to me on
               <Link href="https://www.linkedin.com/in/rahul-bhatia-7923201b1/" color="inherit" target="_blank">
                  <LinkedIn />
               </Link>
               or send me an Email
               <Link href="mailto:bhatiarahul145@gmail.com?Subject=This is a subject" target="_blank" color="inherit">
                  <Email />
               </Link>.
            </Text>
         </Wrapper>
      </Box>
   );
}

export default Contact;