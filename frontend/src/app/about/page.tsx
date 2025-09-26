"use client";

import React from "react";
import { Header, Footer } from "../../components/ui";

const teamMembers = [
  {
    name: "Dr. Maria Santos",
    role: "Lead Dentist & Founder",
    experience: "15+ years",
    specialization: "General Dentistry, Cosmetic Dentistry",
    image: "👩‍⚕️",
    bio: "Dr. Maria Santos founded Fresh Confidence Dental with a vision to provide exceptional dental care in a compassionate, patient-centered environment. With over 15 years of experience, she specializes in comprehensive dental treatments and cosmetic dentistry.",
  },
  {
    name: "Dr. Carlos Reyes",
    role: "Associate Dentist",
    experience: "8+ years",
    specialization: "Restorative Dentistry, Implants",
    image: "👨‍⚕️",
    bio: "Dr. Carlos Reyes brings extensive experience in restorative dentistry and dental implants. He is passionate about helping patients restore their smiles and confidence through advanced dental procedures.",
  },
  {
    name: "Sarah Johnson",
    role: "Lead Dental Hygienist",
    experience: "10+ years",
    specialization: "Preventive Care, Patient Education",
    image: "👩‍🔬",
    bio: "Sarah is dedicated to preventive dental care and patient education. Her gentle approach and thorough cleanings help patients maintain optimal oral health and prevent dental issues.",
  },
];

const milestones = [
  {
    year: "2024",
    event: "Clinic Founded",
    description:
      "Fresh Confidence Dental opens its doors with a mission to provide exceptional dental care.",
  },
  {
    year: "2024",
    event: "First 500 Patients",
    description:
      "Reached our milestone of serving 500 happy patients within the first year.",
  },
  {
    year: "2025",
    event: "Advanced Technology Upgrade",
    description:
      "Invested in state-of-the-art digital imaging and laser dentistry equipment.",
  },
  {
    year: "2025",
    event: "Team Expansion",
    description:
      "Added specialized dental professionals to better serve our growing patient base.",
  },
];

