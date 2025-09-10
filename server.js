const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve your HTML file from public folder

// Database simulation (In production, use MongoDB, PostgreSQL, etc.)
let products = [
    {
        id: 1,
        name: "MacBook Pro M3",
        description: "Latest Apple MacBook Pro with M3 chip, 16GB RAM, 512GB SSD. Perfect for developers and creatives with exceptional performance.",
        category: "Laptops",
        price: 2299.99,
        seller: "TechStore Pro",
        sellerId: 1,
        icon: "💻",
        stock: 15,
        createdAt: new Date('2025-08-01'),
        updatedAt: new Date('2025-08-28')
    },
    {
        id: 2,
        name: "iPhone 15 Pro Max",
        description: "Revolutionary iPhone 15 Pro Max with titanium design, A17 Pro chip, and advanced camera system with 5x optical zoom.",
        category: "Smartphones",
        price: 1199.99,
        seller: "Mobile World",
        sellerId: 2,
        icon: "📱",
        stock: 28,
        createdAt: new Date('2025-08-02'),
        updatedAt: new Date('2025-08-29')
    },
    {
        id: 3,
        name: "Gaming Desktop RTX 4080",
        description: "Ultimate gaming desktop with RTX 4080, Intel i7-13700K, 32GB DDR5 RAM, 2TB NVMe SSD. Built for 4K gaming.",
        category: "Desktops",
        price: 3299.99,
        seller: "Gaming Central",
        sellerId: 3,
        icon: "🖥️",
        stock: 8,
        createdAt: new Date('2025-08-03'),
        updatedAt: new Date('2025-08-30')
    },
    {
        id: 4,
        name: "iPad Pro 12.9\"",
        description: "Powerful iPad Pro with M2 chip, 12.9-inch Liquid Retina XDR display, perfect for professional creative work.",
        category: "Tablets",
        price: 1099.99,
        seller: "Apple Store",
        sellerId: 1,
        icon: "📱",
        stock: 22,
        createdAt: new Date('2025-08-04'),
        updatedAt: new Date('2025-08-27')
    },
    {
        id: 5,
        name: "Samsung 32\" 4K Monitor",
        description: "Professional 32-inch 4K UHD monitor with HDR10 support, perfect for content creation and productivity work.",
        category: "Monitors",
        price: 599.99,
        seller: "Display Pro",
        sellerId: 4,
        icon: "🖥️",
        stock: 35,
        createdAt: new Date('2025-08-05'),
        updatedAt: new Date('2025-08-26')
    },
    {
        id: 6,
        name: "Sony WH-1000XM5",
        description: "Industry-leading noise canceling wireless headphones with 30-hour battery life and crystal-clear audio.",
        category: "Audio",
        price: 399.99,
        seller: "Audio Tech",
        sellerId: 5,
        icon: "🎧",
        stock: 42,
        createdAt: new Date('2025-08-06'),
        updatedAt: new Date('2025-08-25')
    }
];

let sellers = [
    {
        id: 1,
        name: "TechStore Pro",
        location: "New York, NY",
        contact: "contact@techstorepro.com",
        rating: 4.9,
        totalSales: 2847,
        icon: "🏪",
        joinDate: "2022-01-15",
        verified: true
    },
    {
        id: 2,
        name: "Mobile World",
        location: "Los Angeles, CA",
        contact: "info@mobileworld.com",
        rating: 4.7,
        totalSales: 1923,
        icon: "📱",
        joinDate: "2022-03-20",
        verified: true
    },
    {
        id: 3,
        name: "Gaming Central",
        location: "Austin, TX",
        contact: "support@gamingcentral.com",
        rating: 4.8,
        totalSales: 1456,
        icon: "🎮",
        joinDate: "2022-05-10",
        verified: true
    },
    {
        id: 4,
        name: "Display Pro",
        location: "Seattle, WA",
        contact: "sales@displaypro.com",
        rating: 4.6,
        totalSales: 892,
        icon: "🖥️",
        joinDate: "2022-08-05",
        verified: true
    },
    {
        id: 5,
        name: "Audio Tech",
        location: "Miami, FL",
        contact: "hello@audiotech.com",
        rating: 4.5,
        totalSales: 634,
        icon: "🎧",
        joinDate: "2022-11-12",
        verified: true
    }
];

