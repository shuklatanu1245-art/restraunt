export const restaurantConfig = {
  name: "Taste Bite",
  tagline: "Savor the Fusion of Flavors & Convenience",
  phone: "+91 87702 32663",
  whatsapp: "+918770232663",
  email: "hello@tastebite.com",
  address: "Maharaja Complex DD Nagar Gwalior",
  upiId: "tastebite@ybl",
  openingHours: [
    { days: "Mon - Thu", hours: "11:00 AM - 10:00 PM" },
    { days: "Fri - Sun", hours: "11:00 AM - 11:30 PM" }
  ],
  gallery: [
    {
      id: 1,
      title: "Cozy Dining Area",
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800",
      description: "Warm lighting and elegant seating for a memorable meal."
    },
    {
      id: 2,
      title: "Signature Pasta",
      url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800",
      description: "Our famous hand-tossed pasta served fresh."
    },
    {
      id: 3,
      title: "Refreshing Drinks",
      url: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800",
      description: "Chilled mocktails and traditional chais brewed to order."
    },
    {
      id: 4,
      title: "Wood-Fired Oven",
      url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800",
      description: "Where the magic happens for our crispy pizzas."
    }
  ]
};

export const menuCategories = ["All", "Beverages", "Snacks", "Main Course"];

export const menuItems = [
  {
    id: "cold-coffee",
    name: "Cold Coffee",
    price: 150,
    category: "Beverages",
    description: "Rich, creamy blended iced coffee topped with a scoop of premium vanilla ice cream and chocolate syrup.",
    image: "https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&q=80&w=800",
    popular: true
  },
  {
    id: "mojito",
    name: "Mojito",
    price: 149,
    category: "Beverages",
    description: "A cool and refreshing mocktail made with fresh lime juice, crushed mint, sugar, soda, and ice.",
    image: "https://images.unsplash.com/photo-1575444758702-4a6b9222336e?auto=format&fit=crop&q=80&w=800",
    popular: false
  },
  {
    id: "adrak-chai",
    name: "Adrak Chai",
    price: 29,
    category: "Beverages",
    description: "Freshly brewed strong Indian milk tea infused with aromatic crushed ginger roots.",
    image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cdd9?auto=format&fit=crop&q=80&w=800",
    popular: true
  },
  {
    id: "gulab-chai",
    name: "Gulab Chai",
    price: 39,
    category: "Beverages",
    description: "Premium milk tea infused with dried pink rose petals for a soothing, aromatic floral note.",
    image: "https://images.unsplash.com/photo-1563887040228-403b55e90d8b?auto=format&fit=crop&q=80&w=800",
    popular: false
  },
  {
    id: "cold-drink",
    name: "Cold Drink",
    price: 40,
    category: "Beverages",
    description: "Chilled carbonated soft drink served over ice to quench your thirst.",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800",
    popular: false
  },
  {
    id: "pizza",
    name: "Pizza",
    price: 199,
    category: "Main Course",
    description: "Classic Italian wood-fired pizza with a crispy thin crust, melted mozzarella cheese, and tangy tomato sauce.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800",
    popular: true
  },
  {
    id: "burger",
    name: "Burger",
    price: 129,
    category: "Snacks",
    description: "Delicious veggie patty burger stacked with crisp lettuce, sliced tomato, onions, and special chef sauce.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800",
    popular: true
  },
  {
    id: "garlic-bread",
    name: "Garlic Bread",
    price: 139,
    category: "Snacks",
    description: "Perfectly baked warm bread slices brushed with garlic-herb butter and toasted with gooey mozzarella.",
    image: "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?auto=format&fit=crop&q=80&w=800",
    popular: false
  },
  {
    id: "pasta",
    name: "Pasta",
    price: 149,
    category: "Main Course",
    description: "Penne pasta cooked in an authentic creamy pink sauce, garnished with Italian herbs and fresh parmesan.",
    image: "https://images.unsplash.com/photo-1621961424411-98546376988d?auto=format&fit=crop&q=80&w=800",
    popular: false
  },
  {
    id: "sandwich",
    name: "Sandwich",
    price: 99,
    category: "Snacks",
    description: "A freshly prepared grilled club sandwich stuffed with seasonal vegetables, cheese, and house spreads.",
    image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&q=80&w=800",
    popular: true
  },
  {
    id: "fries",
    name: "Fries",
    price: 89,
    category: "Snacks",
    description: "Crispy, golden-brown salted French fries, hot and served with tangy tomato ketchup.",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=800",
    popular: false
  },
  {
    id: "chips",
    name: "Chips",
    price: 49,
    category: "Snacks",
    description: "Thinly sliced crispy salted potato chips, perfect for quick munching.",
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&q=80&w=800",
    popular: false
  },
  {
    id: "maggi",
    name: "Maggi",
    price: 59,
    category: "Snacks",
    description: "Classic hot masala instant noodles cooked with chopped fresh vegetables and spices.",
    image: "https://images.unsplash.com/photo-1612966608967-312ba599102e?auto=format&fit=crop&q=80&w=800",
    popular: true
  },
  {
    id: "dosa",
    name: "Masala Dosa",
    price: 119,
    category: "Main Course",
    description: "Crispy, golden-brown fermented rice crepe stuffed with spiced potato mash, served with sambar and coconut chutney.",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=800",
    popular: true
  },
  {
    id: "idli",
    name: "Idli Sambar",
    price: 69,
    category: "Main Course",
    description: "Soft, fluffy steamed rice cakes served hot with flavourful vegetable sambar and fresh coconut chutney.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=800",
    popular: false
  },
  {
    id: "vada",
    name: "Medu Vada",
    price: 79,
    category: "Main Course",
    description: "Crispy-on-the-outside, soft-on-the-inside deep fried lentil fritters served with sambar and spicy chutneys.",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=800",
    popular: false
  }
];
