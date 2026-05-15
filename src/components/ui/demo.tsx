import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Marquee } from '@/components/ui/3d-testimonails';

// Unique reviews data
const testimonials = [
  {
    name: 'Aisha Al-Qahtani',
    username: '@aisha.qa',
    body: 'My daughter started as a beginner and now plays with real confidence every week.',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80',
    country: 'Riyadh',
  },
  {
    name: 'Omar Al-Harbi',
    username: '@omar.h',
    body: 'Coach Amin fixed my serve timing in two sessions. The training is sharp and practical.',
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80',
    country: 'Al Olaya',
  },
  {
    name: 'Mariam Al-Dossari',
    username: '@mariam.d',
    body: 'The academy feels welcoming, organized, and serious about helping players improve.',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80',
    country: 'Riyadh',
  },
  {
    name: 'Abdullah Al-Rashid',
    username: '@abdullah.r',
    body: 'Great court energy and clear coaching. Every drill connects to real match play.',
    img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=160&q=80',
    country: 'King Fahd',
  },
  {
    name: 'Fatimah Al-Otaibi',
    username: '@fatimah.o',
    body: 'Private lessons helped me build consistency, footwork, and confidence on court.',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
    country: 'Riyadh',
  },
  {
    name: 'Yousef Al-Mutairi',
    username: '@yousef.m',
    body: 'The sessions are intense but friendly. Perfect place to take tennis seriously.',
    img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80',
    country: 'Al Malqa',
  },
  {
    name: 'Sara Al-Anazi',
    username: '@sara.a',
    body: 'Clean facilities, patient coaches, and a premium tennis atmosphere in the city.',
    img: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=160&q=80',
    country: 'Riyadh',
  },
  {
    name: 'Khalid Al-Zahrani',
    username: '@khalid.z',
    body: 'I joined for fitness and stayed for the coaching. The improvement is obvious.',
    img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&q=80',
    country: 'Al Yasmin',
  },
  {
    name: 'Noura Al-Faisal',
    username: '@noura.f',
    body: 'Fighters gives Riyadh tennis a fresh, focused, high-energy place to train.',
    img: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=160&q=80',
    country: 'Riyadh',
  },
];

function TestimonialCard({ img, name, username, body, country }: (typeof testimonials)[number]) {
  return (
    <Card className="w-50">
      <CardContent>
        <div className="flex items-center gap-2.5">
          <Avatar className="size-9">
            <AvatarImage src={img} alt={name} loading="lazy" decoding="async" fetchPriority="low" />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <figcaption className="text-sm font-medium text-foreground flex items-center gap-1">
              {name} <span className="text-xs">{country}</span>
            </figcaption>
            <p className="text-xs font-medium text-muted-foreground">{username}</p>
          </div>
        </div>
        <blockquote className="mt-3 text-sm text-secondary-foreground">{body}</blockquote>
      </CardContent>
    </Card>
  );
}

export default function DemoOne() {
  return (
    <div className="testimonials-demo-shell relative flex h-96 w-full flex-row items-center justify-center overflow-hidden gap-1.5 [perspective:300px]">
      <div
        className="testimonials-demo-rig flex flex-row items-center gap-4"
        style={{
          transform:
            'translateX(0px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)',
        }}
      >
        {/* Vertical Marquee (downwards) */}
        <Marquee vertical pauseOnHover repeat={3} className="[--duration:40s]">
          {testimonials.map((review) => (
            <TestimonialCard key={review.username} {...review} />
          ))}
        </Marquee>
        {/* Vertical Marquee (upwards) */}
        <Marquee vertical pauseOnHover reverse repeat={3} className="[--duration:40s]">
          {testimonials.map((review) => (
            <TestimonialCard key={review.username} {...review} />
          ))}
        </Marquee>
        {/* Vertical Marquee (upwards) */}
        <Marquee vertical pauseOnHover repeat={3} className="[--duration:40s]">
          {testimonials.map((review) => (
            <TestimonialCard key={review.username} {...review} />
          ))}
        </Marquee>
        {/* Vertical Marquee (upwards) */}
        <Marquee vertical pauseOnHover reverse repeat={3} className="[--duration:40s]">
          {testimonials.map((review) => (
            <TestimonialCard key={review.username} {...review} />
          ))}
        </Marquee>
        {/* Gradient overlays for vertical marquee */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
      </div>
    </div>
  );
}
