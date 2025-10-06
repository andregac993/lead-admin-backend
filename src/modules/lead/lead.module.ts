import { Module } from '@nestjs/common'
import { CreateLeadController } from './controllers/create-lead.controller'
import { ListLeadsController } from './controllers/list-leads.controller'
import { UpdateLeadController } from './controllers/update-lead.controller'
import { DeleteLeadController } from './controllers/delete-lead.controller'
import { ListLeadByIdController } from './controllers/list-lead-by-id.controller'
import { ExportLeadsController } from './controllers/export-leads.controller'
import { LeadService } from './services/lead.service'
import { ExportLeadService } from './services/export-lead.service'
import { LeadRepository } from './repositories/lead.repository'

@Module({
  controllers: [
    CreateLeadController,
    ListLeadsController,
    ListLeadByIdController,
    UpdateLeadController,
    DeleteLeadController,
    ExportLeadsController,
  ],
  providers: [LeadService, ExportLeadService, LeadRepository],
  exports: [LeadService],
})
export class LeadModule {}
