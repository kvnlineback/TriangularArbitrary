import { TicketTypes, TicketSeverityTypes } from '../Enums/Enums';

export class ITicketModel {
  id: string;
  subject: string;
  type: TicketTypes;
  severity: TicketSeverityTypes;
  ticketReason: string;
  user: string;
  resolved: boolean;
  resolvedReason: string;

  constructor(subject?: string, type?: TicketTypes, severity?: TicketSeverityTypes, ticketReason?: string, user?: string, resolved?: boolean, resolvedReason?: string) {
    this.subject = subject;
    this.type = type;
    this.severity = severity;
    this.ticketReason = ticketReason;
    this.user = user;
    this.resolved = resolved;
    this.resolvedReason = resolvedReason;
  }
}
