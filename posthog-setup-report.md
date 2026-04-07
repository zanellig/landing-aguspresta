<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Agustina Presta portfolio site. PostHog is initialized via `instrumentation-client.ts` (the recommended approach for Next.js 15.3+), using a reverse proxy through Next.js rewrites to improve ad-blocker resilience. Seven events are tracked across `app/page.tsx`, covering all key conversion touchpoints: primary and secondary hero CTAs, navigation link clicks, WhatsApp/Instagram/Email link clicks across hero, contact, and footer sections, and a once-per-session contact section view event that marks the top of the contact conversion funnel.

| Event | Description | File |
|---|---|---|
| `cta_clicked` | User clicks the primary hero CTA "Trabajemos juntos" | `app/page.tsx` |
| `services_cta_clicked` | User clicks the secondary hero CTA "Ver servicios" | `app/page.tsx` |
| `nav_link_clicked` | User clicks a navigation link in the header | `app/page.tsx` |
| `whatsapp_clicked` | User clicks any WhatsApp link (hero, contact, or footer) | `app/page.tsx` |
| `instagram_clicked` | User clicks the Instagram link (hero or footer) | `app/page.tsx` |
| `email_clicked` | User clicks any email link (hero, contact, or footer) | `app/page.tsx` |
| `contact_section_viewed` | User scrolls into the contact section (once per session) | `app/page.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://us.posthog.com/project/372061/dashboard/1437932
- **Contact Conversion Funnel** (cta_clicked → contact_section_viewed → whatsapp_clicked): https://us.posthog.com/project/372061/insights/jgBrHm4R
- **CTA Clicks Over Time** (primary vs secondary CTA daily trend): https://us.posthog.com/project/372061/insights/whE7qmjg
- **Contact Channel Breakdown** (WhatsApp vs Email by location): https://us.posthog.com/project/372061/insights/HkeBAutX
- **Social Link Engagement** (Instagram, WhatsApp, Email over time): https://us.posthog.com/project/372061/insights/4sbDxoBa
- **Contact Section Viewed vs Contact Clicked** (funnel drop-off): https://us.posthog.com/project/372061/insights/FY6Tqppq

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
