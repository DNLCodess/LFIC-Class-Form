# Lanky First Ideal Creativity - Graphic Design Class Registration System

A complete registration and payment system for the graphic design class with automatic Google Sheets integration and Flutterwave payment processing.

## Features

- ✅ Modern, responsive registration form
- ✅ Secure payment processing via Flutterwave
- ✅ Automatic Google Sheets data storage (only after payment confirmation)
- ✅ Telegram group access after payment
- ✅ Multi-user concurrent support
- ✅ Beautiful UI with smooth animations
- ✅ Mobile-optimized design

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory and add the following:

```bash
# Flutterwave Configuration
NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY=your_flutterwave_public_key_here

# Google Sheets Configuration
GOOGLE_SHEET_ID=your_google_sheet_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_email_here
GOOGLE_PRIVATE_KEY="your_private_key_here"

# Telegram Group Link
NEXT_PUBLIC_TELEGRAM_GROUP_LINK=https://t.me/your_group_link_here
```

### 2. Flutterwave Setup

1. Create a [Flutterwave account](https://flutterwave.com/)
2. Get your public key from the dashboard
3. Add it to your environment variables

### 3. Google Sheets Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google Sheets API
4. Create a service account and download the JSON credentials
5. Create a new Google Sheet and share it with the service account email
6. Copy the Sheet ID from the URL and add to environment variables

### 4. Telegram Group

1. Create your Telegram group
2. Get the invite link
3. Add it to environment variables

## Installation

```bash
npm install
npm run dev
```

## Course Flow

1. **Registration**: Students fill out the comprehensive form
2. **Payment**: Secure payment processing via Flutterwave (₦3,000)
3. **Confirmation**: Data is stored in Google Sheets only after successful payment
4. **Access**: Students get immediate access to Telegram group

## Tech Stack

- Next.js 13+ (App Router)
- React with JSX (no TypeScript)
- Tailwind CSS
- Framer Motion
- React Hook Form
- Flutterwave Payment Gateway
- Google Sheets API

## Support

For any issues with setup or functionality, please contact the development team.