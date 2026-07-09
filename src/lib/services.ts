import { Compass, TrendingUp, Workflow, Server } from 'lucide-react';

export type Service = {
  id: string;
  index: string;
  title: string;
  desc: string;
  icon: typeof Compass;
};

export const SERVICES: Service[] = [
  {
    id: 'brand-audit',
    index: '01',
    title: 'Brand System Audit',
    desc: 'Structure + clarity analysis. We decode positioning, narrative, and visual logic into a single executable system.',
    icon: Compass,
  },
  {
    id: 'growth-architecture',
    index: '02',
    title: 'Growth Architecture',
    desc: 'Funnels + acquisition systems engineered for compounding, not spikes. Channel logic, conversion maps, retention loops.',
    icon: TrendingUp,
  },
  {
    id: 'workflow-systems',
    index: '03',
    title: 'Workflow Systems Design',
    desc: 'Automation + operations mapping. We remove manual drag and design the operating system your team runs on.',
    icon: Workflow,
  },
  {
    id: 'infrastructure-mapping',
    index: '04',
    title: 'Infrastructure Mapping',
    desc: 'Tools + backend system logic. A documented stack architecture that scales without re-platforming every quarter.',
    icon: Server,
  },
];
