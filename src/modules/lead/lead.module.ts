import { Module } from '@nestjs/common'
import { CreateLeadController } from './controllers/create-lead.controller'
import { ListLeadsController } from './controllers/list-leads.controller'

import { UpdateLeadController } from './controllers/update-lead.controller'
import { DeleteLeadController } from './controllers/delete-lead.controller'
import { LeadService } from './services/lead.service'
import { LeadRepository } from './repositories/lead.repository'
import { ListLeadByIdController } from './controllers/list-lead-by-id.controller'

@Module({
  controllers: [
    CreateLeadController,
    ListLeadsController,
    ListLeadByIdController,
    UpdateLeadController,
    DeleteLeadController,
  ],
  providers: [LeadService, LeadRepository],
  exports: [LeadService],
})
export class LeadModule {}
