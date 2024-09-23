interface User {
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  email?: string;
  domain?: string;
  ip_address?: string;
  address?: string;
  apartment?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
  role?: string; // e.g. "user"
  uid: string; // UUID
  image?: string;
  is_blocked?: boolean;
  joined?: string; // ISO timestamp
  updated_at?: string; // ISO timestamp
  verified_emails: VerifiedEmail[]; // Array of verified emails
  business_profiles: BusinessProfile[]; // Array of business profiles
  transactions: Transaction[]; // Assuming this will be defined based on your transaction schema
  loans: Loan[];
}

interface Loan {
  uid: string;
  user_id: string;
  loan_type: string;
  duration: string;
  principal_amount: number;
  interest_rate: number;
  repayment_schedule: string;
  total_repayment: number;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

interface VerifiedEmail {
  email: string;
  uid: string;
  verified_at: string;
  user_id: string;
}

interface Transaction {
  amount: number;
  uid: string; // UUID
  domain: string;
  transaction_type: "deposit" | "withdrawal" | "transfer"; // Assuming other types might exist
  recipientName: string;
  recipientBank: string;
  status: "pending" | "completed" | "failed"; // Assuming other statuses might exist
  user_id: string; // UUID
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

interface BusinessProfile {
  uid: string; // UUID
  business_id: string;
  business_name: string;
  phone_number: string;
  website: string;
  registration_number: string;
  tax_id: string;
  business_type: string;
  company_industry: string;
  asset_source_description: string;
  deposit_size: string;
  founding_date: string; // ISO timestamp
  number_of_employees: number;
  annual_revenue: number;
  description: string;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
  user_id: string; // UUID
  bank_account: BankAccount;
}

interface BankAccount {
  id: string; // UUID
  account_number: string;
  account_type: string;
  bank_name: string;
  sort_code: string;
  routing_number: string;
  balance: number;
  business_id: string; // UUID
  user_id: string; // UUID
  card: Card;
}

interface Card {
  id: string; // UUID
  card_number: string;
  card_name: string;
  expiration_date: string; // ISO timestamp
  cvv: string; // Assuming it's a string
  business_id: string; // UUID
  bank_id: string; // UUID
}
