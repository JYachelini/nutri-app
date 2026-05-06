# Design

Visual identity: organic, warm, editorial. Like a real cooking app or magazine — not a generic dashboard.

## Color palette

| Token | Color | Usage |
|---|---|---|
| `cream` | `#F7F3EC` | General background |
| `warm-white` | `#FDFAF6` | Card surfaces |
| `ink` | `#1C1A16` | Primary text |
| `ink-muted` | `#6B6456` | Secondary text |
| `ink-faint` | `#B5AFA6` | Tertiary text / placeholders |
| `olive` | `#4A5E3A` | Primary accent, protein, balanced state |
| `olive-light` | `#7A9463` | Soft accent, active borders |
| `olive-pale` | `#E8EDE2` | Pill / badge backgrounds |
| `terra` | `#C4622D` | Secondary accent, calories, high alerts |
| `terra-pale` | `#F5E8DF` | Pill / badge backgrounds |
| `sand` | `#D4C4A8` | Borders |
| `sand-light` | `#EDE4D3` | Soft backgrounds |
| `blue-ocean` | `#2C5F7A` | Blue accent (used sparingly) |
| `blue-pale` | `#DEF0F5` | Pill / badge backgrounds |
| `amber` | `#B07D2A` | Carbohydrates, medium alerts |
| `amber-pale` | `#F5EDD8` | Pill / badge backgrounds |
| `red-warning` | `#E24B4A` | Over target / exceeded |

## Typography

- **Headings / recipe names:** Cormorant Garamond (Google Fonts), expressive serif, weight 600, with selective italics.
- **Body / UI:** Epilogue (Google Fonts), clean sans-serif, weights 300/400/500.
- Day names and section titles combine both: serif for headings, sans for the rest.

## Layout

- **Main container:** max-width 900px centered, 20px horizontal padding.
- **Planner:** two columns — flexible left column, fixed 320px right column (sticky balance panel).
- On mobile (< 750px) columns stack vertically, panel is no longer sticky.
- **Cards:** border-radius 14–16px, thin sand-colored borders, subtle hover elevation (box-shadow + translateY -2px).

## Details

- Subtle grain texture over the background (SVG noise at 0.04 opacity) to avoid a flat screen feel.
- Smooth animations (.15s to .25s ease) on hover and tab transitions.
- Minimal iconography — prefer typography and color over icons.
- Day card borders in the balance panel change color based on nutritional status (olive / terra / amber).

## Recurring components

- **Macro pills:** pale background of the corresponding color, text in the saturated version of the same color, border-radius 6–100px depending on context, font-size 10–12px.
- **Status badges:** same logic, uppercase with letter-spacing.
- **Buttons:** `btn` base with sand border, `btn-primary` in solid olive. `btn-sm` size for secondary actions.
