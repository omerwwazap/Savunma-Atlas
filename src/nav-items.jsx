import React from 'react';
import { useTranslation } from 'react-i18next';
import { HomeIcon, FolderIcon, NewspaperIcon, InfoIcon } from "lucide-react";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 * Now with internationalization support.
 */
export const useNavItems = () => {
  const { t } = useTranslation();

  return [
    {
      title: t('nav.home'),
      to: "/",
      icon: <HomeIcon className="h-4 w-4" />,
    },
    {
      title: t('nav.projects'),
      to: "/projects",
      icon: <FolderIcon className="h-4 w-4" />,
    },
    {
      title: t('nav.news'),
      to: "/news",
      icon: <NewspaperIcon className="h-4 w-4" />,
    },
    {
      title: t('nav.about'),
      to: "/about",
      icon: <InfoIcon className="h-4 w-4" />,
    },
  ];
};