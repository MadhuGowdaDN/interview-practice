// Page.jsx
import { Box, Container } from '@common';
import { useState } from "@react";
import LoginBranding from './LoginBranding';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Page = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [authError, setAuthError] = useState('');

  const handleRegister = async (formData) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (formData.email === 'test@example.com') {
          reject(new Error('Email already exists'));
        } else {
          resolve({ success: true });
        }
      }, 1000);
    });
  };

  const toggleView = () => {
    setIsLoginView(!isLoginView);
    setAuthError('');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 50%)',
          animation: 'rotate 20s linear infinite',
        },
        '@keyframes rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 4,
            alignItems: 'center',
          }}
        >
          <LoginBranding />

          {isLoginView ? (
            <LoginForm
              externalError={authError}
              setExternalError={setAuthError}
              onToggleView={toggleView}
            />
          ) : (
            <RegisterForm
              onRegister={handleRegister}
              externalError={authError}
              setExternalError={setAuthError}
              onToggleView={toggleView}
            />
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Page;