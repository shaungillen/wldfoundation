import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { H2, Lead } from '@/components/ui/typography';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Mail, Calendar, Heart } from 'lucide-react';
import { toast } from 'sonner';

export default function GetInvolvedSection() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
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
    <section className="py-16 md:py-24 bg-beige/40">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
            Get Involved
          </span>
          <H2 className="mb-4">
            Join Our Community
          </H2>
          <Lead>
            Stay connected with the Foundation through our newsletter, 
            visit the gallery, or support our mission.
          </Lead>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {/* Newsletter */}
          <div className="bg-white p-6 md:p-8 border border-charcoal/10">
            <div className="w-12 h-12 rounded-full bg-olive/10 flex items-center justify-center mb-6">
              <Mail className="w-6 h-6 text-olive" />
            </div>
            <h3 className="font-serif text-xl text-charcoal mb-2">
              Newsletter
            </h3>
            <p className="text-sm text-charcoal/60 mb-6">
              Receive occasional updates on exhibitions, new acquisitions, 
              and foundation activities.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-charcoal/10"
                required
              />
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-charcoal hover:bg-charcoal/90 text-cream"
              >
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </div>

          {/* Book a Tour */}
          <div className="bg-white p-6 md:p-8 border border-charcoal/10">
            <div className="w-12 h-12 rounded-full bg-olive/10 flex items-center justify-center mb-6">
              <Calendar className="w-6 h-6 text-olive" />
            </div>
            <h3 className="font-serif text-xl text-charcoal mb-2">
              Visit the Gallery
            </h3>
            <p className="text-sm text-charcoal/60 mb-6">
              Schedule a guided tour of the Mount Kisco Gallery and 
              experience the collection in person.
            </p>
            <Button asChild variant="outline" className="w-full border-charcoal/20">
              <Link to={createPageUrl('Tours')}>
                Book a Tour
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          {/* Support Partners */}
          <div className="bg-white p-6 md:p-8 border border-charcoal/10">
            <div className="w-12 h-12 rounded-full bg-olive/10 flex items-center justify-center mb-6">
              <Heart className="w-6 h-6 text-olive" />
            </div>
            <h3 className="font-serif text-xl text-charcoal mb-2">
              Support Our Partners
            </h3>
            <p className="text-sm text-charcoal/60 mb-6">
              Learn about our longstanding partnership with Harlem Children's 
              Zone and other educational initiatives.
            </p>
            <Button asChild variant="outline" className="w-full border-charcoal/20">
              <Link to={createPageUrl('HarlemChildrensZone')}>
                Learn More
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}