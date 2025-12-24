import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { H1, H2, H3, Lead, Body } from '@/components/ui/typography';
import { Button } from "@/components/ui/button";
import { Mail, Phone } from 'lucide-react';

export default function Accessibility() {
  return (
    <div className="min-h-screen bg-cream">
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
            Accessibility
          </span>
          <H1 className="mb-6">Our Commitment to Accessibility</H1>
          <Lead className="mb-12">
            The William Louis-Dreyfus Foundation is committed to ensuring 
            digital accessibility for people with disabilities. We continually 
            work to improve the user experience for everyone.
          </Lead>

          <div className="space-y-12">
            <div>
              <H2 className="mb-4">Website Accessibility</H2>
              <Body className="mb-4">
                We strive to make our website accessible to all visitors, including 
                those who use assistive technologies. Our website incorporates:
              </Body>
              <ul className="list-disc pl-6 space-y-2 text-charcoal/70">
                <li>Semantic HTML structure for screen reader compatibility</li>
                <li>Keyboard navigation support throughout the site</li>
                <li>Alternative text for images</li>
                <li>Sufficient color contrast ratios</li>
                <li>Resizable text and responsive design</li>
                <li>Skip links for main content navigation</li>
                <li>Clear, consistent navigation patterns</li>
              </ul>
            </div>

            <div>
              <H2 className="mb-4">Gallery Accessibility</H2>
              <Body className="mb-4">
                Our Mount Kisco Gallery is committed to welcoming all visitors:
              </Body>
              <ul className="list-disc pl-6 space-y-2 text-charcoal/70">
                <li>The gallery is wheelchair accessible</li>
                <li>Service animals are welcome</li>
                <li>Accessible restrooms are available</li>
                <li>Large-print materials are available upon request</li>
                <li>We can accommodate extended visit times for those who need them</li>
              </ul>
              <Body className="mt-4">
                When booking a tour, please let us know about any accessibility 
                requirements so we can ensure your visit is comfortable.
              </Body>
            </div>

            <div>
              <H2 className="mb-4">Virtual Tour Accessibility</H2>
              <Body className="mb-4">
                Our virtual tour experience includes:
              </Body>
              <ul className="list-disc pl-6 space-y-2 text-charcoal/70">
                <li>Audio descriptions of artworks</li>
                <li>Keyboard-navigable interface</li>
                <li>Text transcripts for audio content</li>
                <li>Adjustable playback speeds</li>
              </ul>
            </div>

            <div>
              <H2 className="mb-4">Ongoing Improvements</H2>
              <Body>
                We regularly review and test our website and facilities to 
                identify and address accessibility barriers. As technology 
                and best practices evolve, we continue to update our 
                accessibility features.
              </Body>
            </div>

            <div className="bg-beige/30 p-6 md:p-8">
              <H2 className="mb-4">Need Assistance?</H2>
              <Body className="mb-6">
                If you encounter any accessibility barriers or need 
                accommodations, please contact us. We are committed to 
                providing accessible experiences for all visitors.
              </Body>
              <div className="space-y-3">
                <a 
                  href="mailto:accessibility@wldfoundation.org"
                  className="flex items-center text-olive hover:underline"
                >
                  <Mail className="w-5 h-5 mr-3" />
                  accessibility@wldfoundation.org
                </a>
                <a 
                  href="tel:+19145551234"
                  className="flex items-center text-olive hover:underline"
                >
                  <Phone className="w-5 h-5 mr-3" />
                  (914) 555-1234
                </a>
              </div>
            </div>

            <div>
              <H2 className="mb-4">Feedback</H2>
              <Body>
                We welcome your feedback on the accessibility of our website 
                and gallery. If you have suggestions for improving accessibility, 
                please contact us using the information above.
              </Body>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}