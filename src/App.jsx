import React, { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronRight, ExternalLink, Menu, Search, GitBranch, Layers, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const menus = {
  global: {
    label: "Global left navigation",
    description: "Top-level docs navigation shown on docs.mirantis.com and broad entry pages.",
    items: [
      { label: "Start here", url: "/start", children: [
        { label: "Product and platform map", url: "/start/product-and-platform-map" },
        { label: "Choose your path", url: "/start/choose-your-path" },
        { label: "Compatibility and lifecycle", url: "/start/compatibility-and-lifecycle" },
      ]},
      { label: "Platforms", url: "/platforms", children: [
        { label: "k0rdent AI", url: "/platforms/k0rdent-ai" },
        { label: "Enterprise Kubernetes", url: "/platforms/enterprise-kubernetes" },
        { label: "Enterprise Container Platform", url: "/platforms/enterprise-container-platform" },
        { label: "Virtualization and Private Cloud", url: "/platforms/virtualization-and-private-cloud" },
      ]},
      { label: "Solutions", url: "/solutions", children: [
        { label: "Neocloud provider platform", url: "/solutions/neocloud-provider-platform" },
        { label: "Enterprise AI platform", url: "/solutions/enterprise-ai-platform" },
        { label: "Enterprise Kubernetes", url: "/solutions/enterprise-kubernetes" },
        { label: "Container platform modernization", url: "/solutions/container-platform-modernization" },
        { label: "Private cloud and virtualization", url: "/solutions/private-cloud-and-virtualization" },
        { label: "Service provider cloud", url: "/solutions/service-provider-cloud" },
      ]},
      { label: "Products", url: "/products", children: [
        { label: "k0rdent AI", url: "/k0rdent-ai/latest" },
        { label: "k0rdent Platform", url: "/k0rdent-platform/latest" },
        { label: "Mirantis k0rdent Virtualization", url: "/k0rdent-virtualization/latest" },
        { label: "Mirantis Kubernetes Engine", url: "/mke/latest" },
        { label: "Mirantis Secure Registry", url: "/msr/latest" },
        { label: "Mirantis Container Runtime", url: "/mcr/latest" },
        { label: "Mirantis OpenStack for Kubernetes", url: "/mosk/latest" },
        { label: "mkectl", url: "/mkectl/latest" },
      ]},
      { label: "Compatibility & lifecycle", url: "/compatibility", children: [
        { label: "Support matrix", url: "/compatibility/support-matrix" },
        { label: "Product lifecycle", url: "/compatibility/product-lifecycle" },
        { label: "Version compatibility", url: "/compatibility/version-compatibility" },
        { label: "Upgrade paths", url: "/compatibility/upgrade-paths" },
        { label: "Validated configurations", url: "/compatibility/validated-configurations" },
      ]},
      { label: "Release notes", url: "/release-notes", children: [
        { label: "k0rdent AI", url: "/release-notes/k0rdent-ai" },
        { label: "Mirantis Kubernetes Engine", url: "/release-notes/mke" },
        { label: "Mirantis Secure Registry", url: "/release-notes/msr" },
        { label: "Mirantis OpenStack for Kubernetes", url: "/release-notes/mosk" },
      ]},
      { label: "Reference", url: "/reference", children: [
        { label: "APIs", url: "/reference/apis" },
        { label: "CLI", url: "/reference/cli" },
        { label: "CRDs", url: "/reference/crds" },
        { label: "YAML schemas", url: "/reference/yaml-schemas" },
        { label: "Configuration", url: "/reference/configuration" },
        { label: "Error codes", url: "/reference/error-codes" },
      ]},
      { label: "Support", url: "/support" },
    ],
  },
  platform_enterprise_kubernetes: {
    label: "Enterprise Kubernetes platform navigation",
    description: "Local navigation for the Enterprise Kubernetes product-universe docs.",
    items: [
      { label: "Overview", url: "/platforms/enterprise-kubernetes" },
      { label: "Architecture", url: "/platforms/enterprise-kubernetes/architecture" },
      { label: "Products and components", url: "/platforms/enterprise-kubernetes/products-and-components", children: [
        { label: "Mirantis Kubernetes Engine", url: "/mke/latest" },
        { label: "mkectl", url: "/mkectl/latest" },
        { label: "Mirantis Secure Registry", url: "/msr/latest" },
        { label: "Mirantis Container Runtime", url: "/mcr/latest" },
      ]},
      { label: "MKE 3 vs MKE 4", url: "/platforms/enterprise-kubernetes/mke-3-vs-mke-4" },
      { label: "Choose an MKE version", url: "/mke/versions" },
      { label: "Deploy a single cluster", url: "/platforms/enterprise-kubernetes/deploy-a-single-cluster" },
      { label: "Operate enterprise Kubernetes", url: "/platforms/enterprise-kubernetes/operate-enterprise-kubernetes" },
      { label: "Upgrade from MKE 3 to MKE 4", url: "/solutions/container-platform-modernization/mke-3-to-mke-4" },
      { label: "Relationship to k0rdent AI", url: "/platforms/enterprise-kubernetes/relationship-to-k0rdent-ai" },
      { label: "Compatibility", url: "/compatibility/mke" },
      { label: "Lifecycle", url: "/compatibility/product-lifecycle#mke" },
    ],
  },
  product_mke_latest: {
    label: "MKE latest product navigation",
    description: "Local navigation shown in the current recommended MKE docs.",
    items: [
      { label: "Overview", url: "/mke/latest" },
      { label: "What's new", url: "/mke/latest/whats-new" },
      { label: "Get started", url: "/mke/latest/get-started" },
      { label: "Architecture", url: "/mke/latest/architecture" },
      { label: "Install", url: "/mke/latest/install" },
      { label: "Configure", url: "/mke/latest/configure" },
      { label: "Operate", url: "/mke/latest/operate" },
      { label: "Secure", url: "/mke/latest/secure" },
      { label: "Monitor", url: "/mke/latest/monitor" },
      { label: "Upgrade", url: "/mke/latest/upgrade" },
      { label: "Troubleshoot", url: "/mke/latest/troubleshoot" },
      { label: "Reference", url: "/mke/latest/reference" },
      { label: "Compatibility", url: "/compatibility/mke" },
      { label: "Release notes", url: "/release-notes/mke" },
      { label: "Versions", url: "/mke/versions" },
    ],
  },
  product_mke_versions: {
    label: "MKE versions navigation",
    description: "The intentionally explicit version ladder; used only on version-index contexts.",
    items: [
      { label: "Current version", url: "/mke/latest", children: [
        { label: "4.1.3", url: "/mke/4.1.3" },
      ]},
      { label: "MKE 4.x", url: "/mke/versions#mke-4", children: [
        { label: "4.1.3", url: "/mke/4.1.3" },
        { label: "4.1.2", url: "/mke/4.1.2" },
        { label: "4.1.1", url: "/mke/4.1.1" },
        { label: "4.1.0", url: "/mke/4.1.0" },
        { label: "4.0.x", url: "/mke/4.0" },
      ]},
      { label: "MKE 3.x", url: "/mke/versions#mke-3", children: [
        { label: "3.9.2", url: "/mke/3.9.2" },
        { label: "3.9.1", url: "/mke/3.9.1" },
        { label: "3.9.0", url: "/mke/3.9.0" },
        { label: "3.8.x", url: "/mke/3.8" },
        { label: "3.7.x", url: "/mke/3.7" },
      ]},
      { label: "Upgrade paths", url: "/compatibility/upgrade-paths#mke", children: [
        { label: "MKE 3 to MKE 4", url: "/solutions/container-platform-modernization/mke-3-to-mke-4" },
      ]},
      { label: "Lifecycle", url: "/compatibility/product-lifecycle#mke", children: [
        { label: "Supported versions", url: "/mke/versions#supported" },
        { label: "Maintenance versions", url: "/mke/versions#maintenance" },
        { label: "Archived versions", url: "/mke/versions#archived" },
        { label: "End-of-life versions", url: "/mke/versions#end-of-life" },
      ]},
    ],
  },
  product_mke_4: {
    label: "MKE 4 version navigation",
    description: "Local navigation for an individual MKE 4.x version.",
    items: [
      { label: "Overview", url: "/mke/4.1.3" },
      { label: "Architecture", url: "/mke/4.1.3/architecture" },
      { label: "Release notes", url: "/release-notes/mke/4.1.3" },
      { label: "Install", url: "/mke/4.1.3/install" },
      { label: "Configure", url: "/mke/4.1.3/configure" },
      { label: "Cluster lifecycle", url: "/mke/4.1.3/cluster-lifecycle" },
      { label: "Services management with k0rdent Platform", url: "/mke/4.1.3/services-management" },
      { label: "Administer", url: "/mke/4.1.3/administer" },
      { label: "Secure", url: "/mke/4.1.3/secure" },
      { label: "Monitor", url: "/mke/4.1.3/monitor" },
      { label: "Upgrade", url: "/mke/4.1.3/upgrade" },
      { label: "Relationship to k0rdent AI", url: "/mke/4.1.3/relationship-to-k0rdent-ai" },
      { label: "Integrate with MSR", url: "/mke/4.1.3/integrate/msr" },
      { label: "Container runtime options", url: "/mke/4.1.3/container-runtime-options" },
      { label: "Troubleshoot", url: "/mke/4.1.3/troubleshoot" },
      { label: "Reference", url: "/mke/4.1.3/reference" },
      { label: "Compatibility", url: "/compatibility/mke" },
      { label: "All MKE versions", url: "/mke/versions" },
    ],
  },
  product_mke_3: {
    label: "MKE 3 version navigation",
    description: "Local navigation for an individual MKE 3.x version.",
    items: [
      { label: "Overview", url: "/mke/3.9.2" },
      { label: "Architecture", url: "/mke/3.9.2/architecture" },
      { label: "Release notes", url: "/release-notes/mke/3.9.2" },
      { label: "Install with mkectl", url: "/mke/3.9.2/install" },
      { label: "Configure", url: "/mke/3.9.2/configure" },
      { label: "Kubernetes orchestration", url: "/mke/3.9.2/kubernetes-orchestration" },
      { label: "Swarm orchestration", url: "/mke/3.9.2/swarm-orchestration" },
      { label: "Mixed Kubernetes and Swarm", url: "/mke/3.9.2/mixed-kubernetes-and-swarm" },
      { label: "Use MCR", url: "/mke/3.9.2/use-mcr" },
      { label: "Integrate with MSR", url: "/mke/3.9.2/integrate/msr" },
      { label: "Operate", url: "/mke/3.9.2/operate" },
      { label: "Secure", url: "/mke/3.9.2/secure" },
      { label: "Monitor", url: "/mke/3.9.2/monitor" },
      { label: "Upgrade", url: "/mke/3.9.2/upgrade" },
      { label: "Troubleshoot", url: "/mke/3.9.2/troubleshoot" },
      { label: "Reference", url: "/mke/3.9.2/reference" },
      { label: "Compatibility", url: "/compatibility/mke" },
      { label: "Upgrade to MKE 4", url: "/solutions/container-platform-modernization/mke-3-to-mke-4" },
      { label: "All MKE versions", url: "/mke/versions" },
    ],
  },
  compatibility: {
    label: "Compatibility and lifecycle navigation",
    description: "Navigation for support matrices, lifecycle, version compatibility, and upgrade paths.",
    items: [
      { label: "Overview", url: "/compatibility" },
      { label: "Product lifecycle", url: "/compatibility/product-lifecycle" },
      { label: "Support matrix", url: "/compatibility/support-matrix", children: [
        { label: "k0rdent AI", url: "/compatibility/k0rdent-ai" },
        { label: "MKE", url: "/compatibility/mke" },
        { label: "MSR", url: "/compatibility/msr" },
        { label: "MCR", url: "/compatibility/mcr" },
        { label: "MOSK", url: "/compatibility/mosk" },
      ]},
      { label: "Version compatibility", url: "/compatibility/version-compatibility", children: [
        { label: "MKE + MSR + MCR", url: "/compatibility/mke-msr-mcr" },
        { label: "k0rdent AI + MKE", url: "/compatibility/k0rdent-ai-mke" },
        { label: "k0rdent AI + Virtualization", url: "/compatibility/k0rdent-ai-virtualization" },
        { label: "MOSK + MKE", url: "/compatibility/mosk-mke" },
      ]},
      { label: "Upgrade paths", url: "/compatibility/upgrade-paths", children: [
        { label: "MKE 3 to MKE 4", url: "/solutions/container-platform-modernization/mke-3-to-mke-4" },
        { label: "MSR 2 to MSR 4", url: "/solutions/container-platform-modernization/msr-2-to-msr-4" },
      ]},
      { label: "Component dependencies", url: "/compatibility/component-dependencies" },
      { label: "Validated configurations", url: "/compatibility/validated-configurations" },
      { label: "Deprecated and removed features", url: "/compatibility/deprecated-removed-features" },
    ],
  },
  solution_container_platform_modernization: {
    label: "Container platform modernization navigation",
    description: "Cross-product navigation for moving from MKE 3/MSR 2/MCR to MKE 4/MSR 4/containerd/k0rdent Platform.",
    items: [
      { label: "Overview", url: "/solutions/container-platform-modernization" },
      { label: "Modernization paths", url: "/solutions/container-platform-modernization/modernization-paths", children: [
        { label: "MKE 3 to MKE 4", url: "/solutions/container-platform-modernization/mke-3-to-mke-4" },
        { label: "MSR 2 to MSR 4", url: "/solutions/container-platform-modernization/msr-2-to-msr-4" },
        { label: "MCR to containerd considerations", url: "/solutions/container-platform-modernization/mcr-to-containerd" },
      ]},
      { label: "Plan a migration", url: "/solutions/container-platform-modernization/plan-a-migration" },
      { label: "Assess compatibility", url: "/solutions/container-platform-modernization/assess-compatibility" },
      { label: "Validate the new platform", url: "/solutions/container-platform-modernization/validate-new-platform" },
      { label: "Roll back or recover", url: "/solutions/container-platform-modernization/rollback-recovery" },
      { label: "Reference architectures", url: "/solutions/container-platform-modernization/reference-architectures" },
      { label: "Related product docs", url: "/solutions/container-platform-modernization/related-product-docs", children: [
        { label: "MKE latest", url: "/mke/latest" },
        { label: "MKE versions", url: "/mke/versions" },
        { label: "MSR latest", url: "/msr/latest" },
        { label: "MCR latest", url: "/mcr/latest" },
      ]},
    ],
  },
};

const pages = [
  { url: "/", aliases: ["/docs", "/home"], menu: "global", h1: "Mirantis Docs", description: "Entry point for Mirantis technical documentation, with paths into platform docs, solution docs, product docs, compatibility and lifecycle information, release notes, and reference material." },
  { url: "/start", aliases: [], menu: "global", h1: "Start here", description: "Orientation hub for users who need help choosing the right Mirantis product, platform, solution path, or compatibility resource." },
  { url: "/start/product-and-platform-map", aliases: [], menu: "global", h1: "Product and platform map", description: "A concise map of Mirantis platforms, product universes, individual products, editions, add-ons, tools, and how they relate." },
  { url: "/start/choose-your-path", aliases: [], menu: "global", h1: "Choose your path", description: "Task- and role-oriented guide that directs users to the right docs path, such as operating MKE, building a neocloud platform, modernizing MKE 3, or deploying private cloud." },
  { url: "/platforms", aliases: [], menu: "global", h1: "Platforms and product universes", description: "Landing page for Mirantis platform-level documentation, where multiple products and components are explained as integrated systems." },
  { url: "/platforms/k0rdent-ai", aliases: [], menu: "global", h1: "k0rdent AI platform", description: "Product-universe documentation for k0rdent AI as a multi-cluster, multi-cloud Kubernetes and services orchestration platform with Provider and Enterprise editions, a shared Platform component, and optional k0rdent Virtualization." },
  { url: "/platforms/enterprise-kubernetes", aliases: [], menu: "platform_enterprise_kubernetes", h1: "Enterprise Kubernetes", description: "Product-universe documentation for Mirantis enterprise Kubernetes, centered on MKE across both MKE 3.x and MKE 4.x architecture generations." },
  { url: "/platforms/enterprise-kubernetes/architecture", aliases: [], menu: "platform_enterprise_kubernetes", h1: "Enterprise Kubernetes architecture", description: "Explains architecture patterns for Mirantis enterprise Kubernetes, including MKE generations, mkectl, MSR, MCR, and k0rdent Platform in MKE 4.1.1 and later." },
  { url: "/platforms/enterprise-kubernetes/products-and-components", aliases: [], menu: "platform_enterprise_kubernetes", h1: "Enterprise Kubernetes products and components", description: "Maps MKE, mkectl, MSR, MCR, and related components used in enterprise Kubernetes deployments." },
  { url: "/platforms/enterprise-kubernetes/mke-3-vs-mke-4", aliases: ["/mke/mke-3-vs-mke-4"], menu: "platform_enterprise_kubernetes", h1: "MKE 3 vs MKE 4", description: "Architecture-generation explainer showing how MKE 3.x differs from MKE 4.x, including Docker Universal Control Plane roots, Kubernetes/Swarm support, k0s-based MKE 4, runtime differences, and k0rdent Platform integration." },
  { url: "/platforms/enterprise-kubernetes/relationship-to-k0rdent-ai", aliases: [], menu: "platform_enterprise_kubernetes", h1: "Relationship between MKE and k0rdent AI", description: "Explains how MKE 4 acts as an onramp to k0rdent AI and how MKE clusters participate in the broader k0rdent AI platform story." },
  { url: "/platforms/enterprise-container-platform", aliases: [], menu: "global", h1: "Enterprise Container Platform", description: "Product-universe documentation for MKE, MSR, and MCR as an enterprise container platform, including Docker Enterprise lineage and modernization paths." },
  { url: "/platforms/virtualization-and-private-cloud", aliases: [], menu: "global", h1: "Virtualization and Private Cloud", description: "Product-universe documentation for MOSK, k0rdent Virtualization, KubeVirt, and private-cloud deployment models for enterprises and service providers." },
  { url: "/solutions", aliases: [], menu: "global", h1: "Solutions", description: "Cross-product documentation organized around user outcomes and deployment patterns rather than individual product boundaries." },
  { url: "/solutions/container-platform-modernization", aliases: [], menu: "solution_container_platform_modernization", h1: "Container platform modernization", description: "Cross-product modernization path from the MKE 3/MSR 2/MCR world to the MKE 4/MSR 4/containerd/k0rdent Platform world." },
  { url: "/solutions/container-platform-modernization/mke-3-to-mke-4", aliases: ["/mke/upgrade/mke-3-to-mke-4"], menu: "solution_container_platform_modernization", h1: "Upgrade from MKE 3 to MKE 4", description: "Migration and upgrade guidance for customers moving from MKE 3.x to MKE 4.x, including planning, compatibility, architecture-generation differences, and links to version-specific product docs." },
  { url: "/products", aliases: [], menu: "global", h1: "Products", description: "Product index that lists Mirantis products and sends primary product links to the latest recommended docs for each product." },
  { url: "/mke/latest", aliases: ["/mke"], menu: "product_mke_latest", h1: "Mirantis Kubernetes Engine latest documentation", description: "Current recommended product documentation for MKE. This route represents the latest MKE 4.x documentation while providing prominent links to all MKE versions, MKE 3.x documentation, MKE 3 to MKE 4 upgrade guidance, compatibility, and release notes." },
  { url: "/mke/versions", aliases: ["/mke/all-versions"], menu: "product_mke_versions", h1: "Mirantis Kubernetes Engine versions", description: "Version index for MKE, listing current, supported, maintenance, archived, and end-of-life versions. This is the correct home for the explicit version ladder such as 4.1.3, 4.1.2, 4.1.1, 4.1.0, 3.9.2, and older versions." },
  { url: "/mke/4.1.3", aliases: [], menu: "product_mke_4", h1: "Mirantis Kubernetes Engine 4.1.3", description: "Product documentation home for MKE 4.1.3, a k0s-based MKE 4 version. Includes installation, configuration, operations, security, monitoring, upgrade, troubleshooting, reference, compatibility, and release notes." },
  { url: "/mke/4.1.2", aliases: [], menu: "product_mke_4", h1: "Mirantis Kubernetes Engine 4.1.2", description: "Product documentation home for MKE 4.1.2, a k0s-based MKE 4 version. Includes version-specific installation, configuration, operations, security, monitoring, upgrade, troubleshooting, reference, compatibility, and release notes." },
  { url: "/mke/4.1.1", aliases: [], menu: "product_mke_4", h1: "Mirantis Kubernetes Engine 4.1.1", description: "Product documentation home for MKE 4.1.1, a k0s-based MKE 4 version that includes k0rdent Platform as a services manager. Includes version-specific docs and links to k0rdent AI relationship material." },
  { url: "/mke/4.1.0", aliases: [], menu: "product_mke_4", h1: "Mirantis Kubernetes Engine 4.1.0", description: "Product documentation home for MKE 4.1.0, a k0s-based MKE 4 version. Includes version-specific product documentation, release notes, compatibility, and upgrade guidance." },
  { url: "/mke/4.0", aliases: ["/mke/4.0.x"], menu: "product_mke_4", h1: "Mirantis Kubernetes Engine 4.0.x", description: "Product documentation home for the MKE 4.0 release line, representing early k0s-based MKE 4 documentation and upgrade guidance." },
  { url: "/mke/3.9.2", aliases: [], menu: "product_mke_3", h1: "Mirantis Kubernetes Engine 3.9.2", description: "Product documentation home for MKE 3.9.2, part of the Docker Universal Control Plane architecture generation supporting Kubernetes, Swarm, or both. Includes MCR and MSR integration guidance and upgrade path links to MKE 4." },
  { url: "/mke/3.9.1", aliases: [], menu: "product_mke_3", h1: "Mirantis Kubernetes Engine 3.9.1", description: "Product documentation home for MKE 3.9.1, part of the Docker Universal Control Plane architecture generation with Kubernetes and Swarm support." },
  { url: "/mke/3.9.0", aliases: [], menu: "product_mke_3", h1: "Mirantis Kubernetes Engine 3.9.0", description: "Product documentation home for MKE 3.9.0, part of the Docker Universal Control Plane architecture generation with Kubernetes and Swarm support." },
  { url: "/mke/3.8", aliases: ["/mke/3.8.x"], menu: "product_mke_3", h1: "Mirantis Kubernetes Engine 3.8.x", description: "Archived or maintenance documentation home for the MKE 3.8 release line, depending on lifecycle status." },
  { url: "/mke/3.7", aliases: ["/mke/3.7.x"], menu: "product_mke_3", h1: "Mirantis Kubernetes Engine 3.7.x", description: "Archived documentation home for the MKE 3.7 release line." },
  { url: "/msr/latest", aliases: ["/msr"], menu: "global", h1: "Mirantis Secure Registry latest documentation", description: "Current recommended product documentation for MSR, including registry architecture, installation, configuration, security, operations, troubleshooting, reference, compatibility, release notes, and links to MSR 2.x and MSR 4.x version history." },
  { url: "/mcr/latest", aliases: ["/mcr"], menu: "global", h1: "Mirantis Container Runtime latest documentation", description: "Current recommended product documentation for MCR, including standalone use, MKE 3 usage, MKE 4 special cases, security, operations, troubleshooting, reference, compatibility, and release notes." },
  { url: "/mosk/latest", aliases: ["/mosk"], menu: "global", h1: "Mirantis OpenStack for Kubernetes latest documentation", description: "Current recommended product documentation for MOSK as a VM-oriented private cloud for enterprises and service providers, including architecture, planning, installation, configuration, operations, tenant management, networking, storage, KVM hosts, upgrades, troubleshooting, reference, compatibility, and release notes." },
  { url: "/mkectl/latest", aliases: ["/mkectl"], menu: "global", h1: "mkectl latest documentation", description: "Current recommended product/tool documentation for mkectl, including installation, configuration, deployment of MKE 3 and MKE 4 clusters, upgrade and migration workflows, command reference, troubleshooting, and release notes." },
  { url: "/compatibility", aliases: ["/lifecycle"], menu: "compatibility", h1: "Compatibility and lifecycle", description: "Authoritative hub for product lifecycle, support matrices, version compatibility, component dependencies, upgrade paths, validated configurations, and deprecated or removed features." },
  { url: "/compatibility/mke", aliases: [], menu: "compatibility", h1: "MKE compatibility", description: "Authoritative compatibility and support information for MKE versions, including architecture generation, Kubernetes versions, runtime options, MSR and MCR relationships, mkectl support, and k0rdent Platform relationships." },
  { url: "/compatibility/mke-msr-mcr", aliases: [], menu: "compatibility", h1: "MKE, MSR, and MCR compatibility", description: "Cross-product compatibility matrix for MKE, MSR, and MCR combinations, including MKE 3/MSR 2/MCR patterns and MKE 4/MSR 4/containerd or MCR special-case patterns." },
  { url: "/release-notes", aliases: [], menu: "global", h1: "Release notes", description: "Central index of release notes by product and version." },
  { url: "/release-notes/mke", aliases: [], menu: "product_mke_versions", h1: "MKE release notes", description: "Release notes index for MKE 4.x and MKE 3.x versions." },
  { url: "/release-notes/mke/4.1.3", aliases: [], menu: "product_mke_4", h1: "MKE 4.1.3 release notes", description: "Release notes for MKE 4.1.3." },
  { url: "/release-notes/mke/3.9.2", aliases: [], menu: "product_mke_3", h1: "MKE 3.9.2 release notes", description: "Release notes for MKE 3.9.2." },
  { url: "/reference", aliases: [], menu: "global", h1: "Reference", description: "Central technical reference hub for APIs, CLI tools, CRDs, YAML schemas, configuration, and error codes." },
  { url: "/reference/cli/mkectl", aliases: [], menu: "global", h1: "mkectl command reference", description: "Command reference for mkectl, including commands used to deploy and manage MKE 3 and MKE 4 clusters." },
  { url: "/support", aliases: [], menu: "global", h1: "Support", description: "Support entry point for users who need help with Mirantis products, including links to support policies, lifecycle information, troubleshooting resources, and product documentation." },
];

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

function getInternalUrl() {
  const path = window.location.pathname;
  return (path.startsWith(BASE) ? path.slice(BASE.length) : path) || '/';
}

function normalizeHashless(url) {
  return url.split("#")[0];
}

function buildLookup(pages) {
  const lookup = new Map();
  pages.forEach((page) => {
    lookup.set(page.url, page);
    page.aliases?.forEach((alias) => lookup.set(alias, { ...page, aliasHit: alias }));
  });
  return lookup;
}

function findPage(url, lookup) {
  const direct = lookup.get(url);
  if (direct) return direct;
  const withoutHash = lookup.get(normalizeHashless(url));
  if (withoutHash) return withoutHash;
  return {
    url,
    aliases: [],
    menu: "global",
    h1: "Placeholder page",
    description: "This URL is referenced in a menu but not yet modeled as a full page. Add it to the pages array when you want full metadata and local-menu behavior.",
    placeholder: true,
  };
}

function MenuItem({ item, currentUrl, onNavigate, depth = 0 }) {
  const [open, setOpen] = useState(depth === 0 || item.children?.some((child) => normalizeHashless(child.url) === normalizeHashless(currentUrl)));
  const active = normalizeHashless(item.url) === normalizeHashless(currentUrl);
  const hasChildren = item.children?.length > 0;

  return (
    <div>
      <div
        className={`group flex items-center gap-1 rounded-xl px-2 py-1.5 text-sm transition ${active ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"}`}
        style={{ paddingLeft: `${8 + depth * 16}px` }}
      >
        {hasChildren ? (
          <button onClick={() => setOpen(!open)} className="shrink-0 rounded p-0.5 hover:bg-white/20" aria-label="toggle">
            {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
        ) : (
          <span className="w-[18px]" />
        )}
        <button onClick={() => onNavigate(item.url)} className="min-w-0 flex-1 truncate text-left">
          {item.label}
        </button>
      </div>
      {hasChildren && open && (
        <div className="mt-0.5 space-y-0.5">
          {item.children.map((child) => (
            <MenuItem key={`${child.label}-${child.url}`} item={child} currentUrl={currentUrl} onNavigate={onNavigate} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function LeftNav({ menu, currentUrl, onNavigate }) {
  return (
    <aside className="h-full overflow-auto border-r border-slate-200 bg-white p-4">
      <div className="mb-4 flex items-center gap-2">
        <Menu size={18} />
        <div>
          <div className="text-sm font-semibold text-slate-900">{menu.label}</div>
          <div className="text-xs text-slate-500">local left rail</div>
        </div>
      </div>
      <div className="space-y-1">
        {menu.items.map((item) => (
          <MenuItem key={`${item.label}-${item.url}`} item={item} currentUrl={currentUrl} onNavigate={onNavigate} />
        ))}
      </div>
    </aside>
  );
}

function QuickPath({ onNavigate }) {
  const paths = [
    ["Product path", "/mke/latest", "Products → MKE → latest docs"],
    ["Version ladder", "/mke/versions", "MKE latest → Versions"],
    ["MKE 3 docs", "/mke/3.9.2", "Version ladder → 3.9.2"],
    ["Platform story", "/platforms/enterprise-kubernetes", "Platforms → Enterprise Kubernetes"],
    ["Migration story", "/solutions/container-platform-modernization/mke-3-to-mke-4", "Solutions → Container platform modernization"],
    ["Compatibility truth", "/compatibility/mke", "Compatibility → MKE"],
  ];

  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {paths.map(([title, url, desc]) => (
        <button key={url} onClick={() => onNavigate(url)} className="rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-slate-400 hover:shadow-md">
          <div className="mb-1 flex items-center gap-2 font-semibold text-slate-900"><ExternalLink size={16} />{title}</div>
          <div className="text-sm text-slate-500">{desc}</div>
          <div className="mt-2 font-mono text-xs text-slate-700">{url}</div>
        </button>
      ))}
    </div>
  );
}

function RouteInspector({ page, menu }) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-5">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900"><GitBranch size={16} /> Route metadata</div>
        <dl className="space-y-3 text-sm">
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-500">Canonical URL</dt>
            <dd className="font-mono text-slate-900">{page.url}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-500">Aliases</dt>
            <dd className="font-mono text-slate-900">{page.aliases?.length ? page.aliases.join(", ") : "none"}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-500">Assigned menu</dt>
            <dd className="font-mono text-slate-900">{page.menu}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-500">Menu behavior</dt>
            <dd className="text-slate-700">{menu.description}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}

function RelatedPages({ currentUrl, lookup, onNavigate }) {
  const current = normalizeHashless(currentUrl);
  const related = pages
    .filter((page) => page.url !== currentUrl)
    .filter((page) => {
      if (current.startsWith("/mke")) return page.url.startsWith("/mke") || page.url.includes("mke") || page.description.toLowerCase().includes("mke");
      if (current.startsWith("/platforms")) return page.url.startsWith("/platforms") || page.url.startsWith("/mke");
      if (current.startsWith("/compatibility")) return page.url.startsWith("/compatibility") || page.url.startsWith("/mke");
      return page.url.split("/")[1] === current.split("/")[1];
    })
    .slice(0, 6);

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-5">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900"><Layers size={16} /> Related modeled pages</div>
        <div className="space-y-2">
          {related.length ? related.map((page) => (
            <button key={page.url} onClick={() => onNavigate(page.url)} className="block w-full rounded-xl border border-slate-100 p-3 text-left transition hover:bg-slate-50">
              <div className="font-medium text-slate-900">{page.h1}</div>
              <div className="font-mono text-xs text-slate-500">{page.url}</div>
            </button>
          )) : <div className="text-sm text-slate-500">No related modeled pages.</div>}
        </div>
      </CardContent>
    </Card>
  );
}

export default function MirantisDocsHierarchyPrototype() {
  const lookup = useMemo(() => buildLookup(pages), []);
  const [currentUrl, setCurrentUrl] = useState(() => getInternalUrl());
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handlePop = () => setCurrentUrl(getInternalUrl());
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  const page = findPage(currentUrl, lookup);
  const menu = menus[page.menu] || menus.global;

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return pages.filter((page) =>
      page.url.toLowerCase().includes(q) ||
      page.h1.toLowerCase().includes(q) ||
      page.description.toLowerCase().includes(q) ||
      page.aliases?.some((alias) => alias.toLowerCase().includes(q))
    ).slice(0, 10);
  }, [query]);

  const navigate = (url) => {
    window.history.pushState(null, '', BASE + url);
    setCurrentUrl(url);
    setQuery("");
  };

  return (
    <div className="h-screen overflow-hidden bg-slate-50 text-slate-900">
      <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900 text-white"><FileText size={18} /></div>
          <div>
            <div className="text-lg font-bold">Mirantis Docs IA click-through prototype</div>
            <div className="text-xs text-slate-500">Menus are projections over canonical pages, not the tree itself.</div>
          </div>
        </div>
        <div className="relative hidden w-[420px] md:block">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={17} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search modeled pages, URLs, aliases..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-3 text-sm outline-none focus:border-slate-400"
          />
          {searchResults.length > 0 && (
            <div className="absolute right-0 top-11 z-20 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
              {searchResults.map((result) => (
                <button key={result.url} onClick={() => navigate(result.url)} className="block w-full border-b border-slate-100 p-3 text-left last:border-b-0 hover:bg-slate-50">
                  <div className="font-medium">{result.h1}</div>
                  <div className="font-mono text-xs text-slate-500">{result.url}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="grid h-[calc(100vh-4rem)] grid-cols-[320px_1fr]">
        <LeftNav menu={menu} currentUrl={currentUrl} onNavigate={navigate} />
        <main className="overflow-auto p-6">
          <div className="mx-auto max-w-6xl space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-slate-100 px-3 py-1 font-mono text-xs text-slate-700">{page.url}</span>
                {page.aliasHit && <span className="rounded-full bg-amber-100 px-3 py-1 text-xs text-amber-800">alias hit: {page.aliasHit}</span>}
                {page.placeholder && <span className="rounded-full bg-rose-100 px-3 py-1 text-xs text-rose-800">placeholder</span>}
              </div>
              <h1 className="mb-3 text-4xl font-bold tracking-tight">{page.h1}</h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-600">{page.description}</p>
              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-2 text-sm font-semibold text-slate-900">What this page demonstrates</div>
                <p className="text-sm leading-6 text-slate-600">
                  This page uses the <span className="font-mono text-slate-900">{page.menu}</span> menu projection. Click around the left rail to see how the navigation context changes when you move from product docs to version ladders, platform narratives, solution paths, compatibility truth, and release notes.
                </p>
              </div>
            </div>

            {currentUrl === "/" && <QuickPath onNavigate={navigate} />}

            <div className="grid gap-6 lg:grid-cols-2">
              <RouteInspector page={page} menu={menu} />
              <RelatedPages currentUrl={currentUrl} lookup={lookup} onNavigate={navigate} />
            </div>

            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-5">
                <div className="mb-3 text-sm font-semibold text-slate-900">Suggested implementation rule</div>
                <pre className="overflow-auto rounded-2xl bg-slate-950 p-4 text-xs leading-6 text-slate-100">{`page.url = canonical route
page.aliases = routes that redirect or resolve to canonical route
page.menu = left-rail projection to show in this context
menus[page.menu].items = clickable nav for this context

Primary product links go to /product/latest.
Version museums live at /product/versions.
Platform and solution pages are cross-product narratives.
Compatibility pages are the authoritative source of version truth.`}</pre>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
