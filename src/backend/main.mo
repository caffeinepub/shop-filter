import Array "mo:core/Array";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Float "mo:core/Float";
import Iter "mo:core/Iter";
import MixinStorage "blob-storage/Mixin";

actor {
  include MixinStorage();

  type Product = {
    name : Text;
    description : Text;
    price : Float;
    category : Text;
    rating : Float;
    imageUrl : Text;
  };

  let products : [Product] = [
    {
      name = "Smartphone";
      description = "Latest model with advanced features";
      price = 999.99;
      category = "Electronics";
      rating = 4.5;
      imageUrl = "http://example.com/smartphone.jpg";
    },
    {
      name = "Running Shoes";
      description = "Comfortable and durable shoes for running";
      price = 79.99;
      category = "Fashion";
      rating = 4.2;
      imageUrl = "http://example.com/shoes.jpg";
    },
    {
      name = "Blender";
      description = "High-powered kitchen blender";
      price = 59.99;
      category = "Home Appliances";
      rating = 4.8;
      imageUrl = "http://example.com/blender.jpg";
    },
    {
      name = "Gaming Mouse";
      description = "Ergonomic mouse with customizable buttons";
      price = 49.99;
      category = "Electronics";
      rating = 4.7;
      imageUrl = "http://example.com/mouse.jpg";
    },
    {
      name = "Yoga Mat";
      description = "Eco-friendly non-slip mat";
      price = 29.99;
      category = "Sports";
      rating = 4.3;
      imageUrl = "http://example.com/yogamat.jpg";
    },
    {
      name = "Leather Wallet";
      description = "Premium quality wallet with multiple compartments";
      price = 39.99;
      category = "Fashion";
      rating = 4.0;
      imageUrl = "http://example.com/wallet.jpg";
    },
    {
      name = "Bluetooth Headphones";
      description = "Wireless headphones with noise cancellation";
      price = 119.99;
      category = "Electronics";
      rating = 4.6;
      imageUrl = "http://example.com/headphones.jpg";
    },
    {
      name = "Espresso Machine";
      description = "Compact home espresso maker";
      price = 149.99;
      category = "Home Appliances";
      rating = 4.9;
      imageUrl = "http://example.com/espresso.jpg";
    },
    {
      name = "Tennis Racket";
      description = "Lightweight racket for beginners";
      price = 69.99;
      category = "Sports";
      rating = 4.1;
      imageUrl = "http://example.com/racket.jpg";
    },
    {
      name = "Designer Sunglasses";
      description = "Stylish sunglasses with UV protection";
      price = 89.99;
      category = "Fashion";
      rating = 4.4;
      imageUrl = "http://example.com/sunglasses.jpg";
    },
  ];

  module Product {
    public func compareByPrice(a : Product, b : Product) : Order.Order {
      Float.compare(a.price, b.price);
    };

    public func compareByRating(a : Product, b : Product) : Order.Order {
      Float.compare(a.rating, b.rating);
    };
  };

  public query ({ caller }) func getProductsByCategory(category : Text) : async [Product] {
    products.filter(
      func(product) {
        product.category == category;
      }
    );
  };

  public query ({ caller }) func getProductsByPriceRange(minPrice : Float, maxPrice : Float) : async [Product] {
    products.filter(
      func(product) {
        product.price >= minPrice and product.price <= maxPrice
      }
    ).sort(Product.compareByPrice);
  };

  public query ({ caller }) func getProductsByRating(minRating : Float) : async [Product] {
    products.filter(
      func(product) {
        product.rating >= minRating
      }
    ).sort(Product.compareByRating);
  };
};
