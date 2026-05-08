interface Article {
  href: string;
  title: string;
}

interface RelatedArticlesProps {
  articles: Article[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  return (
    <div className="mt-10 pt-6" style={{ borderTop: '1px solid #E8E8E4' }}>
      <h3 className="font-bold text-base mb-3" style={{ color: '#0B2545' }}>Related articles</h3>
      <div className="flex flex-col gap-2">
        {articles.map((a) => (
          <a
            key={a.href}
            href={a.href}
            className="text-sm transition-colors hover:opacity-70"
            style={{ color: '#0E6B8E', textDecoration: 'underline' }}
          >
            {a.title} →
          </a>
        ))}
      </div>
    </div>
  );
}
