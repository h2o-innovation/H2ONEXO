import { Navigation } from "@/components/landing/navigation";
import { IntroSlide } from "@/components/landing/intro-slide";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { InfrastructureSection } from "@/components/landing/infrastructure-section";
import { MetricsSection } from "@/components/landing/metrics-section";
import { IntegrationsSection } from "@/components/landing/integrations-section";
import { AiAguiSection } from "@/components/landing/ai-agui-section";
import { SecuritySection } from "@/components/landing/security-section";
import { DevelopersSection } from "@/components/landing/developers-section";
import { WebApplicationSection } from "@/components/landing/web-application-section";
import { FooterSection } from "@/components/landing/footer-section";
import { SectionReveal } from "@/components/landing/section-reveal";
import { SectionDotsNav } from "@/components/landing/section-dots-nav";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <IntroSlide />
      <Navigation />
      <SectionDotsNav />
      <SectionReveal>
        <HeroSection />
      </SectionReveal>
      <SectionReveal>
        <FeaturesSection />
      </SectionReveal>
      <SectionReveal>
        <HowItWorksSection />
      </SectionReveal>
      <SectionReveal>
        <InfrastructureSection />
      </SectionReveal>
      <SectionReveal>
        <MetricsSection />
      </SectionReveal>
      <SectionReveal>
        <IntegrationsSection />
      </SectionReveal>
      <SectionReveal>
        <SecuritySection />
      </SectionReveal>
      <SectionReveal>
        <DevelopersSection />
      </SectionReveal>
      <SectionReveal>
        <AiAguiSection />
      </SectionReveal>
      <SectionReveal>
        <WebApplicationSection />
      </SectionReveal>
      <SectionReveal>
        <FooterSection />
      </SectionReveal>
    </main>
  );
}
