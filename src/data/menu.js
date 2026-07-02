export const restaurantConfig = {
  name: "QR Bites",
  tagline: "Savor the Fusion of Flavors & Convenience",
  phone: "+91 98765 43210",
  whatsapp: "+919876543210",
  email: "hello@qrbites.com",
  address: "12, Gourmet Street, Foodie Zone, Bengaluru, Karnataka 560001",
  upiId: "qrbites@ybl",
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
    description: "Classic creamy iced coffee blended with premium beans and vanilla ice cream.",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=600",
    popular: true
  },
  {
    id: "mojito",
    name: "Mojito",
    price: 149,
    category: "Beverages",
    description: "A refreshing blend of fresh mint leaves, lime juice, sparkling soda, and a touch of sweetness.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600",
    popular: false
  },
  {
    id: "adrak-chai",
    name: "Adrak Chai",
    price: 29,
    category: "Beverages",
    description: "Traditional hot milk tea infused with crushed fresh ginger to warm your soul.",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600",
    popular: true
  },
  {
    id: "gulab-chai",
    name: "Gulab Chai",
    price: 39,
    category: "Beverages",
    description: "Fragrant premium milk tea infused with dried rose petals for a floral sweet note.",
    image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cdd9?auto=format&fit=crop&q=80&w=600",
    popular: false
  },
  {
    id: "pizza",
    name: "Pizza",
    price: 199,
    category: "Main Course",
    description: "Wood-fired artisanal thin-crust pizza topped with rich marinara, fresh mozzarella, and herbs.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600",
    popular: true
  },
  {
    id: "burger",
    name: "Burger",
    price: 129,
    category: "Snacks",
    description: "Juicy house veg patty in a toasted brioche bun with cheddar, lettuce, tomato, and special sauce.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600",
    popular: true
  },
  {
    id: "garlic-bread",
    name: "Garlic Bread",
    price: 139,
    category: "Snacks",
    description: "Toasted baguette slices smeared with home-churned garlic butter and mozzarella cheese.",
    image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&q=80&w=600",
    popular: false
  },
  {
    id: "pasta",
    name: "Pasta",
    price: 149,
    category: "Main Course",
    description: "Penne pasta tossed in an appetizing, creamy pink sauce, garnish with parmesan and basil.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=600",
    popular: false
  }
];
