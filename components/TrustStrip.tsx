export default function TrustStrip() {
  const items = [
    {
      icon: '🚚',
      title: 'Fast Delivery',
      desc: 'Express shipping across Pakistan',
    },
    {
      icon: '↩️',
      title: '14-Day Returns',
      desc: 'Hassle-free exchange policy',
    },
    {
      icon: '🛡️',
      title: 'Secure Payment',
      desc: 'COD, EasyPaisa & JazzCash',
    },
  ];

  return (
    <section className="bg-surface py-12 md:py-16">
      <div className="container-tight">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {items.map((item, idx) => (
            <div key={idx} className="text-center md:text-left flex flex-col items-center md:items-start">
              <div className="text-4xl md:text-5xl mb-4">{item.icon}</div>
              <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
