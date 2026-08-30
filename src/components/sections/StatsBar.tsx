const proofPoints = [
  {
    title: "Clear monthly reporting",
    description: "Understand where your business stands without wrestling with spreadsheets.",
  },
  {
    title: "Practical compliance support",
    description: "Stay organised around the accounting and tax work your business requires.",
  },
  {
    title: "South African SME focus",
    description: "Support shaped around the realities of running a growing local business.",
  },
  {
    title: "Human support",
    description: "Get clear answers when deadlines, documents, or decisions need attention.",
  },
];

export function StatsBar() {
  return (
    <section className="w-full bg-primary text-primary-foreground py-16 border-t border-primary/20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {proofPoints.map((point) => (
            <div
              key={point.title}
              className="flex flex-col items-center text-center md:px-6"
            >
              <h3 className="text-xl md:text-2xl font-extrabold mb-3 text-secondary">
                {point.title}
              </h3>
              <p className="text-sm leading-relaxed opacity-80 max-w-xs">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}