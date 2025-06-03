import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Truck, Package, Clock, MapPin } from "lucide-react";

const shippingOptions = [
  {
    name: "Standard Shipping",
    price: "Free on orders $25+",
    time: "3-5 business days",
    description: "Perfect for regular orders with no rush"
  },
  {
    name: "Express Shipping",
    price: "$8.99",
    time: "2-3 business days",
    description: "Faster delivery for when you need it sooner"
  },
  {
    name: "Overnight Shipping",
    price: "$24.99",
    time: "1 business day",
    description: "Next day delivery for urgent orders"
  }
];

const internationalRates = [
  { region: "Canada", price: "$12.99", time: "7-14 business days" },
  { region: "United Kingdom", price: "$15.99", time: "7-14 business days" },
  { region: "European Union", price: "$18.99", time: "10-21 business days" },
  { region: "Australia", price: "$22.99", time: "10-21 business days" },
  { region: "Rest of World", price: "$25.99", time: "14-28 business days" }
];

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-16">
        {/* Breadcrumb */}
        <nav className="text-sm text-[#97979d] mb-8 font-inter">
          <Link href="/" className="hover:text-[#1c1c22]">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/help" className="hover:text-[#1c1c22]">Help</Link>
          <span className="mx-2">/</span>
          <span className="text-[#1c1c22]">Shipping</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1c1c22] mb-6 font-lato">
            Shipping Information
          </h1>
          <p className="text-xl text-[#747474] max-w-2xl mx-auto font-inter">
            Fast, reliable shipping to get your skincare essentials to you quickly.
          </p>
        </div>

        {/* Domestic Shipping Options */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-8 font-lato flex items-center">
            <Truck className="h-6 w-6 text-[#746cad] mr-3" />
            Domestic Shipping (US)
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {shippingOptions.map((option, index) => (
              <div key={index} className="border border-[#c1c0cb] rounded-lg p-6 hover:border-[#746cad] transition-colors">
                <h3 className="font-bold text-[#1c1c22] text-lg mb-2 font-inter">{option.name}</h3>
                <p className="text-2xl font-bold text-[#746cad] mb-2 font-inter">{option.price}</p>
                <p className="text-[#747474] mb-3 font-inter flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {option.time}
                </p>
                <p className="text-sm text-[#97979d] font-inter">{option.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* International Shipping */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-8 font-lato flex items-center">
            <MapPin className="h-6 w-6 text-[#746cad] mr-3" />
            International Shipping
          </h2>

          <div className="bg-[#efeff0] rounded-lg p-6 mb-6">
            <p className="text-[#747474] font-inter">
              We ship to over 50 countries worldwide. International orders may be subject to customs fees, duties, and taxes which are the responsibility of the customer.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border border-[#c1c0cb] rounded-lg overflow-hidden">
              <thead className="bg-[#efeff0]">
                <tr>
                  <th className="text-left p-4 font-bold text-[#1c1c22] font-inter">Region</th>
                  <th className="text-left p-4 font-bold text-[#1c1c22] font-inter">Shipping Cost</th>
                  <th className="text-left p-4 font-bold text-[#1c1c22] font-inter">Delivery Time</th>
                </tr>
              </thead>
              <tbody>
                {internationalRates.map((rate, index) => (
                  <tr key={index} className="border-t border-[#c1c0cb]">
                    <td className="p-4 font-inter text-[#1c1c22]">{rate.region}</td>
                    <td className="p-4 font-inter text-[#746cad] font-semibold">{rate.price}</td>
                    <td className="p-4 font-inter text-[#747474]">{rate.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Order Processing */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-8 font-lato flex items-center">
            <Package className="h-6 w-6 text-[#746cad] mr-3" />
            Order Processing
          </h2>

          <div className="space-y-6">
            <div className="border-l-4 border-[#746cad] pl-6">
              <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Processing Time</h3>
              <p className="text-[#747474] font-inter">
                Orders placed Monday-Friday before 2 PM EST ship the same day. Orders placed after 2 PM EST or on weekends ship the next business day.
              </p>
            </div>

            <div className="border-l-4 border-[#746cad] pl-6">
              <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Order Tracking</h3>
              <p className="text-[#747474] font-inter">
                Once your order ships, you'll receive a confirmation email with tracking information. You can also track your order in your account dashboard.
              </p>
            </div>

            <div className="border-l-4 border-[#746cad] pl-6">
              <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Packaging</h3>
              <p className="text-[#747474] font-inter">
                All orders are carefully packaged in recyclable materials to ensure your products arrive safely and minimize environmental impact.
              </p>
            </div>
          </div>
        </section>

        {/* Important Notes */}
        <section className="bg-[#efeff0] rounded-lg p-8">
          <h2 className="text-xl font-bold text-[#1c1c22] mb-4 font-lato">Important Notes</h2>
          <ul className="space-y-2 text-[#747474] font-inter">
            <li>• Free shipping applies to orders $25+ within the continental US only</li>
            <li>• PO Boxes and APO/FPO addresses are supported with standard shipping only</li>
            <li>• International customers are responsible for any customs duties or taxes</li>
            <li>• Delivery times do not include processing time</li>
            <li>• Shipping to Alaska and Hawaii may take additional time</li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
