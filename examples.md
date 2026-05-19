WOO WOO WOO

# k0rdent AI documentation tree — top-level shape

```
k0rdent AI Platform

Introductory material and concepts:
├── Overview
├── Architecture
Reference to the API as the primary control plane
├── API Reference
Services of the k0rdent AI platform accessible via the API
├── Platform Services
Giving access and quotas to tenants
├── Tenant & Identity
Building up from the bottom - first is BMM
├── Bare Metal as a Service
Then is network
├── Network & IPAM Config
Then is storage
├── Storage Integrations
Now we can make whole clusters
├── Kubernetes as a Service
And govern and observe them
├── Governance & Observability
And cost-monitor them
├── FinOps

Here are the specifics of the UX of the things you can buy
├── Provider Edition
├── Enterprise Edition

Here's what customers have built with this
├── Solutions

Here are the housekeeping details and etc.
├── Release Notes
└── Versions & Compatibility
```

---



# k0rdent AI documentation tree — two levels deep, with Solutions

```
k0rdent AI Platform
├── Overview
├── Architecture
├── API Reference
│   ├── Atlas (Provider/Admin API)
│   ├── Arc (Tenant API)
│   └── Authentication & Authorization
├── Platform Services
│   ├── Notifications
│   ├── Audit
│   ├── Analytics & Reporting
│   ├── Telemetry
│   ├── Usage Metering
│   └── How-to guides
├── Tenant & Identity
│   ├── Tenant Lifecycle Management
│   ├── Tenant Quota Management
│   └── How-to guides
├── Bare Metal as a Service
│   ├── Host Registration & Inventory
│   ├── Machine Types & Personas
│   ├── OS Provisioning
│   ├── Cluster Provisioning
│   └── How-to guides
├── Network & IPAM Config
│   ├── Network Inventory
│   ├── InfiniBand Domain Management
│   ├── Tenant Network Assignment & IPAM
│   ├── SDN Integration (Netris / Verity)
│   ├── Cluster Network Configuration
│   └── How-to guides
├── Storage Integrations
│   ├── CSI Driver Management
│   ├── VAST Data Integration
│   ├── Volume & Filesystem Management
│   ├── Storage Access Rights
│   └── How-to guides
├── Kubernetes as a Service
│   ├── Cluster Templates & Configurations
│   ├── Hosted Control Planes
│   ├── Cluster Lifecycle
│   ├── Cluster Access Management
│   ├── MKE 4 Integration  [Enterprise]
│   └── How-to guides
├── Governance & Observability
│   ├── Health Monitoring
│   ├── Event Streaming
│   ├── GPU & Network Monitoring
│   ├── Log Management
│   ├── Dashboards & Alerting
│   ├── Secrets & Credential Management
│   ├── Observability Infrastructure
│   └── How-to guides
├── FinOps
│   ├── Cluster Cost Analysis
│   ├── Compute Cost Dashboards
│   ├── Storage Cost Dashboards
│   └── How-to guides
├── Provider Edition
│   ├── Neocloud Operating Model
│   ├── Tenant Vending & Service Catalog
│   └── Provider Web UI
├── Enterprise Edition
│   ├── Enterprise Operating Model
│   └── Enterprise Web UI
├── Solutions
│   ├── Here's what customers have built with this
├── Release Notes
└── Versions & Compatibility
```

---

---

# Solution page structure — internal template

Each Solution is a worked example of building something of business value with k0rdent AI. Every solution follows this structure:

```
[Solution name]  (e.g. "Stand up a GPU-as-a-Service neocloud")
├── Overview
│   ├── What this solution does
│   ├── Who it is for
│   └── What you will have at the end
├── Reference Architecture
│   ├── Architecture diagram
│   ├── Components and their roles
│   └── Key design decisions and tradeoffs
├── Prerequisites
│   ├── Hardware and infrastructure requirements
│   ├── Software and version requirements
│   └── Access and permissions required
├── Build it
│   ├── Step 1 — [first major action]
│   ├── Step 2 — [second major action]
│   └── Step N — [final major action]
├── Verify it works
├── Operate it
│   ├── Day-2 tasks
│   └── Monitoring and alerting setup
└── Reference
    ├── Atlas API calls used in this solution
    └── Related How-to guides
```

