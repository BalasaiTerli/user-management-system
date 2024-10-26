import React from "react";

const FooterItem = ({ image, title, description }) => (
  <div className="bg-gray-100 text-gray-800 p-4 rounded-lg flex flex-col items-center space-y-2 shadow-md">
    <div className="flex-shrink-0">
      <img src={image} alt="Icon" className="rounded-full w-12 h-12" />
    </div>
    <div className="text-center">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm">{description}</p>
    </div>
  </div>
);

function Footer() {
  return (
    <div className="bg-gray-200 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl font-semibold mb-8">
          Our Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <FooterItem
            image="https://img1a.flixcart.com/fk-sp-static/images/Onboarding_logo_Truck.svg"
            title="Sell Across India"
            description="Reach over 50 crore+ customers across 27000+ pincodes"
          />
          <FooterItem
            image="https://img1a.flixcart.com/fk-sp-static/images/Onboarding_logo_Truck.svg"
            title="Secure Payments"
            description="Fast and secure payment options for all purchases"
          />
          <FooterItem
            image="https://img1a.flixcart.com/fk-sp-static/images/Onboarding_logo_Truck.svg"
            title="24/7 Support"
            description="Dedicated support for your convenience"
          />
          <FooterItem
            image="https://img1a.flixcart.com/fk-sp-static/images/Onboarding_logo_Truck.svg"
            title="Easy Returns"
            description="Hassle-free returns for a smooth experience"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-4">
          <FooterItem
            image="https://img1a.flixcart.com/fk-sp-static/images/Onboarding_logo_Truck.svg"
            title="Global Shipping"
            description="Ship to over 100 countries worldwide"
          />
          <FooterItem
            image="https://img1a.flixcart.com/fk-sp-static/images/Onboarding_logo_Truck.svg"
            title="Quality Assurance"
            description="We prioritize quality in all our products"
          />
          <FooterItem
            image="https://img1a.flixcart.com/fk-sp-static/images/Onboarding_logo_Truck.svg"
            title="Exclusive Deals"
            description="Special offers for our valued customers"
          />
          <FooterItem
            image="https://img1a.flixcart.com/fk-sp-static/images/Onboarding_logo_Truck.svg"
            title="Loyalty Rewards"
            description="Earn points on every purchase"
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;
