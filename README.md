# FinTech Solutions

**FinTech Solutions** is a cutting-edge financial technology platform offering a suite of services, including asset management, international and domestic transfers, startup loans, business mortgages, and comprehensive transaction monitoring. Our platform provides a seamless user experience with powerful backend processing to help businesses and individuals manage their finances efficiently.

## Table of Contents

- [FinTech Solutions](#fintech-solutions)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Setup Instructions](#setup-instructions)
  - [Environment Variables](#environment-variables)
    - [Frontend `.env` Example](#frontend-env-example)
    - [Backend `.env` Example](#backend-env-example)
  - [Usage](#usage)
  - [API Documentation](#api-documentation)
  - [Contributing](#contributing)
  - [License](#license)
  - [Deploying](#deploying)
  - [Follow this tutorial to deploy online:](#follow-this-tutorial-to-deploy-online)

## Features

- **Asset Management**: Track and manage your investment portfolios with ease.
- **International and Domestic Transfers**: Send and receive money globally with secure and fast transactions.
- **Startup Loans**: Apply for loans tailored specifically for startups to fuel growth.
- **Business Mortgages**: Access business mortgage solutions for property acquisition and expansion.
- **Transaction History**: View detailed records of all transactions within your account for better financial oversight.

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) with TailwindCSS
- **Backend**: [FastAPI](https://fastapi.tiangolo.com/) for a high-performance, scalable API.
- **Database**: [PostgreSQL](https://www.postgresql.org/) for robust data management.
- **Email Services**:
  - [Resend](https://resend.com/) for email sending and management.
  - [React Email](https://react.email/) for custom email templates.
- **Form State Management**: [React Hook Form](https://react-hook-form.com/) for managing form state seamlessly.

## Installation

Follow these steps to set up the project locally.

### Prerequisites

Ensure you have the following installed:

- Node.js (v20 or later)
- Python (v3.12 or later)
- PipEnv (2024.0.1)
- PostgreSQL (v14)
- Yarn or npm

### Setup Instructions

1. **Clone the repository**:

   **Frontend**

   ```bash
   git clone https://github.com/david-jerry/beehaiv.git
   cd beehaiv
   ```

   **Backend**

   ```bash
   git clone https://github.com/david-jerry/beehaiv-be.git
   cd beehaiv-be
   ```

2. **Install Frontend Dependencies**:

   ```bash
   cd beehaiv
   yarn install  # or npm install
   ```

3. **Install Backend Dependencies**:

   ```bash
   cd beehaiv-be
   pip install -r requirements.txt
   ```

4. **Setup PostgreSQL Database**:

   Create a database in PostgreSQL and update your environment variables with the correct database URL.

5. **Run Database Migrations**:

   ```bash
   # Inside backend directory
   alembic upgrade head
   ```

6. **Start Development Servers**:

   - **Frontend**:

     ```bash
     cd beehaiv
     yarn dev  # or npm run dev
     ```

   - **Backend**:

     ```bash
     cd beehaiv-be
     ./run_server.sh
     ```

## Environment Variables

Create a `.env` file in both the frontend and backend directories and configure the necessary environment variables:

### Frontend `.env` Example

```plaintext
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_RESEND_API_KEY=your_resend_api_key
CLOUDINARY_CLOUDNAME=ksjduyyjf
CLOUDINARY_API_KEY=9374690072
CLOUDINARY_API_SECRET=oishdosbvftecvlsiye-nJJbU
CLOUDINARY_URL=cloudinary://527367914553259:0mhdvI3B1KwqGSJ6qJiqU-nJJbU@dyqaps9hz

API_BASE_ENDPOINT=http://localhost:8000/api/v1
```

### Backend `.env` Example

```plaintext
DATABASE_URL=postgresql://username:password@localhost:5432/your_database
RESEND_API_KEY=your_resend_api_key
CLOUDINARY_CLOUDNAME=ksjduyyjf
CLOUDINARY_API_KEY=9374690072
CLOUDINARY_API_SECRET=oishdosbvftecvlsiye-nJJbU
CLOUDINARY_URL=cloudinary://527367914553259:0mhdvI3B1KwqGSJ6qJiqU-nJJbU@dyqaps9hz

API_BASE_ENDPOINT=http://localhost:8000/api/v1
```

## Usage

Once the setup is complete, you can start using the application:

1. **Asset Management**: Navigate to the Asset Management section to view and manage your investments.
2. **Transfers**: Access the Transfers page for both international and domestic transactions in the user dashboard.
3. **Loans and Mortgages**: Apply for startup loans and business mortgages through the Loans section.
4. **View Transactions**: Check your transaction history for complete financial transparency.

## API Documentation

The API is documented using ReDocs and can be accessed at:

```
http://localhost:8000/api/v1/redoc
```

This will provide a comprehensive overview of all available endpoints, their parameters, and responses.

## Contributing

We welcome contributions to improve our platform. Please fork the repository and submit a pull request for any changes.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
## Deploying

Follow this [tutorial](https://www.pedroalonso.net/blog/deploying-nextjs-vps-using-dokku) to deploy online:
---

For further enquiries and collaborations please visit [My Website](https://jeremiahedavid.online) or [Bytestream's Official Website](https://bytestreaminnovators.ltd).