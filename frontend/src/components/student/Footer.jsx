import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full bg-[#0d1321] text-gray-300">
      <footer className="max-w-7xl mx-auto py-12 px-6 md:px-20">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center md:text-left">
          
          {/* Logo + Tagline */}
          <div className="space-y-3">
            <h2 className="text-3xl font-extrabold text-white tracking-wide">TutorGrid</h2>
            <p className="text-sm leading-relaxed text-gray-400">
              Learn anything, anytime — build your future with{" "}
              <span className="text-indigo-400 font-medium">smart education.</span>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-lg">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-indigo-400 transition">Home</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">Courses</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">About Us</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">Contact</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-lg">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-indigo-400 transition">Help Center</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">FAQs</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">Terms of Service</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <h3 className="text-white font-semibold text-lg">Follow Us</h3>
            <div className="flex gap-4 text-xl">
              <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-indigo-500 transition">
                <FaFacebookF />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-pink-500 transition">
                <FaInstagram />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-sky-500 transition">
                <FaTwitter />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-blue-600 transition">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Divider + Copyright */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} <span className="text-indigo-400 font-medium">TutorGrid</span>. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
