# docs.mirantis.com information architecture: explanatory context

## Purpose

This document explains the proposed information architecture for `docs.mirantis.com`, with special attention to how product documentation, platform documentation, solution documentation, compatibility/lifecycle documentation, release notes, and reference documentation should coexist without forcing one navigation tree to solve every user problem.

The central challenge is that Mirantis products sit in overlapping stories:

* Some users know the exact product they want, such as Mirantis Kubernetes Engine (MKE), Mirantis Secure Registry (MSR), Mirantis Container Runtime (MCR), Mirantis OpenStack for Kubernetes (MOSK), or k0rdent AI.
* Some users think in terms of platform universes, such as enterprise Kubernetes, container platform modernization, private cloud, virtualization, or k0rdent AI.
* Some users are migrating between architecture generations, such as MKE 3 to MKE 4 or MSR 2 to MSR 4.
* Some users need compatibility, support, lifecycle, and version information.
* Some users need release notes or reference material directly.

The proposed model allows all of these paths to coexist.

## Core principle

`docs.mirantis.com` should not be primarily a product catalog. It should be a platform-and-product documentation system with clear product versioning underneath.

Shared facts belong in shared docs.

Product-specific facts belong in product docs.

Version-specific product facts belong in versioned product docs.

Cross-product compatibility facts belong in central compatibility matrices and are linked or excerpted elsewhere.

## The essential distinction

There are four related but different things:

```text
Product universe / platform story
≠
Individual product docs
≠
Versioned product docs
≠
Compatibility truth
```

The docs hierarchy should preserve these distinctions instead of collapsing them into one menu.

## Proposed top-level navigation

The top-level left-hand navigation should look approximately like this:

```text
docs.mirantis.com
  Start here
    Product and platform map
    Choose your path
    Compatibility and lifecycle

  Platforms
    k0rdent AI
    Enterprise Kubernetes
    Enterprise Container Platform
    Virtualization and Private Cloud

  Solutions
    Neocloud provider platform
    Enterprise AI platform
    Enterprise Kubernetes
    Container platform modernization
    Private cloud and virtualization
    Service provider cloud

  Products
    k0rdent AI
    k0rdent Platform
    Mirantis k0rdent Virtualization
    Mirantis Kubernetes Engine
    Mirantis Secure Registry
    Mirantis Container Runtime
    Mirantis OpenStack for Kubernetes
    mkectl

  Compatibility & lifecycle
    Support matrix
    Product lifecycle
    Version compatibility
    Upgrade paths
    Validated configurations

  Release notes

  Reference
    APIs
    CLI
    CRDs
    YAML
    Configuration

  Support
```

This is the global navigation tree. It is not the entire site tree. It is the top-level set of paths that helps users choose the right documentation context.

## Menus are projections over the page tree

A key modeling decision is that menus should not be treated as the canonical page tree.

Instead:

```text
Pages are canonical content objects.
Menus are views or projections over those pages.
```

A page has:

```yaml
url:
aliases:
menu:
h1_title:
description:
```

A menu has:

```yaml
menu_id:
  label:
  description:
  items:
    - label:
      url:
      children:
```

This means a page can live at one canonical URL but appear in multiple navigational contexts.

For example:

```yaml
url: /mke/latest
menu: product_mke_latest
```

shows the current MKE product documentation menu.

```yaml
url: /mke/versions
menu: product_mke_versions
```

shows the MKE version ladder menu.

```yaml
url: /platforms/enterprise-kubernetes
menu: platform_enterprise_kubernetes
```

shows the broader enterprise Kubernetes platform menu.

This is the only way to support the full user experience without creating contradictory or duplicated page trees.

## Why the menu cannot simply be the tree

Management may ask for several reasonable things that conflict if they are all forced into a single tree:

```text
“MKE should be a product in the nav.”
“MKE should be part of the Enterprise Kubernetes platform story.”
“MKE 3 and MKE 4 should both be visible.”
“MKE latest should be fewest clicks.”
“MKE 3 to MKE 4 migration should be prominent.”
“MKE 4 should connect to k0rdent AI.”
“MKE docs should preserve version history.”
```

