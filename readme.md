# Tarot Light Path

A modern, 3D-interactive website for Tim Burger's spiritual services business including tarot reading, astrological readings, product shop, and published books.

![Tarot Light Path Logo](public/assets/images/tarot-light-path-logo.svg)

## Features

- Interactive 3D elements using Three.js
- Appointment booking and payment system
- E-commerce functionality with Stripe integration
- Responsive design for all devices
- Dynamic content loading
- Smooth animations and transitions

## Tech Stack

- React.js - Frontend framework
- React Router - Navigation and routing
- Three.js - 3D visualizations
- GSAP - Animations
- Stripe - Payment processing
- CSS3 - Styling

## Project Structure

```
tarot-light-path/
├── public/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── logo.svg
│   │   │   └── ...
│   │   └── ...
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── Navigation.js
│   │   ├── Footer.js
│   │   └── ...
│   ├── pages/
│   │   ├── HomePage.js
│   │   ├── Services.js
│   │   ├── Shop.js
│   │   ├── Books.js
│   │   ├── About.js
│   │   ├── Contact.js
│   │   └── ...
│   ├── styles/
│   │   ├── App.css
│   │   ├── Navigation.css
│   │   └── ...
│   ├── App.js
│   ├── index.js
│   └── ...
├── package.json
├── netlify.toml
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tarot-light-path.git
cd tarot-light-path
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory for environment variables:
```
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

The website will be available at `http://localhost:3000`.

## Deployment on Netlify

### Method 1: Netlify CLI

1. Install Netlify CLI:
```bash
npm install netlify-cli -g
```

2. Build the project:
```bash
npm run build
```

3. Deploy to Netlify:
```bash
netlify deploy
```

4. Follow the prompts and deploy to production when ready:
```bash
netlify deploy --prod
```

### Method 2: GitHub Integration

1. Push your code to a GitHub repository.

2. Log in to your Netlify account and click "New site from Git".

3. Select GitHub and the repository.

4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `build`

5. Click "Deploy site".

## Post-Deployment Tasks

1. Set up custom domain in Netlify settings.
2. Configure SSL certificate.
3. Set up environment variables in Netlify.
4. Enable Forms functionality if needed.

## Performance Optimization

- Images are optimized and served in next-gen formats.
- Code splitting is implemented for faster loading.
- Critical CSS is inlined in the head.
- 3D assets are loaded progressively.
- Lazy loading is implemented for images and components.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- iOS Safari (latest)
- Android Chrome (latest)

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

Tim Burger - tim@tarotlightpath.com

Project Link: [https://github.com/yourusername/tarot-light-path](https://github.com/yourusername/tarot-light-path)