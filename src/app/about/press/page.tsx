import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Download, ExternalLink, Calendar, Award } from "lucide-react";

const pressReleases = [
  {
    date: "March 15, 2024",
    title: "INKEY Launches Revolutionary AI-Powered Skin Analysis Tool",
    excerpt: "New technology helps customers build personalized skincare routines based on individual skin concerns and goals.",
    link: "#"
  },
  {
    date: "January 8, 2024",
    title: "INKEY List Expands to 15 New International Markets",
    excerpt: "Popular skincare brand continues global expansion with launch in Asia-Pacific and Latin American regions.",
    link: "#"
  },
  {
    date: "November 22, 2023",
    title: "INKEY Achieves B-Corp Certification for Social and Environmental Impact",
    excerpt: "Skincare company meets rigorous standards for social and environmental performance, accountability, and transparency.",
    link: "#"
  },
  {
    date: "September 5, 2023",
    title: "INKEY List Introduces Refillable Packaging Initiative",
    excerpt: "Company launches sustainable packaging program to reduce environmental impact across product range.",
    link: "#"
  }
];

const mediaFeatures = [
  {
    outlet: "Vogue",
    title: "The Affordable Skincare Brand That Actually Works",
    date: "March 2024",
    type: "Feature Article",
    image: "https://ext.same-assets.com/3071055451/2165639085.png"
  },
  {
    outlet: "Allure",
    title: "Best Drugstore Skincare Products of 2024",
    date: "February 2024",
    type: "Product Review",
    image: "https://ext.same-assets.com/3071055451/653406535.png"
  },
  {
    outlet: "Harper's Bazaar",
    title: "The Science Behind INKEY's Minimalist Approach",
    date: "January 2024",
    type: "Interview",
    image: "https://ext.same-assets.com/3071055451/2316002344.png"
  },
  {
    outlet: "Elle",
    title: "Skincare Ingredients That Actually Matter",
    date: "December 2023",
    type: "Expert Guide",
    image: "https://ext.same-assets.com/3071055451/3667623108.png"
  }
];

const awards = [
  {
    year: "2024",
    title: "Best Affordable Skincare Brand",
    organization: "Beauty Awards",
    category: "Skincare"
  },
  {
    year: "2023",
    title: "Innovation in Sustainable Packaging",
    organization: "Green Beauty Awards",
    category: "Sustainability"
  },
  {
    year: "2023",
    title: "Best Niacinamide Serum",
    organization: "Allure Best of Beauty",
    category: "Product"
  },
  {
    year: "2022",
    title: "Breakthrough Brand of the Year",
    organization: "CEW Beauty Awards",
    category: "Brand"
  }
];

export default function PressPage() {
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
            <span className="text-[#1c1c22]">Press</span>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="bg-[#efeff0] py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1c1c22] mb-6 font-lato">
              Press & Media
            </h1>
            <p className="text-xl text-[#747474] max-w-2xl mx-auto font-inter">
              Latest news, press releases, and media coverage about The INKEY List and our mission to democratize skincare.
            </p>
          </div>
        </section>

        {/* Press Contact */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-[#efeff0] rounded-lg p-8 mb-16">
              <h2 className="text-2xl font-bold text-[#1c1c22] mb-6 font-lato">Press Inquiries</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Media Contact</h3>
                  <p className="text-[#747474] font-inter mb-4">
                    For press inquiries, interview requests, or media samples, please contact our press team:
                  </p>
                  <p className="text-[#746cad] font-inter">
                    <strong>Email:</strong> press@theinkeylist.com<br/>
                    <strong>Phone:</strong> +1 (555) 123-PRESS
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Press Kit</h3>
                  <p className="text-[#747474] font-inter mb-4">
                    Download our comprehensive press kit including high-resolution images, company information, and founder bios.
                  </p>
                  <button className="flex items-center bg-[#746cad] hover:bg-[#aca4e9] text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    <Download className="h-4 w-4 mr-2" />
                    Download Press Kit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Press Releases */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-[#1c1c22] mb-12 font-lato">
              Latest Press Releases
            </h2>
            <div className="space-y-8">
              {pressReleases.map((release, index) => (
                <div key={index} className="border border-[#c1c0cb] rounded-lg p-6 hover:border-[#746cad] transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <Calendar className="h-4 w-4 text-[#746cad] mr-2" />
                        <span className="text-sm text-[#747474] font-inter">{release.date}</span>
                      </div>
                      <h3 className="text-xl font-bold text-[#1c1c22] mb-3 font-inter">{release.title}</h3>
                      <p className="text-[#747474] font-inter">{release.excerpt}</p>
                    </div>
                    <button className="flex items-center bg-[#746cad] hover:bg-[#aca4e9] text-white px-6 py-3 rounded-lg font-medium transition-colors mt-4 md:mt-0 md:ml-6">
                      Read More
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Media Coverage */}
        <section className="bg-[#efeff0] py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-[#1c1c22] mb-12 font-lato">
              Media Coverage
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {mediaFeatures.map((feature, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden border border-[#c1c0cb] hover:border-[#746cad] transition-colors">
                  <div className="aspect-video bg-[#efeff0]">
                    <img
                      src={feature.image}
                      alt={feature.outlet}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[#746cad] font-bold font-inter">{feature.outlet}</span>
                      <span className="text-sm text-[#97979d] font-inter">{feature.date}</span>
                    </div>
                    <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">{feature.title}</h3>
                    <p className="text-sm text-[#747474] font-inter mb-4">{feature.type}</p>
                    <button className="flex items-center text-[#746cad] hover:text-[#aca4e9] font-medium transition-colors">
                      Read Article
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Awards */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-[#1c1c22] mb-12 font-lato">
              Awards & Recognition
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {awards.map((award, index) => (
                <div key={index} className="text-center border border-[#c1c0cb] rounded-lg p-6">
                  <div className="bg-[#efeff0] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-[#746cad]" />
                  </div>
                  <span className="text-[#746cad] font-bold text-lg font-inter">{award.year}</span>
                  <h3 className="font-bold text-[#1c1c22] text-sm mb-2 font-inter">{award.title}</h3>
                  <p className="text-[#747474] text-sm font-inter">{award.organization}</p>
                  <span className="inline-block mt-2 bg-[#efeff0] text-[#746cad] px-3 py-1 rounded-full text-xs font-inter">
                    {award.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Company Stats */}
        <section className="bg-[#efeff0] py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-[#1c1c22] mb-12 font-lato">
              By the Numbers
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-bold text-[#746cad] mb-2 font-lato">50+</div>
                <p className="text-[#747474] font-inter">Countries served</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#746cad] mb-2 font-lato">5M+</div>
                <p className="text-[#747474] font-inter">Happy customers</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#746cad] mb-2 font-lato">25+</div>
                <p className="text-[#747474] font-inter">Skincare products</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#746cad] mb-2 font-lato">2018</div>
                <p className="text-[#747474] font-inter">Year founded</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
