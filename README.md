# Opinion Market - Prediction Markets Platform

A modern React-based prediction markets platform where users can trade on outcomes of political, economic, technological, and sports events.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/infoopinionmarket-code/PolyMarket.git
cd PolyMarket
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env.local
```

4. Configure your environment variables in `.env.local`:
```bash
# Google Analytics (optional)
REACT_APP_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Development

Run the development server:
```bash
npm run dev
```

The application will be available at [http://localhost:5173/](http://localhost:5173/)

### Production Build

Build for production:
```bash
npm run build
```

## 📱 Features

- **Prediction Markets**: Trade on various event outcomes
- **Categories**: Politics, Economy, Technology, Sports, Culture, Sustainability
- **Responsive Design**: Works on desktop and mobile devices
- **PWA Support**: Can be installed as a mobile app
- **SEO Optimized**: Proper meta tags and Open Graph support

## 🔧 Configuration

### Google Analytics Setup

1. Create a Google Analytics 4 property
2. Get your Measurement ID (format: G-XXXXXXXXXX)
3. Add it to your `.env.local` file:
```bash
REACT_APP_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Social Media Preview Images

For proper social media previews, add these images to the `public/` folder:
- `og-image.png` (1200×630px) - Open Graph image
- `twitter-card.png` (1200×600px) - Twitter card image

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui + Radix UI
- **Routing**: React Router
- **Icons**: Lucide React

## 📄 Legal Pages

The platform includes:
- Terms of Service (`/terms`)
- Privacy Policy (`/privacy`) 
- Legal Notice (`/legal`)

## 🌐 Deployment

The site is configured for deployment at [https://opinion-market.com](https://opinion-market.com)

## 📞 Support

For questions or support, contact: info@opinionmarket.com
