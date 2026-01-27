import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import api from "../api/axios";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
} from "lucide-react";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleSubmitForm = async (data) => {
    try {
      await api.post("/contact", data);
      toast.success(
        "Thank you for your message. We will get back to you soon!"
      );
      reset();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "Failed to send message. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--dark-wood)" }}>
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

        <div className="relative z-10 h-full flex items-center justify-center text-center">
          <div className="px-6">
            <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight mb-6 text-white">
              Get in
              <span className="block text-gradient-gold mt-2 animate-shimmer">
                Touch With Us
              </span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              We're here to assist you with any questions about your stay at
              Maison De Crayer
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <span className="text-yellow-400 uppercase text-xs tracking-widest">
                  Contact Information
                </span>
                <h2 className="text-white font-serif text-3xl mt-3 mb-8">
                  Reach Out Anytime
                </h2>
              </div>

              <div className="space-y-6">
                <div className="glass-morphism rounded-xl p-6 hover-lift group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-black" size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-2">
                        Address
                      </h3>
                      <p className="text-white/70 leading-relaxed">
                        Maison De Crayer
                        <br />
                        Rue de la Régence 3
                        <br />
                        1000 Brussels, Belgium
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass-morphism rounded-xl p-6 hover-lift group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center flex-shrink-0">
                      <Phone className="text-black" size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-2">
                        Phone
                      </h3>
                      <p className="text-white/70 leading-relaxed">
                        +32 456 35 30 08
                        <br />
                        +32 456 35 30 08 (Reservations)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass-morphism rounded-xl p-6 hover-lift group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center flex-shrink-0">
                      <Mail className="text-black" size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-2">
                        Email
                      </h3>
                      <p className="text-white/70 leading-relaxed">
                        info@maisondescrayer.be
                        <br />
                        reservations@maisondescrayer.be
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass-morphism rounded-xl p-6 hover-lift group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center flex-shrink-0">
                      <Clock className="text-black" size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-2">
                        Opening Hours
                      </h3>
                      <p className="text-white/70 leading-relaxed">
                        Front Desk: 24/7
                        <br />
                        Restaurant: 7:00 AM - 11:00 PM
                        <br />
                        Room Service: 6:00 AM - 12:00 AM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div>
                <span className="text-yellow-400 uppercase text-xs tracking-widest">
                  Send Message
                </span>
                <h2 className="text-white font-serif text-3xl mt-3 mb-8">
                  We'd Love to Hear From You
                </h2>
              </div>

              <form
                onSubmit={handleSubmit(handleSubmitForm)}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-yellow-400 focus:bg-white/15 transition-all duration-300"
                      {...register("name", {
                        required: "Name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters",
                        },
                      })}
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-yellow-400 focus:bg-white/15 transition-all duration-300"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+\.\S+$/,
                          message: "Enter a valid email",
                        },
                      })}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="+32 2 123 45 67"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-yellow-400 focus:bg-white/15 transition-all duration-300"
                    {...register("phone")}
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-yellow-400 focus:bg-white/15 transition-all duration-300"
                    {...register("subject", {
                      required: "Subject is required",
                    })}
                  />
                  {errors.subject && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Tell us more about your inquiry..."
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-yellow-400 focus:bg-white/15 transition-all duration-300 resize-none"
                    {...register("message", {
                      required: "Message is required",
                      minLength: {
                        value: 10,
                        message:
                          "Message must be at least 10 characters",
                      },
                    })}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative btn-3d bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 py-4 rounded-full text-sm font-bold tracking-wider flex items-center gap-2 hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-yellow-400/50 magnetic-btn disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10">
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </span>
                  <Send
                    size={18}
                    className={`stroke-[3] group-hover:translate-x-1 transition-transform relative z-10 ${isSubmitting ? "animate-spin" : ""
                      }`}
                  />
                  <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
