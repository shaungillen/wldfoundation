import React from 'react';
import { H1, H2, H3, Body } from '@/components/ui/typography';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-cream">
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
            Legal
          </span>
          <H1 className="mb-8">Privacy Policy</H1>
          
          <div className="prose prose-charcoal max-w-none">
            <Body className="mb-8">
              Last updated: January 2025
            </Body>

            <H2 className="mt-12 mb-4">Information We Collect</H2>
            <Body className="mb-4">
              The William Louis-Dreyfus Foundation ("we," "our," or "the Foundation") 
              collects information you provide directly to us, including:
            </Body>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-charcoal/70">
              <li>Contact information (name, email, phone) when you request a tour or subscribe to our newsletter</li>
              <li>Institutional information when you submit a loan inquiry</li>
              <li>Usage data collected automatically when you browse our website</li>
            </ul>

            <H2 className="mt-12 mb-4">How We Use Your Information</H2>
            <Body className="mb-4">
              We use the information we collect to:
            </Body>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-charcoal/70">
              <li>Respond to your inquiries and fulfill your requests</li>
              <li>Send you newsletters and updates you have opted into</li>
              <li>Process and evaluate loan requests from institutions</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>

            <H2 className="mt-12 mb-4">Information Sharing</H2>
            <Body className="mb-6">
              We do not sell, trade, or otherwise transfer your personal information 
              to third parties. We may share information with service providers who 
              assist us in operating our website and conducting our activities, 
              subject to confidentiality agreements.
            </Body>

            <H2 className="mt-12 mb-4">Cookies</H2>
            <Body className="mb-6">
              Our website uses cookies to enhance your browsing experience and 
              analyze site traffic. You can control cookie preferences through 
              your browser settings. Essential cookies are necessary for site 
              functionality.
            </Body>

            <H2 className="mt-12 mb-4">Data Security</H2>
            <Body className="mb-6">
              We implement appropriate technical and organizational measures to 
              protect your personal information against unauthorized access, 
              alteration, disclosure, or destruction.
            </Body>

            <H2 className="mt-12 mb-4">Your Rights</H2>
            <Body className="mb-4">
              You have the right to:
            </Body>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-charcoal/70">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Unsubscribe from marketing communications at any time</li>
            </ul>

            <H2 className="mt-12 mb-4">Contact Us</H2>
            <Body className="mb-6">
              If you have questions about this Privacy Policy or wish to exercise 
              your rights, please contact us at:
            </Body>
            <Body>
              <strong>Email:</strong> privacy@wldfoundation.org<br />
              <strong>Address:</strong> William Louis-Dreyfus Foundation, Mount Kisco, NY
            </Body>
          </div>
        </div>
      </section>
    </div>
  );
}