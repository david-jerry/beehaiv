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

interface Transaction {
  uid: string;
  date: string;
  status: Status;
  amount: number;
  recipientName: string;
  recipientBank: string;
}

interface BasicInfoProps {
  firstName: string;
  lastName: string;
  phone: string;
  country?: string;
  companyAddress?: string;
  apartment?: string;
  city?: string;
  state?: string;
  zip?: string;
  legalName: string;
  depositSize: string;
  taxId: string;
  assetSourceDescription: string;
  companyIndustry: string;
  companyWebsite: string;
  howFoundUs: string;
}