---

## Action items

- **Solutions content:** Ask Field to list the solutions customers have built with k0rdent AI. Solutions section content comes from real customer engagements, not invention.
- **How-to guide content:** Engineering teams (Core Services, Bare Metal, Networking, KOF, etc.) are the authoritative source for How-to guides. Each team should own worked examples for their capability area — these are essentially annotated API call sequences demonstrating correct usage.

---

# k0rdent AI documentation tree

## Top-level structure

```
k0rdent AI  (/k0rdent-ai/latest)
├── Overview
├── What's new (links to 'latest' version docs and release notes for subunits)
├── Feature Matrix (Guide to Editions with links to deeper docs) 
├── Architecture (k0rdent AI as a unified thing - diagram - links to complete abstract reference architecture)
├── Get Started (how are people expected to install this?)
├── Provider Edition (one table of contents for everything relevant to the Provider Edition including Solutions, Reference Architecture, Provider-only WebUIs and APIs (API reference plus tutorials), release notes and a map and anchor pages linking to 'Provider-oriented' aspects of the shared Platform docs - how to install, administer, operate, update, upgrade, troubleshoot, etc., plus release notes for the provider edition)
├── Enterprise Edition (as above for Enterprise)
├── Platform (webUI for the platform if such exists, API for the platform, plus tutorials - documentation of KCM, KSM, KOF, release notes, plus all the YAML, kubectl, install, administer, operate, update, upgrade, troubleshoot, etc.)
├── k0rdent Virtualization add-on (pertinence to each edition, solutions, how to install in different contexts)
├── k0rdent AI APIs - Map of all the APIs linking down to API tutorials
├── Web UI (needed? or are webUIs bound to product subunits neatly?)
├── kubectl and YAML
├── Operate
├── Upgrade
├── Troubleshoot
└── Versions Matrix
```

```
k0rdent AI  (/k0rdent-ai/latest)
├── Overview
├── What's new
├── Feature Matrix
├── Solutions (Common solution runbooks plus links to Edition-specific solution runbooks)
├── Architecture (General architecture and links to the Architecture sections for each Edition)
├── Get Started/Install (QUESTION: Is it meaningful to talk about installation at toplevel?)
├── Provider Edition
├── Enterprise Edition
├── Platform
├── Virtualization
├── Web UIs (Description of all the WebUIs and links to their docs)
├── APIs (Description of all the APIs and links to their docs)
├── Public and Private Catalogs
├── Technical Guides (Installation, Administration, Operations, Troubleshooting Guides)
├── Security, Compliance, Sovereignty (General concepts and tutorials/runbooks, plus links to deeper technical docs)
└── Versions Matrix (only if 'k0rdent AI is the product')

1. 
```