These are not impossible requirements, but one menu node cannot satisfy all of them at once.

The resolution is:

```text
Products → MKE
  means “take me to current MKE docs.”

Platforms → Enterprise Kubernetes
  means “explain MKE in the broader enterprise Kubernetes universe.”

Solutions → Container platform modernization
  means “help me move from MKE 3/MSR 2/MCR world to MKE 4/MSR 4/containerd/k0rdent Platform world.”

Compatibility & lifecycle → MKE
  means “tell me what versions work, what is supported, and how long.”

Release notes → MKE
  means “show me changes by version.”

Reference → MKE
  means “give me APIs, CLIs, config, schemas, and commands.”
```

## Product links should go to latest

Primary product navigation should take users to the current recommended docs path.

For example:

```text
Products → Mirantis Kubernetes Engine
```

should go to:

```text
/mke/latest
```

or to:

```text
/mke
```

if `/mke` behaves as an alias or redirect to `/mke/latest`.

Similarly:

```text
Products → Mirantis OpenStack for Kubernetes
```

should go to:

```text
/mosk/latest
```

or to `/mosk` as an alias for `/mosk/latest`.

The product link should not take users first to a historical version museum. Version history should be available from the product docs, but not interposed before the current docs.

## Recommended product URL behavior

Use short product URLs:

```text
/k0rdent-ai/latest
/k0rdent-platform/latest
/k0rdent-virtualization/latest
/mke/latest
/msr/latest
/mcr/latest
/mosk/latest
/mkectl/latest
```

Use aliases for convenience:

```text
/k0rdent-ai  →  /k0rdent-ai/latest
/mke         →  /mke/latest
/msr         →  /msr/latest
/mcr         →  /mcr/latest
/mosk        →  /mosk/latest
/mkectl      →  /mkectl/latest
```

For MKE, `latest` should generally mean the latest MKE 4 release, not the latest MKE 3 release.

## MKE example: paths from the top-level menu

MKE should be reachable from multiple top-level paths because it participates in multiple user stories.

```text
docs.mirantis.com

  Products
    Mirantis Kubernetes Engine

  Platforms
    Enterprise Kubernetes
    Enterprise Container Platform
    k0rdent AI

  Solutions
    Container platform modernization
    Enterprise Kubernetes
    Enterprise AI platform

  Compatibility & lifecycle
    Support matrix
    Version compatibility
    Upgrade paths

  Release notes
    Mirantis Kubernetes Engine

  Reference
    APIs
    CLI
    Configuration
```

These paths have different meanings.

## Products → MKE

This is the direct product path.

```text
Products → Mirantis Kubernetes Engine → /mke/latest
```

The page represents the current recommended MKE documentation.

The local left-hand menu should look like:

```text
Mirantis Kubernetes Engine latest documentation
  Overview
  What's new
  Get started
  Architecture
  Install
  Configure
  Operate
  Secure
  Monitor
  Upgrade
  Troubleshoot
  Reference
  Compatibility
  Release notes
  Versions
```

This path optimizes for fewest clicks to current MKE documentation.

## Platforms → Enterprise Kubernetes

This is the platform/product-universe path.

```text
Platforms → Enterprise Kubernetes → /platforms/enterprise-kubernetes
```

This page is not the MKE product docs. It explains MKE as part of the broader enterprise Kubernetes universe.

The local left-hand menu can look like:

```text
Enterprise Kubernetes
  Overview
  Architecture
  Products and components
    Mirantis Kubernetes Engine
    mkectl
    Mirantis Secure Registry
    Mirantis Container Runtime
  MKE 3 vs MKE 4
  Choose an MKE version
  Deploy a single cluster
  Operate enterprise Kubernetes
  Upgrade from MKE 3 to MKE 4
  Relationship to k0rdent AI
  Compatibility
  Lifecycle
```

This is where the architecture-generation story belongs:

