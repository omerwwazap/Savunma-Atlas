import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mail } from 'lucide-react';

const ContactInfo = () => {
  const { t } = useTranslation();

  return (
    <div className="mt-8 text-center">
      <a
        href="mailto:levent07@live.com"
        className="inline-flex items-center text-blue-600 hover:text-blue-800"
      >
        <Mail className="mr-2 h-4 w-4" />
        {t('contact.email')}
      </a>
    </div>
  );
};

export default ContactInfo;