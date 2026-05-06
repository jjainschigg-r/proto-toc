import V0Projections from './V0Projections';

export const variants = [
  {
    id: 'v0',
    name: 'V0 — Menus as projections',
    description: 'The reference implementation. Each page carries a menu assignment; the left rail shows the projection for that page\'s context. Navigation shifts the left rail as you cross product/platform/solution/compatibility boundaries.',
    component: V0Projections,
  },
];

export function findVariant(id) {
  return variants.find(v => v.id === id) || null;
}
