import SectionReveal from './SectionReveal';

const reviews = [
  {
    name: 'Hira',
    accent: 'from-[#f2d9d0] to-[#c9856a]',
    text: 'The fabric looked even better in person — so soft and pretty.',
  },
  {
    name: 'Mahnoor',
    accent: 'from-[#fdf8f3] to-[#c8a96e]',
    text: 'Got my order in time for dholki and it felt so luxe.',
  },
  {
    name: 'Zainab',
    accent: 'from-[#e9c7d2] to-[#c9856a]',
    text: 'Obsessed with the fit. It gave exactly the Pinterest vibe.',
  },
  {
    name: 'Fatima',
    accent: 'from-[#f2d9d0] to-[#edddd4]',
    text: 'The details are gorgeous and the color is even softer IRL.',
  },
  {
    name: 'Sara',
    accent: 'from-[#c8a96e] to-[#fdf8f3]',
    text: 'My friends asked where it was from before the night even ended.',
  },
];

export default function TrustStrip() {
  return (
    <SectionReveal className="section-shell">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="pill-soft mb-4 border-rose/25 bg-blush/70 text-rose">
            Real Girls. Real Fits.
          </p>
          <h2 className="section-heading">What Girls Are Saying</h2>
          <p className="section-subtitle mt-4">4.9/5 from 500+ orders 💗</p>
        </div>

        <div className="mt-10 flex gap-4 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {reviews.map((review) => (
            <article
              key={review.name}
              className="card-soft min-w-[18rem] flex-1 snap-start px-5 py-5"
            >
              <div className="flex items-start gap-4">
                <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${review.accent}`} />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-ink">{review.name}</h3>
                    <span className="text-rose">★★★★★</span>
                  </div>
                  <p className="mt-2 text-sm text-muted">{review.text}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
