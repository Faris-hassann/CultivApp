import { useState, useCallback } from 'react';

export const useModal = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = useCallback(() => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  }, []);

  const toggle = useCallback(() => {
    setIsOpen(prev => {
      const newState = !prev;
      document.body.style.overflow = newState ? 'hidden' : 'auto';
      return newState;
    });
  }, []);

  return {
    isOpen,
    open,
    close,
    toggle
  };
};

export const useAuthModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState('login'); // 'login' or 'signup'

  const openLogin = useCallback(() => {
    setMode('login');
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const openSignup = useCallback(() => {
    setMode('signup');
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  }, []);

  const switchToLogin = useCallback(() => {
    setMode('login');
  }, []);

  const switchToSignup = useCallback(() => {
    setMode('signup');
  }, []);

  return {
    isOpen,
    mode,
    openLogin,
    openSignup,
    close,
    switchToLogin,
    switchToSignup,
    isLoginMode: mode === 'login',
    isSignupMode: mode === 'signup'
  };
};
