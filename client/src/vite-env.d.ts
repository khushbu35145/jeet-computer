/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_SITE_URL: string;
  readonly VITE_BRAND_NAME: string;
  readonly VITE_WHATSAPP_NUMBER: string;
  readonly VITE_CONTACT_PHONE: string;
  readonly VITE_CONTACT_PHONE_ALT: string;
  readonly VITE_CONTACT_EMAIL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