```text
MKE 3.x is based on the Docker Universal Control Plane architecture.
MKE 3.x supports Kubernetes, Swarm, or both.
MKE 4.x is based on k0s Kubernetes.
MKE 4.1.1 and later include k0rdent Platform as a services manager.
MKE 4 is an onramp to k0rdent AI.
```

## Solutions → Container platform modernization

This is the migration/modernization path.

```text
Solutions → Container platform modernization → /solutions/container-platform-modernization
```

Its local left-hand menu can look like:

```text
Container platform modernization
  Overview
  Modernization paths
    MKE 3 to MKE 4
    MSR 2 to MSR 4
    MCR to containerd considerations
  Plan a migration
  Assess compatibility
  Validate the new platform
  Roll back or recover
  Reference architectures
  Related product docs
    MKE latest
    MKE versions
    MSR latest
    MCR latest
```

This is where the cross-product story belongs:

```text
MKE 3 + MSR 2 + MCR
→
MKE 4 + MSR 4 + containerd / k0rdent Platform
```

This story should not be forced entirely into the MKE product docs.

## Compatibility & lifecycle → MKE

This path is for authoritative support, lifecycle, and version truth.

```text
Compatibility & lifecycle → MKE compatibility → /compatibility/mke
```

This area should own facts like:

```text
Which MKE versions are current, supported, maintenance, archived, or end-of-life.
Which MSR versions pair with which MKE versions.
Which MCR or container runtime configurations are supported.
Which MKE versions include k0rdent Platform.
Which versions are valid for upgrade or migration paths.
```

Product docs should link here rather than manually duplicating all compatibility data.

## Release notes → MKE

This path is for changes by version.

```text
Release notes → Mirantis Kubernetes Engine → /release-notes/mke
```

The local menu may use the same version ladder as `/mke/versions`.

```text
MKE release notes
  MKE 4.x
    4.1.3
    4.1.2
    4.1.1
    4.1.0
  MKE 3.x
    3.9.2
    3.9.1
    3.9.0
```

## The version ladder page

Management wants a left-hand menu somewhere that lists versions like:

```text
4.1.3
4.1.2
4.1.1
4.1.0
3.9.2
...
```

That is a valid and useful request. It should live at:

```text
/mke/versions
```

or equivalently:

```text
/mke/all-versions
```

as an alias.

It should not be the default click target for `Products → MKE`.

## MKE versions page content

The page should be a version index plus lifecycle/upgrade guide, not a narrative product overview.

Suggested page structure:

```markdown
# Mirantis Kubernetes Engine versions

Use this page to find documentation, release notes, lifecycle status, and upgrade guidance for supported and archived versions of Mirantis Kubernetes Engine.

For the current recommended documentation, see [MKE latest](/mke/latest).

## Current version

| Version | Status | Documentation | Release notes | Upgrade guidance |
|---|---|---|---|---|
| 4.1.3 | Current | /mke/4.1.3 | /release-notes/mke/4.1.3 | /mke/upgrade |

## Supported MKE 4.x versions

| Version | Status | Architecture generation | Documentation | Release notes |
|---|---|---|---|---|
| 4.1.3 | Current | k0s-based MKE 4 | /mke/4.1.3 | /release-notes/mke/4.1.3 |
| 4.1.2 | Supported | k0s-based MKE 4 | /mke/4.1.2 | /release-notes/mke/4.1.2 |
| 4.1.1 | Supported | k0s-based MKE 4; includes k0rdent Platform services manager | /mke/4.1.1 | /release-notes/mke/4.1.1 |
| 4.1.0 | Supported | k0s-based MKE 4 | /mke/4.1.0 | /release-notes/mke/4.1.0 |

## Supported MKE 3.x versions

| Version | Status | Architecture generation | Documentation | Release notes |
|---|---|---|---|---|
| 3.9.2 | Supported / maintenance | Docker Universal Control Plane generation | /mke/3.9.2 | /release-notes/mke/3.9.2 |
| 3.9.1 | Supported / maintenance | Docker Universal Control Plane generation | /mke/3.9.1 | /release-notes/mke/3.9.1 |
| 3.9.0 | Supported / maintenance | Docker Universal Control Plane generation | /mke/3.9.0 | /release-notes/mke/3.9.0 |

## Archived versions

Archived versions are retained for customers operating older environments. Archived documentation may describe unsupported configurations or behavior that has changed in later releases.

| Version | Status | Documentation | Release notes |
|---|---|---|---|
| 3.8.x | Archived | /mke/3.8 | /release-notes/mke/3.8 |
| 3.7.x | Archived | /mke/3.7 | /release-notes/mke/3.7 |

## Upgrade paths

Most users on MKE 3.x should plan an upgrade or migration to MKE 4.x.

- Upgrade from MKE 3 to MKE 4
- Review MKE compatibility
- Review MSR compatibility
- Review MCR/containerd considerations

## Architecture generations

MKE 3.x and MKE 4.x are different architecture generations.

MKE 3.x is based on the Docker Universal Control Plane architecture and supports Kubernetes, Swarm, or both.

MKE 4.x is based on k0s Kubernetes. Starting with MKE 4.1.1, MKE includes k0rdent Platform as a services manager.
```

