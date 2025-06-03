import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "Information We Collect",
    content: [
      "Personal Information: When you create an account, make a purchase, or contact us, we may collect information such as your name, email address, postal address, phone number, and payment information.",
      "Account Information: Username, password, purchase history, product reviews, and preferences.",
      "Automatically Collected Information: IP address, browser type, device information, pages visited, and interaction data through cookies and similar technologies.",
      "Communication Data: Records of your communications with us, including customer service interactions and survey responses."
    ]
  },
  {
    title: "How We Use Your Information",
    content: [
      "To process orders and provide customer service",
      "To personalize your shopping experience and recommend products",
      "To send marketing communications (with your consent)",
      "To improve our website, products, and services",
      "To detect and prevent fraud and security incidents",
      "To comply with legal obligations and enforce our terms"
    ]
  },
  {
    title: "Information Sharing",
    content: [
      "Service Providers: We share information with trusted third-party service providers who help us operate our business, such as payment processors, shipping companies, and email service providers.",
      "Business Transfers: In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new owner.",
      "Legal Requirements: We may disclose information when required by law, regulation, or court order, or to protect our rights and safety.",
      "Marketing Partners: With your consent, we may share limited information with marketing partners for promotional purposes."
    ]
  },
  {
    title: "Data Security",
    content: [
      "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
      "Payment information is processed through secure, PCI-compliant payment processors.",
      "We regularly review and update our security practices to maintain the highest standards of protection.",
      "However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security."
    ]
  },
  {
    title: "Your Rights and Choices",
    content: [
      "Access: You can request access to the personal information we hold about you.",
      "Correction: You can update or correct your personal information through your account settings.",
      "Deletion: You can request deletion of your personal information, subject to certain exceptions.",
      "Marketing Opt-out: You can unsubscribe from marketing emails by clicking the unsubscribe link or contacting us.",
      "Cookie Preferences: You can manage cookie preferences through your browser settings."
    ]
  },
  {
    title: "International Transfers",
    content: [
      "Your information may be transferred to and processed in countries other than your own, including the United States and the United Kingdom.",
      "We ensure appropriate safeguards are in place for international transfers, including adequacy decisions and standard contractual clauses.",
      "By using our services, you consent to the transfer of your information to these countries."
    ]
  },
  {
    title: "Children's Privacy",
    content: [
      "Our services are not intended for children under 13 years of age.",
      "We do not knowingly collect personal information from children under 13.",
      "If we become aware that we have collected information from a child under 13, we will take steps to delete it promptly."
    ]
  },
  {
    title: "Changes to This Policy",
    content: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices or for legal reasons.",
      "We will notify you of material changes by email or through a prominent notice on our website.",
      "Your continued use of our services after any changes constitutes acceptance of the updated policy."
    ]
  }
];

export default function PrivacyPage() {
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
          <span className="text-[#1c1c22]">Privacy Policy</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1c1c22] mb-6 font-lato">
            Privacy Policy
          </h1>
          <div className="bg-[#efeff0] rounded-lg p-6">
            <p className="text-[#747474] font-inter">
              <strong>Last Updated:</strong> March 1, 2024
            </p>
            <p className="text-[#747474] font-inter mt-4">
              At The INKEY List, we respect your privacy and are committed to protecting your personal information.
              This Privacy Policy explains how we collect, use, share, and protect your information when you use our website,
              mobile app, and services.
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
            Contact Us About Privacy
          </h2>
          <p className="text-[#747474] font-inter mb-6">
            If you have questions about this Privacy Policy or our privacy practices, please contact us:
          </p>
          <div className="space-y-2 text-[#747474] font-inter">
            <p><strong>Email:</strong> privacy@theinkeylist.com</p>
            <p><strong>Phone:</strong> 1-800-INKEY-LIST</p>
            <p><strong>Mail:</strong> The INKEY List Privacy Team<br/>
            123 Beauty Boulevard<br/>
            New York, NY 10001</p>
          </div>
        </section>

        {/* GDPR/CCPA Notice */}
        <section className="mt-12 border-l-4 border-[#746cad] pl-6">
          <h3 className="font-bold text-[#1c1c22] mb-3 font-inter">
            Additional Rights for EU and California Residents
          </h3>
          <p className="text-[#747474] font-inter leading-relaxed">
            If you are a resident of the European Union or California, you may have additional rights under the GDPR or CCPA.
            These include the right to know what personal information we collect, the right to delete your information,
            and the right to opt-out of the sale of personal information. For more information about these rights,
            please contact our privacy team using the information above.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
