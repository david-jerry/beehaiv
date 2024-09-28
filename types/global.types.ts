interface pageDataProp {
  uid: string;
  page: string;
  count: number;
  ips: string[];
}

interface viewJsonResponse {
  message: string;
  data: pageDataProp;
}

interface viewListJsonResponse {
  message: string;
  data: pageDataProp[];
}

interface initDataProp {
  page: string;
  count: number;
  ips: string[];
}

interface PostProp {
  slug: string;
  title: string;
  author: string;
  category: string;
  publishedDate: string;
  createdDate: string;
  featured: boolean;
  image: string;
  content: string;
}

interface UserProp {
  email: string;
  name: string;
  phone: string;
  joined: string;
}

enum Status {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
  CANCELLED = "cancelled",
  PROCESSING = "processing",
}

interface BasicInfoProps {
  first_name?: string;
  last_name?: string;
  phone?: string;
  country?: string;
  address?: string;
  apartment?: string;
  city?: string;
  state?: string;
  zip?: string;
  business_name: string;
  deposit_size: string;
  tax_id: string;
  asset_source_description: string;
  company_industry: string;
  website: string;
  description: string;
}

interface Window {
  google: any;
  googleTranslateElementInit: any;
}