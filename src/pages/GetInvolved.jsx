import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { H1, H2, H3, Lead, Body } from '@/components/ui/typography';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Mail, Calendar, Heart, HandHeart, Landmark } from 'lucide-react';
import { toast } from 'sonner';

export default function GetInvolved() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    try {
      await base44.entities.NewsletterSubscription.create({ email });
      toast.success('Thank you for subscribing!');
      setEmail('');
    } catch (error) {
      toast.error('Unable to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
              Get Involved
            </span>
            <H1 className="mb-6">
              Join Our Community
            </H1>
            <Lead>
              There are many ways to engage with the Foundation—from visiting 
              the gallery to supporting our educational partners.
            </Lead>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 md:py-24 bg-beige/30">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Mail className="w-10 h-10 text-olive mb-6" />
              <H2 className="mb-4">Stay Connected</H2>
              <Body className="mb-6">
                Receive occasional updates on exhibitions, new acquisitions, 
                and foundation activities. We respect your inbox—expect 
                thoughtful, infrequent communications.
              </Body>
            </div>
            <div className="bg-white p-6 md:p-8 border border-charcoal/10">
              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-charcoal/20"
                  required
                />
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-charcoal hover:bg-charcoal/90 text-cream"
                >
                  Subscribe to Newsletter
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <p className="text-xs text-charcoal/50 text-center">
                  We never share your information. Unsubscribe anytime.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Visit */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 aspect-[4/3] bg-beige/50 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1577083300638-f9f0bfd4be7c?w=800&q=80"
                alt="Gallery interior"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <Calendar className="w-10 h-10 text-olive mb-6" />
              <H2 className="mb-4">Visit the Gallery</H2>
              <Body className="mb-6">
                Experience the collection in person at our Mount Kisco Gallery. 
                We offer guided tours for individuals, groups, and educational 
                institutions by appointment.
              </Body>
              <div className="flex flex-wrap gap-4">
                <Button asChild className="bg-charcoal hover:bg-charcoal/90 text-cream">
                  <Link to={createPageUrl('Tours')}>
                    Book a Tour
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-charcoal/20">
                  <Link to={createPageUrl('Gallery')}>
                    Visitor Information
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Harlem Children's Zone */}
      <section className="py-16 md:py-24 bg-charcoal text-cream">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Heart className="w-10 h-10 text-olive mb-6" />
              <H2 className="text-cream mb-4">Support Harlem Children's Zone</H2>
              <Body className="text-cream/70 mb-6">
                William Louis-Dreyfus was a longtime supporter of Harlem 
                Children's Zone, believing deeply in the power of education 
                to transform lives. The Foundation continues this commitment.
              </Body>
              <Body className="text-cream/70 mb-8">
                HCZ provides comprehensive support to children and families 
                in Central Harlem, from birth through college. Your support 
                makes a difference.
              </Body>
              <Button asChild className="bg-cream text-charcoal hover:bg-cream/90">
                <Link to={createPageUrl('HarlemChildrensZone')}>
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="aspect-[4/3] bg-cream/10 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80"
                alt="Education"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Loan Program */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/3] bg-beige/50 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80"
                alt="Museum exhibition"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <Landmark className="w-10 h-10 text-olive mb-6" />
              <H2 className="mb-4">Institutional Partnerships</H2>
              <Body className="mb-6">
                Museums, galleries, and cultural institutions are invited to 
                inquire about loans from our collection. We welcome 
                opportunities to share these works with new audiences.
              </Body>
              <Button asChild variant="outline" className="border-charcoal/20">
                <Link to={createPageUrl('LoanInquiry')}>
                  Submit a Loan Inquiry
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="py-16 md:py-24 bg-beige/30">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <HandHeart className="w-10 h-10 text-olive mx-auto mb-6" />
            <H2 className="mb-4">Support the Foundation</H2>
            <Body className="mb-8">
              The William Louis-Dreyfus Foundation is a 501(c)(3) nonprofit 
              organization. While our primary mission is stewardship rather 
              than fundraising, we welcome those who share our commitment to 
              art and education.
            </Body>
            <p className="text-sm text-charcoal/50">
              For information about supporting the Foundation, please contact 
              us at <a href="mailto:info@wldfoundation.org" className="text-olive hover:underline">
                info@wldfoundation.org
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}