```
k0rdent AI  (/k0rdent-ai/latest)
├── Overview
├── What's new
│   ├── k0rdent AI (latest release highlights)
│   ├── Provider Edition release notes
│   ├── Enterprise Edition release notes
│   ├── Platform release notes
│   └── k0rdent Virtualization release notes
├── Feature Matrix
│   ├── Edition comparison
│   └── Platform capabilities
├── Architecture
│   ├── System diagram
│   ├── Editions and Platform relationship
│   └── Reference Architecture - links to Platform > Reference Architecture
├── Get Started
│   ├── Prerequisites
│   ├── Install Platform
│   ├── Install Provider Edition
│   └── Install Enterprise Edition
├── Provider Edition  (/k0rdent-ai/latest/provider-edition)
│   ├── Solutions
│   │   ├── Onboard your first tenant
│   │   ├── Publish a service to your catalog
│   │   ├── Brand your provider portal
│   │   ├── Automate tenant provisioning
│   │   ├── Offer MKE 4 clusters as a managed service
│   │   ├── Offer GPU/AI workloads as a managed service
│   │   ├── Migrate customers from a legacy cloud platform
│   │   ├── Build a multi-tier service catalog
│   │   └── Launch a full neocloud business
│   ├── Neocloud operating model
│   ├── Service catalog and vending
│   ├── Tenant and customer management
│   ├── Provider web UI - open question: Service Builder? Shared with Enterprise?
│   ├── Provider OpenAPI - open question: Provider-only or shared?
│   │   ├── API reference
│   │   └── API tutorials
│   ├── Install Provider Edition - links to Get Started > Install Provider Edition
│   ├── Administer - links to Platform > Administer (Provider-oriented)
│   ├── Operate - links to Platform > Operate (Provider-oriented)
│   ├── Upgrade - links to Platform > Upgrade (Provider-oriented)
│   ├── Troubleshoot - links to Platform > Troubleshoot (Provider-oriented)
│   └── Release notes
├── Enterprise Edition  (/k0rdent-ai/latest/enterprise-edition)
│   ├── Solutions
│   │   ├── Deploy your first production cluster
│   │   ├── Set up multi-cluster management
│   │   ├── Integrate with enterprise IAM
│   │   ├── Enable AI/ML workloads
│   │   ├── Deploy MKE 4 as managed clusters
│   │   ├── Implement policy and compliance guardrails
│   │   ├── Set up cluster lifecycle management
│   │   └── Migrate from a legacy Kubernetes platform
│   ├── Enterprise operating model
│   ├── Enterprise services management
│   ├── Deploy MKE 4 clusters
│   ├── Enterprise web UI - open question: shared with Provider?
│   ├── Enterprise API - open question: same as Platform API?
│   │   ├── API reference
│   │   └── API tutorials
│   ├── Install Enterprise Edition - links to Get Started > Install Enterprise Edition
│   ├── Administer - links to Platform > Administer (Enterprise-oriented)
│   ├── Operate - links to Platform > Operate (Enterprise-oriented)
│   ├── Upgrade - links to Platform > Upgrade (Enterprise-oriented)
│   ├── Troubleshoot - links to Platform > Troubleshoot (Enterprise-oriented)
│   └── Release notes
├── Platform  (/k0rdent-ai/latest/platform)
│   ├── Overview
│   ├── Architecture
│   ├── Reference Architecture
│   │   ├── Compute
│   │   ├── Storage
│   │   ├── Network
│   │   └── GPU
│   ├── Install Platform
│   ├── Install Edition
│   ├── Integrate with IAM
│   ├── Provision Services Catalog
│   ├── Policy Management
│   ├── Drift Prevention
│   ├── k0rdent AI Platform Templates
│   │   ├── Default clusterTemplates
│   │   ├── Default serviceTemplates
│   │   ├── How to Build a clusterTemplate
│   │   └── How to Build a serviceTemplate
│   ├── KCM (k0rdent Cluster Manager)
│   ├── KSM (k0rdent Service Manager)
│   ├── KOF (Observability & FinOps)
│   │   ├── Architecture
│   │   ├── Install
│   │   ├── Configure
│   │   └── Operate
│   ├── Platform web UI - open question: does one exist?
│   ├── Platform API
│   │   ├── API reference
│   │   └── API tutorials
│   ├── kubectl and YAML reference
│   ├── Administer
│   ├── Operate
│   ├── Upgrade
│   ├── Troubleshoot
│   └── Release notes
├── k0rdent Virtualization add-on
│   ├── Overview
│   ├── Pertinence to Provider Edition
│   ├── Pertinence to Enterprise Edition
│   ├── Solutions
│   │   ├── VM-on-Kubernetes greenfield
│   │   ├── VMware migration
│   │   ├── Mixed VM and container workloads
│   │   └── GPU/AI workload isolation
│   ├── Install in Provider Edition context
│   ├── Install in Enterprise Edition context
│   ├── Reference
│   └── Release notes
├── k0rdent AI APIs - open question: index/map or standalone reference?
│   ├── Provider Edition APIs
│   ├── Enterprise Edition APIs
│   └── Platform APIs
├── Web UI - open question: index or remove if bound to subunits
├── kubectl and YAML - open question: index or move inside Platform
├── Operate - open question: index or move inside Platform and Editions
├── Upgrade - open question: index or move inside Platform and Editions
├── Troubleshoot - open question: index or move inside Platform and Editions
└── Versions Matrix
    ├── Current versions
    ├── Version compatibility
    ├── Upgrade paths
    └── Lifecycle and support policy
```

