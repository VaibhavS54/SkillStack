import React from "react";
import { assets } from "../../assets/assets.js";

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-700 mt-10 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8">
        
        {/* Logo & About */}
        <div>
          <img className="w-28 mb-3 invert" src={assets.logo} alt="logo" />
          <p className="text-sm">
            Empowering educators with tools, resources, and support to inspire the next generation of learners.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-gray-200 font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-indigo-400 transition">Home</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition">Courses</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition">Resources</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition">Support</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-gray-200 font-semibold mb-3">Contact</h3>
          <p className="text-sm">📍 IIIT Bhagalpur, Bihar, India</p>
          <p className="text-sm">📧 educator@support.com</p>
          <p className="text-sm">📞 +91 93503 25041</p>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-gray-200 font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#"><img className="w-6 hover:opacity-70 transition invert" src={assets.facebook_icon} alt="facebook" /></a>
            <a href="#"><img className="w-6 hover:opacity-70 transition invert" src={assets.twitter_icon} alt="twitter" /></a>
            <a href="#"><img className="w-6 hover:opacity-70 transition invert" src={assets.instagram_icon} alt="instagram" /></a>
          </div>
        </div>
      </div>

      {/* Divider & Copyright */}
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Priyanshu | All Rights Reserved.
      </div>
    </footer>
  )
};

export default Footer;
