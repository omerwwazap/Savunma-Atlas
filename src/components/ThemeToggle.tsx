import React from 'react';
import { useTheme } from './ThemeProvider';
import { Button as UIButton } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

// Cast UIButton from JS module to a typed React component to satisfy TS
type ButtonExtras = { variant?: string; size?: string };
const Button = UIButton as unknown as React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonExtras
>;

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="rounded-full w-9 h-9"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-yellow-300" />
      ) : (
        <Moon className="h-5 w-5 text-slate-700" />
      )}
    </Button>
  );
};

export default ThemeToggle;
