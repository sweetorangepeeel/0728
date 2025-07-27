# Design Eye Test

A web application that tests your ability to distinguish between good and bad design through curated examples.

## Features

- 20 carefully curated design examples
- Randomized question order using Fisher-Yates shuffle
- Back button functionality to correct mistakes
- Responsive design for desktop and mobile
- Real-time scoring and detailed results
- Professional rating system from "Visual Sprout" to "Visual Genius"

## Live Demo

Visit the live application at: [Your Custom Domain]

## Development

To run locally:

```bash
npm install
npm run dev
```

## Deployment to Vercel

1. **Create GitHub Repository:**
   - Create a new repository on GitHub
   - Push all files to the repository

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with your GitHub account
   - Click "New Project"
   - Import your GitHub repository
   - Configure build settings:
     - Framework Preset: Vite
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Click "Deploy"

3. **Add Custom Domain:**
   - In Vercel dashboard, go to your project
   - Navigate to Settings → Domains
   - Add your custom domain
   - Update your domain's DNS settings as instructed by Vercel

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS v4
- Vite
- Deployed on Vercel

## Creator

Created by [@sweetorangepeeel](https://www.instagram.com/sweetorangepeeel/)