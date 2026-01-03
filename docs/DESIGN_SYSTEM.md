# Design System & Micro-interactions

## Micro-interactions

### Feedback Patterns

#### Button Click Feedback

Buttons should provide immediate tactile feedback when clicked.

- **Rule**: Scale down slightly on active press.
- **Spec**:
  ```css
  transform: scale(0.98);
  transition: transform 100ms ease-out;
  ```
- **Implementation**: Applied globally to standard buttons via `active:scale-[0.98]` utility.

#### Input Validation Feedback

Inputs should smoothly transition their border colors when validation state changes or on focus/blur.

- **Rule**: Smooth border transition.
- **Spec**:
  ```css
  transition: border-color 200ms ease-out;
  ```
- **Implementation**: Applied to `Input`, `Textarea`, and `Select` components.

### Loading Patterns

#### Skeleton Screens

Use skeleton screens to indicate content loading, mimicking the structure of the content being loaded.

- **Shimmer Effect**: Smooth, left-to-right gradient animation.
- **Animation**: `animate-pulse` (Tailwind) or custom equivalent.

#### Spinners

Used for overlay loading or button states.

- **Size**: Small (16px) for buttons, Medium (24px-32px) for sections, Large (48px+) for full page.

### Notification Patterns (Toasts)

- **Position**: Top-right (`top-right`) for desktop, Bottom-center (`bottom-center`) for mobile.
- **Animation**: Slide in from edge, fade out.
- **Duration**: 4000ms default, longer for errors.
- **Stacking**: Stack visually, newest on top.

## Content & Messaging

### Voice & Tone

- **Personality**: Professional, Friendly, and Encouraging.
- **Technical Level**: Simplified but precise. Avoid jargon where possible.
- **Emotion**:
  - **Neutral**: For informational messages.
  - **Encouraging**: For success states.
  - **Urgent**: For errors or critical warnings (use sparingly).

### Microcopy Guidelines

#### Success Messages

- **Format**: [Action] successful. [Follow-up if details].
- **Example**: "Great! Your changes have been saved."

#### Error Messages

- **Format**: [What happened]. [How to fix it].
- **Example**: "Oops, something went wrong. Please check your connection and try again."

#### Empty States

- **Format**: [What's missing]. [Call to action].
- **Example**: "No orders yet. Start by creating a NEW order."

#### Loading Messages

- **Format**: [Actioning verb]...
- **Example**: "Preparing your dashboard..."

### Writing Principles

- **Sentence Case**: Use sentence case for almost everything (headings, buttons, menu items). Title Case for proper nouns only.
- **Oxford Comma**: Yes, use it for clarity in lists.
- **Contractions**: Yes (e.g., "Don't" instead of "Do not", "You're" instead of "You are") to sound friendly.
- **Action Labels**: Verb-first (e.g., "Save Changes", "Delete Item").
