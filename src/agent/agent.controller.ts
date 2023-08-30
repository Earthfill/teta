import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AgentService } from './agent.service';
import { AddAgentDto, SuspendAgentDto } from './dto';
import { Agent } from './schemas';

@UseGuards(AuthGuard('jwt'))
@Controller('agent')
export class AgentController {
  constructor(private agentService: AgentService) {}

  @Post('custom')
  getAgentCustom(@Body() customDto: object) {
    return this.agentService.getAgentCustom(customDto);
  }

  @Post()
  addAgent(@Body() addAgentDto: AddAgentDto): Promise<Agent> {
    return this.agentService.addAgent(addAgentDto);
  }

  @Get()
  getAllAgents(): Promise<Agent[]> {
    return this.agentService.getAllAgents();
  }

  @Get(':id')
  getAgentById(@Param('id') agentId: string): Promise<Agent> {
    return this.agentService.getAgentById(agentId);
  }

  @Put('suspend/:id')
  suspendAgent(
    @Param('id') agentId: string,
    @Body() suspendAgentDto: SuspendAgentDto,
  ): Promise<Agent> {
    return this.agentService.suspendAgent(agentId, suspendAgentDto);
  }
}
