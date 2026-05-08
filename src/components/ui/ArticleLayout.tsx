import EmergencyWarning from '@/components/layout/EmergencyWarning';
import GIQuestionsCard from '@/components/ui/GIQuestionsCard';
import RelatedArticles from '@/components/ui/RelatedArticles';
import CTAButton from '@/components/ui/CTAButton';

interface RelatedArticle {
  href: string;
  title: string;
}

interface ArticleLayoutProps {
  children: React.ReactNode;
  showEmergencyWarning?: boolean;
  relatedArticles?: RelatedArticle[];
  showGICard?: boolean;
  ctaHref?: string;
  ctaText?: string;
}

export default function ArticleLayout({
  children,
  showEmergencyWarning,
  relatedArticles,
  showGICard = true,
  ctaHref = '/uc-care-options-check',
  ctaText = 'Check My UC Care Options',
}: ArticleLayoutProps) {
  return (
    <main className="max-w-[800px] mx-auto px-6 py-12">
      {showEmergencyWarning && <EmergencyWarning />}
      <div className="prose-article">{children}</div>
      {showGICard && <GIQuestionsCard />}
      <div className="my-8 p-6 rounded-xl text-center" style={{ backgroundColor: '#E4F5F7' }}>
        <p className="text-sm mb-3" style={{ color: '#0B2545' }}>
          Want to understand your UC care options? Take our free 8-question check.
        </p>
        <CTAButton href={ctaHref} variant="primary" size="lg">
          {ctaText}
        </CTAButton>
        <p className="text-xs mt-2" style={{ color: '#5C5C56' }}>
          Educational guidance only. Not medical advice.
        </p>
      </div>
      {relatedArticles && relatedArticles.length > 0 && (
        <RelatedArticles articles={relatedArticles} />
      )}
    </main>
  );
}
