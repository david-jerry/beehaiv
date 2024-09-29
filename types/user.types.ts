/* The `interface User` in TypeScript is defining a structure for representing a user object. It
specifies the properties that a `User` object should have and their respective data types. This
interface outlines the details related to a user, including personal information, contact details,
account status, joined date, and other relevant attributes. It helps in organizing and ensuring
consistency in the representation of user details within the application's data model. */
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

/* The `interface Loan` is defining a structure for representing a loan object in TypeScript. It
specifies the properties that a `Loan` object should have and their respective data types. Here's a
breakdown of the properties defined in the `Loan` interface: */
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

/* The `interface VerifiedEmail` is defining a structure for representing a verified email object in
TypeScript. It specifies the properties that a `VerifiedEmail` object should have and their
respective data types. Here's a breakdown of the properties defined in the `VerifiedEmail`
interface: */
interface VerifiedEmail {
  email: string;
  uid: string;
  verified_at: string;
  user_id: string;
}

/* The `interface Transaction` is defining a structure for representing a transaction object in
TypeScript. It specifies the properties that a `Transaction` object should have and their respective
data types. Here's a breakdown of the properties defined in the `Transaction` interface: */
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

/* The `interface BusinessProfile` is defining a structure for representing a business profile object
in TypeScript. It specifies the properties that a `BusinessProfile` object should have and their
respective data types. This interface outlines the details related to a business entity, including
its name, contact information, registration details, financial information, and other relevant
attributes. It also includes nested interfaces like `BankAccount` and `Card` to represent associated
bank account and card details within the business profile. */
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

/* The `interface BankAccount` and `interface Card` are defining structures for representing bank
account and card details within a business profile object in TypeScript. */
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

/* The `interface Card` is defining a structure for representing card details within a business profile
object in TypeScript. It specifies the properties that a `Card` object should have and their
respective data types. This interface outlines the details related to a card associated with a
business profile, including attributes like card number, card name, expiration date, CVV, and other
relevant information. It helps in organizing and ensuring consistency in the representation of card
details within the application's data model. */
interface Card {
  id: string; // UUID
  card_number: string;
  card_name: string;
  expiration_date: string; // ISO timestamp
  cvv: string; // Assuming it's a string
  business_id: string; // UUID
  bank_id: string; // UUID
}