## MKE versions page menu

The left-hand menu for `/mke/versions` should be intentionally explicit:

```text
Mirantis Kubernetes Engine versions

  Current version
    4.1.3

  MKE 4.x
    4.1.3
    4.1.2
    4.1.1
    4.1.0
    4.0.x

  MKE 3.x
    3.9.2
    3.9.1
    3.9.0
    3.8.x
    3.7.x
    ...

  Upgrade paths
    MKE 3 to MKE 4

  Lifecycle
    Supported versions
    Maintenance versions
    Archived versions
    End-of-life versions
```

This satisfies the version-list requirement without making every user pass through version history.

## Individual MKE version pages

Each version route should have its own local product menu.

For MKE 4:

```text
/mke/4.1.3

  MKE 4.1.3
    Overview
    Architecture
    Release notes
    Install
    Configure
    Cluster lifecycle
    Services management with k0rdent Platform
    Administer
    Secure
    Monitor
    Upgrade
    Relationship to k0rdent AI
    Integrate with MSR
    Container runtime options
    Troubleshoot
    Reference
    Compatibility
    All MKE versions
```

For MKE 3:

```text
/mke/3.9.2

  MKE 3.9.2
    Overview
    Architecture
    Release notes
    Install with mkectl
    Configure
    Kubernetes orchestration
    Swarm orchestration
    Mixed Kubernetes and Swarm
    Use MCR
    Integrate with MSR
    Operate
    Secure
    Monitor
    Upgrade
    Troubleshoot
    Reference
    Compatibility
    Upgrade to MKE 4
    All MKE versions
```

This lets MKE 3 and MKE 4 honestly differ where they need to differ while still living under the single MKE product name.

## k0rdent AI paths

k0rdent AI has the same separation between product docs and platform-universe docs.

The product path:

```text
Products → k0rdent AI → /k0rdent-ai/latest
```

should show the local product/version docs menu:

```text
k0rdent AI latest documentation
  Overview
  What's new
  Get started
  Architecture
  Editions
    Provider Edition
    Enterprise Edition
    Platform component
  Provider Edition
    Neocloud operating model
    Service catalog and vending
    Tenant and customer management
    Provider web UI
    Provider OpenAPI API
  Enterprise Edition
    Enterprise operating model
    Enterprise services management
    Deploy MKE 4 clusters
  Platform component
  k0rdent Virtualization add-on
  APIs
  Web UI
  kubectl and YAML
  Operate
  Upgrade
  Troubleshoot
  Compatibility
  Release notes
  Versions
  Platform universe
```

The platform path:

```text
Platforms → k0rdent AI → /platforms/k0rdent-ai
```

should show the broader product-universe menu:

