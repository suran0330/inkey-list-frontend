import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Eye, Keyboard, Volume2, MousePointer } from "lucide-react";

const accessibilityFeatures = [
  {
    icon: Eye,
    title: "Visual Accessibility",
    features: [
      "High contrast color schemes",
      "Scalable text and interface elements",
      "Alt text for all images",
      "Clear focus indicators"
    ]
  },
  {
    icon: Keyboard,
    title: "Keyboard Navigation",
    features: [
      "Full keyboard navigation support",
      "Logical tab order",
      "Skip navigation links",
      "Keyboard shortcuts for common actions"
    ]
  },
  {
    icon: Volume2,
    title: "Screen Reader Support",
    features: [
      "Semantic HTML structure",
      "ARIA labels and descriptions",
      "Proper heading hierarchy",
      "Form field labels"
    ]
  },
  {
    icon: MousePointer,
    title: "Motor Accessibility",
    features: [
      "Large clickable areas",
      "No time-based interactions",
      "Drag and drop alternatives",
      "Gesture alternatives"
    ]
  }
];

export default function AccessibilityPage() {
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
          <span className="text-[#1c1c22]">Accessibility</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1c1c22] mb-6 font-lato">
            Accessibility Statement
          </h1>
          <div className="bg-[#efeff0] rounded-lg p-6">
            <p className="text-[#747474] font-inter">
              <strong>Last Updated:</strong> March 1, 2024
            </p>
            <p className="text-[#747474] font-inter mt-4">
              At The INKEY List, we are committed to ensuring that our website and mobile applications are accessible
              to all users, including those with disabilities. We strive to provide an inclusive digital experience
              that allows everyone to access our products and information.
            </p>
          </div>
        </div>

        {/* Our Commitment */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-6 font-lato">
            Our Commitment to Accessibility
          </h2>
          <div className="space-y-4 text-[#747474] font-inter leading-relaxed">
            <p>
              We believe that everyone should have equal access to information and functionality on the web.
              Our commitment to accessibility is part of our broader mission to make skincare accessible to all.
            </p>
            <p>
              We continuously work to improve the accessibility of our website and ensure it meets or exceeds
              applicable accessibility standards, including the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.
            </p>
            <p>
              Our accessibility efforts are ongoing, and we regularly review and update our website to ensure
              it remains accessible to users with diverse abilities and needs.
            </p>
          </div>
        </section>

        {/* Accessibility Features */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-8 font-lato">
            Accessibility Features
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {accessibilityFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="border border-[#c1c0cb] rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-[#efeff0] p-3 rounded-lg mr-4">
                      <IconComponent className="h-6 w-6 text-[#746cad]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1c1c22] font-inter">{feature.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
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
        </section>

        {/* Standards Compliance */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-6 font-lato">
            Standards and Compliance
          </h2>
          <div className="bg-[#efeff0] rounded-lg p-6">
            <h3 className="font-bold text-[#1c1c22] mb-4 font-inter">WCAG 2.1 Level AA Compliance</h3>
            <p className="text-[#747474] font-inter mb-4">
              Our website aims to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.
              These guidelines are developed by the World Wide Web Consortium (W3C) and are internationally recognized
              as the standard for web accessibility.
            </p>
            <h4 className="font-bold text-[#1c1c22] mb-3 font-inter">The Four Principles of WCAG:</h4>
            <ul className="space-y-2 text-[#747474] font-inter">
              <li><strong>Perceivable:</strong> Information and UI components must be presentable in ways users can perceive</li>
              <li><strong>Operable:</strong> UI components and navigation must be operable by all users</li>
              <li><strong>Understandable:</strong> Information and UI operation must be understandable</li>
              <li><strong>Robust:</strong> Content must be robust enough to be interpreted by assistive technologies</li>
            </ul>
          </div>
        </section>

        {/* Assistive Technologies */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-6 font-lato">
            Supported Assistive Technologies
          </h2>
          <div className="space-y-4 text-[#747474] font-inter leading-relaxed">
            <p>Our website is designed to work with the following assistive technologies:</p>
            <ul className="space-y-2 ml-6">
              <li>• Screen readers (JAWS, NVDA, VoiceOver, TalkBack)</li>
              <li>• Voice recognition software (Dragon NaturallySpeaking)</li>
              <li>• Keyboard-only navigation</li>
              <li>• Screen magnification software</li>
              <li>• High contrast and large text browser settings</li>
            </ul>
            <p>
              We test our website regularly with these technologies to ensure compatibility and optimal user experience.
            </p>
          </div>
        </section>

        {/* Accessibility Tools */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-6 font-lato">
            Browser Accessibility Settings
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-[#1c1c22] mb-3 font-inter">Text Size and Zoom</h3>
              <p className="text-[#747474] font-inter text-sm mb-4">
                Most browsers allow you to increase text size or zoom the entire page:
              </p>
              <ul className="space-y-1 text-[#747474] font-inter text-sm">
                <li>• Chrome: Ctrl/Cmd + Plus/Minus</li>
                <li>• Firefox: Ctrl/Cmd + Plus/Minus</li>
                <li>• Safari: Cmd + Plus/Minus</li>
                <li>• Edge: Ctrl + Plus/Minus</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-[#1c1c22] mb-3 font-inter">High Contrast Mode</h3>
              <p className="text-[#747474] font-inter text-sm mb-4">
                Enable high contrast mode for better visibility:
              </p>
              <ul className="space-y-1 text-[#747474] font-inter text-sm">
                <li>• Windows: Alt + Left Shift + Print Screen</li>
                <li>• macOS: System Preferences &gt; Accessibility</li>
                <li>• Chrome: Install High Contrast extension</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Known Issues */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-6 font-lato">
            Known Accessibility Issues
          </h2>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
            <h3 className="font-bold text-[#1c1c22] mb-3 font-inter">Current Areas for Improvement</h3>
            <p className="text-[#747474] font-inter mb-4">
              We are actively working to address the following accessibility issues:
            </p>
            <ul className="space-y-2 text-[#747474] font-inter text-sm">
              <li>• Some product images may not have descriptive alt text</li>
              <li>• Video content may not have closed captions</li>
              <li>• Some third-party widgets may not be fully accessible</li>
            </ul>
            <p className="text-[#747474] font-inter text-sm mt-4">
              These issues are prioritized in our ongoing accessibility improvements and will be addressed in future updates.
            </p>
          </div>
        </section>

        {/* Feedback and Contact */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-6 font-lato">
            Accessibility Feedback
          </h2>
          <div className="bg-[#efeff0] rounded-lg p-6">
            <p className="text-[#747474] font-inter mb-4">
              We welcome your feedback on the accessibility of our website. If you encounter any accessibility barriers
              or have suggestions for improvement, please contact us:
            </p>
            <div className="space-y-2 text-[#747474] font-inter">
              <p><strong>Email:</strong> accessibility@theinkeylist.com</p>
              <p><strong>Phone:</strong> 1-800-INKEY-LIST</p>
              <p><strong>Mail:</strong> The INKEY List Accessibility Team<br/>
              123 Beauty Boulevard<br/>
              New York, NY 10001</p>
            </div>
            <p className="text-[#747474] font-inter mt-4 text-sm">
              We aim to respond to accessibility feedback within 2 business days and will work with you to resolve any issues.
            </p>
          </div>
        </section>

        {/* Ongoing Commitment */}
        <section className="border-l-4 border-[#746cad] pl-6">
          <h3 className="font-bold text-[#1c1c22] mb-3 font-inter">
            Our Ongoing Commitment
          </h3>
          <p className="text-[#747474] font-inter leading-relaxed">
            Accessibility is not a one-time effort but an ongoing commitment. We continuously monitor our website's
            accessibility, conduct regular audits, provide accessibility training for our team, and stay updated with
            the latest accessibility guidelines and best practices. We are dedicated to making our digital presence
            inclusive for all users.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
