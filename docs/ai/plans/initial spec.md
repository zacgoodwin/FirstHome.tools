# Product Discovery Notes: First Home Tools

**Date recorded:** July 26, 2026  
**Source:** Three voice-memo transcripts  
**Meeting type:** Product ideation / requirements capture  
**Product:** First Home Tools, working title

## Summary

First Home Tools is a mobile-friendly web app for first-time and inexperienced homeowners. It identifies the systems and maintenance-sensitive assets in a home, generates a recurring maintenance plan, and lets the homeowner record completed work.

The first release should solve one problem well: homeowners do not know what maintenance their home requires or when to do it. The app should guide setup through a questionnaire, produce an in-app calendar, export tasks through an ICS file, and retain an asset-specific service history.

## Product Goal

Help homeowners understand, schedule, and document preventive home maintenance before neglected equipment fails or small issues become expensive repairs.

## Target Users

- First-time homeowners who lack practical home-maintenance experience
- Homeowners who know what to do but struggle to remember recurring tasks
- Household members who share responsibility for maintenance

Possible later users:

- Owners of multiple homes
- Landlords and property managers
- New buyers evaluating or moving into another property

## Core User Journey

1. The user creates an account or signs in with Google.
2. The user creates a home profile with basic information such as address and dwelling type.
3. A guided questionnaire asks which systems, appliances, and structural components the home contains.
4. The user records known details for each asset, such as make, model, serial number, installation date, service provider, warranty, and files.
5. The app recommends recurring maintenance tasks for the selected assets.
6. The user reviews the proposed schedule and adds it to the in-app calendar.
7. The user can export the schedule as an ICS file for another calendar application.
8. When work is due, the user opens the event, marks it complete, and records notes or service details.
9. The completion becomes part of the asset's maintenance history.

## MVP Scope

### 1. Accounts and access

- Email-based account creation and login
- Google OAuth
- One home per account for the initial release
- Shared access for other household members
- Permission to view, add, edit, or complete maintenance work

### 2. Home profile

- Address
- Dwelling type, such as detached house, townhouse, or condo
- Relevant property traits, such as yard, basement, roof, gutters, or solar panels
- Basic home-level files and links

The onboarding language should not assume that every user owns a detached house or maintains every part of the building.

### 3. Guided asset questionnaire

The onboarding should work like a branching tax-preparation wizard. It should ask plain-language questions and reveal follow-up questions only when relevant.

Example flow:

- Do you have a heating system?
- What type is it: furnace, boiler, heat pump, oil heat, or another type?
- How many units do you have?
- What are the make, model, serial number, and installation date?
- Who installed or services it?

Initial categories should cover maintenance-sensitive parts of a home:

- Heating and cooling
- Roof, gutters, and exterior drainage
- Plumbing, water heater, and sump pump
- Electrical systems
- Ventilation and ductwork
- Kitchen appliances
- Laundry appliances
- Basement or crawl space
- Yard and irrigation
- Solar equipment
- Fire and life-safety equipment

The data model must allow multiple assets of the same type. A home may have three air-conditioning units, for example.

### 4. Maintenance plan generation

- Map each asset type to recommended recurring maintenance tasks
- Explain what each task is and why it matters
- Suggest an interval and initial due date
- Let the user change the schedule
- Generate the complete home-maintenance plan after onboarding
- Update the plan when an asset is added or replaced

The initial product should identify required work. Detailed repair instruction is not part of the core promise.

### 5. Calendar and agenda

- Month-style calendar view
- Agenda view of upcoming tasks
- Event detail with related asset, due date, description, and status
- Mark work complete
- Record whether the homeowner or a hired professional completed it
- Add notes about anything observed
- Add one-off maintenance events
- Export events through an ICS file

### 6. Asset records

Each asset should support:

- Category and type
- Custom display name
- Make, model, and serial number
- Installation date
- Expected service life or replacement guidance
- Installer and preferred service provider
- Warranty information
- Notes
- Attached files, photos, and links
- Recurring maintenance tasks
- Complete service and maintenance log

Users should be able to:

- Add an asset after onboarding
- Edit incomplete asset details later
- Add a one-off service entry
- Replace an asset while preserving the old record
- Archive an asset and optionally show archived items
- Delete an asset after confirmation

### 7. Documents

- Attach files or links to an asset
- Store home-level documents that do not belong to one asset
- Browse all documents and see what each is attached to

Examples include manuals, warranties, receipts, inspection reports, mortgage documents, and repair invoices.

### 8. Primary navigation

- Home
- Assets
- Calendar
- Documents

## Product Decisions Captured

1. **Preventive maintenance is the initial product focus.**
   - **Why:** The core user problem is not knowing what work a home requires or when it is due.
   - **Impact:** Inventory, insurance, contracting, and property management stay outside the MVP.

2. **The product should be a mobile-friendly PWA.**
   - **Why:** Users need access while inspecting equipment or completing work, but the initial concept does not require separate native apps.
   - **Impact:** Responsive design and installable PWA behavior should be part of the technical plan.

3. **Onboarding should use a branching wizard.**
   - **Why:** Inexperienced homeowners cannot be expected to know every asset category or required field.
   - **Impact:** The app needs a structured home-system taxonomy and conditional questions.

4. **The app should maintain its own calendar and support ICS export.**
   - **Why:** Users need an in-app system of record but may prefer their existing calendar for reminders.
   - **Impact:** Direct calendar integrations can wait.

5. **The asset catalog is not a general household inventory.**
   - **Why:** The first release is about items that require maintenance, not every possession in the home.
   - **Impact:** Televisions, furniture, and insurance inventory are excluded from initial onboarding.

