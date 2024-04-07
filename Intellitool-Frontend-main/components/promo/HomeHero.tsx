import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { FaArrowDown } from 'react-icons/fa';
import Image from 'next/image';
import { keyframes } from '@emotion/react';
import Link from 'next/link';
import { textLinearGradientClassName } from '@/styles/styles';
import React, { useState, useContext } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'; // Import modal components from react-bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'; 
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

export const HomeHero = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const handleLoginModalOpen = () => setShowLoginModal(true);
  const handleLoginModalClose = () => setShowLoginModal(false);

  const handleSignupModalOpen = () => setShowSignupModal(true);
  const handleSignupModalClose = () => setShowSignupModal(false);


  return (
    <Flex
      minH="90vh"
      backgroundImage="/hero/tile-background.png"
      backgroundSize={['100%', '100%', '75%', '50%']}
      backgroundPosition="center center"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      position="relative"
      overflow="hidden"
    >
      {/* Header */}
      <Flex
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        marginBottom={['0px', '0px', '0px', '32px']}
      >
        {/* Title */}
        <Link href="/">
          <Text
            as="header"
            role="heading"
            fontSize={['32px', '48px', '48px', '64px']}
            fontWeight="bold"
            className={textLinearGradientClassName}
            _hover={{ letterSpacing: 6 }}
            transitionDuration="0.3s"
          >
            Intellitool
          </Text>
        </Link>
        {/* Subtitle */}
        <Flex justifyContent="center" alignItems="center" mt="4px">
          <Text
            as="span"
            fontSize={['18px', '18px', '24px', '24px']}
            className={textLinearGradientClassName}
          >
            Learn and Revise with GPT&nbsp;
          </Text>
          <Text as="span">📚</Text>
        </Flex>
      </Flex>
      
      <div>
      <div style={{ display: 'inline-block', marginRight: '20px' }}>
        <button onClick={handleLoginModalOpen} style={{ background: 'linear-gradient(45deg, #660A22, #ff869a)', padding: '15px 20px', border: 'none', borderRadius: '5px', color: '#fff' }}>Login</button>
        <LoginModal show={showLoginModal} handleClose={handleLoginModalClose} />
      </div>
      <div style={{ display: 'inline-block' }}>
        <button onClick={handleSignupModalOpen} style={{ background: 'linear-gradient(45deg, #660A22, #ff869a)', padding: '15px 20px', border: 'none', borderRadius: '5px', color: '#fff' }}>Student Register</button>
        <SignupModal show={showSignupModal} handleClose={handleSignupModalClose} />
      </div>
    </div>

      {/* Center Content */}
      <Flex position="relative" justifyContent="center" mx="18px" zIndex={1}>
        {/* Side Hero Image #1 */}
        <Flex justifyContent="center" alignItems="center">
          <Box position="relative" boxSize={['0px', '0px', '150px', '200px']}>
            <Image
              src="/hero/open-doodles-book.png"
              alt="open doodles book image"
              fill={true}
            />
          </Box>
        </Flex>

        {/* Main Hero Image */}
        <Flex justifyContent="center" alignItems="center" my="24px">
          <Box
            position="relative"
            boxSize={['280px', '350px', '350px', '400px']}
          >
            <Image
              src="/hero/open-doodles-book.png"
              alt="open doodles book image"
              fill={true}
            />
          </Box>
        </Flex>

        {/* Side Hero Image #2 */}
        <Flex justifyContent="center" alignItems="center">
          <Box position="relative" boxSize={['0px', '0px', '150px', '200px']}>
            <Image
              src="/hero/open-doodles-book.png"
              alt="open doodles book image"
              fill={true}
            />
          </Box>
        </Flex>
      </Flex>

      {/* Down Arrow Icon */}
      <Icon
        as={FaArrowDown}
        boxSize="30px"
        _hover={{
          cursor: 'pointer'
        }}
        position="absolute"
        bottom={['24px', '24px', '24px', '48px']}
        animation={`${arrowAnimation} 2s infinite`}
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
          });
        }}
      />
    </Flex>
  );
};

const arrowAnimation = keyframes`
  0%   { transform: translateY(0px) }
  50%  { transform: translateY(8px); color: #DD616B }
  100% { transform: translateY(0px) }
`;