## Notes to self

**Release rollup problem:** The product stack has many subunits - KCM, KSM, KOF, web UIs, API subunits, and more. How do release notes for these get rolled up into the big product chunks (Provider Edition, Enterprise Edition, Platform)? Who owns the rollup? Is there a single k0rdent AI release that versions all subunits together, or do subunits ship independently and the Edition/Platform pages just aggregate links? This needs an answer before the Versions and Release notes sections can be designed properly.

## Detailed structure

One unified docs body covering Provider Edition, Enterprise Edition, and the shared Platform component.

```
k0rdent AI  (/k0rdent-ai/latest)
├── Overview
├── What's new
├── Architecture
├── Provider Edition  (/k0rdent-ai/latest/provider-edition)
│   ├── Solutions
│   │   ├── Onboard your first tenant
│   │   ├── Publish a service to your catalog
│   │   ├── Brand your provider portal
│   │   ├── Automate tenant provisioning
│   │   ├── Offer MKE 4 clusters as a managed service
│   │   ├── Offer GPU/AI workloads as a managed service
│   │   ├── Migrate customers from a legacy cloud platform
│   │   ├── Build a multi-tier service catalog
│   │   └── Launch a full neocloud business
│   ├── Neocloud operating model
│   ├── Service catalog and vending
│   ├── Tenant and customer management
│   ├── Provider web UI (Service Builder?)
│   ├── Provider web UI (Shared webUI with Enterprise + Platform?)
│   └── Provider OpenAPI (API specifically for Provider Edition)
├── Enterprise Edition  (/k0rdent-ai/latest/enterprise-edition)
│   ├── Solutions
│   ├── Enterprise operating model
│   ├── Enterprise services management
│   └── Deploy MKE 4 clusters
├── Platform (/k0rdent-ai/latest/platform-component)
│   ├── Overview
│   ├── Architecture
│   ├── Reference Architecture
│   │   ├── Compute
│   │   ├── Storage
│   │   ├── Network
│   │   └── GPU
│   ├── QuickStarts
│   ├── Install Platform
│   ├── Install Edition
│   ├── Integrate with IAM
│   ├── Provision Services Catalog
│   ├── Policy Management
│   ├── Drift Prevention
│   ├── k0rdent AI Platform Templates
│   │   ├── Default clusterTemplates
│   │   ├── Default serviceTemplates
│   │   ├── How to Build a clusterTemplate
│   │   └── How to Build a serviceTemplate
│   ├── Administrator Guide
│   ├── User Guide
│   ├── Integration with MKE 4
│   ├── Integration with k0rdent AI
│   ├── Reference
│   └── Troubleshooting
├── k0rdent Virtualization add-on
├── APIs
├── Web UI
├── kubectl and YAML
├── Operate
├── Upgrade
├── Troubleshoot
├── Compatibility - exits context
├── Release notes - exits context
└── Versions
```

## Notes

**Platform component:** Also ships standalone as *k0rdent Enterprise* and embedded in MKE 4.1.1+. Its sub-tree here reflects the full content it carries when reached via the k0rdent AI product context.

**Gaps identified in design discussion:**
- Use cases / solution paths under k0rdent Virtualization (at least four: VM-on-Kubernetes greenfield, VMware migration, mixed VM+container, GPU/AI workload isolation)
- Version dependency tables should live on version landing pages, not behind the Compatibility cross-context link
- Compatibility and Release notes links cause a context-shift on click; their placement in this menu needs rethinking

**Open questions for management and engineering:**
- Are APIs bound to product subunits (Provider OpenAPI, Platform API, etc.) or is there a unified cross-cutting k0rdent AI API that warrants a top-level reference section?
- Are Web UIs bound to subunits (Provider web UI, Platform web UI) or is there a shared web UI that needs top-level treatment?
- Do kubectl and YAML, Operate, Upgrade, and Troubleshoot belong inside Platform and each Edition, or do they warrant top-level sections in their own right?
