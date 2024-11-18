# Gojs - Online Art Marketplace

Gojs is a modern e-commerce platform that connects artists with art enthusiasts, providing a seamless marketplace for buying and selling artwork online.

## Features

-  Artist Profiles: Dedicated spaces for artists to showcase their work
-  Image Management: High-quality image hosting with AWS and Imgix optimization
- Smooth Animations: Enhanced user experience with Framer Motion
-  Type Safety: Built with TypeScript and Zod validation
-  Authentication: Secure user authentication with Auth.js
-  Responsive Design: Seamless experience across all devices

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Database ORM:** Prisma
- **Authentication:** Auth.js
- **Image Hosting:** AWS S3 Bucket
- **Image Optimization:** Imgix
- **Animations:** Framer Motion
- **Validation:** Zod

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- A PostgreSQL database
- AWS account for S3 bucket
- Imgix account
- Authentication provider credentials (Google, GitHub, etc.)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/gojs.git
cd gojs
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Fill in your `.env` file with the following variables:
```
DATABASE_URL="your-database-url"
AWS_ACCESS_KEY_ID="your-aws-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret"
AWS_BUCKET_NAME="your-bucket-name"
IMGIX_URL="your-imgix-url"

# Auth.js Environment Variables
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
# Add your OAuth provider credentials
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
# Add other provider credentials as needed
```

4. Run database migrations:
```bash
npx prisma migrate dev
```

5. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
gojs/
├── app/                # Next.js app router pages
├── components/        # Reusable React components
├── lib/              # Utility functions and helpers
├── prisma/           # Database schema and migrations
├── public/           # Static assets
└── styles/           # Global styles and Tailwind config
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
