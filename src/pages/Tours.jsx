import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation } from '@tanstack/react-query';
import { H1, H2, H3, Lead, Body } from '@/components/ui/typography';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, MapPin, Monitor, Users, ArrowRight, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const tourTypes = [
  {
    id: 'in_person',
    icon: MapPin,
    title: 'Gallery Tours',
    description: 'Visit the Mount Kisco Gallery for an intimate experience of the collection. Tours are offered Tuesday through Saturday by appointment.',
    duration: '90 minutes',
    capacity: 'Up to 10 guests',
  },
  {
    id: 'virtual',
    icon: Monitor,
    title: 'Virtual Tours',
    description: 'Experience the collection from anywhere with our guided virtual tours. Perfect for educational groups, distant visitors, or preview visits.',
    duration: '60 minutes',
    capacity: 'Unlimited',
  },
  {
    id: 'thematic',
    icon: Users,
    title: 'Thematic Tours',
    description: 'Specialized tours focusing on particular themes, movements, or aspects of the collection. Ideal for academic groups and specialized interests.',
    duration: '2 hours',
    capacity: 'Up to 15 guests',
  },
];

export default function Tours() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    tour_type: '',
    preferred_date: '',
    alternate_date: '',
    group_size: '',
    special_interests: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: (data) => base44.entities.TourRequest.create(data),
    onSuccess: () => {
      setSubmitted(true);
      toast.success('Tour request submitted successfully');
    },
    onError: () => {
      toast.error('Unable to submit request. Please try again.');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      ...formData,
      group_size: parseInt(formData.group_size) || 1,
    });
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
              Tours
            </span>
            <H1 className="mb-6">
              Experience the Collection
            </H1>
            <Lead>
              Whether in person at our Mount Kisco Gallery or through our 
              virtual programs, we offer multiple ways to engage with the 
              collection.
            </Lead>
          </div>
        </div>
      </section>

      {/* Tour Types */}
      <section className="py-8 md:py-12">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {tourTypes.map((tour) => (
              <div 
                key={tour.id}
                className="bg-white p-6 md:p-8 border border-charcoal/10"
              >
                <tour.icon className="w-8 h-8 text-olive mb-4" />
                <H3 className="mb-2">{tour.title}</H3>
                <Body className="mb-4">{tour.description}</Body>
                <div className="space-y-1 text-sm text-charcoal/60">
                  <p><span className="font-medium">Duration:</span> {tour.duration}</p>
                  <p><span className="font-medium">Capacity:</span> {tour.capacity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Tour Preview */}
      <section className="py-16 md:py-24 bg-beige/30">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-video bg-charcoal/10 overflow-hidden relative group">
              <img 
                src="https://images.unsplash.com/photo-1577083300638-f9f0bfd4be7c?w=1200&q=80"
                alt="Virtual tour preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-charcoal/30 flex items-center justify-center">
                <Link
                  to={createPageUrl('VirtualTour')}
                  className="w-20 h-20 rounded-full bg-cream/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
                >
                  <span className="text-2xl">▶</span>
                </Link>
              </div>
            </div>
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
                Virtual Experience
              </span>
              <H2 className="mb-6">Explore from Anywhere</H2>
              <Body className="mb-6">
                Our immersive 360° virtual tour allows you to navigate the 
                gallery at your own pace. Each work includes detailed 
                information, and optional audio guides provide curatorial 
                context.
              </Body>
              <Button asChild className="bg-charcoal hover:bg-charcoal/90 text-cream">
                <Link to={createPageUrl('VirtualTour')}>
                  Start Virtual Tour
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Request Form */}
      <section className="py-16 md:py-24 bg-cream" id="request-form">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
                Book a Tour
              </span>
              <H2 className="mb-4">Request a Visit</H2>
              <Body>
                Complete the form below to request a tour. We'll respond 
                within 2 business days to confirm availability.
              </Body>
            </div>

            {submitted ? (
              <div className="bg-olive/10 p-8 text-center">
                <CheckCircle className="w-12 h-12 text-olive mx-auto mb-4" />
                <H3 className="mb-2">Request Received</H3>
                <Body>
                  Thank you for your interest. We'll be in touch within 
                  2 business days to confirm your tour.
                </Body>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      required
                      className="border-charcoal/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      required
                      className="border-charcoal/20"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      className="border-charcoal/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization</Label>
                    <Input
                      id="organization"
                      value={formData.organization}
                      onChange={(e) => updateField('organization', e.target.value)}
                      className="border-charcoal/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tour_type">Tour Type *</Label>
                  <Select
                    value={formData.tour_type}
                    onValueChange={(v) => updateField('tour_type', v)}
                    required
                  >
                    <SelectTrigger className="border-charcoal/20">
                      <SelectValue placeholder="Select tour type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in_person">In-Person Gallery Tour</SelectItem>
                      <SelectItem value="virtual">Virtual Tour</SelectItem>
                      <SelectItem value="thematic">Thematic Tour</SelectItem>
                      <SelectItem value="group">Group/Educational Visit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="preferred_date">Preferred Date *</Label>
                    <Input
                      id="preferred_date"
                      type="date"
                      value={formData.preferred_date}
                      onChange={(e) => updateField('preferred_date', e.target.value)}
                      required
                      className="border-charcoal/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="alternate_date">Alternate Date</Label>
                    <Input
                      id="alternate_date"
                      type="date"
                      value={formData.alternate_date}
                      onChange={(e) => updateField('alternate_date', e.target.value)}
                      className="border-charcoal/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="group_size">Group Size</Label>
                  <Input
                    id="group_size"
                    type="number"
                    min="1"
                    max="20"
                    value={formData.group_size}
                    onChange={(e) => updateField('group_size', e.target.value)}
                    placeholder="Number of visitors"
                    className="border-charcoal/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="special_interests">Special Interests or Accessibility Needs</Label>
                  <Textarea
                    id="special_interests"
                    value={formData.special_interests}
                    onChange={(e) => updateField('special_interests', e.target.value)}
                    placeholder="Tell us about any particular interests, artists, or accessibility requirements..."
                    className="border-charcoal/20 min-h-[100px]"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={mutation.isPending}
                  className="w-full bg-charcoal hover:bg-charcoal/90 text-cream"
                >
                  {mutation.isPending ? 'Submitting...' : 'Submit Request'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}