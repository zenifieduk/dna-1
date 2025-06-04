# SMP-CLINIC.COM - Next.js Project

A modern, production-ready React application built with Next.js 15, Tailwind CSS v4, and TypeScript.

## 🚀 Features

- **Next.js 15** - Latest React framework with App Router
- **Tailwind CSS v4** - Modern CSS framework with new CSS-first configuration
- **TypeScript** - Full type safety throughout the application
- **Radix UI** - Accessible, unstyled UI primitives
- **Lucide React** - Beautiful, customizable icons
- **ESLint & Prettier** - Code linting and formatting
- **Dark Mode** - Built-in dark mode support
- **Modern Tooling** - Class variance authority, clsx, tailwind-merge

## 📦 Tech Stack

### Frontend
- **React 18** - UI library
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better DX

### Styling
- **Tailwind CSS v4** - Utility-first CSS framework
- **CSS Variables** - Design system with light/dark themes
- **Responsive Design** - Mobile-first approach

### UI Components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **Class Variance Authority** - Component variant management
- **Tailwind Merge** - Intelligent class merging

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## 🛠️ Installation

The project is already set up and ready to use. All dependencies have been installed.

## 🏃‍♂️ Getting Started

1. Start the development server:
```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles with design system
├── components/
│   └── ui/             # Reusable UI components
│       └── button.tsx  # Button component with variants
└── lib/
    └── utils.ts        # Utility functions
```

## 🎨 Design System

The project includes a comprehensive design system built with CSS variables and Tailwind CSS:

- **Colors**: Primary, secondary, muted, accent, destructive
- **Typography**: Font families, sizes, and weights
- **Spacing**: Consistent spacing scale
- **Border Radius**: Consistent border radius values
- **Dark Mode**: Automatic dark mode support

## 🧱 Components

### Button Component
A fully customizable button component with multiple variants:
- `default` - Primary button style
- `destructive` - For destructive actions
- `outline` - Outlined button
- `secondary` - Secondary button style
- `ghost` - Minimal button style
- `link` - Link-styled button

Sizes: `default`, `sm`, `lg`, `icon`

## 📱 Responsive Design

The application is built mobile-first and is fully responsive across all device sizes.

## 🌙 Dark Mode

Dark mode is automatically enabled based on system preferences and can be toggled by the user.

## 🚀 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Tailwind CSS v4
The project uses the new CSS-first configuration approach with CSS variables defined in `globals.css`.

### TypeScript
TypeScript is configured with strict settings for maximum type safety.

### ESLint & Prettier
Code quality tools are configured to maintain consistent code style.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using Next.js and Tailwind CSS
