---
name: design-sprint
description: Runs the full Defra UCD process. Triggers Research, then Service Design, then Content/Interaction loops, ending with a GDS Assessment check.
---

# Workflow: Defra Synthetic Design Sprint

## Phase 1: Discovery & Definition (The "Why")

@agent use `user-research`
**Instruction:**

1.  Analyse the user's request: "{{user_input}}"
2.  **Constraint:** If the request assumes a solution (e.g., "Build a chatbot"), challenge it. Convert it into a "User Need Statement".
3.  Identify "Hard-to-Reach" user groups and offline scenarios relevant to this request.
4.  Output: A summary of User Needs and Key Risks.

@agent use `service-design`
**Instruction:**

1.  Review the User Needs from Phase 1.
2.  **Blueprint:** Map the journey, specifically identifying "Backstage" legacy system dependencies (e.g., CAP, Waste).
3.  **Green Check:** Challenge any data collection that seems unnecessary (Sustainability principle).
4.  Output: A high-level Service Journey map (text or Mermaid).

## Phase 2: Alpha Build (The "How")

@agent use `content-design`
**Instruction:**

1.  Draft the core content for the start page and main transaction page.
2.  **Constraint:** Ensure Reading Age is 9 or lower.
3.  Output: Content strings in a structured format.

@agent use `interaction-design`
**Instruction:**

1.  Take the content from Phase 2.
2.  Generate the Nunjucks/HTML prototype code.
3.  **Constraint:** Do NOT start with a Map component. Use a List view first.
4.  **Constraint:** Ensure all form errors preserve user data (`value="{{ data['x'] }}"`).

## Phase 3: The "Red Team" Assurance (The "Test")

@agent use `user-research`
**Instruction:**

1.  **Simulate:** Act as a "Farmer with poor connectivity" (1 bar of 3G).
2.  Review the Interaction Designer's code.
3.  **Critique:** Will this load efficiently? Is the click target size >24px?
4.  Output: A "Heuristic Friction Report".

@agent use `service-design`
**Instruction:**

1.  Review the entire package.
2.  **Mock Assessment:** If this were a GDS Service Assessment tomorrow, would we pass?
3.  Flag any "Red" risks (e.g., Lack of Assisted Digital consideration).
