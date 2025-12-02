import { MousePointerClick, PenLine, Sparkles } from 'lucide-react';

const steps = [
  {
    name: 'Select a Tool',
    description: 'Choose from our wide range of AI tools for writing, marketing, and SEO.',
    icon: MousePointerClick,
  },
  {
    name: 'Enter Details',
    description: 'Provide a few keywords or a short description of what you need.',
    icon: PenLine,
  },
  {
    name: 'Get Results',
    description: 'Watch as our AI generates high-quality content for you in seconds.',
    icon: Sparkles,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">How it works</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Generate content in 3 simple steps
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Our platform is designed to be intuitive and fast. You don't need to be an AI expert to get professional results.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {steps.map((step) => (
              <div key={step.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-violet-500/20 ring-1 ring-white/10">
                  <step.icon className="h-8 w-8" aria-hidden="true" />
                </div>
                  {step.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">{step.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
