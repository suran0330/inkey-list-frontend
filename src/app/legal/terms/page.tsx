import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "Acceptance of Terms",
    content: [
      "By accessing or using The INKEY List website, mobile application, or any of our services, you agree to be bound by these Terms of Service and all applicable laws and regulations.",
      "If you do not agree with any of these terms, you are prohibited from using or accessing our services.",
      "These terms apply to all visitors, users, and others who access or use our services."
    ]
  },
  {
    title: "Use License and Restrictions",
    content: [
      "We grant you a limited, non-exclusive, non-transferable license to access and use our services for personal, non-commercial purposes.",
      "You may not: (a) modify or copy our materials; (b) use materials for commercial purposes; (c) attempt to reverse engineer any software; (d) remove copyright or proprietary notations.",
      "This license shall automatically terminate if you violate any of these restrictions and may be terminated by us at any time.",
      "Upon termination, you must destroy any downloaded materials in your possession."
    ]
  },
  {
    title: "Account Registration",
    content: [
      "To access certain features, you must register for an account and provide accurate, complete information.",
      "You are responsible for maintaining the confidentiality of your account credentials.",
      "You agree to notify us immediately of any unauthorized use of your account.",
      "We reserve the right to suspend or terminate accounts that violate these terms."
    ]
  },
  {
    title: "Product Information and Pricing",
    content: [
      "We strive to provide accurate product descriptions and pricing, but errors may occur.",
      "All prices are subject to change without notice.",
      "We reserve the right to correct any errors, inaccuracies, or omissions and to change information at any time.",
      "Product availability is subject to change and we cannot guarantee that items will remain in stock."
    ]
  },
  {
    title: "Orders and Payment",
    content: [
      "All orders are subject to acceptance and availability.",
      "We reserve the right to refuse or cancel any order for any reason.",
      "Payment must be made in full before order processing.",
      "You represent that you have the legal right to use any payment method provided."
    ]
  },
  {
    title: "Shipping and Returns",
    content: [
      "Shipping terms and costs are detailed on our shipping information page.",
      "Risk of loss and title pass to you upon delivery to the carrier.",
      "Returns are subject to our return policy, which forms part of these terms.",
      "We are not responsible for delayed or undelivered packages due to carrier issues."
    ]
  },
  {
    title: "User Content and Reviews",
    content: [
      "You may submit reviews, comments, and other content, subject to our content guidelines.",
      "By submitting content, you grant us a perpetual, royalty-free license to use, modify, and display such content.",
      "You are solely responsible for your content and must not post anything unlawful, harmful, or infringing.",
      "We reserve the right to remove any content that violates these terms."
    ]
  },
  {
    title: "Intellectual Property",
    content: [
      "All content on our website, including text, graphics, logos, and software, is our property or licensed to us.",
      "Our trademarks and trade names may not be used without our written permission.",
      "Any unauthorized use of our intellectual property may violate copyright, trademark, and other laws.",
      "We respect the intellectual property rights of others and expect users to do the same."
    ]
  },
  {
    title: "Disclaimers and Limitations",
    content: [
      "Our services are provided 'as is' without warranties of any kind, either express or implied.",
      "We do not warrant that our services will be uninterrupted, error-free, or free of viruses.",
      "Our total liability for any claim arising from these terms shall not exceed the amount paid for the relevant product or service.",
      "Some jurisdictions do not allow certain disclaimers, so some of the above may not apply to you."
    ]
  },
  {
    title: "Indemnification",
    content: [
      "You agree to indemnify and hold harmless The INKEY List from any claims arising from your use of our services.",
      "This includes claims related to your violation of these terms or infringement of any rights.",
      "We reserve the right to assume exclusive defense of any matter subject to indemnification."
    ]
  },
  {
    title: "Privacy and Data Protection",
    content: [
      "Your privacy is important to us. Please review our Privacy Policy for information about how we collect and use your data.",
      "By using our services, you consent to the collection and use of information as described in our Privacy Policy.",
      "We implement appropriate security measures to protect your personal information."
    ]
  },
  {
    title: "Governing Law and Disputes",
    content: [
      "These terms are governed by the laws of New York, without regard to conflict of law provisions.",
      "Any disputes arising from these terms shall be resolved through binding arbitration.",
      "You waive any right to participate in class action lawsuits or class-wide arbitration.",
      "If arbitration is not enforceable, disputes shall be resolved in the courts of New York."
    ]
  },
  {
    title: "Changes to Terms",
    content: [
      "We reserve the right to modify these terms at any time.",
      "Changes will be effective immediately upon posting to our website.",
      "Your continued use of our services after changes constitutes acceptance of the new terms.",
      "We encourage you to review these terms periodically for updates."
    ]
  }
];

export default function TermsPage() {
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
          <span className="text-[#1c1c22]">Terms of Service</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1c1c22] mb-6 font-lato">
            Terms of Service
          </h1>
          <div className="bg-[#efeff0] rounded-lg p-6">
            <p className="text-[#747474] font-inter">
              <strong>Last Updated:</strong> March 1, 2024
            </p>
            <p className="text-[#747474] font-inter mt-4">
              These Terms of Service ("Terms") govern your use of The INKEY List website and services.
              By using our services, you agree to these terms. Please read them carefully.
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {sections.map((section, index) => (
            <section key={index}>
              <h2 className="text-2xl font-bold text-[#1c1c22] mb-6 font-lato">
                {index + 1}. {section.title}
              </h2>
              <div className="space-y-4">
                {section.content.map((paragraph, idx) => (
                  <p key={idx} className="text-[#747474] font-inter leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Contact Information */}
        <section className="mt-16 bg-[#efeff0] rounded-lg p-8">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-4 font-lato">
            Questions About These Terms?
          </h2>
          <p className="text-[#747474] font-inter mb-6">
            If you have questions about these Terms of Service, please contact us:
          </p>
          <div className="space-y-2 text-[#747474] font-inter">
            <p><strong>Email:</strong> legal@theinkeylist.com</p>
            <p><strong>Phone:</strong> 1-800-INKEY-LIST</p>
            <p><strong>Mail:</strong> The INKEY List Legal Department<br/>
            123 Beauty Boulevard<br/>
            New York, NY 10001</p>
          </div>
        </section>

        {/* Summary Box */}
        <section className="mt-12 border-l-4 border-[#746cad] pl-6">
          <h3 className="font-bold text-[#1c1c22] mb-3 font-inter">
            Terms Summary (Not Legally Binding)
          </h3>
          <p className="text-[#747474] font-inter leading-relaxed">
            In simple terms: Use our website responsibly, don't copy our content, provide accurate information when ordering,
            follow our return policy, and respect others' rights. We'll do our best to provide great products and service,
            but we can't guarantee everything will be perfect. If there are disputes, we'll work to resolve them fairly.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
