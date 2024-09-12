// Enum for transaction statuses
export enum Status {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
  CANCELLED = "cancelled",
  PROCESSING = "processing",
}
export const transactions: Transaction[] = [
  {
    uid: "jhsdye-kj7783-ksjdi",
    date: "12-04-2024",
    status: Status.PENDING,
    amount: 20000,
    recipientName: "Boris Markov",
    recipientBank: "Kirrilov Monumentals",
  },
  {
    uid: "okisdj-kj7783-ksjdi",
    date: "12-02-2024",
    status: Status.CANCELLED,
    amount: 4500,
    recipientName: "Boris Markov",
    recipientBank: "Kirrilov Monumentals",
  },
  {
    uid: "jsdyu-kj7783-ksjdi",
    date: "12-07-2024",
    status: Status.COMPLETED,
    amount: 700,
    recipientName: "Boris Markov",
    recipientBank: "Kirrilov Monumentals",
  },
];
