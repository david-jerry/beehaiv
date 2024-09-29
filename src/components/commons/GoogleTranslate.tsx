/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState, useRef } from "react";
import { parseCookies, setCookie } from "nookies";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useIsMounted } from "usehooks-ts";

// Language configurations
const languages = [
  { label: "English", value: "en", flag: "https://flagcdn.com/h60/us.png" },
  { label: "Germany", value: "de", flag: "https://flagcdn.com/h60/de.png" },
  { label: "Arabic", value: "ar", flag: "https://flagcdn.com/h60/ar.png" },
  { label: "简体中文", value: "zh-CN", flag: "https://flagcdn.com/h60/cn.png" },
  { label: "Español", value: "es", flag: "https://flagcdn.com/h60/es.png" },
  { label: "Français", value: "fr", flag: "https://flagcdn.com/h60/fr.png" },
];
const includedLanguages = languages.map((lang) => lang.value).join(",");

// Google Translate initialization
declare global {
  interface Window {
    googleTranslateElementInit: any;
    google: any;
  }
}

// Function to initialize the Google Translate widget
function googleTranslateElementInit() {
  if (!window.google) return;

  // Initialize the Google Translate element with defined options
  new window.google.translate.TranslateElement(
    {
      pageLanguage: "en", // Default to English
      includedLanguages,
      autoDisplay: false, // Avoid auto popup translation prompt
    },
    "google_translate_element"
  );
}

// Retrieve the language from the cookie
export const getPrefLangCookie = (): string => {
  const cookies = parseCookies();
  return decodeURIComponent(cookies["googtrans"] || "/en/en"); // Default to English
};

// GoogleTranslate component
export function GoogleTranslate() {
  const [langCookie, setLangCookie] = useState<string>(getPrefLangCookie());
  const isMounted = useIsMounted();
  const scriptLoadedRef = useRef(false); // To track if the script is loaded
  const [script, setScript] = useState<HTMLScriptElement | null>(null)

  // Function to change language without reloading the script
  const changeLanguage = (lang: string) => {
    setScript(null);
    // Set Google Translate language preference cookie
    const langPath = `/en/${lang}`;
    console.log(langPath)
    setCookie(null, "googtrans", langPath, { path: "/" });
    setLangCookie(langPath);

    // Trigger the language change in the Google Translate dropdown
    const element = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (element) {
      element.value = lang;
      element.dispatchEvent(new Event("change"));
      console.log(`Language changed to: ${lang}`);
    }

    loadGoogleTranslateScript()
  };

  // Function to load Google Translate script only once
  const loadGoogleTranslateScript = () => {
    if (!scriptLoadedRef.current) {
      window.googleTranslateElementInit = googleTranslateElementInit;

      // Load the Google Translate script globally
      if (script === null) {
        const s = document.createElement("script");
        setScript(s);
        s.src =
          "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        s.async = true;
        s.id = "google-translate-script";
        document.body.appendChild(s);
      }

      console.log("Google Translate script loaded globally");
      scriptLoadedRef.current = true;
    }
  };

  // UseEffect to handle language change and script loading
  useEffect(() => {
    if (isMounted()) {
      // Load the Google Translate script only once globally
      loadGoogleTranslateScript();

      // Initialize language to English or cookie-stored value
      const storedLang = langCookie.split("/")[2];
      changeLanguage(storedLang || "en"); // Default to English if no cookie
    }
  }, [isMounted, langCookie]);

  // Cleanup and handle language on route change
  useEffect(() => {
    const handlePathChange = () => {
      const storedLang = langCookie.split("/")[2];
      changeLanguage(storedLang || "en");
    };

    // Monitor route changes or reloads
    window.addEventListener("popstate", handlePathChange);
    window.addEventListener("pushstate", handlePathChange); // Custom pushState detection

    return () => {
      window.removeEventListener("popstate", handlePathChange);
      window.removeEventListener("pushstate", handlePathChange);
    };
  }, [langCookie]);

  return (
    <div>
      <div
        id="google_translate_element"
        style={{ visibility: "hidden", width: "1px", height: "1px" }}
      ></div>
      <LanguageSelector onChange={changeLanguage} value={langCookie} />
    </div>
  );
}

// Language selector dropdown
interface LanguageSelectorProps {
  onChange: (value: string) => void;
  value: string;
}

function LanguageSelector({ onChange, value }: LanguageSelectorProps) {
  const langCode = value.split("/")[2]; // Get the language code (e.g., 'en')

  return (
    <Select value={langCode} onValueChange={onChange}>
      <SelectTrigger className="notranslate">
        <div className="flex items-center space-x-2 w-full justify-between">
          <span className="block w-fit uppercase">
            {languages.find((it) => it.value === langCode)?.value}
          </span>
          <img
            className="block w-6 rounded-full h-6"
            src={languages.find((it) => it.value === langCode)?.flag}
            alt={langCode}
            width={24}
            height={24}
          />
        </div>
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
                <span className="block w-fit">{it.label}</span>
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
