import React, { useState, useMemo } from 'react';
import { ShoppingCart, Search, Heart, Star, Menu, X, Filter, ChevronDown, Truck, Shield, RotateCcw, Sparkles, TrendingUp, Award, Zap, Crown, Gift } from 'lucide-react';

// Expanded fake product data with many more categories and items
const products = [
  // TOPS
  {
    id: 1,
    name: "Vintage Band T-Shirt",
    price: 34.99,
    originalPrice: 44.99,
    category: "tops",
    subcategory: "t-shirts",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
    rating: 4.5,
    reviews: 328,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Gray", "Navy"],
    description: "Authentic vintage-inspired band tee with soft cotton blend.",
    trending: true
  },
  {
    id: 2,
    name: "Silk Button-Up Blouse",
    price: 89.99,
    originalPrice: 119.99,
    category: "tops",
    subcategory: "blouses",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop",
    rating: 4.8,
    reviews: 156,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Ivory", "Blush", "Navy", "Black"],
    description: "Luxurious silk blouse perfect for office or evening wear."
  },
  {
    id: 3,
    name: "Cashmere Turtleneck",
    price: 179.99,
    originalPrice: 249.99,
    category: "tops",
    subcategory: "sweaters",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=500&fit=crop",
    rating: 4.9,
    reviews: 94,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Cream", "Black", "Camel", "Burgundy"],
    description: "Premium 100% cashmere turtleneck for ultimate luxury and warmth.",
    featured: true
  },
  
  // BOTTOMS
  {
    id: 4,
    name: "High-Rise Skinny Jeans",
    price: 79.99,
    originalPrice: 99.99,
    category: "bottoms",
    subcategory: "jeans",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop",
    rating: 4.6,
    reviews: 542,
    sizes: ["24", "26", "28", "30", "32", "34", "36"],
    colors: ["Dark Wash", "Light Wash", "Black", "White"],
    description: "Flattering high-rise skinny jeans with stretch technology."
  },
  {
    id: 5,
    name: "Pleated Midi Skirt",
    price: 69.99,
    originalPrice: 89.99,
    category: "bottoms",
    subcategory: "skirts",
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a13804?w=400&h=500&fit=crop",
    rating: 4.4,
    reviews: 234,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Navy", "Black", "Emerald", "Burgundy"],
    description: "Elegant pleated midi skirt with timeless A-line silhouette."
  },
  {
    id: 6,
    name: "Wide-Leg Trousers",
    price: 94.99,
    originalPrice: 124.99,
    category: "bottoms",
    subcategory: "pants",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop",
    rating: 4.7,
    reviews: 189,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Charcoal", "Camel"],
    description: "Sophisticated wide-leg trousers for professional and casual wear."
  },

  // DRESSES
  {
    id: 7,
    name: "Silk Maxi Dress",
    price: 159.99,
    originalPrice: 199.99,
    category: "dresses",
    subcategory: "maxi",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop",
    rating: 4.8,
    reviews: 289,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Navy", "Burgundy", "Emerald", "Black"],
    description: "Flowing silk maxi dress perfect for special occasions.",
    featured: true
  },
  {
    id: 8,
    name: "Summer Floral Dress",
    price: 69.99,
    originalPrice: 89.99,
    category: "dresses",
    subcategory: "casual",
    image: "https://images.unsplash.com/photo-1566479179817-c0f5b5ec04f4?w=400&h=500&fit=crop",
    rating: 4.4,
    reviews: 356,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Pink Floral", "Blue Floral", "Yellow Floral"],
    description: "Light and breezy floral dress perfect for summer days.",
    trending: true
  },
  {
    id: 9,
    name: "Little Black Dress",
    price: 129.99,
    originalPrice: 169.99,
    category: "dresses",
    subcategory: "cocktail",
    image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400&h=500&fit=crop",
    rating: 4.9,
    reviews: 423,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black"],
    description: "Classic little black dress - a timeless wardrobe essential."
  },

  // OUTERWEAR
  {
    id: 10,
    name: "Classic Denim Jacket",
    price: 89.99,
    originalPrice: 119.99,
    category: "outerwear",
    subcategory: "jackets",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=500&fit=crop",
    rating: 4.5,
    reviews: 428,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Classic Blue", "Black", "White", "Light Wash"],
    description: "Premium denim jacket with classic fit and timeless style."
  },
  {
    id: 11,
    name: "Wool Peacoat",
    price: 249.99,
    originalPrice: 329.99,
    category: "outerwear",
    subcategory: "coats",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop",
    rating: 4.7,
    reviews: 167,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Navy", "Black", "Charcoal", "Camel"],
    description: "Double-breasted wool peacoat for sophisticated winter style."
  },
  {
    id: 12,
    name: "Puffer Jacket",
    price: 159.99,
    originalPrice: 199.99,
    category: "outerwear",
    subcategory: "jackets",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop",
    rating: 4.6,
    reviews: 298,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "Olive", "Burgundy"],
    description: "Warm and stylish puffer jacket with premium down filling."
  },

  // ACTIVEWEAR
  {
    id: 13,
    name: "Yoga Leggings",
    price: 54.99,
    originalPrice: 74.99,
    category: "activewear",
    subcategory: "bottoms",
    image: "https://images.unsplash.com/photo-1506629905607-45bc3682580b?w=400&h=500&fit=crop",
    rating: 4.8,
    reviews: 689,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Gray", "Purple", "Pink"],
    description: "High-performance yoga leggings with moisture-wicking fabric.",
    trending: true
  },
  {
    id: 14,
    name: "Sports Bra",
    price: 39.99,
    originalPrice: 54.99,
    category: "activewear",
    subcategory: "tops",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop",
    rating: 4.5,
    reviews: 456,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "White", "Pink", "Purple", "Mint"],
    description: "Supportive sports bra with medium support for all activities."
  },
  {
    id: 15,
    name: "Running Shorts",
    price: 34.99,
    originalPrice: 44.99,
    category: "activewear",
    subcategory: "bottoms",
    image: "https://images.unsplash.com/photo-1506629905607-45bc3682580b?w=400&h=500&fit=crop",
    rating: 4.3,
    reviews: 234,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Gray", "Pink"],
    description: "Lightweight running shorts with built-in compression shorts."
  },

  // SHOES
  {
    id: 16,
    name: "White Leather Sneakers",
    price: 129.99,
    originalPrice: 159.99,
    category: "shoes",
    subcategory: "sneakers",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop",
    rating: 4.7,
    reviews: 567,
    sizes: ["5", "6", "7", "8", "9", "10", "11", "12"],
    colors: ["White", "Black", "Gray"],
    description: "Classic white leather sneakers for everyday style.",
    featured: true
  },
  {
    id: 17,
    name: "High Heel Pumps",
    price: 149.99,
    originalPrice: 189.99,
    category: "shoes",
    subcategory: "heels",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=500&fit=crop",
    rating: 4.4,
    reviews: 289,
    sizes: ["5", "6", "7", "8", "9", "10", "11"],
    colors: ["Black", "Nude", "Red", "Navy"],
    description: "Elegant pointed-toe pumps with 3-inch heel."
  },
  {
    id: 18,
    name: "Combat Boots",
    price: 179.99,
    originalPrice: 219.99,
    category: "shoes",
    subcategory: "boots",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=500&fit=crop",
    rating: 4.6,
    reviews: 345,
    sizes: ["5", "6", "7", "8", "9", "10", "11"],
    colors: ["Black", "Brown", "Olive"],
    description: "Durable combat boots with premium leather construction."
  },

  // ACCESSORIES
  {
    id: 19,
    name: "Silk Scarf",
    price: 79.99,
    originalPrice: 99.99,
    category: "accessories",
    subcategory: "scarves",
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=500&fit=crop",
    rating: 4.8,
    reviews: 156,
    sizes: ["One Size"],
    colors: ["Navy Print", "Pink Print", "Black Print", "Gold Print"],
    description: "Luxurious silk scarf with designer print pattern."
  },
  {
    id: 20,
    name: "Leather Handbag",
    price: 299.99,
    originalPrice: 399.99,
    category: "accessories",
    subcategory: "bags",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop",
    rating: 4.9,
    reviews: 234,
    sizes: ["One Size"],
    colors: ["Black", "Brown", "Tan", "Navy"],
    description: "Premium leather handbag with adjustable strap and multiple compartments.",
    featured: true
  },
  {
    id: 21,
    name: "Statement Necklace",
    price: 89.99,
    originalPrice: 119.99,
    category: "accessories",
    subcategory: "jewelry",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=500&fit=crop",
    rating: 4.5,
    reviews: 178,
    sizes: ["One Size"],
    colors: ["Gold", "Silver", "Rose Gold"],
    description: "Bold statement necklace to elevate any outfit."
  },

  // SWIMWEAR
  {
    id: 22,
    name: "One-Piece Swimsuit",
    price: 89.99,
    originalPrice: 119.99,
    category: "swimwear",
    subcategory: "one-piece",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=500&fit=crop",
    rating: 4.6,
    reviews: 267,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Red", "Emerald"],
    description: "Flattering one-piece swimsuit with supportive design."
  },
  {
    id: 23,
    name: "Bikini Set",
    price: 69.99,
    originalPrice: 89.99,
    category: "swimwear",
    subcategory: "bikini",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=500&fit=crop",
    rating: 4.3,
    reviews: 189,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "White", "Pink", "Blue"],
    description: "Two-piece bikini set with adjustable straps and removable padding."
  },

  // LINGERIE
  {
    id: 24,
    name: "Lace Bralette",
    price: 44.99,
    originalPrice: 59.99,
    category: "lingerie",
    subcategory: "bras",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop",
    rating: 4.7,
    reviews: 345,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "White", "Nude", "Pink"],
    description: "Delicate lace bralette with wireless comfort and romantic design."
  },
  {
    id: 25,
    name: "Silk Pajama Set",
    price: 149.99,
    originalPrice: 199.99,
    category: "lingerie",
    subcategory: "sleepwear",
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=500&fit=crop",
    rating: 4.8,
    reviews: 156,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Blush", "Navy", "Ivory", "Black"],
    description: "Luxurious silk pajama set with button-up top and matching pants."
  }
];

