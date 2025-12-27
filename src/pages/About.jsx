import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function About() {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate(createPageUrl('Explore'), { replace: true });
  }, [navigate]);
  
  return null;
}