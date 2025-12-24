import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';
import { H1, H2, Lead, Body } from '@/components/ui/typography';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CheckCircle, Landmark } from 'lucide-react';
import { toast } from 'sonner';

export default function LoanInquiry() {
  const [formData, setFormData] = useState({
    institution_name: '',
    contact_name: '',
    contact_email: '',
    contact_title: '',
    exhibition_title: '',
    exhibition_dates: '',
    requested_artworks: '',
    exhibition_context: '',
    venue_details: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: (data) => base44.entities.LoanInquiry.create(data),
    onSuccess: () => {
      setSubmitted(true);
      toast.success('Inquiry submitted successfully');
    },
    onError: () => {
      toast.error('Unable to submit inquiry. Please try again.');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Back Link */}
      <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8 py-6">
        <Link 
          to={createPageUrl('ArtLoanProgram')}
          className="inline-flex items-center text-sm text-charcoal/60 hover:text-charcoal transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Art Loan Program
        </Link>
      </div>

      {/* Hero */}
      <section className="pb-12 md:pb-16">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          <Landmark className="w-10 h-10 text-olive mb-6" />
          <H1 className="mb-6">
            Loan Inquiry
          </H1>
          <Lead>
            Museums, galleries, and cultural institutions are invited to 
            submit inquiries about borrowing works from the collection.
          </Lead>
        </div>
      </section>

      {/* Form */}
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          {submitted ? (
            <div className="bg-olive/10 p-8 md:p-12 text-center">
              <CheckCircle className="w-16 h-16 text-olive mx-auto mb-6" />
              <H2 className="mb-4">Inquiry Received</H2>
              <Body className="mb-8">
                Thank you for your interest in borrowing from the collection. 
                Our team will review your inquiry and respond within 10 business 
                days. For complex requests, the review process may take longer.
              </Body>
              <Button asChild variant="outline" className="border-charcoal/20">
                <Link to={createPageUrl('ArtLoanProgram')}>
                  Return to Art Loan Program
                </Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="bg-beige/30 p-6 mb-8">
                <Body>
                  Please provide as much detail as possible about your exhibition 
                  plans. This helps us evaluate the request and respond appropriately. 
                  All fields marked with * are required.
                </Body>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Institution Info */}
                <div>
                  <h3 className="font-serif text-xl text-charcoal mb-4">Institution Information</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="institution_name">Institution Name *</Label>
                      <Input
                        id="institution_name"
                        value={formData.institution_name}
                        onChange={(e) => updateField('institution_name', e.target.value)}
                        required
                        className="border-charcoal/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="venue_details">Venue Details</Label>
                      <Textarea
                        id="venue_details"
                        value={formData.venue_details}
                        onChange={(e) => updateField('venue_details', e.target.value)}
                        placeholder="Gallery dimensions, climate control, security measures, insurance..."
                        className="border-charcoal/20 min-h-[80px]"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div>
                  <h3 className="font-serif text-xl text-charcoal mb-4">Contact Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact_name">Contact Name *</Label>
                      <Input
                        id="contact_name"
                        value={formData.contact_name}
                        onChange={(e) => updateField('contact_name', e.target.value)}
                        required
                        className="border-charcoal/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact_title">Title / Position</Label>
                      <Input
                        id="contact_title"
                        value={formData.contact_title}
                        onChange={(e) => updateField('contact_title', e.target.value)}
                        className="border-charcoal/20"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="contact_email">Email *</Label>
                      <Input
                        id="contact_email"
                        type="email"
                        value={formData.contact_email}
                        onChange={(e) => updateField('contact_email', e.target.value)}
                        required
                        className="border-charcoal/20"
                      />
                    </div>
                  </div>
                </div>

                {/* Exhibition Info */}
                <div>
                  <h3 className="font-serif text-xl text-charcoal mb-4">Exhibition Information</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="exhibition_title">Exhibition Title (if known)</Label>
                      <Input
                        id="exhibition_title"
                        value={formData.exhibition_title}
                        onChange={(e) => updateField('exhibition_title', e.target.value)}
                        className="border-charcoal/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="exhibition_dates">Proposed Exhibition Dates</Label>
                      <Input
                        id="exhibition_dates"
                        value={formData.exhibition_dates}
                        onChange={(e) => updateField('exhibition_dates', e.target.value)}
                        placeholder="e.g., September 2025 – January 2026"
                        className="border-charcoal/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="requested_artworks">Requested Works *</Label>
                      <Textarea
                        id="requested_artworks"
                        value={formData.requested_artworks}
                        onChange={(e) => updateField('requested_artworks', e.target.value)}
                        placeholder="Please list specific works or artists you are interested in..."
                        required
                        className="border-charcoal/20 min-h-[100px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="exhibition_context">Exhibition Context & Purpose *</Label>
                      <Textarea
                        id="exhibition_context"
                        value={formData.exhibition_context}
                        onChange={(e) => updateField('exhibition_context', e.target.value)}
                        placeholder="Please describe the exhibition's theme, scholarly context, and how the requested works would be presented..."
                        required
                        className="border-charcoal/20 min-h-[150px]"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    disabled={mutation.isPending}
                    className="w-full md:w-auto bg-charcoal hover:bg-charcoal/90 text-cream"
                  >
                    {mutation.isPending ? 'Submitting...' : 'Submit Inquiry'}
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </section>
    </div>
  );
}