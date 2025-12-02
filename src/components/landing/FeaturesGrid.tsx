import { PenTool, Share2, Mail, ShoppingBag, Search, Zap } from 'lucide-react';

const features = [
  {
    name: 'Blog Post Writer',
    description: 'Generate SEO-optimized blog posts with perfect tone and structure in seconds.',
    icon: PenTool,
  },
  {
    name: 'Social Media Generator',
    description: 'Create engaging posts for Twitter, LinkedIn, Instagram, and Facebook.',
    icon: Share2,
  },
  {
    name: 'Email Writer',
    description: 'Draft professional emails, newsletters, and outreach campaigns effortlessly.',
    icon: Mail,
  },
  {
    name: 'Product Descriptions',
    description: 'Turn features into benefits with persuasive e-commerce copy.',
    icon: ShoppingBag,
  },
  {
    name: 'SEO Meta Tags',
    description: 'Boost your rankings with AI-generated titles and meta descriptions.',
    icon: Search,
  },
  {
    name: 'And many more...',
    description: 'Access a growing library of 50+ AI tools for every content need.',
    icon: Zap,
  },
];

export function FeaturesGrid() {
  return (
    <section id="features" className="py-16 sm:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Everything you need</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Powerful AI tools for every use case
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            From blog posts to social media captions, our platform has you covered.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                  <feature.icon className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
