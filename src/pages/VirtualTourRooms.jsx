import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { H1, H2, H3, Body, Lead } from '@/components/ui/typography';
import { Button } from "@/components/ui/button";
import { MapPin, X, ArrowRight } from 'lucide-react';
import ArtworkCard from '@/components/cards/ArtworkCard';
import Modal from '@/components/modals/Modal';
import ArtworkModal from '@/components/modals/ArtworkModal';
import { getArtworksByRoomId } from '@/components/data/mockData';

const rooms = [
  {
    id: 'main-gallery',
    name: 'Main Gallery',
    number: 1,
    description: 'Large-scale paintings and installations occupy this expansive space, designed for contemplation and immersion.',
    image: 'https://wldfoundation.org/images/gallery/MKG_005.jpg',
    category: 'painting',
  },
  {
    id: 'study-room',
    name: 'Study Room',
    number: 2,
    description: 'An intimate space dedicated to works on paper, photography, and smaller pieces that invite close viewing.',
    image: 'https://images.unsplash.com/photo-1577083300638-f9f0bfd4be7c?w=800&q=80',
    category: 'works_on_paper',
  },
  {
    id: 'sculpture-court',
    name: 'Sculpture Court',
    number: 3,
    description: 'Three-dimensional works are showcased in natural light, allowing viewers to experience sculpture from multiple angles.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
    category: 'sculpture',
  },
];

export default function VirtualTourRooms() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const navigate = useNavigate();
  const { artworkId } = useParams();

  const handleArtworkClick = (artworkId) => {
    navigate(`/visit/gallery/virtual-tour/${artworkId}`);
  };

  const handleCloseArtworkModal = () => {
    navigate('/visit/gallery/virtual-tour');
  };

  const room = selectedRoom ? rooms.find(r => r.id === selectedRoom) : null;
  const roomWorks = room ? getArtworksByRoomId(room.id) : [];

  return (
    <div className="min-h-screen bg-cream">
      <Modal 
        isOpen={!!artworkId} 
        onClose={handleCloseArtworkModal}
        size="xl"
      >
        {artworkId && <ArtworkModal artworkId={artworkId} />}
      </Modal>

      {/* Hero */}
      <section className="py-12 md:py-20">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Link 
                to={createPageUrl('VisitHub')}
                className="text-xs uppercase tracking-[0.2em] text-olive hover:underline"
              >
                Visit
              </Link>
              <span className="text-charcoal/30">/</span>
              <Link 
                to={createPageUrl('VisitGallery')}
                className="text-xs uppercase tracking-[0.2em] text-olive hover:underline"
              >
                Gallery
              </Link>
              <span className="text-charcoal/30">/</span>
              <span className="text-xs uppercase tracking-[0.2em] text-charcoal/60">
                Virtual Tour
              </span>
            </div>
            <H1 className="mb-6">
              Virtual Gallery Tour
            </H1>
            <Lead>
              Explore the Mount Kisco Gallery room by room. Click on any room to see the works currently on display.
            </Lead>
          </div>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {rooms.map((room) => {
              const works = getArtworksByRoomId(room.id);
              return (
                <button
                  key={room.id}
                  onClick={() => setSelectedRoom(room.id)}
                  className="group text-left bg-white border border-charcoal/10 hover:border-olive/30 transition-colors overflow-hidden"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-beige/30">
                    <img 
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-olive/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-olive text-sm font-medium">{room.number}</span>
                      </div>
                      <H3>{room.name}</H3>
                    </div>
                    <Body className="text-sm mb-4">{room.description}</Body>
                    <div className="flex items-center gap-2 text-sm text-olive">
                      <MapPin className="w-4 h-4" />
                      <span>{works.length} {works.length === 1 ? 'work' : 'works'} on view</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Room Detail Panel (Inline) */}
      {selectedRoom && room && (
        <section className="fixed inset-0 z-40 bg-neutral-900/80 backdrop-blur-sm overflow-y-auto">
          <div className="min-h-screen w-full flex items-start justify-center p-4 md:p-8">
            <div className="relative w-full max-w-6xl bg-cream shadow-2xl my-8">
              {/* Close button */}
              <button
                onClick={() => setSelectedRoom(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-cream hover:bg-beige/50 text-charcoal/60 hover:text-charcoal transition-colors shadow-sm"
                aria-label="Close room detail"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Room Header */}
              <div className="p-6 md:p-8 lg:p-12 border-b border-charcoal/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-olive/20 flex items-center justify-center">
                    <span className="text-olive text-lg font-medium">{room.number}</span>
                  </div>
                  <div>
                    <H2>{room.name}</H2>
                    <p className="text-charcoal/60">{roomWorks.length} {roomWorks.length === 1 ? 'work' : 'works'} in this room</p>
                  </div>
                </div>
                <Body>{room.description}</Body>
              </div>

              {/* Works in Room */}
              <div className="p-6 md:p-8 lg:p-12">
                {roomWorks.length > 0 ? (
                  <div>
                    <h3 className="font-serif text-xl text-charcoal mb-6">Works in this Room</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                      {roomWorks.map((artwork) => (
                        <div
                          key={artwork.id}
                          onClick={() => handleArtworkClick(artwork.id)}
                          className="cursor-pointer"
                        >
                          <ArtworkCard artwork={artwork} showStatus={false} />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="py-12 text-center bg-beige/30">
                    <Body className="text-charcoal/60">
                      No works currently assigned to this room.
                    </Body>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 md:py-24 bg-beige/30">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 text-center">
          <H2 className="mb-6">Prefer an In-Person Visit?</H2>
          <Lead className="mb-8 max-w-2xl mx-auto">
            Schedule a guided tour of the Mount Kisco Gallery and experience 
            the collection with curatorial guidance.
          </Lead>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild className="bg-charcoal hover:bg-charcoal/90 text-cream">
              <Link to={createPageUrl('Tours')}>
                Book a Tour
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-charcoal/20">
              <Link to={createPageUrl('VisitGallery')}>
                Gallery Information
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}