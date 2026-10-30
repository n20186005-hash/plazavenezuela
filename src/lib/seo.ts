import { siteInfo } from '../data/site';
import { TOPIC_GROUP_LABELS, type Topic } from '../data/topics';

// JSON-LD for topic/guide pages. These pages are informational articles about a place,
// route or theme; they deliberately do NOT carry TouristAttraction aggregateRating.
// The homepage owns the attraction entity (#attraction) and the site node (#website).

export function topicBreadcrumb(siteBase: string, topic: Topic, canonical: string) {
  const label = TOPIC_GROUP_LABELS[topic.group];
  const groupAnchor = `${siteBase}/#guias`;
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${siteBase}/` },
      { '@type': 'ListItem', position: 2, name: label, item: groupAnchor },
      { '@type': 'ListItem', position: 3, name: topic.content!.h1, item: canonical }
    ]
  };
}

export function topicArticle(siteBase: string, topic: Topic, canonical: string) {
  const c = topic.content!;
  return {
    '@type': 'Article',
    '@id': `${canonical}#article`,
    headline: c.h1,
    description: c.metaDescription,
    inLanguage: 'es-VE',
    isPartOf: { '@id': `${siteBase}/#website` },
    mainEntity: { '@type': 'TouristAttraction', '@id': `${siteBase}/#attraction` },
    dateModified: c.updated,
    publisher: { '@type': 'Organization', name: siteInfo.name, url: `${siteBase}/` }
  };
}

export function topicFaq(faqs: { q: string; a: string }[]) {
  if (!faqs || !faqs.length) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  };
}

export function topicJsonLd(siteBase: string, topic: Topic, canonical: string): Record<string, unknown>[] {
  const nodes = [
    topicBreadcrumb(siteBase, topic, canonical),
    topicArticle(siteBase, topic, canonical)
  ];
  const f = topicFaq(topic.content!.faqs);
  if (f) nodes.push(f);
  return nodes;
}
