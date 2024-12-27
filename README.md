# Open Streets Tempe

A web application for [Tempe Bicycle Action Group's](https://biketempe.org?utm_source=openstreetstempe_readme) Open Streets Tempe.

## Tech Stack

- [Remix](https://remix.run/) - Full stack web framework
- [React](https://reactjs.org/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Firebase Hosting](https://firebase.google.com/docs/hosting) - Deployment

## Development

### Prerequisites

- Node.js >= 20.0.0
- npm

### Setup

1. Clone the repository
2. Install dependencies:

```sh
npm install
```

### Development Server

Run the development server with:

```sh
npm run dev
```

This will start:

- Remix development server
- SVG icon watch process for automatic icon component generation

### Other Commands

- `npm run icons` - Generate SVG icon components
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm run optimize-images` - Optimize image assets

### Image Optimization System

The project includes a comprehensive image optimization system that generates responsive images for different viewport sizes.

#### How it works:

1. Place original images in `public/images/originals/`
2. Run the optimization script:

```sh
npm run optimize-images
```

3. Optimized images will be placed in `public/images/`

The script will:

- Generate multiple sizes (640w, 768w, 1024w, 1920w, 2560w) for photos
- Convert images to WebP format while maintaining JPG fallbacks
- Use higher quality settings for mobile (640w) versions
- Automatically handle PNGs differently (single size, optimized for logos)

#### Using Optimized Images

The `ResponsiveImage` component automatically handles responsive image loading using the multiple sizes generated by the script:

```tsx
<ResponsiveImage basePath="/images/my-image" alt="Description" />
```

For critical above-the-fold images, you can:

1. Set `priority` on the component
2. Use the `generatePreloadLinks` utility to add preload tags in your route

## Building for Production

1. Build the application:

```sh
npm run build
```

2. Start the production server:

```sh
npm start
```

## Deployment

The application is automatically deployed on pushes to the `main` branch through GitHub Actions:

1. Builds and pushes a Docker image to Google Container Registry
2. Deploys to Google Cloud Run
3. Deploys static assets and redirects to Firebase Hosting

The site is accessible at: [openstreetstempe.org](https://openstreetstempe.org?utm_source=openstreetstempe_readme)

## Contributing

1. Ensure your code passes all checks:
   - TypeScript compilation (`npm run typecheck`)
   - Linting (`npm run lint`)
2. Submit a pull request
