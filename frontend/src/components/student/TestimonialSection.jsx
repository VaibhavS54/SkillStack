import React from "react";
import { assets, dummyTestimonial } from "../../assets/assets";

const TestimonialSection = () => {
  return (
    <section className="pb-14 px-8 md:px-0">
      {/* Heading */}
      <h2 className="text-3xl font-semibold text-gray-800">Testimonials</h2>
      <p className="text-gray-500 mt-3 md:text-base">
        Hear from our learners as they share their journeys of transformation,
        success, and how our <br className="hidden md:block" /> platform has made a
        difference in their lives.
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-14 max-w-5xl mx-auto">
        {dummyTestimonial.map((testimonial, index) => (
          <article
            key={index}
            className="text-sm text-left border border-gray-300 pb-6 rounded-lg bg-white shadow-md overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-4 px-5 py-4 bg-gray-100">
              <img
                className="h-12 w-12 rounded-full object-cover"
                src={testimonial.image}
                alt={`${testimonial.name}'s profile picture`}
              />
              <div>
                <h3 className="text-lg font-medium text-gray-800">
                  {testimonial.name}
                </h3>
                <p className="text-gray-600">{testimonial.role}</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 pb-7">
              {/* Stars */}
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    className="w-4 h-4"
                    src={i < testimonial.rating ? assets.star : assets.star_blank}
                    alt={i < testimonial.rating ? "Filled star" : "Empty star"}
                  />
                ))}
              </div>
              {/* Feedback */}
              <p className="text-gray-500 mt-5">{testimonial.feedback}</p>
            </div>

            {/* Action */}
            <button
              className="text-blue-600 underline px-5 hover:text-blue-700 transition-colors"
              onClick={() => alert("Expand testimonial or navigate")}
            >
              Read More
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;
