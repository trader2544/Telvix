
export const sampleBlogPosts = [
  {
    title: "Building Modern Web Applications with React and TypeScript",
    excerpt: "Discover the power of combining React with TypeScript for building scalable, maintainable web applications that deliver exceptional user experiences.",
    content: `# Building Modern Web Applications with React and TypeScript

![React TypeScript](https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop)

In today's rapidly evolving web development landscape, creating robust and scalable applications is more important than ever. **React** combined with **TypeScript** provides developers with a powerful toolkit to build modern web applications that are both maintainable and performant.

## Why React + TypeScript?

React has revolutionized how we think about building user interfaces, while TypeScript adds the type safety that JavaScript lacks. Together, they form an unbeatable combination for enterprise-level applications.

### Key Benefits:

- **Type Safety**: Catch errors at compile time rather than runtime
- **Better Developer Experience**: Enhanced autocomplete and refactoring tools
- **Scalability**: Easier to manage large codebases
- **Community Support**: Extensive ecosystem and documentation

![Code on Screen](https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop)

## Getting Started

Setting up a React TypeScript project is straightforward with modern tooling:

\`\`\`bash
npx create-react-app my-app --template typescript
\`\`\`

This command creates a fully configured React application with TypeScript support, complete with:
- ESLint configuration
- Jest testing setup
- Hot reload development server
- Production build optimization

## Best Practices

1. **Use Interface Definitions**: Always define interfaces for your props and state
2. **Leverage Generic Types**: Make your components reusable with generic types
3. **Implement Proper Error Boundaries**: Handle errors gracefully in production
4. **Optimize Bundle Size**: Use code splitting and lazy loading

## Conclusion

React and TypeScript together provide a robust foundation for building modern web applications. The initial learning curve is worth the long-term benefits of maintainable, scalable code.

Ready to start your next project with React and TypeScript? Contact our team for expert guidance and development services.`,
    thumbnail_url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
    featured_image_url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop"
  },
  {
    title: "The Future of JavaScript: ES2024 Features You Need to Know",
    excerpt: "Explore the latest JavaScript features coming in ES2024 that will revolutionize how we write modern web applications.",
    content: `# The Future of JavaScript: ES2024 Features You Need to Know

![JavaScript Future](https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=400&fit=crop)

JavaScript continues to evolve at a rapid pace, with ES2024 bringing exciting new features that will change how we develop web applications. Let's explore the most impactful additions coming to the language.

## Top ES2024 Features

### 1. Array Grouping Methods

The new \`Array.prototype.group()\` and \`Array.prototype.groupToMap()\` methods make data manipulation more intuitive:

\`\`\`javascript
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 25 }
];

const groupedByAge = users.group(user => user.age);
// { 25: [{name: 'Alice', age: 25}, {name: 'Charlie', age: 25}], 30: [{name: 'Bob', age: 30}] }
\`\`\`

### 2. Promise.withResolvers()

This new static method provides a more elegant way to create promises:

\`\`\`javascript
const { promise, resolve, reject } = Promise.withResolvers();
\`\`\`

![Code Development](https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&h=400&fit=crop)

### 3. Atomics.waitAsync()

Improves web worker performance with non-blocking atomic operations:

\`\`\`javascript
const result = Atomics.waitAsync(sharedArray, 0, 0);
\`\`\`

## Impact on Development

These features will significantly improve:
- **Code Readability**: More expressive syntax
- **Performance**: Better optimization opportunities
- **Developer Productivity**: Less boilerplate code
- **Error Handling**: More robust async patterns

## Browser Support

While these features are cutting-edge, browser support is rapidly improving. Use Babel for production applications until support reaches 95%+.

## Conclusion

ES2024 represents another leap forward for JavaScript, making it more powerful and developer-friendly. Start experimenting with these features in your development environment today!`,
    thumbnail_url: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop",
    featured_image_url: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=1200&h=600&fit=crop"
  },
  {
    title: "CSS Grid vs Flexbox: When to Use Which Layout System",
    excerpt: "Master the art of modern CSS layouts by understanding when to use CSS Grid and when Flexbox is the better choice for your projects.",
    content: `# CSS Grid vs Flexbox: When to Use Which Layout System

![CSS Layout](https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop)

Choosing between **CSS Grid** and **Flexbox** can be challenging. Both are powerful layout systems, but they excel in different scenarios. This guide will help you make the right choice for your projects.

## Understanding the Fundamentals

### CSS Grid: The 2D Layout System

Grid is designed for **two-dimensional layouts** where you need to control both rows and columns simultaneously.

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 20px;
}
\`\`\`

### Flexbox: The 1D Layout System

Flexbox excels at **one-dimensional layouts** along either a row or column axis.

\`\`\`css
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}
\`\`\`

![Web Design](https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&h=400&fit=crop)

## When to Use CSS Grid

**Perfect for:**
- Page layouts (header, sidebar, main, footer)
- Complex card layouts
- Magazine-style designs
- Any layout requiring precise 2D control

**Example Use Case:** A dashboard with multiple widgets arranged in a grid pattern.

## When to Use Flexbox

**Perfect for:**
- Navigation bars
- Centering content
- Equal-height columns
- Form layouts
- Any 1D alignment needs

**Example Use Case:** A responsive navigation menu that distributes items evenly.

## Combining Both Systems

The real power comes from using Grid and Flexbox together:

\`\`\`css
.page-layout {
  display: grid;
  grid-template-areas: 
    "header header"
    "sidebar main"
    "footer footer";
}

.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
\`\`\`

## Browser Support

Both CSS Grid and Flexbox have excellent browser support:
- **Flexbox**: 98%+ global support
- **CSS Grid**: 96%+ global support

## Performance Considerations

- **Grid**: Slightly more complex calculations
- **Flexbox**: Generally faster for simple layouts
- Both are hardware-accelerated in modern browsers

## Conclusion

Don't think of Grid vs Flexbox as an either/or choice. They're complementary tools that work beautifully together. Use Grid for your overall page structure and Flexbox for component-level layouts.

Need help implementing these layout systems in your project? Our team specializes in modern CSS architecture and responsive design.`,
    thumbnail_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
    featured_image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop"
  },
  {
    title: "Node.js Performance Optimization: Advanced Techniques",
    excerpt: "Learn advanced techniques to optimize your Node.js applications for maximum performance and scalability in production environments.",
    content: `# Node.js Performance Optimization: Advanced Techniques

![Node.js Performance](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop)

Performance optimization is crucial for **Node.js** applications serving thousands of users. This comprehensive guide covers advanced techniques to maximize your application's speed and efficiency.

## Understanding Node.js Performance

Node.js excels at I/O-intensive operations but can struggle with CPU-intensive tasks. Understanding this fundamental characteristic is key to optimization.

### Key Performance Metrics

- **Response Time**: How quickly your app responds to requests
- **Throughput**: Number of requests handled per second
- **Memory Usage**: RAM consumption patterns
- **CPU Utilization**: Processor usage efficiency

![Server Performance](https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=400&fit=crop)

## Advanced Optimization Techniques

### 1. Event Loop Optimization

Keep the event loop free by avoiding blocking operations:

\`\`\`javascript
// Bad: Blocking operation
function heavyComputation() {
  let result = 0;
  for (let i = 0; i < 10000000; i++) {
    result += i;
  }
  return result;
}

// Good: Non-blocking with worker threads
const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
  const worker = new Worker(__filename);
  worker.postMessage({ start: 0, end: 10000000 });
  worker.on('message', (result) => {
    console.log('Result:', result);
  });
} else {
  // Worker thread code
  parentPort.on('message', ({ start, end }) => {
    let result = 0;
    for (let i = start; i < end; i++) {
      result += i;
    }
    parentPort.postMessage(result);
  });
}
\`\`\`

### 2. Memory Management

Implement efficient memory usage patterns:

\`\`\`javascript
// Use streaming for large data
const fs = require('fs');
const readStream = fs.createReadStream('large-file.json');
const writeStream = fs.createWriteStream('output.json');

readStream.pipe(writeStream);
\`\`\`

### 3. Database Query Optimization

- Use connection pooling
- Implement query result caching
- Optimize database indexes
- Use prepared statements

### 4. Caching Strategies

\`\`\`javascript
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600 });

function getCachedData(key, fetchFunction) {
  const cached = cache.get(key);
  if (cached) return Promise.resolve(cached);
  
  return fetchFunction().then(data => {
    cache.set(key, data);
    return data;
  });
}
\`\`\`

## Monitoring and Profiling

### Essential Tools

1. **Node.js Built-in Profiler**
2. **Clinic.js**: Comprehensive performance toolkit
3. **New Relic**: Production monitoring
4. **PM2**: Process management and monitoring

### Performance Metrics to Track

- Heap memory usage
- Event loop delay
- HTTP request duration
- Database query performance

## Production Deployment Tips

1. **Use PM2 for process management**
2. **Enable gzip compression**
3. **Implement proper logging**
4. **Set up health checks**
5. **Use HTTPS everywhere**

## Load Testing

Regular load testing ensures your optimizations work under pressure:

\`\`\`bash
# Using Artillery.io
npm install -g artillery
artillery quick --duration 60 --rate 10 http://localhost:3000
\`\`\`

## Conclusion

Node.js performance optimization is an ongoing process. Start with profiling to identify bottlenecks, then apply these techniques systematically. Monitor your applications continuously to maintain optimal performance.

Ready to optimize your Node.js application? Our performance experts can help you achieve 10x performance improvements.`,
    thumbnail_url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
    featured_image_url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&fit=crop"
  },
  {
    title: "Responsive Web Design: Mobile-First Approach in 2024",
    excerpt: "Master modern responsive design techniques with a mobile-first approach to create websites that work perfectly on all devices.",
    content: `# Responsive Web Design: Mobile-First Approach in 2024

![Responsive Design](https://images.unsplash.com/photo-1555952494-efd681c7e3f9?w=800&h=400&fit=crop)

In 2024, **mobile-first design** isn't just a trend—it's a necessity. With mobile devices accounting for over 60% of web traffic, designing for mobile first ensures optimal user experiences across all devices.

## The Mobile-First Philosophy

Mobile-first design means starting with the smallest screen size and progressively enhancing for larger devices. This approach leads to:

- **Faster Loading**: Optimized for limited bandwidth
- **Better Performance**: Minimal resource usage
- **Improved UX**: Focus on essential content
- **Future-Proof**: Ready for new device sizes

![Mobile Development](https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop)

## Modern CSS Techniques

### 1. Container Queries

The game-changer for 2024 - components that respond to their container size:

\`\`\`css
.card-container {
  container-type: inline-size;
}

@container (min-width: 300px) {
  .card {
    display: flex;
    gap: 1rem;
  }
}
\`\`\`

### 2. Fluid Typography

Create seamlessly scaling text:

\`\`\`css
h1 {
  font-size: clamp(1.5rem, 4vw, 3rem);
  line-height: 1.2;
}
\`\`\`

### 3. CSS Grid Auto-Fit

Responsive layouts without media queries:

\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}
\`\`\`

## Breakpoint Strategy

### Modern Breakpoint System

\`\`\`css
/* Mobile first approach */
.container {
  padding: 1rem;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    padding: 3rem;
  }
}

/* Large screens */
@media (min-width: 1440px) {
  .container {
    padding: 4rem;
  }
}
\`\`\`

## Performance Optimization

### Image Optimization

\`\`\`html
<picture>
  <source 
    media="(min-width: 1024px)" 
    srcset="hero-desktop.webp"
    type="image/webp"
  >
  <source 
    media="(min-width: 768px)" 
    srcset="hero-tablet.webp"
    type="image/webp"
  >
  <img 
    src="hero-mobile.webp" 
    alt="Hero image"
    loading="lazy"
    width="375"
    height="250"
  >
</picture>
\`\`\`

### Critical CSS

Inline critical styles for above-the-fold content:

\`\`\`html
<style>
  /* Critical CSS for immediate render */
  body { font-family: system-ui; margin: 0; }
  .hero { min-height: 50vh; background: #0066cc; }
</style>
\`\`\`

## Touch Interactions

Design for finger-friendly interactions:

\`\`\`css
.button {
  min-height: 44px;
  min-width: 44px;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  background: #0066cc;
  color: white;
  font-size: 16px; /* Prevents zoom on iOS */
}

.button:hover {
  background: #0052a3;
}

@media (hover: none) {
  .button:hover {
    background: #0066cc; /* Reset hover on touch devices */
  }
  
  .button:active {
    background: #0052a3;
    transform: scale(0.98);
  }
}
\`\`\`

## Testing Strategy

### Device Testing Checklist

1. **Real Device Testing**: Test on actual phones and tablets
2. **Browser DevTools**: Use responsive mode extensively
3. **Network Simulation**: Test on slow connections
4. **Accessibility**: Ensure touch targets meet WCAG guidelines

### Automated Testing

\`\`\`javascript
// Puppeteer responsive testing
const puppeteer = require('puppeteer');

async function testResponsive() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Test mobile
  await page.setViewport({ width: 375, height: 667 });
  await page.goto('https://yoursite.com');
  await page.screenshot({ path: 'mobile.png' });
  
  // Test tablet
  await page.setViewport({ width: 768, height: 1024 });
  await page.screenshot({ path: 'tablet.png' });
  
  await browser.close();
}
\`\`\`

## Future Considerations

### Emerging Technologies

- **Foldable devices**: New form factors require flexible layouts
- **Voice interfaces**: Consider audio-first experiences
- **AR/VR web**: Spatial design considerations
- **IoT devices**: Ultra-minimal interfaces

## Conclusion

Mobile-first responsive design in 2024 combines proven techniques with cutting-edge features like container queries. The key is progressive enhancement: start minimal, then add complexity for larger screens.

Need help implementing a mobile-first responsive design? Our team specializes in creating fast, accessible, and beautiful responsive websites.`,
    thumbnail_url: "https://images.unsplash.com/photo-1555952494-efd681c7e3f9?w=400&h=250&fit=crop",
    featured_image_url: "https://images.unsplash.com/photo-1555952494-efd681c7e3f9?w=1200&h=600&fit=crop"
  },
  {
    title: "API Security Best Practices for Modern Web Applications",
    excerpt: "Comprehensive guide to securing your APIs against modern threats with authentication, encryption, and monitoring strategies.",
    content: `# API Security Best Practices for Modern Web Applications

![API Security](https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop)

**API security** is more critical than ever in 2024. With APIs powering everything from mobile apps to IoT devices, implementing robust security measures protects your data and maintains user trust.

## The API Security Landscape

Modern applications rely heavily on APIs, making them attractive targets for attackers. Common threats include:

- **Injection attacks**: SQL, NoSQL, and command injection
- **Broken authentication**: Weak token management
- **Data exposure**: Sensitive information leaks
- **Rate limiting bypass**: Resource exhaustion attacks
- **Insufficient logging**: Missing audit trails

![Cybersecurity](https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop)

## Authentication and Authorization

### JWT Best Practices

\`\`\`javascript
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Generate secure secret
const JWT_SECRET = crypto.randomBytes(64).toString('hex');

// Short-lived access tokens
function generateAccessToken(user) {
  return jwt.sign(
    { 
      userId: user.id, 
      role: user.role 
    },
    JWT_SECRET,
    { 
      expiresIn: '15m',
      issuer: 'your-app',
      audience: 'your-api'
    }
  );
}

// Refresh tokens for long-term access
function generateRefreshToken(user) {
  return jwt.sign(
    { userId: user.id },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}
\`\`\`

### OAuth 2.0 Implementation

\`\`\`javascript
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
  scope: ['profile', 'email']
}, (accessToken, refreshToken, profile, done) => {
  // Handle user creation/authentication
  return done(null, profile);
}));
\`\`\`

## Input Validation and Sanitization

### Comprehensive Validation

\`\`\`javascript
const Joi = require('joi');

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).pattern(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
  ).required(),
  name: Joi.string().min(2).max(50).required(),
  age: Joi.number().integer().min(13).max(120)
});

function validateUser(req, res, next) {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: 'Validation failed',
      details: error.details
    });
  }
  next();
}
\`\`\`

### SQL Injection Prevention

\`\`\`javascript
// Bad: Vulnerable to SQL injection
const query = \`SELECT * FROM users WHERE email = '\${email}'\`;

// Good: Using parameterized queries
const query = 'SELECT * FROM users WHERE email = ?';
db.query(query, [email], (err, results) => {
  // Handle results
});

// Even better: Using ORM/Query Builder
const user = await User.findOne({ 
  where: { email: sanitizedEmail } 
});
\`\`\`

## Rate Limiting and DDoS Protection

### Express Rate Limiting

\`\`\`javascript
const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const redis = require('redis');

const client = redis.createClient();

const limiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => client.sendCommand(args),
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);
\`\`\`

### Advanced Rate Limiting

\`\`\`javascript
const slowDown = require('express-slow-down');

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 50, // Allow 50 requests per 15 minutes at full speed
  delayMs: 500, // Add 500ms delay per request after delayAfter
  maxDelayMs: 20000, // Maximum delay of 20 seconds
});

app.use('/api/auth/', speedLimiter);
\`\`\`

## HTTPS and Encryption

### SSL/TLS Configuration

\`\`\`javascript
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('private-key.pem'),
  cert: fs.readFileSync('certificate.pem'),
  // Enforce modern TLS
  secureProtocol: 'TLSv1_2_method',
  ciphers: [
    'ECDHE-RSA-AES128-GCM-SHA256',
    'ECDHE-RSA-AES256-GCM-SHA384',
    'ECDHE-RSA-AES128-SHA256',
    'ECDHE-RSA-AES256-SHA384'
  ].join(':'),
  honorCipherOrder: true
};

https.createServer(options, app).listen(443);
\`\`\`

### Data Encryption at Rest

\`\`\`javascript
const crypto = require('crypto');

function encrypt(text, key) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipher('aes-256-cbc', key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

function decrypt(text, key) {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = textParts.join(':');
  const decipher = crypto.createDecipher('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
\`\`\`

## Security Headers

### Essential Security Headers

\`\`\`javascript
const helmet = require('helmet');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

// Custom security headers
app.use((req, res, next) => {
  res.setHeader('X-API-Version', '1.0');
  res.setHeader('X-RateLimit-Limit', '100');
  next();
});
\`\`\`

## Monitoring and Logging

### Comprehensive Logging

\`\`\`javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'api' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Security event logging
function logSecurityEvent(type, details, req) {
  logger.warn('Security Event', {
    type,
    details,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
  });
}
\`\`\`

## API Versioning and Documentation

### Version Management

\`\`\`javascript
// URL versioning
app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);

// Header versioning
app.use((req, res, next) => {
  const version = req.get('API-Version') || 'v1';
  req.apiVersion = version;
  next();
});
\`\`\`

## Conclusion

API security requires a multi-layered approach combining authentication, encryption, monitoring, and best practices. Regular security audits and staying updated with the latest threats ensure your APIs remain secure.

Need help securing your API infrastructure? Our security experts can conduct comprehensive audits and implement enterprise-grade security measures.`,
    thumbnail_url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop",
    featured_image_url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=600&fit=crop"
  },
  {
    title: "Database Design Patterns for Scalable Applications",
    excerpt: "Learn essential database design patterns and optimization techniques to build applications that scale to millions of users.",
    content: `# Database Design Patterns for Scalable Applications

![Database Design](https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=400&fit=crop)

Building **scalable databases** is fundamental to creating applications that can grow from thousands to millions of users. This guide covers essential design patterns and optimization strategies for modern database architectures.

## Understanding Database Scalability

Database scalability involves two main approaches:

- **Vertical Scaling (Scale Up)**: Adding more power to existing machines
- **Horizontal Scaling (Scale Out)**: Adding more machines to the pool

For true scalability, horizontal scaling patterns are essential.

![Data Architecture](https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=400&fit=crop)

## Essential Design Patterns

### 1. Database Sharding

Sharding distributes data across multiple databases based on a shard key:

\`\`\`sql
-- User sharding by ID
-- Shard 1: users with ID 1-1000000
-- Shard 2: users with ID 1000001-2000000

-- Application logic
function getShardForUser(userId) {
  const shardNumber = Math.floor(userId / 1000000) + 1;
  return \`shard_\${shardNumber}\`;
}
\`\`\`

### 2. Read Replicas

Separate read and write operations to improve performance:

\`\`\`javascript
const mysql = require('mysql2');

const writeDB = mysql.createConnection({
  host: 'master.db.example.com',
  user: 'app',
  password: 'secure_password',
  database: 'production'
});

const readDB = mysql.createConnection({
  host: 'replica.db.example.com',
  user: 'app_read',
  password: 'secure_password',
  database: 'production'
});

// Write operations go to master
async function createUser(userData) {
  return writeDB.execute(
    'INSERT INTO users (name, email) VALUES (?, ?)',
    [userData.name, userData.email]
  );
}

// Read operations use replica
async function getUserById(id) {
  return readDB.execute(
    'SELECT * FROM users WHERE id = ?',
    [id]
  );
}
\`\`\`

### 3. CQRS (Command Query Responsibility Segregation)

Separate models for reading and writing data:

\`\`\`javascript
// Write model - normalized for consistency
class UserWriteModel {
  async createUser(userData) {
    await this.db.transaction(async (trx) => {
      const user = await trx('users').insert(userData);
      await trx('user_profiles').insert({
        user_id: user.id,
        ...userData.profile
      });
    });
  }
}

// Read model - denormalized for performance
class UserReadModel {
  async getUserWithProfile(id) {
    return this.cache.get(\`user:\${id}\`) || 
           this.db('user_views').where('id', id).first();
  }
}
\`\`\`

## Indexing Strategies

### Composite Indexes

\`\`\`sql
-- Optimize for common query patterns
CREATE INDEX idx_user_status_created 
ON users (status, created_at DESC);

-- Covering index includes all needed columns
CREATE INDEX idx_order_lookup 
ON orders (user_id, status) 
INCLUDE (total_amount, created_at);
\`\`\`

### Partial Indexes

\`\`\`sql
-- Index only active records
CREATE INDEX idx_active_users 
ON users (email) 
WHERE status = 'active';

-- Index for recent data
CREATE INDEX idx_recent_orders 
ON orders (created_at DESC) 
WHERE created_at > CURRENT_DATE - INTERVAL '30 days';
\`\`\`

## Caching Strategies

### Multi-Level Caching

\`\`\`javascript
const Redis = require('redis');
const NodeCache = require('node-cache');

class CacheManager {
  constructor() {
    this.l1Cache = new NodeCache({ stdTTL: 300 }); // 5 minutes
    this.l2Cache = Redis.createClient();
  }

  async get(key) {
    // L1 cache (in-memory)
    let value = this.l1Cache.get(key);
    if (value) return value;

    // L2 cache (Redis)
    value = await this.l2Cache.get(key);
    if (value) {
      this.l1Cache.set(key, JSON.parse(value));
      return JSON.parse(value);
    }

    return null;
  }

  async set(key, value, ttl = 3600) {
    this.l1Cache.set(key, value, ttl);
    await this.l2Cache.setex(key, ttl, JSON.stringify(value));
  }
}
\`\`\`

### Cache-Aside Pattern

\`\`\`javascript
async function getUserById(id) {
  const cacheKey = \`user:\${id}\`;
  
  // Try cache first
  let user = await cache.get(cacheKey);
  if (user) return user;
  
  // Fallback to database
  user = await db.select('*').from('users').where('id', id).first();
  if (user) {
    await cache.set(cacheKey, user, 3600); // 1 hour TTL
  }
  
  return user;
}
\`\`\`

## Data Partitioning Strategies

### Time-Based Partitioning

\`\`\`sql
-- PostgreSQL table partitioning
CREATE TABLE events (
  id SERIAL,
  user_id INTEGER,
  event_type VARCHAR(50),
  created_at TIMESTAMP NOT NULL,
  data JSONB
) PARTITION BY RANGE (created_at);

-- Monthly partitions
CREATE TABLE events_2024_01 PARTITION OF events
FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');

CREATE TABLE events_2024_02 PARTITION OF events
FOR VALUES FROM ('2024-02-01') TO ('2024-03-01');
\`\`\`

### Hash Partitioning

\`\`\`sql
-- Distribute data evenly across partitions
CREATE TABLE user_activities (
  id SERIAL,
  user_id INTEGER,
  activity_type VARCHAR(50),
  created_at TIMESTAMP
) PARTITION BY HASH (user_id);

CREATE TABLE user_activities_0 PARTITION OF user_activities
FOR VALUES WITH (modulus 4, remainder 0);

CREATE TABLE user_activities_1 PARTITION OF user_activities
FOR VALUES WITH (modulus 4, remainder 1);
\`\`\`

## Connection Pooling

### Optimized Connection Management

\`\`\`javascript
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'myapp',
  user: 'dbuser',
  password: 'secretpassword',
  // Connection pool settings
  max: 20, // Maximum connections
  min: 5,  // Minimum connections
  acquireTimeoutMillis: 60000, // 60 seconds
  idleTimeoutMillis: 30000,    // 30 seconds
  connectionTimeoutMillis: 2000, // 2 seconds
});

// Proper connection handling
async function queryDatabase(sql, params) {
  const client = await pool.connect();
  try {
    const result = await client.query(sql, params);
    return result;
  } finally {
    client.release(); // Always release connection
  }
}
\`\`\`

## Monitoring and Performance

### Key Metrics to Track

\`\`\`javascript
const prometheus = require('prom-client');

// Database connection metrics
const dbConnections = new prometheus.Gauge({
  name: 'db_connections_active',
  help: 'Number of active database connections'
});

// Query performance metrics
const queryDuration = new prometheus.Histogram({
  name: 'db_query_duration_seconds',
  help: 'Database query duration',
  labelNames: ['query_type', 'table']
});

// Monitor slow queries
async function monitoredQuery(sql, params, queryType, table) {
  const timer = queryDuration.startTimer({ query_type: queryType, table });
  try {
    const result = await pool.query(sql, params);
    return result;
  } finally {
    timer();
  }
}
\`\`\`

### Query Analysis

\`\`\`sql
-- PostgreSQL query analysis
EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON) 
SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.status = 'active'
GROUP BY u.id, u.name
ORDER BY order_count DESC
LIMIT 100;
\`\`\`

## Schema Evolution

### Safe Migration Patterns

\`\`\`sql
-- Add column with default value (safe)
ALTER TABLE users 
ADD COLUMN last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Create index concurrently (PostgreSQL)
CREATE INDEX CONCURRENTLY idx_users_email ON users (email);

-- Backward-compatible changes
ALTER TABLE products 
ADD COLUMN description_v2 TEXT;

-- Gradual migration approach
UPDATE products 
SET description_v2 = enhanced_description(description)
WHERE id BETWEEN 1 AND 1000;
\`\`\`

## NoSQL Considerations

### Document Database Patterns

\`\`\`javascript
// MongoDB aggregation pipeline
const pipeline = [
  { $match: { status: 'active' } },
  { $lookup: {
    from: 'orders',
    localField: '_id',
    foreignField: 'userId',
    as: 'orders'
  }},
  { $project: {
    name: 1,
    email: 1,
    orderCount: { $size: '$orders' },
    totalSpent: { $sum: '$orders.total' }
  }},
  { $sort: { totalSpent: -1 } },
  { $limit: 100 }
];

const topCustomers = await db.collection('users').aggregate(pipeline);
\`\`\`

## Conclusion

Scalable database design requires careful planning, proper indexing, effective caching, and continuous monitoring. Start with these patterns and adapt them to your specific use case and growth requirements.

Ready to optimize your database architecture? Our database experts can help you design and implement scalable solutions that grow with your business.`,
    thumbnail_url: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=250&fit=crop",
    featured_image_url: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1200&h=600&fit=crop"
  },
  {
    title: "DevOps and CI/CD Best Practices for Modern Development",
    excerpt: "Streamline your development workflow with modern DevOps practices, automated testing, and continuous deployment strategies.",
    content: `# DevOps and CI/CD Best Practices for Modern Development

![DevOps Pipeline](https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=400&fit=crop)

**DevOps** and **CI/CD** have revolutionized software development, enabling teams to deploy faster, more reliably, and with greater confidence. This comprehensive guide covers modern best practices for implementing effective DevOps workflows.

## The DevOps Philosophy

DevOps breaks down silos between development and operations teams, emphasizing:

- **Collaboration**: Shared responsibility for code quality and deployment
- **Automation**: Reduce manual processes and human error
- **Monitoring**: Continuous feedback and improvement
- **Culture**: Foster a culture of continuous learning and improvement

![Automation](https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=400&fit=crop)

## CI/CD Pipeline Architecture

### Modern Pipeline Structure

\`\`\`yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm run test:coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3

  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run security audit
        run: npm audit --production
      
      - name: Run SAST scan
        uses: github/codeql-action/analyze@v2

  build:
    needs: [test, security]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build Docker image
        run: |
          docker build -t myapp:${{ github.sha }} .
          docker tag myapp:${{ github.sha }} myapp:latest
      
      - name: Push to registry
        run: |
          echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
          docker push myapp:${{ github.sha }}
          docker push myapp:latest

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to production
        run: |
          kubectl set image deployment/myapp myapp=myapp:${{ github.sha }}
          kubectl rollout status deployment/myapp
\`\`\`

## Infrastructure as Code

### Terraform Configuration

\`\`\`hcl
# main.tf
provider "aws" {
  region = var.aws_region
}

# VPC Configuration
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name        = "main-vpc"
    Environment = var.environment
  }
}

# EKS Cluster
resource "aws_eks_cluster" "main" {
  name     = "main-cluster"
  role_arn = aws_iam_role.cluster.arn
  version  = "1.28"

  vpc_config {
    subnet_ids = aws_subnet.private[*].id
    endpoint_private_access = true
    endpoint_public_access  = true
  }

  depends_on = [
    aws_iam_role_policy_attachment.cluster_AmazonEKSClusterPolicy
  ]
}

# Auto Scaling Group for worker nodes
resource "aws_eks_node_group" "main" {
  cluster_name    = aws_eks_cluster.main.name
  node_group_name = "main-nodes"
  node_role_arn   = aws_iam_role.node.arn
  subnet_ids      = aws_subnet.private[*].id
  instance_types  = ["t3.medium"]

  scaling_config {
    desired_size = 2
    max_size     = 5
    min_size     = 1
  }

  update_config {
    max_unavailable = 1
  }
}
\`\`\`

### Ansible Playbooks

\`\`\`yaml
# playbook.yml
---
- hosts: web_servers
  become: yes
  vars:
    app_name: myapp
    app_version: "{{ git_sha }}"
    
  tasks:
    - name: Update package cache
      apt:
        update_cache: yes
        cache_valid_time: 3600

    - name: Install Docker
      apt:
        name: docker.io
        state: present

    - name: Start Docker service
      systemd:
        name: docker
        state: started
        enabled: yes

    - name: Pull application image
      docker_image:
        name: "{{ app_name }}:{{ app_version }}"
        source: pull

    - name: Stop existing container
      docker_container:
        name: "{{ app_name }}"
        state: stopped
      ignore_errors: yes

    - name: Start new container
      docker_container:
        name: "{{ app_name }}"
        image: "{{ app_name }}:{{ app_version }}"
        state: started
        restart_policy: always
        ports:
          - "80:3000"
        env:
          NODE_ENV: production
          DATABASE_URL: "{{ database_url }}"
\`\`\`

## Containerization Best Practices

### Optimized Dockerfile

\`\`\`dockerfile
# Multi-stage build for smaller images
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Production stage
FROM node:18-alpine AS production

# Create non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

WORKDIR /app

# Copy dependencies
COPY --from=builder /app/node_modules ./node_modules
COPY --chown=nextjs:nodejs . .

# Security: Run as non-root user
USER nextjs

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

EXPOSE 3000

CMD ["npm", "start"]
\`\`\`

### Docker Compose for Development

\`\`\`yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://user:password@db:5432/myapp
    volumes:
      - .:/app
      - /app/node_modules
    depends_on:
      - db
      - redis

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
\`\`\`

## Kubernetes Deployment

### Application Deployment

\`\`\`yaml
# k8s/deployment.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
  labels:
    app: myapp
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp
        image: myapp:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: database-url
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5

---
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  selector:
    app: myapp
  ports:
  - port: 80
    targetPort: 3000
  type: ClusterIP
\`\`\`

### Ingress Configuration

\`\`\`yaml
# k8s/ingress.yml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myapp-ingress
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/rate-limit: "100"
    nginx.ingress.kubernetes.io/rate-limit-window: "1m"
spec:
  tls:
  - hosts:
    - myapp.example.com
    secretName: myapp-tls
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: myapp-service
            port:
              number: 80
\`\`\`

## Monitoring and Observability

### Prometheus Configuration

\`\`\`yaml
# prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "alert_rules.yml"

scrape_configs:
  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
    - role: pod
    relabel_configs:
    - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
      action: keep
      regex: true
    - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]
      action: replace
      target_label: __metrics_path__
      regex: (.+)

alerting:
  alertmanagers:
  - static_configs:
    - targets:
      - alertmanager:9093
\`\`\`

### Application Metrics

\`\`\`javascript
const promClient = require('prom-client');
const express = require('express');

// Create metrics
const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code']
});

const httpRequestsTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

// Middleware to collect metrics
function metricsMiddleware(req, res, next) {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    const labels = {
      method: req.method,
      route: req.route?.path || req.path,
      status_code: res.statusCode
    };
    
    httpRequestDuration.observe(labels, duration);
    httpRequestsTotal.inc(labels);
  });
  
  next();
}

// Metrics endpoint
app.get('/metrics', (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(promClient.register.metrics());
});
\`\`\`

## Security in DevOps

### Secret Management

\`\`\`yaml
# k8s/secrets.yml
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
type: Opaque
data:
  database-url: <base64-encoded-value>
  api-key: <base64-encoded-value>

---
# Using External Secrets Operator
apiVersion: external-secrets.io/v1beta1
kind: SecretStore
metadata:
  name: vault-backend
spec:
  provider:
    vault:
      server: "https://vault.example.com"
      path: "secret"
      version: "v2"
      auth:
        kubernetes:
          mountPath: "kubernetes"
          role: "myapp"
\`\`\`

### Security Scanning

\`\`\`yaml
# .github/workflows/security.yml
name: Security Scan

on:
  push:
    branches: [main]
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM

jobs:
  vulnerability-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: 'myapp:latest'
          format: 'sarif'
          output: 'trivy-results.sarif'
      
      - name: Upload Trivy scan results
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: 'trivy-results.sarif'
\`\`\`

## Performance Optimization

### Build Optimization

\`\`\`yaml
# Optimized CI pipeline
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Docker Buildx
        uses: docker/setup-buildx-action@v3
      
      - name: Build with cache
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: myapp:${{ github.sha }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
          platforms: linux/amd64,linux/arm64
\`\`\`

## Conclusion

Modern DevOps practices enable teams to deliver software faster and more reliably. The key is starting with solid foundations—automated testing, infrastructure as code, and comprehensive monitoring—then iterating and improving based on feedback and metrics.

Ready to modernize your DevOps practices? Our team can help you implement CI/CD pipelines, containerization strategies, and monitoring solutions that scale with your business.`,
    thumbnail_url: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=250&fit=crop",
    featured_image_url: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200&h=600&fit=crop"
  },
  {
    title: "Progressive Web Apps: Building Native-Like Experiences",
    excerpt: "Transform your web application into a progressive web app (PWA) for native-like performance, offline functionality, and app store distribution.",
    content: `# Progressive Web Apps: Building Native-Like Experiences

![Progressive Web App](https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop)

**Progressive Web Apps (PWAs)** bridge the gap between web and native applications, offering app-like experiences while maintaining the reach and accessibility of the web. In 2024, PWAs are more powerful than ever, with enhanced capabilities and broader browser support.

## What Makes a PWA?

A Progressive Web App combines the best of web and mobile apps through:

- **Progressive Enhancement**: Works for every user, regardless of browser choice
- **Responsive Design**: Fits any form factor: desktop, mobile, tablet
- **Offline Functionality**: Uses service workers for offline experiences
- **App-like Interface**: Native app-style interactions and navigation
- **Secure**: Served via HTTPS to prevent tampering
- **Installable**: Can be installed on the home screen without an app store

![Mobile Development](https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop)

## Service Worker Implementation

### Basic Service Worker Setup

\`\`\`javascript
// sw.js - Service Worker
const CACHE_NAME = 'myapp-v1';
const urlsToCache = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js',
  '/static/images/logo.png',
  '/offline.html'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache opened');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request)
          .catch(() => {
            // Show offline page for navigation requests
            if (event.request.destination === 'document') {
              return caches.match('/offline.html');
            }
          });
      })
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
\`\`\`

### Advanced Caching Strategies

\`\`\`javascript
// Cache strategies for different resource types
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // API requests - Network first, cache fallback
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Clone response to cache
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
    return;
  }
  
  // Static assets - Cache first, network fallback
  if (url.pathname.startsWith('/static/')) {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          return response || fetch(event.request);
        })
    );
    return;
  }
  
  // Images - Cache with expiration
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.open('images-cache').then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response) {
            return response;
          }
          
          return fetch(event.request).then((fetchResponse) => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
    );
    return;
  }
});
\`\`\`

## Web App Manifest

### Complete Manifest Configuration

\`\`\`json
{
  "name": "My Progressive Web App",
  "short_name": "MyPWA",
  "description": "An amazing progressive web application",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait-primary",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "scope": "/",
  "lang": "en",
  "categories": ["productivity", "utilities"],
  "screenshots": [
    {
      "src": "/screenshots/desktop-1.png",
      "sizes": "1280x720",
      "type": "image/png",
      "form_factor": "wide",
      "label": "Desktop view of the application"
    },
    {
      "src": "/screenshots/mobile-1.png",
      "sizes": "360x640",
      "type": "image/png",
      "form_factor": "narrow",
      "label": "Mobile view of the application"
    }
  ],
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable any"
    }
  ],
  "shortcuts": [
    {
      "name": "New Document",
      "short_name": "New Doc",
      "description": "Create a new document",
      "url": "/new",
      "icons": [
        {
          "src": "/icons/new-doc.png",
          "sizes": "192x192"
        }
      ]
    }
  ]
}
\`\`\`

## Push Notifications

### Setting Up Push Notifications

\`\`\`javascript
// main.js - Register for push notifications
async function initializePushNotifications() {
  // Check for service worker support
  if (!('serviceWorker' in navigator)) {
    console.log('Service workers not supported');
    return;
  }
  
  // Check for push messaging support
  if (!('PushManager' in window)) {
    console.log('Push messaging not supported');
    return;
  }
  
  // Register service worker
  const registration = await navigator.serviceWorker.register('/sw.js');
  
  // Request notification permission
  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    console.log('Notification permission denied');
    return;
  }
  
  // Subscribe to push notifications
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
  });
  
  // Send subscription to server
  await fetch('/api/push-subscription', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subscription)
  });
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
\`\`\`

### Service Worker Push Handler

\`\`\`javascript
// sw.js - Handle push notifications
self.addEventListener('push', (event) => {
  if (!event.data) {
    return;
  }

  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    image: data.image,
    data: data.url,
    actions: [
      {
        action: 'view',
        title: 'View',
        icon: '/icons/view.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/close.png'
      }
    ],
    tag: data.tag,
    renotify: true,
    requireInteraction: true
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow(event.notification.data)
    );
  }
});
\`\`\`

## Background Sync

### Implementing Background Sync

\`\`\`javascript
// main.js - Queue actions for background sync
async function submitForm(formData) {
  try {
    // Try to send immediately
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: formData
    });
    
    if (response.ok) {
      showSuccessMessage('Form submitted successfully!');
    } else {
      throw new Error('Network error');
    }
  } catch (error) {
    // Queue for background sync
    await queueForBackgroundSync('submit-form', formData);
    showInfoMessage('Form queued for submission when online');
  }
}

async function queueForBackgroundSync(action, data) {
  // Store in IndexedDB
  const db = await openDatabase();
  const transaction = db.transaction(['sync-queue'], 'readwrite');
  const store = transaction.objectStore('sync-queue');
  
  await store.add({
    action,
    data,
    timestamp: Date.now()
  });
  
  // Register background sync
  if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
    const registration = await navigator.serviceWorker.ready;
    await registration.sync.register(action);
  }
}
\`\`\`

### Service Worker Background Sync

\`\`\`javascript
// sw.js - Handle background sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'submit-form') {
    event.waitUntil(processQueuedForms());
  }
});

async function processQueuedForms() {
  const db = await openDatabase();
  const transaction = db.transaction(['sync-queue'], 'readonly');
  const store = transaction.objectStore('sync-queue');
  const queuedItems = await store.getAll();
  
  for (const item of queuedItems) {
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        body: item.data
      });
      
      if (response.ok) {
        // Remove from queue
        const deleteTransaction = db.transaction(['sync-queue'], 'readwrite');
        const deleteStore = deleteTransaction.objectStore('sync-queue');
        await deleteStore.delete(item.id);
        
        // Show success notification
        await self.registration.showNotification('Form Submitted', {
          body: 'Your form was successfully submitted in the background',
          icon: '/icons/success.png'
        });
      }
    } catch (error) {
      console.log('Failed to submit form:', error);
      // Will retry on next sync event
    }
  }
}
\`\`\`

## App Shell Architecture

### Implementing App Shell

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My PWA</title>
  <link rel="manifest" href="/manifest.json">
  <meta name="theme-color" content="#000000">
  
  <!-- App shell critical CSS -->
  <style>
    .app-shell {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    
    .app-header {
      background: #000;
      color: white;
      padding: 1rem;
      position: sticky;
      top: 0;
      z-index: 100;
    }
    
    .app-content {
      flex: 1;
      padding: 1rem;
    }
    
    .loading {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 200px;
    }
  </style>
</head>
<body>
  <div class="app-shell">
    <header class="app-header">
      <h1>My PWA</h1>
      <nav>
        <button onclick="navigate('/home')">Home</button>
        <button onclick="navigate('/profile')">Profile</button>
        <button onclick="navigate('/settings')">Settings</button>
      </nav>
    </header>
    
    <main class="app-content" id="content">
      <div class="loading">Loading...</div>
    </main>
  </div>
  
  <script>
    // App shell navigation
    async function navigate(path) {
      const content = document.getElementById('content');
      content.innerHTML = '<div class="loading">Loading...</div>';
      
      try {
        const response = await fetch(\`/api/content\${path}\`);
        const html = await response.text();
        content.innerHTML = html;
        
        // Update URL without page reload
        history.pushState(null, '', path);
      } catch (error) {
        content.innerHTML = '<div>Failed to load content</div>';
      }
    }
    
    // Handle back/forward buttons
    window.addEventListener('popstate', () => {
      navigate(window.location.pathname);
    });
    
    // Initialize PWA features
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js');
    }
  </script>
</body>
</html>
\`\`\`

## Performance Optimization

### Critical Resource Loading

\`\`\`javascript
// Optimize loading with resource hints
function optimizeLoading() {
  // Preload critical resources
  const criticalResources = [
    '/api/user/profile',
    '/static/css/critical.css',
    '/static/js/app.js'
  ];
  
  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    link.as = resource.includes('.css') ? 'style' : 
              resource.includes('.js') ? 'script' : 'fetch';
    document.head.appendChild(link);
  });
}

// Lazy load non-critical components
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const component = entry.target;
      import(component.dataset.component).then(module => {
        module.default(component);
      });
      observer.unobserve(component);
    }
  });
});

document.querySelectorAll('[data-component]').forEach(el => {
  observer.observe(el);
});
\`\`\`

## Testing PWA Features

### Automated PWA Testing

\`\`\`javascript
// puppeteer-pwa-test.js
const puppeteer = require('puppeteer');

async function testPWAFeatures() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Test offline functionality
  await page.goto('http://localhost:3000');
  await page.setOfflineMode(true);
  await page.reload();
  
  const offlineContent = await page.content();
  console.assert(
    offlineContent.includes('offline'), 
    'Offline page should be displayed'
  );
  
  // Test service worker registration
  await page.setOfflineMode(false);
  const swRegistered = await page.evaluate(() => {
    return 'serviceWorker' in navigator;
  });
  console.assert(swRegistered, 'Service worker should be supported');
  
  // Test manifest
  const manifestLink = await page.$('link[rel="manifest"]');
  console.assert(manifestLink, 'Manifest should be linked');
  
  await browser.close();
}

testPWAFeatures().catch(console.error);
\`\`\`

## Conclusion

Progressive Web Apps represent the future of web applications, combining the best of web and native experiences. With proper implementation of service workers, offline functionality, and native-like features, PWAs can significantly improve user engagement and provide app-like experiences across all devices.

Ready to transform your web application into a PWA? Our team specializes in building high-performance progressive web apps that deliver exceptional user experiences.`,
    thumbnail_url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop",
    featured_image_url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=600&fit=crop"
  },
  {
    title: "Web Accessibility: Building Inclusive Digital Experiences",
    excerpt: "Learn to create accessible web applications that work for everyone, including users with disabilities, while improving SEO and user experience.",
    content: `# Web Accessibility: Building Inclusive Digital Experiences

![Web Accessibility](https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=400&fit=crop)

**Web accessibility** ensures that websites and applications are usable by everyone, including people with disabilities. Building accessible web experiences isn't just about compliance—it's about creating inclusive digital environments that benefit all users and improve overall user experience.

## Understanding Web Accessibility

Web accessibility removes barriers that prevent interaction with or access to websites by people with auditory, cognitive, neurological, physical, speech, and visual disabilities. When sites are correctly designed and coded, all users can access information and functionality.

### The Business Case for Accessibility

- **Expanded Market Reach**: 15% of the global population has some form of disability
- **Improved SEO**: Accessible markup improves search engine indexing
- **Better UX for All**: Accessibility improvements benefit all users
- **Legal Compliance**: Avoid lawsuits and ensure regulatory compliance
- **Enhanced Brand Reputation**: Demonstrates commitment to inclusivity

![Inclusive Design](https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=400&fit=crop)

## WCAG Guidelines and Standards

### WCAG 2.1 Principles

Web Content Accessibility Guidelines are organized around four principles:

1. **Perceivable**: Information must be presentable in ways users can perceive
2. **Operable**: Interface components must be operable by all users
3. **Understandable**: Information and UI operation must be understandable
4. **Robust**: Content must be robust enough for various assistive technologies

### Conformance Levels

- **Level A**: Minimum level of accessibility
- **Level AA**: Standard level (legally required in many jurisdictions)
- **Level AAA**: Enhanced level (recommended for specialized content)

## Semantic HTML Foundation

### Proper HTML Structure

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Accessible Web Page - Company Name</title>
  <meta name="description" content="Learn about our accessible web development services">
</head>
<body>
  <!-- Skip to main content link -->
  <a href="#main-content" class="skip-link">Skip to main content</a>
  
  <header role="banner">
    <nav role="navigation" aria-label="Main navigation">
      <ul>
        <li><a href="#home" aria-current="page">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>
  
  <main id="main-content" role="main">
    <section aria-labelledby="hero-heading">
      <h1 id="hero-heading">Welcome to Our Accessible Website</h1>
      <p>We create inclusive digital experiences for everyone.</p>
    </section>
    
    <section aria-labelledby="services-heading">
      <h2 id="services-heading">Our Services</h2>
      <div class="services-grid">
        <article>
          <h3>Web Development</h3>
          <p>Building accessible, performant websites.</p>
          <a href="/web-development" aria-describedby="web-dev-desc">
            Learn more about web development
          </a>
          <div id="web-dev-desc" class="sr-only">
            Opens detailed information about our web development services
          </div>
        </article>
      </div>
    </section>
  </main>
  
  <footer role="contentinfo">
    <p>&copy; 2024 Company Name. All rights reserved.</p>
  </footer>
</body>
</html>
\`\`\`

## ARIA Labels and Roles

### Essential ARIA Attributes

\`\`\`html
<!-- Form with proper labeling -->
<form role="form" aria-labelledby="contact-form-heading">
  <h2 id="contact-form-heading">Contact Us</h2>
  
  <!-- Required field with error message -->
  <div class="form-group">
    <label for="email">
      Email Address
      <span aria-label="required">*</span>
    </label>
    <input 
      type="email" 
      id="email" 
      name="email" 
      required 
      aria-describedby="email-error email-help"
      aria-invalid="false"
    >
    <div id="email-help" class="help-text">
      We'll never share your email address
    </div>
    <div id="email-error" class="error-message" aria-live="polite">
      <!-- Error message populated by JavaScript -->
    </div>
  </div>
  
  <!-- Select with grouped options -->
  <div class="form-group">
    <label for="country">Country</label>
    <select id="country" name="country" aria-describedby="country-help">
      <option value="">Choose a country</option>
      <optgroup label="North America">
        <option value="us">United States</option>
        <option value="ca">Canada</option>
      </optgroup>
      <optgroup label="Europe">
        <option value="uk">United Kingdom</option>
        <option value="de">Germany</option>
      </optgroup>
    </select>
    <div id="country-help" class="help-text">
      Select your country for localized content
    </div>
  </div>
  
  <!-- Fieldset for grouped controls -->
  <fieldset>
    <legend>Preferred Contact Method</legend>
    <div class="radio-group" role="radiogroup" aria-labelledby="contact-method-legend">
      <input type="radio" id="contact-email" name="contact-method" value="email">
      <label for="contact-email">Email</label>
      
      <input type="radio" id="contact-phone" name="contact-method" value="phone">
      <label for="contact-phone">Phone</label>
    </div>
  </fieldset>
  
  <button type="submit" aria-describedby="submit-help">
    Send Message
  </button>
  <div id="submit-help" class="help-text">
    Submitting this form will send your message to our support team
  </div>
</form>
\`\`\`

### Dynamic Content and Live Regions

\`\`\`html
<!-- Status messages -->
<div id="status-messages" aria-live="polite" aria-atomic="true" class="sr-only">
  <!-- Messages announced to screen readers -->
</div>

<!-- Loading indicator -->
<div 
  id="loading-indicator" 
  aria-live="assertive" 
  aria-busy="true" 
  aria-describedby="loading-description"
>
  Loading content...
  <div id="loading-description" class="sr-only">
    Please wait while we load your dashboard data
  </div>
</div>

<!-- Progress indicator -->
<div role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" aria-label="Upload progress">
  <div class="progress-bar" style="width: 75%">
    <span class="sr-only">75% complete</span>
  </div>
</div>
\`\`\`

## Keyboard Navigation

### Implementing Keyboard Accessibility

\`\`\`javascript
// Keyboard navigation for custom components
class AccessibleModal {
  constructor(modalElement) {
    this.modal = modalElement;
    this.focusableElements = this.modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    this.firstFocusable = this.focusableElements[0];
    this.lastFocusable = this.focusableElements[this.focusableElements.length - 1];
    this.previouslyFocused = null;
    
    this.init();
  }
  
  init() {
    this.modal.addEventListener('keydown', this.handleKeyDown.bind(this));
  }
  
  open() {
    this.previouslyFocused = document.activeElement;
    this.modal.style.display = 'block';
    this.modal.setAttribute('aria-hidden', 'false');
    
    // Focus first element or modal itself
    if (this.firstFocusable) {
      this.firstFocusable.focus();
    } else {
      this.modal.focus();
    }
    
    // Announce to screen readers
    this.announceToScreenReader('Modal opened');
  }
  
  close() {
    this.modal.style.display = 'none';
    this.modal.setAttribute('aria-hidden', 'true');
    
    // Return focus to previously focused element
    if (this.previouslyFocused) {
      this.previouslyFocused.focus();
    }
    
    this.announceToScreenReader('Modal closed');
  }
  
  handleKeyDown(e) {
    // Escape key closes modal
    if (e.key === 'Escape') {
      this.close();
      return;
    }
    
    // Tab key handling for focus trap
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === this.firstFocusable) {
          e.preventDefault();
          this.lastFocusable.focus();
        }
      } else {
        // Tab
        if (document.activeElement === this.lastFocusable) {
          e.preventDefault();
          this.firstFocusable.focus();
        }
      }
    }
  }
  
  announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'assertive');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }
}

// Accessible dropdown menu
class AccessibleDropdown {
  constructor(triggerElement) {
    this.trigger = triggerElement;
    this.menu = document.getElementById(this.trigger.getAttribute('aria-controls'));
    this.menuItems = this.menu.querySelectorAll('[role="menuitem"]');
    this.currentIndex = -1;
    
    this.init();
  }
  
  init() {
    this.trigger.addEventListener('click', this.toggle.bind(this));
    this.trigger.addEventListener('keydown', this.handleTriggerKeyDown.bind(this));
    this.menu.addEventListener('keydown', this.handleMenuKeyDown.bind(this));
    
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!this.trigger.contains(e.target) && !this.menu.contains(e.target)) {
        this.close();
      }
    });
  }
  
  toggle() {
    const isOpen = this.trigger.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
  
  open() {
    this.trigger.setAttribute('aria-expanded', 'true');
    this.menu.style.display = 'block';
    this.currentIndex = 0;
    this.menuItems[0].focus();
  }
  
  close() {
    this.trigger.setAttribute('aria-expanded', 'false');
    this.menu.style.display = 'none';
    this.currentIndex = -1;
    this.trigger.focus();
  }
  
  handleTriggerKeyDown(e) {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.open();
    }
  }
  
  handleMenuKeyDown(e) {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.currentIndex = (this.currentIndex + 1) % this.menuItems.length;
        this.menuItems[this.currentIndex].focus();
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        this.currentIndex = this.currentIndex <= 0 ? 
          this.menuItems.length - 1 : this.currentIndex - 1;
        this.menuItems[this.currentIndex].focus();
        break;
        
      case 'Escape':
        this.close();
        break;
        
      case 'Tab':
        this.close();
        break;
        
      case 'Enter':
      case ' ':
        e.preventDefault();
        this.menuItems[this.currentIndex].click();
        this.close();
        break;
    }
  }
}
\`\`\`

## Color and Contrast

### Ensuring Adequate Color Contrast

\`\`\`css
/* WCAG AA compliant color combinations */
:root {
  /* Primary colors with 4.5:1 contrast ratio */
  --primary-bg: #0066cc;
  --primary-text: #ffffff;
  
  /* Secondary colors with proper contrast */
  --secondary-bg: #f8f9fa;
  --secondary-text: #212529;
  
  /* Error states with high contrast */
  --error-bg: #dc3545;
  --error-text: #ffffff;
  --error-border: #b02a37;
  
  /* Success states */
  --success-bg: #28a745;
  --success-text: #ffffff;
  
  /* Warning states */
  --warning-bg: #ffc107;
  --warning-text: #212529;
  
  /* Focus indicators */
  --focus-outline: #005fcc;
  --focus-outline-width: 2px;
}

/* High contrast focus indicators */
*:focus {
  outline: var(--focus-outline-width) solid var(--focus-outline);
  outline-offset: 2px;
}

/* Remove outline for mouse users, keep for keyboard users */
.mouse-user *:focus {
  outline: none;
}

.mouse-user *:focus-visible {
  outline: var(--focus-outline-width) solid var(--focus-outline);
  outline-offset: 2px;
}

/* Ensure interactive elements meet size requirements */
button, a, input, select, textarea {
  min-height: 44px;
  min-width: 44px;
}

/* Color-blind friendly design */
.status-indicator {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.status-indicator::before {
  content: '';
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.status-success {
  color: var(--success-bg);
}

.status-success::before {
  background: var(--success-bg);
}

.status-error {
  color: var(--error-bg);
}

.status-error::before {
  background: var(--error-bg);
}

.status-warning {
  color: var(--warning-bg);
}

.status-warning::before {
  background: var(--warning-bg);
}
\`\`\`

## Screen Reader Optimization

### Screen Reader-Friendly Markup

\`\`\`html
<!-- Data tables with proper headers -->
<table role="table" aria-labelledby="sales-table-caption">
  <caption id="sales-table-caption">
    Monthly Sales Report for Q4 2024
  </caption>
  <thead>
    <tr>
      <th scope="col" id="month">Month</th>
      <th scope="col" id="product">Product</th>
      <th scope="col" id="sales">Sales ($)</th>
      <th scope="col" id="growth">Growth (%)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row" headers="month">October</th>
      <td headers="product month">Widget A</td>
      <td headers="sales month">$15,000</td>
      <td headers="growth month">+12%</td>
    </tr>
    <tr>
      <th scope="row" headers="month">November</th>
      <td headers="product month">Widget A</td>
      <td headers="sales month">$18,500</td>
      <td headers="growth month">+23%</td>
    </tr>
  </tbody>
</table>

<!-- Complex content with helpful descriptions -->
<figure role="img" aria-labelledby="chart-title" aria-describedby="chart-desc">
  <div id="chart-title">Sales Growth Chart</div>
  <canvas id="sales-chart"></canvas>
  <div id="chart-desc">
    Line chart showing sales growth from January to December 2024. 
    Sales started at $10,000 in January and reached $25,000 in December, 
    with steady growth throughout the year and a notable spike in November.
  </div>
</figure>

<!-- Image with descriptive alt text -->
<img 
  src="/team-photo.jpg" 
  alt="Team of 8 developers working together at a modern office space with laptops and whiteboards"
  width="800" 
  height="600"
>

<!-- Decorative images -->
<img src="/decorative-pattern.svg" alt="" role="presentation">
\`\`\`

## Testing for Accessibility

### Automated Testing

\`\`\`javascript
// Using axe-core for automated accessibility testing
const axe = require('axe-core');

async function runAccessibilityTests() {
  const results = await axe.run(document, {
    rules: {
      'color-contrast': { enabled: true },
      'keyboard-navigation': { enabled: true },
      'focus-management': { enabled: true },
      'aria-usage': { enabled: true }
    }
  });
  
  if (results.violations.length > 0) {
    console.log('Accessibility violations found:');
    results.violations.forEach(violation => {
      console.log(\`Rule: \${violation.id}\`);
      console.log(\`Impact: \${violation.impact}\`);
      console.log(\`Description: \${violation.description}\`);
      console.log(\`Help: \${violation.helpUrl}\`);
      console.log('Affected elements:', violation.nodes);
    });
  } else {
    console.log('No accessibility violations found!');
  }
}

// Jest test for accessibility
describe('Accessibility Tests', () => {
  test('should not have any accessibility violations', async () => {
    const { container } = render(<App />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  test('should handle keyboard navigation', () => {
    const { container } = render(<NavigationMenu />);
    const firstButton = container.querySelector('button');
    
    firstButton.focus();
    expect(document.activeElement).toBe(firstButton);
    
    // Simulate Tab key
    fireEvent.keyDown(firstButton, { key: 'Tab' });
    // Test focus moves to next element
  });
});
\`\`\`

### Manual Testing Checklist

\`\`\`javascript
// Accessibility testing utilities
class AccessibilityTester {
  static async testKeyboardNavigation() {
    console.log('Testing keyboard navigation...');
    
    // Test tab order
    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    console.log(\`Found \${focusableElements.length} focusable elements\`);
    
    // Test skip links
    const skipLinks = document.querySelectorAll('.skip-link');
    console.log(\`Found \${skipLinks.length} skip links\`);
    
    return {
      focusableCount: focusableElements.length,
      hasSkipLinks: skipLinks.length > 0
    };
  }
  
  static testColorContrast() {
    const elements = document.querySelectorAll('*');
    const contrastIssues = [];
    
    elements.forEach(element => {
      const style = window.getComputedStyle(element);
      const color = style.color;
      const backgroundColor = style.backgroundColor;
      
      // Check if element has visible text
      if (element.textContent.trim() && color && backgroundColor) {
        const contrast = this.getContrastRatio(color, backgroundColor);
        if (contrast < 4.5) {
          contrastIssues.push({
            element: element.tagName,
            color,
            backgroundColor,
            contrast: contrast.toFixed(2)
          });
        }
      }
    });
    
    return contrastIssues;
  }
  
  static getContrastRatio(color1, color2) {
    // Simplified contrast ratio calculation
    // In production, use a proper color contrast library
    return 4.5; // Placeholder
  }
  
  static testAriaLabels() {
    const elementsNeedingLabels = document.querySelectorAll(
      'input:not([aria-label]):not([aria-labelledby]), ' +
      'button:not([aria-label]):not([aria-labelledby]):empty, ' +
      '[role="button"]:not([aria-label]):not([aria-labelledby]):empty'
    );
    
    const missingLabels = Array.from(elementsNeedingLabels).map(el => ({
      tagName: el.tagName,
      role: el.getAttribute('role'),
      id: el.id || 'no-id'
    }));
    
    return {
      count: missingLabels.length,
      elements: missingLabels
    };
  }
}
\`\`\`

## Performance and Accessibility

### Optimizing for Assistive Technologies

\`\`\`css
/* Optimize animations for accessibility */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .card {
    border: 2px solid currentColor;
  }
  
  .button {
    border: 2px solid currentColor;
  }
}

/* Dark mode accessibility */
@media (prefers-color-scheme: dark) {
  :root {
    --primary-bg: #1a73e8;
    --primary-text: #ffffff;
    --secondary-bg: #202124;
    --secondary-text: #e8eaed;
  }
}

/* Screen reader only content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Focus visible polyfill */
.js-focus-visible :focus:not(.focus-visible) {
  outline: none;
}
\`\`\`

## Conclusion

Web accessibility is fundamental to creating inclusive digital experiences. By implementing proper semantic HTML, ARIA attributes, keyboard navigation, and testing strategies, we can ensure our applications work for everyone. Accessibility isn't just a checklist—it's an ongoing commitment to inclusive design that benefits all users.

Need help making your website accessible? Our accessibility experts can conduct comprehensive audits and implement WCAG-compliant solutions that enhance user experience for everyone.`,
    thumbnail_url: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=250&fit=crop",
    featured_image_url: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1200&h=600&fit=crop"
  }
];
