import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container component="main" sx={{ mt: 4, mb: 4, flex: 1, maxWidth: '1200px !important' }}>
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;
