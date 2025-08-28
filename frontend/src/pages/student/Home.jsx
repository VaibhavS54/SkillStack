import React from "react";
import Hero from "../../components/student/Hero";
import Companies from "../../components/student/Companies";
import CourseSection from "../../components/student/CourseSection";
import TestimonialSection from "../../components/student/TestimonialSection";
import CallToAction from "../../components/student/CallToAction";
import Footer from "../../components/student/Footer";

const Home = () => {
  return (
    <div className="flex flex-col items-center text-center space-y-12 md:space-y-16">
      {/* Hero Section */}
      <Hero />

      {/* Partner Companies */}
      <Companies />

      {/* Featured Courses */}
      <CourseSection />

      {/* Testimonials */}
      <TestimonialSection />

      {/* Call to Action */}
      <CallToAction />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
