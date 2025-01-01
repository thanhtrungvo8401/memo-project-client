import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface HtmlTitleProps {
  title: string;
}

const HtmlTitle: React.FC<HtmlTitleProps> = ({ title }) => {
  const location = useLocation();

  useEffect(() => {
    document.title = title;
  }, [location, title]);

  return null; // This component doesn't render anything
};

export default HtmlTitle;
