# Tapas Electronics

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Sticky navigation header with logo "Tapas Electronics" and links: Home, Products, Services, Contact
- Hero section with background image, headline, subtext, and "Call Us Now" CTA button linking to contact section
- Products section with 4 product cards: Sound Boxes, DJ Boxes, Home Theater, All Sound Systems (each with icon and description)
- Services section with "Expert Mechanic Support" description on a light background
- Contact section with phone numbers (9732452836, 7908676901) as clickable tel links, and a WhatsApp chat button linking to wa.me/9732452836
- Footer with copyright text "2023 Tapas Electronics. All Rights Reserved."
- Fully mobile-responsive layout

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan
1. Generate a hero background image for an electronics/audio shop
2. Generate minimal Motoko backend (the app is primarily static/informational)
3. Build React frontend replicating the provided HTML layout:
   - Sticky header with nav links and logo
   - Hero section with generated background image, headline, CTA
   - Products grid (4 cards)
   - Services section
   - Contact section with phone links and WhatsApp button
   - Footer
4. Apply deterministic data-ocid markers to nav links, CTA, WhatsApp button, phone links
5. Ensure responsive design for mobile
