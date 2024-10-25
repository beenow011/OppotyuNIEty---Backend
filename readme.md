# OpportuNIEty Backend

This repository houses the backend for the **OpportuNIEty** platform, a decentralized career development tool designed to streamline and secure the placement process. This backend serves both the **Admin Platform** for placement coordinators and the **User Website** for student users. Built with Node.js, Express, and MongoDB, the backend includes APIs for authentication, data handling, and wallet connection, as well as integration with Ethereum blockchain for decentralized storage and secure transactions.

## Features

- **Coordinator Management**:

  - Allows coordinators to register and submit their details.
  - Admins can approve or reject coordinators before granting them access to manage placements.

- **Wallet Integration**:

  - Supports MetaMask wallet connection for secure access.
  - Stores Ethereum wallet addresses for user verification.

- **Placement Management**:

  - Coordinators can post, update, and delete company recruitment opportunities.
  - Job listings and student applications are securely handled and stored.

- **Blockchain & Decentralized Storage**:
  - Ethereum and IPFS used for secure data storage.
  - Decentralized and immutable records for enhanced security.

## Tech Stack

- **Server**: Node.js, Express
- **Database**: MongoDB, Mongoose
- **Blockchain**: Ethereum, MetaMask, IPFS
- **Environment Variables**: Configure the `.env` file with essential variables

## Setup and Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/opportuniety-backend.git
   cd opportuniety-backend
   ```
2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   - Create a `.env` file in the root directory.
   - Add the necessary environment variables as specified in the `.env.example` file.

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Run tests**

   ```bash
   npm test
   ```

6. **Build for production**

   ```bash
   npm run build
   ```

7. **Start the production server**

   ```bash
   npm start
   ```

   ## Contribution

   This project is developed and maintained by:

   - **Abhinav**
   - **Abhinaya Vamsi**
   - **Akhil**
   - **Girish**

   We welcome contributions from the community. If you have any suggestions or improvements, feel free to create a pull request or open an issue.