let reviews = [
    {
        id: 1,
        productId: 1,
        productName: "MacBook Pro M3",
        reviewer: "John Smith",
        rating: 5,
        text: "Absolutely amazing laptop! The M3 chip is incredibly fast and the build quality is top-notch. Perfect for development work.",
        date: "2025-08-15",
        verified: true
    },
    {
        id: 2,
        productId: 2,
        productName: "iPhone 15 Pro Max",
        reviewer: "Sarah Johnson",
        rating: 5,
        text: "Best iPhone yet! The camera quality is phenomenal and the titanium build feels premium. Battery life is excellent.",
        date: "2025-08-20",
        verified: true
    },
    {
        id: 3,
        productId: 3,
        productName: "Gaming Desktop RTX 4080",
        reviewer: "Mike Chen",
        rating: 5,
        text: "This gaming PC is a beast! Runs all the latest games at 4K with maxed settings. Assembly was perfect and shipping was fast.",
        date: "2025-08-18",
        verified: true
    },
    {
        id: 4,
        productId: 4,
        productName: "iPad Pro 12.9\"",
        reviewer: "Emma Wilson",
        rating: 4,
        text: "Great tablet for digital art and productivity. The display is stunning and Apple Pencil support is flawless.",
        date: "2025-08-22",
        verified: true
    },
    {
        id: 5,
        productId: 5,
        productName: "Samsung 32\" 4K Monitor",
        reviewer: "David Brown",
        rating: 4,
        text: "Excellent monitor for the price. Colors are vibrant and the build quality is solid. Great for both work and entertainment.",
        date: "2025-08-25",
        verified: true
    },
    {
        id: 6,
        productId: 6,
        productName: "Sony WH-1000XM5",
        reviewer: "Lisa Garcia",
        rating: 5,
        text: "Outstanding headphones! Noise cancellation is incredible and the sound quality is audiophile-grade. Worth every penny.",
        date: "2025-08-28",
        verified: true
    }
];

// Helper functions
const findById = (array, id) => array.find(item => item.id === parseInt(id));
const findByProperty = (array, property, value) => array.filter(item => item[property] === value);
const getNextId = (array) => Math.max(...array.map(item => item.id), 0) + 1;

// API Routes

// Products Routes
app.get('/api/products', (req, res) => {
    const { category, seller, minPrice, maxPrice, search } = req.query;
    let filteredProducts = [...products];
    
    // Filter by category
    if (category) {
        filteredProducts = filteredProducts.filter(p => 
            p.category.toLowerCase() === category.toLowerCase()
        );
    }
    
    // Filter by seller
    if (seller) {
        filteredProducts = filteredProducts.filter(p => 
            p.seller.toLowerCase().includes(seller.toLowerCase())
        );
    }
    
    // Filter by price range
    if (minPrice) {
        filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
        filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(maxPrice));
    }
    
    // Search functionality
    if (search) {
        const searchTerm = search.toLowerCase();
        filteredProducts = filteredProducts.filter(p =>
            p.name.toLowerCase().includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm) ||
            p.category.toLowerCase().includes(searchTerm)
        );
    }
    
    res.json({
        success: true,
        count: filteredProducts.length,
        data: filteredProducts
    });
});

app.get('/api/products/:id', (req, res) => {
    const product = findById(products, req.params.id);
    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        });
    }
    res.json({
        success: true,
        data: product
    });
});

app.post('/api/products', (req, res) => {
    const { name, description, category, price, sellerId, icon, stock } = req.body;
    
    // Validation
    if (!name || !description || !category || !price || !sellerId) {
        return res.status(400).json({
            success: false,
            message: 'Name, description, category, price, and sellerId are required'
        });
    }
    
    // Check if seller exists
    const seller = findById(sellers, sellerId);
    if (!seller) {
        return res.status(400).json({
            success: false,
            message: 'Seller not found'
        });
    }
    
    const newProduct = {
        id: getNextId(products),
        name,
        description,
        category,
        price: parseFloat(price),
        seller: seller.name,
        sellerId: parseInt(sellerId),
        icon: icon || '📦',
        stock: parseInt(stock) || 0,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    
    products.push(newProduct);
    res.status(201).json({
        success: true,
        data: newProduct
    });
});

app.put('/api/products/:id', (req, res) => {
    const product = findById(products, req.params.id);
    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        });
    }
    
    const { name, description, category, price, icon, stock } = req.body;
    
    // Update product
    Object.assign(product, {
        ...(name && { name }),
        ...(description && { description }),
        ...(category && { category }),
        ...(price && { price: parseFloat(price) }),
        ...(icon && { icon }),
        ...(stock !== undefined && { stock: parseInt(stock) }),
        updatedAt: new Date()
    });
    
    res.json({
        success: true,
        data: product
    });
});

