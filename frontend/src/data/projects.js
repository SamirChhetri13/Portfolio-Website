import shopsageImg from '../assets/shopsage.png';

export const fallbackProjects = [
  {
    _id: '1',
    title: 'ShopSage — Full-Stack E-Commerce Platform',
    description: 'A production-grade e-commerce application featuring secure JWT authentication, dynamic catalog search & filter, cart management, Stripe payments, and an admin dashboard.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Redux', 'Stripe'],
    features: [
      'User Authentication with JWT & HTTP-Only cookies',
      'Interactive Shopping Cart & Real-time Order Summary',
      'Stripe Payment Gateway integration for safe transactions',
      'Comprehensive Admin Panel for products, stock, and orders',
      'Multi-criteria Search, Category Filtering, and Pagination'
    ],
    liveLink: 'https://shopsage-app.vercel.app',
    githubLink: 'https://github.com/SamirChhetri13',
    image: shopsageImg,
    featured: true
  },
  {
    _id: '2',
    title: 'Calorie Tracker — Health & Nutrition App',
    description: 'A health and fitness web application to track daily caloric intake, log meals, compute macronutrient ratios, and visualize weight progress over time.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Chart.js'],
    features: [
      'Interactive Dashboard displaying daily calorie budgets',
      'Searchable Food Database for fast meal logging',
      'Macronutrient & Weight Progress Analytics Charts',
      'Custom Caloric Goals based on BMI and Activity Levels',
      'Secure User Account & History Management'
    ],
    liveLink: 'https://calorie-tracker-demo.example.com',
    githubLink: 'https://github.com/SamirChhetri13',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80',
    featured: true
  }
];