const categories = [
  "all", "tops", "bottoms", "dresses", "outerwear", "activewear", "shoes", "accessories", "swimwear", "lingerie"
];

const ClothingStore = () => {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [wishlist, setWishlist] = useState([]);
  const [showNewsletter, setShowNewsletter] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => b.id - a.id);
        break;
      case "featured":
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          if (a.trending && !b.trending) return -1;
          if (!a.trending && b.trending) return 1;
          return 0;
        });
        break;
      default:
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  // Get featured and trending products
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);
  const trendingProducts = products.filter(p => p.trending).slice(0, 4);

  const addToCart = (product, size = product.sizes[0], color = product.colors[0]) => {
    const existingItem = cart.find(item => 
      item.id === product.id && item.size === size && item.color === color
    );

    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id && item.size === size && item.color === color
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, size, color, quantity: 1 }]);
    }
  };

  const removeFromCart = (id, size, color) => {
    setCart(cart.filter(item => !(item.id === id && item.size === size && item.color === color)));
  };

  const updateQuantity = (id, size, color, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(id, size, color);
    } else {
      setCart(cart.map(item =>
        item.id === id && item.size === size && item.color === color
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Header Component
  const Header = () => (
    <header className="bg-white/95 backdrop-blur-lg shadow-xl sticky top-0 z-50 border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-14 sm:h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="relative">
              <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 animate-pulse" />
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-gold-400 absolute -top-1 -right-1 animate-bounce" />
            </div>
            <h1 className="text-lg sm:text-xl lg:text-3xl font-black bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent">
              StyleHub
            </h1>
            <div className="hidden sm:block">
              <span className="text-xs lg:text-sm bg-gradient-to-r from-gold-400 to-yellow-500 bg-clip-text text-transparent font-bold">LUXURY</span>
            </div>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden xl:flex space-x-1 lg:space-x-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`capitalize px-2 lg:px-4 py-1.5 lg:py-2 rounded-xl transition-all duration-300 text-sm lg:text-base font-medium ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg transform scale-105"
                    : "text-gray-700 hover:text-purple-600 hover:bg-purple-50 hover:scale-105"
                }`}
              >
                {category === "all" ? "All" : category}
              </button>
            ))}
          </nav>

          {/* Search and Actions - Responsive */}
          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
            {/* Search - Hidden on very small screens */}
            <div className="hidden sm:block relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-32 md:w-48 lg:w-64 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all bg-white/80 backdrop-blur text-sm lg:text-base"
              />
            </div>
            
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 lg:p-3 text-gray-700 hover:text-purple-600 transition-all duration-300 hover:scale-110 bg-purple-50 rounded-xl hover:bg-purple-100"
            >
              <ShoppingCart className="w-5 h-5 lg:w-6 lg:h-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 lg:w-6 lg:h-6 flex items-center justify-center animate-bounce font-bold">
                  {getTotalItems()}
                </span>
              )}
            </button>

            {/* VIP Club - Hidden on small screens */}
            <button
              onClick={() => setShowNewsletter(true)}
              className="hidden md:block bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 text-white px-3 lg:px-6 py-2 lg:py-3 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 font-bold text-sm lg:text-base shadow-lg"
            >
              <Crown className="w-4 h-4 inline mr-1 lg:mr-2" />
              VIP
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 text-gray-700 hover:text-purple-600 transition-all hover:scale-110 bg-purple-50 rounded-xl hover:bg-purple-100"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 lg:w-6 lg:h-6" /> : <Menu className="w-5 h-5 lg:w-6 lg:h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="xl:hidden py-4 border-t border-purple-100 bg-white/95 backdrop-blur-lg">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <div className="sm:hidden relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all bg-white/80 backdrop-blur"
                />
              </div>
              
              {/* Cart and VIP for mobile */}
              <div className="flex justify-between items-center sm:justify-start sm:space-x-4">
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="flex items-center space-x-2 p-3 text-gray-700 hover:text-purple-600 transition-all bg-purple-50 rounded-xl hover:bg-purple-100"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="font-medium">Cart ({getTotalItems()})</span>
                </button>
                
                <button
                  onClick={() => setShowNewsletter(true)}
                  className="md:hidden bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-3 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all font-bold flex items-center space-x-1"
                >
                  <Crown className="w-4 h-4" />
                  <span>VIP Club</span>
                </button>
              </div>

              {/* Category Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-center capitalize p-3 rounded-xl transition-all font-medium ${
                      selectedCategory === category 
                        ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg" 
                        : "text-gray-700 hover:bg-purple-50 hover:text-purple-600 bg-white"
                    }`}
                  >
                    {category === "all" ? "All" : category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );

  // Product Card Component
  const ProductCard = ({ product, size = "normal" }) => (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group border border-purple-100">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full object-cover cursor-pointer transition-transform duration-700 group-hover:scale-110 ${
            size === "large" ? "h-64 sm:h-80 lg:h-96" : "h-48 sm:h-56 lg:h-64"
          }`}
          onClick={() => setSelectedProduct(product)}
        />
        
        {/* Wishlist Button */}
        <button
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
        >
          <Heart 
            className={`w-4 h-4 lg:w-5 lg:h-5 transition-colors ${
              wishlist.includes(product.id) ? "text-red-500 fill-current" : "text-gray-400 hover:text-red-400"
            }`} 
          />
        </button>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {product.originalPrice > product.price && (
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-bold shadow-lg animate-pulse">
              <Zap className="w-3 h-3 inline mr-1" />
              SALE
            </div>
          )}
          {product.featured && (
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-bold flex items-center space-x-1 shadow-lg">
              <Award className="w-3 h-3" />
              <span>FEATURED</span>
            </div>
          )}
          {product.trending && (
            <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-bold flex items-center space-x-1 shadow-lg">
              <TrendingUp className="w-3 h-3" />
              <span>HOT</span>
            </div>
          )}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-4 lg:p-6">
        <h3 className={`font-bold mb-2 cursor-pointer hover:text-purple-600 transition-colors line-clamp-2 ${
          size === "large" ? "text-lg lg:text-xl" : "text-base lg:text-lg"
        }`}
            onClick={() => setSelectedProduct(product)}>
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-3 h-3 lg:w-4 lg:h-4 ${
                  i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                }`} 
              />
            ))}
            <span className="ml-2 text-xs lg:text-sm text-gray-600 font-medium">
              {product.rating} ({product.reviews})
            </span>
          </div>
        </div>
        
        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className={`font-black text-gray-900 ${size === "large" ? "text-xl lg:text-2xl" : "text-lg lg:text-xl"}`}>
              ${product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm lg:text-base text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          {product.originalPrice > product.price && (
            <span className="text-green-600 font-bold text-xs lg:text-sm bg-green-50 px-2 py-1 rounded-full">
              Save ${(product.originalPrice - product.price).toFixed(2)}
            </span>
          )}
        </div>
        
        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 text-white py-2.5 lg:py-3 px-4 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all font-bold transform hover:scale-105 shadow-lg hover:shadow-xl text-sm lg:text-base"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );

  // Product Detail Modal
  const ProductDetailModal = ({ product, onClose }) => {
    const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);

    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 lg:p-4 z-50">
        <div className="bg-white rounded-2xl lg:rounded-3xl max-w-6xl w-full max-h-screen overflow-y-auto shadow-2xl">
          <div className="flex justify-between items-center p-4 lg:p-6 border-b border-purple-100">
            <h2 className="text-xl lg:text-3xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {product.name}
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
              <X className="w-6 h-6 lg:w-8 lg:h-8" />
            </button>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 p-4 lg:p-6">
            <div className="space-y-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-xl lg:rounded-2xl shadow-lg"
              />
            </div>
            
            <div className="space-y-4 lg:space-y-6">
              {/* Rating */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 lg:w-5 lg:h-5 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`} 
                    />
                  ))}
                  <span className="ml-2 text-sm lg:text-base text-gray-600 font-medium">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>
              
              {/* Price */}
              <div className="flex items-center space-x-4">
                <span className="text-2xl lg:text-4xl font-black text-gray-900">
                  ${product.price}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-lg lg:text-2xl text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              
              <p className="text-gray-600 text-sm lg:text-lg leading-relaxed">
                {product.description}
              </p>
              
              {/* Size Selection */}
              <div>
                <label className="block text-base lg:text-lg font-bold text-gray-700 mb-3">
                  Size
                </label>
                <div className="flex flex-wrap gap-2 lg:gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 lg:px-4 py-2 lg:py-3 border-2 rounded-lg lg:rounded-xl font-semibold transition-all text-sm lg:text-base ${
                        selectedSize === size
                          ? "border-purple-600 bg-purple-50 text-purple-600 shadow-lg"
                          : "border-gray-300 hover:border-purple-400 hover:bg-purple-50"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Color Selection */}
              <div>
                <label className="block text-base lg:text-lg font-bold text-gray-700 mb-3">
                  Color
                </label>
                <div className="flex flex-wrap gap-2 lg:gap-3">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 lg:px-4 py-2 lg:py-3 border-2 rounded-lg lg:rounded-xl font-semibold transition-all text-sm lg:text-base ${
                        selectedColor === color
                          ? "border-purple-600 bg-purple-50 text-purple-600 shadow-lg"
                          : "border-gray-300 hover:border-purple-400 hover:bg-purple-50"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Add to Cart Button */}
              <button
                onClick={() => {
                  addToCart(product, selectedSize, selectedColor);
                  onClose();
                }}
                className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 text-white py-3 lg:py-4 px-6 lg:px-8 rounded-xl lg:rounded-2xl hover:from-purple-700 hover:to-blue-700 transition-all font-bold text-lg lg:text-xl transform hover:scale-105 shadow-xl"
              >
                Add to Cart - ${product.price}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Shopping Cart Sidebar
  const CartSidebar = () => (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50">
      <div className="absolute right-0 top-0 h-full w-full max-w-sm lg:max-w-md bg-white shadow-2xl">
        <div className="flex justify-between items-center p-4 lg:p-6 border-b border-purple-100 bg-gradient-to-r from-purple-50 to-blue-50">
          <h2 className="text-lg lg:text-2xl font-black text-gray-900">
            Shopping Cart ({getTotalItems()})
          </h2>
          <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-gray-700 transition-colors">
            <X className="w-6 h-6 lg:w-7 lg:h-7" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 lg:p-6 h-[calc(100vh-200px)]">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 lg:w-20 lg:h-20 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg lg:text-xl font-medium">Your cart is empty</p>
              <p className="text-gray-400 text-sm lg:text-base">Add some amazing items to get started!</p>
            </div>
          ) : (
            <div className="space-y-4 lg:space-y-6">
              {cart.map((item, index) => (
                <div key={`${item.id}-${item.size}-${item.color}-${index}`} 
                     className="flex items-center space-x-3 lg:space-x-4 bg-gradient-to-r from-purple-50 to-blue-50 p-3 lg:p-4 rounded-xl lg:rounded-2xl border border-purple-100">
                  <img src={item.image} alt={item.name} className="w-16 h-16 lg:w-20 lg:h-20 object-cover rounded-lg lg:rounded-xl" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm lg:text-base text-gray-900 line-clamp-2">
                      {item.name}
                    </h4>
                    <p className="text-xs lg:text-sm text-gray-500 font-medium">
                      {item.size} • {item.color}
                    </p>
                    <p className="font-black text-base lg:text-lg text-purple-600">
                      ${item.price}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 lg:space-x-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                      className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center hover:bg-purple-200 font-bold transition-all hover:scale-110"
                    >
                      -
                    </button>
                    <span className="w-6 lg:w-8 text-center font-bold text-sm lg:text-base">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                      className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center hover:bg-purple-200 font-bold transition-all hover:scale-110"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {cart.length > 0 && (
          <div className="border-t border-purple-100 p-4 lg:p-6 space-y-4 bg-gradient-to-r from-purple-50 to-blue-50">
            <div className="flex justify-between items-center text-xl lg:text-2xl font-black text-gray-900">
              <span>Total: ${getTotalPrice().toFixed(2)}</span>
            </div>
            <button className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 text-white py-3 lg:py-4 px-6 rounded-xl lg:rounded-2xl hover:from-purple-700 hover:to-blue-700 transition-all font-bold text-base lg:text-xl shadow-xl transform hover:scale-105">
              Proceed to Checkout
            </button>
            <div className="flex items-center justify-center space-x-4 lg:space-x-6 text-xs lg:text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Truck className="w-3 h-3 lg:w-4 lg:h-4" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="w-3 h-3 lg:w-4 lg:h-4" />
                <span>Secure</span>
              </div>
              <div className="flex items-center space-x-1">
                <RotateCcw className="w-3 h-3 lg:w-4 lg:h-4" />
                <span>Easy Returns</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Header />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-purple-600 via-pink-500 to-blue-600 text-white py-12 sm:py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 lg:mb-8">
            <Crown className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto text-gold-300 animate-bounce" />
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-7xl xl:text-8xl font-black mb-4 lg:mb-6 animate-pulse leading-tight">
            Discover Your Style
            <span className="block bg-gradient-to-r from-gold-300 to-yellow-200 bg-clip-text text-transparent">
              Universe
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-2xl xl:text-3xl mb-6 lg:mb-8 opacity-90 max-w-4xl mx-auto leading-relaxed">
            Premium fashion for every moment, every mood, every you
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
            <button 
              onClick={() => setSelectedCategory("all")}
              className="bg-white text-purple-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base lg:text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
              Explore Collection
            </button>
            <button 
              onClick={() => setSelectedCategory("activewear")}
              className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base lg:text-lg hover:bg-white hover:text-purple-600 transition-all transform hover:scale-105 backdrop-blur-sm"
            >
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
              Shop Activewear
            </button>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="text-center mb-8 lg:mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 rounded-full mb-4">
              <Award className="w-5 h-5 text-purple-600" />
              <span className="text-purple-700 font-bold text-sm lg:text-base">FEATURED COLLECTION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Hand-Picked Favorites
            </h2>
            <p className="text-base lg:text-xl text-gray-600 max-w-2xl mx-auto">
              Discover luxury pieces that define contemporary fashion and timeless elegance
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

      {/* Trending Products Section */}
      {trendingProducts.length > 0 && (
        <div className="bg-gradient-to-r from-orange-50 via-yellow-50 to-pink-50 py-12 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 lg:mb-16">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-yellow-100 px-4 py-2 rounded-full mb-4">
                <TrendingUp className="w-5 h-5 text-orange-600" />
                <span className="text-orange-700 font-bold text-sm lg:text-base">TRENDING NOW</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black mb-4 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                What's Hot Right Now
              </h2>
              <p className="text-base lg:text-xl text-gray-600 max-w-2xl mx-auto">
                The most coveted pieces that everyone's talking about this season
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {trendingProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 lg:mb-16 space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {selectedCategory === "all" ? "All Products" : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
            </h2>
            <p className="text-sm lg:text-base text-gray-600">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </p>
          </div>
          
          <div className="flex items-center space-x-3 lg:space-x-4">
            <Filter className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border-2 border-purple-200 rounded-xl px-3 lg:px-4 py-2 lg:py-3 focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all text-sm lg:text-base font-medium bg-white shadow-lg"
            >
              <option value="featured">Featured First</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Product Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 lg:py-24">
            <div className="mb-6">
              <Search className="w-16 h-16 lg:w-24 lg:h-24 text-gray-300 mx-auto" />
            </div>
            <p className="text-gray-500 text-xl lg:text-2xl font-bold mb-4">No products found</p>
            <p className="text-gray-400 text-sm lg:text-lg">Try adjusting your search or browse other categories</p>
          </div>
        )}
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-r from-purple-900 via-pink-900 to-blue-900 text-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 lg:mb-8">
            <Crown className="w-12 h-12 lg:w-16 lg:h-16 mx-auto text-gold-300 animate-bounce" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black mb-4 lg:mb-6">
            Join the StyleHub 
            <span className="block bg-gradient-to-r from-gold-300 to-yellow-200 bg-clip-text text-transparent">
              VIP Club
            </span>
          </h2>
          <p className="text-base lg:text-xl mb-6 lg:mb-8 opacity-90 max-w-2xl mx-auto">
            Get exclusive access to new collections, special discounts, and personalized style tips
          </p>
          <div className="flex flex-col sm:flex-row max-w-lg mx-auto gap-3 sm:gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 lg:px-6 py-3 lg:py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-purple-300 text-sm lg:text-base font-medium"
            />
            <button className="bg-white text-purple-600 px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-bold hover:bg-gray-100 transition-all transform hover:scale-105 text-sm lg:text-base shadow-xl">
              <Gift className="w-4 h-4 inline mr-2" />
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-3 mb-4 lg:mb-6">
                <Crown className="w-6 h-6 lg:w-8 lg:h-8 text-purple-400" />
                <h3 className="text-xl lg:text-2xl font-black bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  StyleHub
                </h3>
              </div>
              <p className="text-gray-400 text-sm lg:text-base leading-relaxed">
                Where fashion meets passion. Discover your unique style with our curated collection of premium clothing and accessories.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-base lg:text-lg mb-4 lg:mb-6 text-white">Shop</h4>
              <ul className="space-y-2 lg:space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors text-sm lg:text-base hover:underline">New Arrivals</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm lg:text-base hover:underline">Sale</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm lg:text-base hover:underline">Gift Cards</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm lg:text-base hover:underline">Size Guide</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-base lg:text-lg mb-4 lg:mb-6 text-white">Support</h4>
              <ul className="space-y-2 lg:space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors text-sm lg:text-base hover:underline">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm lg:text-base hover:underline">Returns & Exchanges</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm lg:text-base hover:underline">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm lg:text-base hover:underline">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-base lg:text-lg mb-4 lg:mb-6 text-white">Connect</h4>
              <ul className="space-y-2 lg:space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors text-sm lg:text-base hover:underline">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm lg:text-base hover:underline">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm lg:text-base hover:underline">TikTok</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm lg:text-base hover:underline">Pinterest</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 lg:mt-16 pt-6 lg:pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
              <p className="text-gray-400 text-sm lg:text-base text-center lg:text-left">
                &copy; 2025 StyleHub. All rights reserved.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-8 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4" />
                  <span className="text-xs lg:text-sm">Free Shipping Over $100</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span className="text-xs lg:text-sm">Secure Checkout</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RotateCcw className="w-4 h-4" />
                  <span className="text-xs lg:text-sm">30-Day Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {isCartOpen && <CartSidebar />}
    </div>
  );
};

export default ClothingStore;