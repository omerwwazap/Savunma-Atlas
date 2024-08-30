import React from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '../LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex space-x-2">
      <Button
        variant={language === 'en' ? 'default' : 'outline'}
        size="icon"
        onClick={() => setLanguage('en')}
        className="w-10 h-10"
      >
        <img src="src/components/images/uk-flag.svg" alt="UK Flag" className="w-6 h-6" />
      </Button>
      <Button
        variant={language === 'tr' ? 'default' : 'outline'}
        size="icon"
        onClick={() => setLanguage('tr')}
        className="w-10 h-10"
      >
        <img src="src/components/images/tr-flag.svg" alt="Turkish Flag" className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default LanguageSwitcher;