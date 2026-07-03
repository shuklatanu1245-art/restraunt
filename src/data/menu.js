export const restaurantConfig = {
  name: "Taste Bite",
  tagline: "Savor the Fusion of Flavors & Convenience",
  phone: "+91 98765 43210",
  whatsapp: "+919876543210",
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
  }
];
