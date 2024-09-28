"use client";

import { useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";
import Script from "next/script";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const languages = [
  { label: "English", value: "en", flag: "https://flagcdn.com/h60/us.png" },
  { label: "Deutsch", value: "de", flag: "https://flagcdn.com/h60/de.png" },
  { label: "Español", value: "es", flag: "https://flagcdn.com/h60/es.png" },
  { label: "Français", value: "fr", flag: "https://flagcdn.com/h60/fr.png" },
];
const includedLanguages = languages.map((lang) => lang.value).join(",");

// Google Translate initialization
declare global {
  interface Window {
    googleTranslateElementInit: any;
    google: any; // You can replace 'any' with more specific typing for the Google object if available
  }
}

function googleTranslateElementInit() {
  new window.google.translate.TranslateElement(
    {
      pageLanguage: "auto", // Auto-detect language
      includedLanguages, // Restrict to specific languages
    },
    "google_translate_element" // The ID of the DOM element where the translation widget is rendered
  );
}

export const getPrefLangCookie = (): string => {
  const cookies = parseCookies();
  return decodeURIComponent(cookies["googtrans"] || "en");
};

interface GoogleTranslateProps {
  prefLangCookie: string;
}

export function GoogleTranslate({ prefLangCookie }: GoogleTranslateProps) {
  const [langCookie, setLangCookie] = useState<string>(
    decodeURIComponent(prefLangCookie)
  );

  useEffect(() => {
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  const onChange = (value: string) => {
    const lang = `/en/${value}`;
    setLangCookie(lang);

    // Set cookie for language preference
    setCookie(null, "googtrans", lang, { path: "/" });

    // Trigger the Google Translate language change
    const element = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (element) {
      element.value = value;
      element.dispatchEvent(new Event("change"));
    }
  };

  return (
    <div>
      <div
        id="google_translate_element"
        style={{ visibility: "hidden", width: "1px", height: "1px" }}
      ></div>
      <LanguageSelector onChange={onChange} value={langCookie} />
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </div>
  );
}

interface LanguageSelectorProps {
  onChange: (value: string) => void;
  value: string;
}

function LanguageSelector({ onChange, value }: LanguageSelectorProps) {
  const langCookie = value.split("/")[2]; // Get the language code (e.g., 'en')

  return (
    <Select value={langCookie} onValueChange={onChange}>
      <SelectTrigger className="notranslate">
        <SelectValue className="flex items-center space-x-2 w-fit">
          <div className="flex items-center space-x-2 justify-between">
            <span className="block w-fit uppercase">
              {languages.find((it) => it.value === langCookie)?.value}
            </span>
            <img
              className="block w-6 rounded-full h-6"
              src={languages.find((it) => it.value === langCookie)?.flag}
              alt={langCookie}
              width={24}
              height={24}
            />
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {languages.map((it) => (
            <SelectItem
              className="w-full flex items-center space-x-2"
              value={it.value}
              key={it.value}
            >
              <div className="flex items-center space-x-2">
                <span className="block w-fit notranslate">{it.label}</span>
                <img
                  className="block w-6"
                  src={it.flag}
                  alt={it.label}
                  width={24}
                  height={24}
                />
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
