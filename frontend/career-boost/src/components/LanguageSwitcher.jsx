import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Globe, Check } from "lucide-react";
import { cn } from "../lib/utils";

const LanguageSwitcher = ({ 
  variant = "outline", 
  size = "sm",
  showLabel = false,
  className = ""
}) => {
  const { t } = useTranslation();
  const { 
    currentLanguage, 
    changeLanguage, 
    getCurrentLanguageInfo, 
    getSupportedLanguages,
    isChanging 
  } = useLanguage();

  const currentLangInfo = getCurrentLanguageInfo();
  const supportedLanguages = getSupportedLanguages();

  const handleLanguageChange = (languageCode) => {
    changeLanguage(languageCode);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant={variant} 
          size={size}
          className={cn("flex items-center gap-2", className)}
          disabled={isChanging}
        >
          {isChanging ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
          ) : (
            <>
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">
                {currentLangInfo.flag}
              </span>
              {showLabel && (
                <span className="hidden md:inline">
                  {currentLangInfo.name}
                </span>
              )}
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="min-w-36">
        {supportedLanguages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={cn(
              "flex items-center justify-between cursor-pointer",
              currentLanguage === language.code && "bg-accent"
            )}
          >
            <div className="flex items-center gap-2">
              <span>{language.flag}</span>
              <span>{language.name}</span>
            </div>
            {currentLanguage === language.code && (
              <Check className="w-4 h-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;