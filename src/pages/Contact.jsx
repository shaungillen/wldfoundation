import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { H1, H2, H3, Lead, Body } from '@/components/ui/typography';
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Phone, Clock, ArrowRight } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
              Contact
            </span>
            <H1 className="mb-6">
              Get in Touch
            </H1>
            <Lead>
              We welcome inquiries about visiting the gallery, institutional 
              loans, press requests, and general information.
            </Lead>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-8 md:py-12">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-beige/30 p-6">
              <Mail className="w-8 h-8 text-olive mb-4" />
              <H3 className="mb-2">Email</H3>
              <a 
                href="mailto:info@wldfoundation.org" 
                className="text-charcoal/70 hover:text-olive transition-colors"
              >
                info@wldfoundation.org
              </a>
            </div>

            <div className="bg-beige/30 p-6">
              <Phone className="w-8 h-8 text-olive mb-4" />
              <H3 className="mb-2">Phone</H3>
              <a 
                href="tel:+19145551234" 
                className="text-charcoal/70 hover:text-olive transition-colors"
              >
                (914) 555-1234
              </a>
            </div>

            <div className="bg-beige/30 p-6">
              <MapPin className="w-8 h-8 text-olive mb-4" />
              <H3 className="mb-2">Location</H3>
              <p className="text-charcoal/70">
                Mount Kisco, New York
              </p>
            </div>

            <div className="bg-beige/30 p-6">
              <Clock className="w-8 h-8 text-olive mb-4" />
              <H3 className="mb-2">Office Hours</H3>
              <p className="text-charcoal/70">
                Monday – Friday<br />
                9:00 AM – 5:00 PM
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Specific Inquiries */}
      <section className="py-16 md:py-24 bg-beige/30">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <H2 className="mb-12">For Specific Inquiries</H2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 md:p-8 border border-charcoal/10">
              <H3 className="mb-4">Gallery Visits & Tours</H3>
              <Body className="mb-6">
                To schedule a visit to the Mount Kisco Gallery or book a 
                guided tour, please use our tour request form.
              </Body>
              <Button asChild variant="outline" className="border-charcoal/20">
                <Link to={createPageUrl('Tours')}>
                  Request a Tour
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>

            <div className="bg-white p-6 md:p-8 border border-charcoal/10">
              <H3 className="mb-4">Art Loan Inquiries</H3>
              <Body className="mb-6">
                Museums and cultural institutions interested in borrowing 
                from the collection should submit a formal loan inquiry.
              </Body>
              <Button asChild variant="outline" className="border-charcoal/20">
                <Link to={createPageUrl('LoanInquiry')}>
                  Submit Loan Inquiry
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>

            <div className="bg-white p-6 md:p-8 border border-charcoal/10">
              <H3 className="mb-4">Press & Media</H3>
              <Body className="mb-6">
                For press inquiries, interview requests, or media assets, 
                please contact our communications team.
              </Body>
              <a 
                href="mailto:press@wldfoundation.org"
                className="inline-flex items-center text-olive hover:underline"
              >
                press@wldfoundation.org
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>

            <div className="bg-white p-6 md:p-8 border border-charcoal/10">
              <H3 className="mb-4">Research & Scholarship</H3>
              <Body className="mb-6">
                Researchers and scholars seeking access to collection 
                records or study appointments should contact our curatorial team.
              </Body>
              <a 
                href="mailto:research@wldfoundation.org"
                className="inline-flex items-center text-olive hover:underline"
              >
                research@wldfoundation.org
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Response Time */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <H2 className="mb-6">Response Time</H2>
            <Body>
              We strive to respond to all inquiries within 2-3 business days. 
              For urgent matters, please indicate the time-sensitive nature 
              of your request in the subject line.
            </Body>
          </div>
        </div>
      </section>
    </div>
  );
}