app.delete('/api/products/:id', (req, res) => {
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    if (productIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        });
    }
    
    products.splice(productIndex, 1);
    res.json({
        success: true,
        message: 'Product deleted successfully'
    });
});

// Sellers Routes
app.get('/api/sellers', (req, res) => {
    const { location, verified } = req.query;
    let filteredSellers = [...sellers];
    
    if (location) {
        filteredSellers = filteredSellers.filter(s => 
            s.location.toLowerCase().includes(location.toLowerCase())
        );
    }
    
    if (verified !== undefined) {
        filteredSellers = filteredSellers.filter(s => s.verified === (verified === 'true'));
    }
    
    res.json({
        success: true,
        count: filteredSellers.length,
        data: filteredSellers
    });
});

app.get('/api/sellers/:id', (req, res) => {
    const seller = findById(sellers, req.params.id);
    if (!seller) {
        return res.status(404).json({
            success: false,
            message: 'Seller not found'
        });
    }
    
    // Get seller's products
    const sellerProducts = findByProperty(products, 'sellerId', seller.id);
    
    res.json({
        success: true,
        data: {
            ...seller,
            products: sellerProducts
        }
    });
});

app.post('/api/sellers', (req, res) => {
    const { name, location, contact, icon } = req.body;
    
    if (!name || !location || !contact) {
        return res.status(400).json({
            success: false,
            message: 'Name, location, and contact are required'
        });
    }
    
    const newSeller = {
        id: getNextId(sellers),
        name,
        location,
        contact,
        rating: 0,
        totalSales: 0,
        icon: icon || '🏪',
        joinDate: new Date().toISOString().split('T')[0],
        verified: false
    };
    
    sellers.push(newSeller);
    res.status(201).json({
        success: true,
        data: newSeller
    });
});

// Reviews Routes
app.get('/api/reviews', (req, res) => {
    const { productId, verified } = req.query;
    let filteredReviews = [...reviews];
    
    if (productId) {
        filteredReviews = filteredReviews.filter(r => r.productId === parseInt(productId));
    }
    
    if (verified !== undefined) {
        filteredReviews = filteredReviews.filter(r => r.verified === (verified === 'true'));
    }
    
    res.json({
        success: true,
        count: filteredReviews.length,
        data: filteredReviews
    });
});

app.post('/api/reviews', (req, res) => {
    const { productId, reviewer, rating, text } = req.body;
    
    if (!productId || !reviewer || !rating || !text) {
        return res.status(400).json({
            success: false,
            message: 'ProductId, reviewer, rating, and text are required'
        });
    }
    
    // Check if product exists
    const product = findById(products, productId);
    if (!product) {
        return res.status(400).json({
            success: false,
            message: 'Product not found'
        });
    }
    
    const newReview = {
        id: getNextId(reviews),
        productId: parseInt(productId),
        productName: product.name,
        reviewer,
        rating: parseInt(rating),
        text,
        date: new Date().toISOString().split('T')[0],
        verified: false
    };
    
    reviews.push(newReview);
    res.status(201).json({
        success: true,
        data: newReview
    });
});

// Analytics Routes
app.get('/api/analytics/overview', (req, res) => {
    const totalProducts = products.length;
    const totalSellers = sellers.length;
    const totalReviews = reviews.length;
    const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
    
    const categories = [...new Set(products.map(p => p.category))].map(category => ({
        name: category,
        count: products.filter(p => p.category === category).length
    }));
    
    res.json({
        success: true,
        data: {
            totalProducts,
            totalSellers,
            totalReviews,
            averageRating: Math.round(avgRating * 100) / 100,
            categories,
            topSellers: sellers
                .sort((a, b) => b.totalSales - a.totalSales)
                .slice(0, 5)
        }
    });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'TechXChange API is running!',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'API endpoint not found'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 TechXChange API Server running on http://localhost:${PORT}`);
    console.log(`📋 API Documentation available at:`);
    console.log(`   Products: GET/POST/PUT/DELETE /api/products`);
    console.log(`   Sellers: GET/POST /api/sellers`);
    console.log(`   Reviews: GET/POST /api/reviews`);
    console.log(`   Analytics: GET /api/analytics/overview`);
    console.log(`   Health Check: GET /api/health`);
});

module.exports = app;