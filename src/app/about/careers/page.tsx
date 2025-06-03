import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Clock, Users, Heart } from "lucide-react";

const openPositions = [
  {
    title: "Senior Product Manager",
    department: "Product",
    location: "London, UK",
    type: "Full-time",
    description: "Lead the development of new skincare products from concept to launch, working closely with our R&D team."
  },
  {
    title: "Digital Marketing Specialist",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    description: "Drive our digital marketing strategy across social media, email, and content marketing channels."
  },
  {
    title: "Customer Service Representative",
    department: "Customer Success",
    location: "New York, NY",
    type: "Full-time",
    description: "Provide exceptional customer support and help customers build their perfect skincare routines."
  },
  {
    title: "Supply Chain Coordinator",
    department: "Operations",
    location: "Los Angeles, CA",
    type: "Full-time",
    description: "Manage inventory, logistics, and supplier relationships to ensure smooth operations."
  },
  {
    title: "UX/UI Designer",
    department: "Technology",
    location: "Remote",
    type: "Contract",
    description: "Design intuitive user experiences for our website and mobile app, focusing on education and e-commerce."
  }
];

const benefits = [
  {
    icon: Heart,
    title: "Health & Wellness",
    items: ["Comprehensive health insurance", "Mental health support", "Free skincare products", "Wellness stipend"]
  },
  {
    icon: Users,
    title: "Team & Culture",
    items: ["Diverse and inclusive workplace", "Team building events", "Professional development", "Mentorship programs"]
  },
  {
    icon: Clock,
    title: "Work-Life Balance",
    items: ["Flexible working hours", "Remote work options", "Unlimited PTO", "Sabbatical opportunities"]
  },
  {
    icon: MapPin,
    title: "Growth & Learning",
    items: ["Learning & development budget", "Conference attendance", "Skill-building workshops", "Career progression paths"]
  }
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <nav className="text-sm text-[#97979d] font-inter">
            <Link href="/" className="hover:text-[#1c1c22]">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/about" className="hover:text-[#1c1c22]">About</Link>
            <span className="mx-2">/</span>
            <span className="text-[#1c1c22]">Careers</span>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="bg-[#efeff0] py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1c1c22] mb-6 font-lato">
              Join Our Mission
            </h1>
            <p className="text-xl text-[#747474] max-w-2xl mx-auto font-inter">
              Help us make great skincare accessible to everyone. We're building a team of passionate individuals who believe in transparency, education, and results.
            </p>
          </div>
        </section>

        {/* Culture Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-[#1c1c22] mb-12 font-lato">
              Why Work at INKEY?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="bg-[#efeff0] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="font-bold text-[#1c1c22] mb-3 font-inter">Innovation-Driven</h3>
                <p className="text-[#747474] font-inter">We're constantly pushing boundaries in skincare science and e-commerce innovation.</p>
              </div>
              <div className="text-center">
                <div className="bg-[#efeff0] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌱</span>
                </div>
                <h3 className="font-bold text-[#1c1c22] mb-3 font-inter">Growth Mindset</h3>
                <p className="text-[#747474] font-inter">We invest in our people's growth and encourage continuous learning and development.</p>
              </div>
              <div className="text-center">
                <div className="bg-[#efeff0] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💜</span>
                </div>
                <h3 className="font-bold text-[#1c1c22] mb-3 font-inter">Purpose-Led</h3>
                <p className="text-[#747474] font-inter">Every day, we're making skincare more accessible and helping people feel confident in their skin.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-[#efeff0] py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-[#1c1c22] mb-12 font-lato">
              Benefits & Perks
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={index} className="bg-white rounded-lg p-6 border border-[#c1c0cb]">
                    <div className="flex items-center mb-4">
                      <div className="bg-[#efeff0] p-2 rounded-lg mr-3">
                        <IconComponent className="h-5 w-5 text-[#746cad]" />
                      </div>
                      <h3 className="font-bold text-[#1c1c22] font-inter">{benefit.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {benefit.items.map((item, idx) => (
                        <li key={idx} className="text-[#747474] font-inter text-sm flex items-start">
                          <span className="w-2 h-2 bg-[#746cad] rounded-full mr-3 mt-2 flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-[#1c1c22] mb-12 font-lato">
              Open Positions
            </h2>
            <div className="space-y-6">
              {openPositions.map((position, index) => (
                <div key={index} className="border border-[#c1c0cb] rounded-lg p-6 hover:border-[#746cad] transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#1c1c22] mb-2 font-inter">{position.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-[#747474] font-inter">
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {position.department}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {position.location}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {position.type}
                        </span>
                      </div>
                    </div>
                    <button className="bg-[#746cad] hover:bg-[#aca4e9] text-white px-6 py-3 rounded-lg font-medium transition-colors mt-4 md:mt-0">
                      Apply Now
                    </button>
                  </div>
                  <p className="text-[#747474] font-inter">{position.description}</p>
                </div>
              ))}
            </div>

            {/* No Position Found */}
            <div className="mt-12 text-center bg-[#efeff0] rounded-lg p-8">
              <h3 className="text-xl font-bold text-[#1c1c22] mb-4 font-inter">
                Don't See the Right Role?
              </h3>
              <p className="text-[#747474] mb-6 font-inter">
                We're always looking for talented people to join our team. Send us your resume and we'll keep you in mind for future opportunities.
              </p>
              <button className="bg-[#746cad] hover:bg-[#aca4e9] text-white px-8 py-3 rounded-lg font-medium transition-colors">
                Send Resume
              </button>
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="bg-[#efeff0] py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-[#1c1c22] mb-12 font-lato">
              Our Hiring Process
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-[#746cad] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold">
                  1
                </div>
                <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Application</h3>
                <p className="text-[#747474] font-inter text-sm">Submit your resume and cover letter through our application form.</p>
              </div>
              <div className="text-center">
                <div className="bg-[#746cad] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold">
                  2
                </div>
                <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Initial Screen</h3>
                <p className="text-[#747474] font-inter text-sm">Phone or video call with our HR team to discuss your background and interests.</p>
              </div>
              <div className="text-center">
                <div className="bg-[#746cad] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold">
                  3
                </div>
                <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Team Interview</h3>
                <p className="text-[#747474] font-inter text-sm">Meet with the hiring manager and potential teammates to assess fit.</p>
              </div>
              <div className="text-center">
                <div className="bg-[#746cad] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold">
                  4
                </div>
                <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Final Decision</h3>
                <p className="text-[#747474] font-inter text-sm">Reference checks and offer extension. Welcome to the team!</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
