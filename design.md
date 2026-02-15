You are a senior full-stack engineer. Build a fully operational mock e-commerce website for a home cleaning robot brand called “Homebot”.

GOALS
- A real working web app (not just UI mockups).
- Ready to deploy on Render.com.
- Simple, clean, modern design with responsive layout.
- Includes product pages, add-to-cart, cart view, and checkout placeholder (no real payments).

TECH STACK (use exactly this)
- Node.js 20
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Local state cart using React Context + localStorage persistence
- No database required (hardcode products in a data file)
- No external auth
- No payment integration (checkout page is a fake “order summary” + “place order” button that clears the cart)

INFORMATION ARCHITECTURE / ROUTES
- Home page: /
- Model pages:
  - /models/x1
  - /models/x2
  - /models/x3
- Cart page: /cart
- Checkout page: /checkout
- About page: /about
- Search results page: /search?q=...

HOMEPAGE REQUIREMENTS
- Top navbar:
  - Left: Homebot logo (text-based is fine if no image)
  - Links: Models (dropdown or section), Cart (with item count badge)
- Hero section:
  - Headline + short tagline for Homebot
  - Primary CTA button: “Shop Models” scrolls to models section
- Models section shows 3 cards (each with name, short capabilities, price, “View model”, “Add to cart”)
- Footer:
  - Search bar (input + submit) that navigates to /search?q=...
  - “About us” link to /about
  - Simple copyright line

PRODUCTS (hardcode these exactly)
- Homebot X1
  - Slug: x1
  - Capability: clears floors like a modern robot vacuum cleaner
  - Price: $399
- Homebot X2
  - Slug: x2
  - Capabilities: clears floors + can also wash dishes
  - Price: $899
- Homebot X3
  - Slug: x3
  - Capabilities: clears floors + washes dishes + does laundry + cleans windows
  - Price: $1499

MODEL PAGE REQUIREMENTS (each model page)
- Show model name, large product image placeholder (use a simple SVG or a div placeholder)
- Feature list (bullets)
- Price
- “Add to cart” button
- A small comparison strip linking to the other models
- Breadcrumb back to Home

CART REQUIREMENTS
- Cart stored in Context and persisted to localStorage
- Show line items:
  - Name, price, quantity controls (+ / -), remove button
- Show subtotal, estimated tax (fake, e.g. 8%), total
- Buttons:
  - “Continue shopping” -> /
  - “Checkout” -> /checkout (disabled if cart empty)

CHECKOUT PAGE (mock)
- Order summary + totals
- Simple form (name, email, address) with basic validation (required fields)
- “Place order” button:
  - Show success message
  - Clear cart
  - Link back to Home

SEARCH
- The footer search bar appears on every page
- /search reads query param q and filters the 3 products by name and capabilities
- Display results cards (same component used on homepage)

COMPONENTS (suggested)
- <Navbar />
- <Footer /> (includes search bar + About link)
- <ProductCard />
- <CartProvider /> + hooks: useCart()
- Central product catalog in /src/data/products.ts

DESIGN
- Tailwind layout, clean spacing, simple typography
- Accessible buttons and inputs
- Mobile-friendly

DEPLOYMENT TO RENDER (must include all of this)
- Provide a render.yaml that deploys the Next.js app as a Web Service
- Include scripts in package.json:
  - dev, build, start
- Ensure Next is built and started correctly on Render
- Include a README with:
  - local run instructions
  - how to deploy to Render using the render.yaml
  - environment variables (should be none required)

OUTPUT FORMAT
- Return the complete repository structure with all key files and their contents.
- Include:
  - package.json
  - next.config.js (if needed)
  - tailwind config + globals
  - app router pages
  - render.yaml
  - README.md
- The app must run locally with:
  - npm install
  - npm run dev
- And run production with:
  - npm run build
  - npm start

IMPORTANT CONSTRAINTS
- Do not use a database.
- Do not use Stripe or real payments.
- Do not omit cart persistence.
- Ensure all links and routes work.
- Keep code clean and readable with comments where helpful.
