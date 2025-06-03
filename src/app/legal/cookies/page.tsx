import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Shield, BarChart3, Target, Settings } from "lucide-react";

const cookieTypes = [
  {
    icon: Shield,
    title: "Essential Cookies",
    description: "Required for basic website functionality",
    examples: [
      "Authentication and security",
      "Shopping cart contents",
      "Form submissions",
      "Language preferences"
    ],
    canDisable: false
  },
  {
    icon: BarChart3,
    title: "Analytics Cookies",
    description: "Help us understand how visitors use our website",
    examples: [
      "Page views and traffic sources",
      "User behavior and interactions",
      "Popular products and content",
      "Website performance metrics"
    ],
    canDisable: true
  },
  {
    icon: Target,
    title: "Marketing Cookies",
    description: "Used to deliver relevant advertisements",
    examples: [
      "Personalized product recommendations",
      "Retargeting advertisements",
      "Social media integration",
      "Email marketing optimization"
    ],
    canDisable: true
  },
  {
    icon: Settings,
    title: "Functional Cookies",
    description: "Enable enhanced features and personalization",
    examples: [
      "Remember your preferences",
      "Video and chat functionality",
      "Product recommendations",
      "Recently viewed items"
    ],
    canDisable: true
  }
];

const cookieList = [
  {
    name: "_ga",
    purpose: "Google Analytics - tracks unique visitors",
    duration: "2 years",
    type: "Analytics"
  },
  {
    name: "_gid",
    purpose: "Google Analytics - tracks unique visitors per day",
    duration: "24 hours",
    type: "Analytics"
  },
  {
    name: "session_id",
    purpose: "Maintains user session and shopping cart",
    duration: "Session",
    type: "Essential"
  },
  {
    name: "auth_token",
    purpose: "User authentication and security",
    duration: "30 days",
    type: "Essential"
  },
  {
    name: "preferences",
    purpose: "Stores user preferences and settings",
    duration: "1 year",
    type: "Functional"
  },
  {
    name: "_fbp",
    purpose: "Facebook Pixel for advertising",
    duration: "90 days",
    type: "Marketing"
  }
];

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-16">
        {/* Breadcrumb */}
        <nav className="text-sm text-[#97979d] mb-8 font-inter">
          <Link href="/" className="hover:text-[#1c1c22]">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/legal" className="hover:text-[#1c1c22]">Legal</Link>
          <span className="mx-2">/</span>
          <span className="text-[#1c1c22]">Cookie Policy</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1c1c22] mb-6 font-lato">
            Cookie Policy
          </h1>
          <div className="bg-[#efeff0] rounded-lg p-6">
            <p className="text-[#747474] font-inter">
              <strong>Last Updated:</strong> March 1, 2024
            </p>
            <p className="text-[#747474] font-inter mt-4">
              This Cookie Policy explains how The INKEY List uses cookies and similar technologies to recognize you
              when you visit our website. It explains what these technologies are and why we use them, as well as
              your rights to control our use of them.
            </p>
          </div>
        </div>

        {/* What Are Cookies */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-6 font-lato">
            What Are Cookies?
          </h2>
          <div className="space-y-4 text-[#747474] font-inter leading-relaxed">
            <p>
              Cookies are small data files that are placed on your computer or mobile device when you visit a website.
              Cookies are widely used by website owners to make their websites work more efficiently and to provide
              reporting information.
            </p>
            <p>
              Cookies set by the website owner (in this case, The INKEY List) are called "first party cookies."
              Cookies set by parties other than the website owner are called "third party cookies." Third party
              cookies enable third party features or functionality to be provided on or through the website.
            </p>
          </div>
        </section>

        {/* Types of Cookies */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-8 font-lato">
            Types of Cookies We Use
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {cookieTypes.map((type, index) => {
              const IconComponent = type.icon;
              return (
                <div key={index} className="border border-[#c1c0cb] rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-[#efeff0] p-3 rounded-lg mr-4">
                      <IconComponent className="h-6 w-6 text-[#746cad]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#1c1c22] font-inter">{type.title}</h3>
                      <div className="flex items-center mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          type.canDisable
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {type.canDisable ? 'Optional' : 'Required'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-[#747474] font-inter text-sm mb-4">{type.description}</p>
                  <h4 className="font-semibold text-[#1c1c22] mb-2 font-inter text-sm">Examples:</h4>
                  <ul className="space-y-1">
                    {type.examples.map((example, idx) => (
                      <li key={idx} className="text-[#747474] font-inter text-sm flex items-start">
                        <span className="w-1.5 h-1.5 bg-[#746cad] rounded-full mr-2 mt-2 flex-shrink-0"></span>
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* Cookie List */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-8 font-lato">
            Specific Cookies We Use
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-[#c1c0cb] rounded-lg overflow-hidden">
              <thead className="bg-[#efeff0]">
                <tr>
                  <th className="text-left p-4 font-bold text-[#1c1c22] font-inter">Cookie Name</th>
                  <th className="text-left p-4 font-bold text-[#1c1c22] font-inter">Purpose</th>
                  <th className="text-left p-4 font-bold text-[#1c1c22] font-inter">Duration</th>
                  <th className="text-left p-4 font-bold text-[#1c1c22] font-inter">Type</th>
                </tr>
              </thead>
              <tbody>
                {cookieList.map((cookie, index) => (
                  <tr key={index} className="border-t border-[#c1c0cb]">
                    <td className="p-4 font-mono text-sm text-[#1c1c22]">{cookie.name}</td>
                    <td className="p-4 font-inter text-[#747474] text-sm">{cookie.purpose}</td>
                    <td className="p-4 font-inter text-[#747474] text-sm">{cookie.duration}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-inter ${
                        cookie.type === 'Essential'
                          ? 'bg-red-100 text-red-800'
                          : cookie.type === 'Analytics'
                          ? 'bg-blue-100 text-blue-800'
                          : cookie.type === 'Marketing'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {cookie.type}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Third Party Cookies */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-6 font-lato">
            Third Party Cookies
          </h2>
          <div className="space-y-6">
            <div className="border border-[#c1c0cb] rounded-lg p-6">
              <h3 className="font-bold text-[#1c1c22] mb-3 font-inter">Google Analytics</h3>
              <p className="text-[#747474] font-inter text-sm mb-3">
                We use Google Analytics to analyze website traffic and improve user experience.
                These cookies collect information about how visitors use our site.
              </p>
              <p className="text-[#747474] font-inter text-sm">
                <strong>Opt-out:</strong> <a href="https://tools.google.com/dlpage/gaoptout" className="text-[#746cad] underline">Google Analytics Opt-out Browser Add-on</a>
              </p>
            </div>

            <div className="border border-[#c1c0cb] rounded-lg p-6">
              <h3 className="font-bold text-[#1c1c22] mb-3 font-inter">Social Media Plugins</h3>
              <p className="text-[#747474] font-inter text-sm mb-3">
                Our website includes social media features that may set cookies to track your interactions
                with social content and advertisements.
              </p>
              <p className="text-[#747474] font-inter text-sm">
                <strong>Providers:</strong> Facebook, Instagram, Twitter, TikTok
              </p>
            </div>

            <div className="border border-[#c1c0cb] rounded-lg p-6">
              <h3 className="font-bold text-[#1c1c22] mb-3 font-inter">Advertising Partners</h3>
              <p className="text-[#747474] font-inter text-sm">
                We work with advertising partners who may use cookies to deliver personalized advertisements
                and measure campaign effectiveness. You can opt out of personalized advertising through industry opt-out tools.
              </p>
            </div>
          </div>
        </section>

        {/* Managing Cookies */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-6 font-lato">
            How to Manage Cookies
          </h2>
          <div className="space-y-6">
            <div className="bg-[#efeff0] rounded-lg p-6">
              <h3 className="font-bold text-[#1c1c22] mb-4 font-inter">Cookie Preferences</h3>
              <p className="text-[#747474] font-inter mb-4">
                You can manage your cookie preferences at any time by clicking the "Cookie Settings" link
                in our website footer or by using the button below:
              </p>
              <button className="bg-[#746cad] hover:bg-[#aca4e9] text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Manage Cookie Preferences
              </button>
            </div>

            <div>
              <h3 className="font-bold text-[#1c1c22] mb-4 font-inter">Browser Settings</h3>
              <p className="text-[#747474] font-inter mb-4">
                You can also control cookies through your browser settings:
              </p>
              <ul className="space-y-2 text-[#747474] font-inter text-sm">
                <li>• <strong>Chrome:</strong> Settings &gt; Privacy and security &gt; Cookies and other site data</li>
                <li>• <strong>Firefox:</strong> Options &gt; Privacy & Security &gt; Cookies and Site Data</li>
                <li>• <strong>Safari:</strong> Preferences &gt; Privacy &gt; Cookies and website data</li>
                <li>• <strong>Edge:</strong> Settings &gt; Cookies and site permissions &gt; Cookies and site data</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Impact of Disabling Cookies */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-6 font-lato">
            Impact of Disabling Cookies
          </h2>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
            <h3 className="font-bold text-[#1c1c22] mb-3 font-inter">Please Note</h3>
            <p className="text-[#747474] font-inter mb-4">
              If you choose to disable or delete cookies, some features of our website may not function properly:
            </p>
            <ul className="space-y-2 text-[#747474] font-inter text-sm">
              <li>• You may need to re-enter information on repeat visits</li>
              <li>• Your shopping cart contents may not be saved</li>
              <li>• Personalized recommendations may not work</li>
              <li>• Some website features may be unavailable</li>
            </ul>
          </div>
        </section>

        {/* Updates to Policy */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-6 font-lato">
            Updates to This Policy
          </h2>
          <div className="space-y-4 text-[#747474] font-inter leading-relaxed">
            <p>
              We may update this Cookie Policy from time to time to reflect changes in our practices or for legal reasons.
              We will notify you of any material changes by posting the updated policy on our website.
            </p>
            <p>
              The "Last Updated" date at the top of this policy indicates when it was last revised.
              Your continued use of our website after any changes constitutes acceptance of the updated policy.
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="bg-[#efeff0] rounded-lg p-8">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-4 font-lato">
            Questions About Cookies?
          </h2>
          <p className="text-[#747474] font-inter mb-6">
            If you have questions about our use of cookies or this Cookie Policy, please contact us:
          </p>
          <div className="space-y-2 text-[#747474] font-inter">
            <p><strong>Email:</strong> privacy@theinkeylist.com</p>
            <p><strong>Phone:</strong> 1-800-INKEY-LIST</p>
            <p><strong>Mail:</strong> The INKEY List Privacy Team<br/>
            123 Beauty Boulevard<br/>
            New York, NY 10001</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