6. **Users should log outcomes, not just dismiss reminders.**
   - **Why:** Notes and completion records create an asset service history and help identify developing problems.
   - **Impact:** Task completion must write to an immutable or auditable maintenance record.

7. **Detailed tutorials and contractor fulfillment are later additions.**
   - **Why:** The initial goal is to tell homeowners what needs doing and when, while letting them choose how to complete it.
   - **Impact:** The MVP may link to external guidance but should not depend on a tutorial library or service marketplace.

## Future Opportunities

### Knowledge and automation

- Asset-specific manuals and maintenance instructions
- Recall monitoring by make, model, and serial number
- Warranty expiration tracking
- Links to trusted tutorials
- Photo-assisted problem diagnosis
- A home-aware assistant that answers questions using the user's asset data
- Inspection-report ingestion to prefill assets and initial repairs
- Document extraction to reduce questionnaire data entry
- Signs of imminent asset failure and proactive replacement guidance

### Projects and service providers

- Household to-do or "honey-do" list
- Project plans for repairs and improvements
- DIY-versus-professional guidance
- Contractor or TaskRabbit connections
- Preferred provider directory
- Estimates, approvals, and service scheduling
- Recommended tools based on the home profile

### Records, insurance, and resale

- Full household inventory for insurance claims
- Photo-based item identification and value estimates
- Disaster response checklists
- Homeowner-policy analysis and claim preparation guidance
- Tax package assembled from eligible property expenses
- Transferable home history when a property is sold
- Privacy controls that remove owner-specific information during transfer

Insurance-claim scripts and coverage analysis require legal review. The product should not imply guaranteed coverage or coach users to misrepresent a loss.

### Home value and moving

- Photo-based home-improvement recommendations
- Projects ranked by possible value impact
- Compare maintenance obligations between a current and prospective home
- Moving plans based on a new floor plan and current inventory
- Interior-layout suggestions

### Multi-property management

- Multiple homes per account
- Landlord and property-manager workflows
- Tenant portals for rent and maintenance requests
- Owner dashboards
- Repair estimates and approval records

## Open Questions

- [ ] Which asset categories and maintenance schedules are required for launch? **Owner:** @Zac. **Due date:** Not stated; schedule within 48 hours.
- [ ] What authoritative sources will support the maintenance intervals? **Owner:** @Zac. **Due date:** Not stated; schedule within 48 hours.
- [ ] How should recommendations vary by climate, region, construction type, asset age, and manufacturer instructions? **Owner:** @Zac. **Due date:** Not stated; schedule within 48 hours.
- [ ] Should users approve every generated task before it enters the calendar? **Owner:** @Zac. **Due date:** Not stated; schedule within 48 hours.
- [ ] Does ICS export create a static snapshot or a subscribed calendar feed that stays synchronized? **Owner:** @Zac. **Due date:** Not stated; schedule within 48 hours.
- [ ] What roles and permissions are needed for shared household access? **Owner:** @Zac. **Due date:** Not stated; schedule within 48 hours.
- [ ] What happens to future tasks and historical records when an asset is replaced, archived, or deleted? **Owner:** @Zac. **Due date:** Not stated; schedule within 48 hours.
- [ ] What reminder channels are required beyond calendar export? **Owner:** @Zac. **Due date:** Not stated; schedule within 48 hours.
- [ ] Which document types, file sizes, and storage limits should the MVP support? **Owner:** @Zac. **Due date:** Not stated; schedule within 48 hours.
- [ ] Is Consumer Reports' discontinued product a usable reference, and can its data be licensed or reused? **Owner:** @Zac. **Due date:** Not stated; schedule within 48 hours.
- [ ] Which inspection platform was intended by "Spectra," and does it offer an API or export format? **Owner:** @Zac. **Due date:** Not stated; schedule within 48 hours.

## Risks and Constraints

- Maintenance advice can cause property damage or injury if it is wrong, incomplete, or applied to the wrong equipment.
- Generic schedules may conflict with manufacturer instructions, local codes, climate, or warranty requirements.
- The onboarding questionnaire can become too long. Progressive disclosure and document-assisted setup may be needed.
- Calendar export can create stale or duplicate events if synchronization behavior is unclear.
- Shared access, home documents, addresses, and serial numbers create privacy and security obligations.
- A contractor marketplace is a different business model and should not shape the first release.
- Transferring home history could expose personal information or facts that affect a property transaction.

## Recommended Next Steps

1. Write a short MVP PRD using the scope and decisions above.
2. Define the initial asset taxonomy and the minimum fields for each asset type.
3. Build a sourced maintenance-rules dataset for the first 10 to 15 asset types.
4. Prototype the onboarding wizard and test whether a new homeowner can finish it without expert help.
5. Define the task, recurrence, completion, service-log, archive, and replacement data model.
6. Decide whether calendar support starts with a downloadable ICS file or a subscribed ICS feed.
7. Test the concept with five recent first-time homeowners before expanding the feature set.

## Context Check

- No related PRDs were present in `context-library/prds/` or `outputs/prds/`.
- No earlier notes were present in `context-library/meetings/`.
- No stakeholder profiles beyond the blank template were available.
- The repository's internal writing style was used.

## Source Notes

This document consolidates and cleans:

- `FirstHometools.txt`
- `FirstHometoolspt2.txt`
- `Home App.txt`

Repeated phrases, driving-related asides, false starts, and duplicate requirements were removed. Ambiguous product names and third-party references were retained as open questions instead of being treated as facts.
