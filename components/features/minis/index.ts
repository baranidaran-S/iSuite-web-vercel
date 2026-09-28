import { AssistantMini, InboxMini } from "@/components/features/minis/conversations";
import {
  AppointmentsMini,
  ContactMini,
  FollowUpsMini,
  PipelineMini,
} from "@/components/features/minis/sales";
import {
  BroadcastMini,
  LeadCaptureMini,
  MetaAdsMini,
} from "@/components/features/minis/marketing";
import {
  AutomationsMini,
  CommerceMini,
  ReportsMini,
  TeamMini,
} from "@/components/features/minis/operations";
import type { MiniProps } from "@/components/features/minis/parts";
import type { features } from "@/lib/content/features";

/* One mini per feature, keyed by the feature's slug from features.ts. Typed
   against that list, so a fourteenth feature added there fails to compile
   here until it has a picture - rather than leaving a gap on a sheet
   somewhere nobody looks. */
type Slug =
  (typeof features)["groups"][number]["items"][number]["slug"];

export const featureMinis: Record<
  Slug,
  (props: MiniProps) => React.JSX.Element
> = {
  "one-inbox": InboxMini,
  "ai-sales-assistant": AssistantMini,
  contacts: ContactMini,
  "sales-pipeline": PipelineMini,
  "follow-ups": FollowUpsMini,
  appointments: AppointmentsMini,
  "meta-ads": MetaAdsMini,
  broadcasts: BroadcastMini,
  "lead-capture": LeadCaptureMini,
  automations: AutomationsMini,
  reports: ReportsMini,
  "team-permissions": TeamMini,
  "chat-commerce": CommerceMini,
};