const values = [
  {
    title: "Compassionate Care",
    description:
      "We treat every patient with kindness, respect, and understanding, creating a comfortable environment for all dental procedures.",
    icon: "💝",
  },
  {
    title: "Excellence in Dentistry",
    description:
      "We maintain the highest standards of dental care, using advanced techniques and technology to deliver exceptional results.",
    icon: "🏆",
  },
  {
    title: "Patient Education",
    description:
      "We believe informed patients make better decisions. We take time to educate our patients about their oral health and treatment options.",
    icon: "📚",
  },
  {
    title: "Community Focus",
    description:
      "We are committed to serving our local community and contributing to the overall health and well-being of our patients.",
    icon: "🌍",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header currentPage="about" />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-primary-blue to-secondary-teal relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
          <div className="absolute top-20 right-20 w-24 h-24 border-2 border-white rounded-full"></div>
        </div>

        <div className="container relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="text-white text-sm font-medium">
                🏥 About Fresh Confidence Dental
              </span>
            </div>
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">
              Your Trusted Dental Care Partner
            </h1>
            <p className="text-white/90 text-lg leading-relaxed">
              For over a year, Fresh Confidence Dental has been committed to
              providing exceptional dental care with compassion, expertise, and
              cutting-edge technology. We believe that everyone deserves a
              healthy, confident smile, and we&apos;re here to make that a
              reality.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-dark mb-6">Our Story</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary-blue to-secondary-teal mx-auto mb-6"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-dark mb-4">
                  Founded with a Vision
                </h3>
                <p className="text-dark/80 leading-relaxed mb-6">
                  Fresh Confidence Dental was established in 2024 with a simple
                  yet powerful vision: to create a dental practice where
                  patients feel valued, comfortable, and confident about their
                  oral health. Our founder, Dr. Maria Santos, recognized the
                  need for a dental clinic that prioritizes patient comfort and
                  uses the latest technology to deliver exceptional care.
                </p>
                <p className="text-dark/80 leading-relaxed">
                  What started as a small practice has grown into a trusted
                  community healthcare partner, serving hundreds of families and
                  helping them achieve the healthy, beautiful smiles they
                  deserve.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-teal-50 p-8 rounded-2xl">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    5000+
                  </div>
                  <div className="text-dark font-medium mb-6">
                    Happy Patients Served
                  </div>

                  <div className="text-4xl font-bold text-secondary mb-2">
                    98%
                  </div>
                  <div className="text-dark font-medium mb-6">
                    Patient Satisfaction Rate
                  </div>

                  <div className="text-4xl font-bold text-primary mb-2">
                    15+
                  </div>
                  <div className="text-dark font-medium">
                    Years Combined Experience
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-dark mb-6">Our Values</h2>
            <p className="text-lg text-dark/80 max-w-2xl mx-auto">
              These core values guide everything we do and shape the experience
              we provide to our patients.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-blue to-secondary-teal mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-dark mb-3">
                  {value.title}
                </h3>
                <p className="text-dark/70 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-dark mb-6">Meet Our Team</h2>
            <p className="text-lg text-dark/80 max-w-2xl mx-auto">
              Our experienced team of dental professionals is dedicated to
              providing you with the highest quality care in a friendly,
              comfortable environment.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-blue to-secondary-teal mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h3 className="text-xl font-semibold text-dark mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-dark/60 text-sm mb-3">
                    {member.experience} Experience
                  </p>
                  <p className="text-secondary text-sm font-medium">
                    {member.specialization}
                  </p>
                </div>
                <p className="text-dark/80 leading-relaxed text-sm">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-dark mb-6">Our Journey</h2>
            <p className="text-lg text-dark/80 max-w-2xl mx-auto">
              Key milestones that have shaped Fresh Confidence Dental into the
              practice we are today.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-blue to-secondary-teal mx-auto mt-6"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-blue to-secondary-teal rounded-full flex items-center justify-center text-white font-bold">
                      {milestone.year}
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-lg flex-1">
                    <h3 className="text-xl font-semibold text-dark mb-2">
                      {milestone.event}
                    </h3>
                    <p className="text-dark/80">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology & Facilities Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-dark mb-6">
                State-of-the-Art Facilities
              </h2>
              <p className="text-lg text-dark/80">
                We invest in the latest technology to ensure you receive the
                best possible care.
              </p>
              <div className="w-20 h-1 bg-gradient-to-r from-primary-blue to-secondary-teal mx-auto mt-6"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold text-dark mb-6">
                  Advanced Technology
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-dark">
                        Digital X-Ray System:
                      </strong>
                      <span className="text-dark/80 ml-1">
                        Reduces radiation exposure by up to 90% while providing
                        crystal-clear images.
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-dark">Laser Dentistry:</strong>
                      <span className="text-dark/80 ml-1">
                        Minimally invasive procedures with faster healing and
                        reduced discomfort.
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-dark">CAD/CAM Technology:</strong>
                      <span className="text-dark/80 ml-1">
                        Same-day crowns and restorations with precise digital
                        design.
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-dark">Intraoral Camera:</strong>
                      <span className="text-dark/80 ml-1">
                        Real-time visualization of your teeth for better
                        diagnosis and patient education.
                      </span>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-dark mb-6">
                  Comfort & Care
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-dark">Sedation Dentistry:</strong>
                      <span className="text-dark/80 ml-1">
                        Various sedation options available for anxious patients.
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-dark">
                        Comfortable Waiting Area:
                      </strong>
                      <span className="text-dark/80 ml-1">
                        Relaxing environment with refreshments and
                        entertainment.
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-dark">
                        Private Treatment Rooms:
                      </strong>
                      <span className="text-dark/80 ml-1">
                        Ensuring patient privacy and comfort during procedures.
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-dark">
                        Post-Treatment Care:
                      </strong>
                      <span className="text-dark/80 ml-1">
                        Comprehensive aftercare instructions and follow-up
                        support.
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
