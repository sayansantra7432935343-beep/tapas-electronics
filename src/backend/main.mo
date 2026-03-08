import Array "mo:core/Array";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Map "mo:core/Map";

actor {
  type BusinessInfo = {
    name : Text;
    tagline : Text;
    contactNumbers : [Text];
  };

  type Product = {
    name : Text;
    description : Text;
    icon : Text;
  };

  module Product {
    public func compare(product1 : Product, product2 : Product) : Order.Order {
      Text.compare(product1.name, product2.name);
    };
  };

  let products = Map.empty<Text, Product>();

  let businessInfo : BusinessInfo = {
    name = "Tapas Electronics";
    tagline = "Leading provider of premium sound systems";
    contactNumbers = ["+49 1578 6289358"];
  };

  public query ({ caller }) func getBusinessInfo() : async BusinessInfo {
    businessInfo;
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray().sort();
  };

  public shared ({ caller }) func addProduct(name : Text, description : Text, icon : Text) : async () {
    let product : Product = {
      name;
      description;
      icon;
    };
    products.add(name, product);
  };

  public shared ({ caller }) func removeProduct(name : Text) : async () {
    switch (products.get(name)) {
      case (null) {};
      case (?_) { products.remove(name) };
    };
  };
};