```text
k0rdent AI platform
  Overview
  Architecture
  Editions
    Provider Edition
    Enterprise Edition
    Shared Platform component
  Concepts
    Product family
    Multi-cluster orchestration
    Multi-cloud orchestration
    Services orchestration
    Tenancy model
    Service vending
    Cluster lifecycle
    GPU-aware infrastructure
  Provider Edition
  Enterprise Edition
  Platform component
  Virtualization
  APIs and automation
  Compatibility
  Release notes
  Product docs
```

The distinction is important:

```text
/k0rdent-ai/latest
  product/version docs

/platforms/k0rdent-ai
  product-universe/platform narrative
```

## k0rdent AI product-family naming page

Because k0rdent AI has complex naming and editioning, it needs an explanatory concept page.

Suggested URL:

```text
/platforms/k0rdent-ai/concepts/product-family
```

Suggested title:

```text
k0rdent AI product family
```

Suggested description:

```text
k0rdent AI is a multi-cluster, multi-cloud Kubernetes and services orchestration platform. It is available in Provider and Enterprise editions. Both editions use a shared Platform component. The shared Platform component exists today as k0rdent Enterprise.
```

Suggested product map:

```text
k0rdent AI
  Provider Edition
  Enterprise Edition
  Shared Platform component
    currently available as k0rdent Enterprise
  Optional add-ons
    Mirantis k0rdent Virtualization
```

This page prevents every k0rdent AI page from having to re-explain the naming model.

## MOSK product behavior

MOSK is a good example of why product links should go directly to latest.

```text
Products → Mirantis OpenStack for Kubernetes
```

should go to:

```text
/mosk/latest
```

or:

```text
/mosk
```

if `/mosk` is an alias for `/mosk/latest`.

The version-history page should be secondary:

```text
/mosk/versions
```

This page can list all current, supported, maintenance, archived, and end-of-life MOSK versions.

Users should not land first on a history page when they click MOSK from Products.

## MSR product behavior

MSR has a one-name/two-architecture-generations problem similar to MKE.

MSR product docs should expose:

```text
MSR latest
MSR versions
MSR 2.x
MSR 4.x
Upgrade from MSR 2 to MSR 4
Compatibility
Release notes
```

MSR should have a concept page or version chooser explaining:

```text
MSR 2.x
  Evolution of Docker Trusted Registry

MSR 4.x
  Fork of Harbor Registry

Upgrade
  Upgrade path from MSR 2 to MSR 4
```

The default product click should still go to:

```text
/msr/latest
```

not to the version chooser.

## MCR product behavior

MCR should have product docs but should not be treated as a major strategic platform universe.

Primary path:

```text
Products → Mirantis Container Runtime → /mcr/latest
```

Local product docs should include:

```text
MCR latest documentation
  Overview
  Install
  Configure
  Use standalone
  Use with MKE 3
  Use with MKE 4 special cases
  Security
  Operations
  Troubleshooting
  Reference
  Compatibility
  Release notes
  Versions
```

This keeps MCR discoverable for MKE 3 customers and special MKE 4 cases without overpromoting it.

## mkectl behavior

`mkectl` should be a product/tool doc, not buried only under MKE.

Primary path:

```text
Products → mkectl → /mkectl/latest
```

Local docs should include:

```text
mkectl latest documentation
  Overview
  Install
  Configure
  Deploy MKE 3 clusters
  Deploy MKE 4 clusters
  Upgrade and migration workflows
  Command reference
  Troubleshooting
  Release notes
```

MKE 3 and MKE 4 docs should link to relevant mkectl pages rather than duplicating command reference content.

## Compatibility and lifecycle layer

Compatibility and lifecycle should be first-class, not scattered across product docs.

Suggested structure:

```text
/compatibility
  Overview
  Product lifecycle
  Support matrix
  Version compatibility
  Upgrade paths
  Component dependencies
  Validated configurations
  Deprecated and removed features
```

Product-specific compatibility pages:

```text
/compatibility/k0rdent-ai
/compatibility/mke
/compatibility/msr
/compatibility/mcr
/compatibility/mosk
```

Cross-product compatibility pages:

```text
/compatibility/mke-msr-mcr
/compatibility/k0rdent-ai-mke
/compatibility/k0rdent-ai-virtualization
/compatibility/mosk-mke
```

This is where authoritative facts should live, such as:

```text
MKE 4.1.1 includes k0rdent Platform as a services manager.
MKE 4 can deploy or participate in k0rdent AI-related workflows.
MKE 3 uses MCR in normal cases.
MKE 4 uses containerd by default but can use MCR in special cases.
MSR 2 has an upgrade path to MSR 4.
MKE 3 has an upgrade/migration path to MKE 4.
```

## Release notes layer

Release notes should be accessible centrally and from product-local menus.

Suggested structure:

```text
/release-notes
  k0rdent AI
  k0rdent Platform
  k0rdent Virtualization
  MKE
    3.x
    4.x
  MSR
    2.x
    4.x
  MCR
  MOSK
  mkectl
```

Product docs should include a Release notes link, but release notes should also be navigable as their own top-level documentation type.

## Reference layer

Reference should be centralized because APIs, CLIs, CRDs, YAML schemas, and configuration often cut across product boundaries.

Suggested structure:

```text
/reference
  APIs
    k0rdent AI Provider OpenAPI
    k0rdent AI Enterprise APIs
    MKE APIs
    MSR APIs
    MOSK APIs
  CLI
    mkectl
    kubectl workflows
  CRDs
  YAML schemas
  Helm charts
  Configuration files
  Error codes
```

For k0rdent AI, this matters because the realistic operator/developer experience will include:

```text
OpenAPI API
Web UI workflows
kubectl workflows
YAML schemas
CRDs
```

The docs should not hide the kubectl/YAML reality. They should organize it.

## Prototype behavior

The click-through prototype models the IA as:

```yaml
pages:
  - url:
    aliases:
    menu:
    h1_title:
    description:

menus:
  menu_id:
    label:
    description:
    items:
      - label:
        url:
        children:
```

The prototype intentionally separates canonical routes from left-hand menus.

Example:

```yaml
url: /mke/latest
aliases:
  - /mke
menu: product_mke_latest
h1_title: Mirantis Kubernetes Engine latest documentation
```

The assigned menu is what changes the left rail.

## Browser history in the prototype

The prototype stores simulated docs routes in the URL hash.

Examples:

```text
#/mke/latest
#/mke/versions
#/platforms/enterprise-kubernetes
```

This allows browser Back and Forward to work on GitHub Pages without requiring React Router or server-side route handling.

The real GitHub Pages URL may be:

```text
https://USERNAME.github.io/mirantis-docs-prototype/
```

but the simulated docs route represents:

```text
https://docs.mirantis.com/mke/latest
```

or whichever route is shown after the hash.

## GitHub Pages deployment model

For the prototype, the GitHub Pages site is only the host.

The app simulates `docs.mirantis.com` internally.

Example:

```text
GitHub Pages URL:
https://USERNAME.github.io/mirantis-docs-prototype/

Simulated docs root:
https://docs.mirantis.com/
```

The prototype does not need real browser routes like `/mke/latest` because navigation is handled inside the single-page app.

## Summary recommendation

Use this IA model:

```text
Global nav
  Helps users pick a major documentation context.

Platform menus
  Explain product universes and cross-product architecture.

Solution menus
  Explain cross-product workflows and migration paths.

Product latest menus
  Take users directly into current recommended product docs.

Version menus
  Show the explicit historical version ladder where needed.

Compatibility menus
  Own authoritative version, lifecycle, dependency, and support truth.

Release notes menus
  Organize changes by product and version.

Reference menus
  Organize APIs, CLI, CRDs, YAML, configuration, and error codes.
```

This lets Mirantis satisfy the competing requirements without making any one menu node do too much.

The most important product-navigation rule is:

```text
Products → Product Name
  goes to /product/latest

/product/latest → Versions
  goes to /product/versions
```

The most important IA rule is:

```text
Menus are contextual projections over canonical pages, not the canonical page tree itself.
```
