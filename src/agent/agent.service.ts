import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Agent, AgentDocument } from './schemas';
import { Model } from 'mongoose';
import { AddAgentDto, SuspendAgentDto } from './dto';

@Injectable()
export class AgentService {
  constructor(
    @InjectModel(Agent.name)
    private agentModel: Model<AgentDocument>,
  ) {}

  async countAgents(): Promise<number> {
    try {
      const count = await this.agentModel.countDocuments().exec();
      return count;
    } catch (error) {
      throw new HttpException(
        'Cannot obtain count. Please try again later',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  async getAgentCustom(customDto: object) {
    try {
      const agents = await this.agentModel.find(customDto).exec();
      return agents;
    } catch (error) {
      throw new HttpException(
        'Cannot obtain count for agents, try again later',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  async addAgent(addAgentDto: AddAgentDto) {
    try {
      const newAgent = await this.agentModel.create(addAgentDto);
      return newAgent;
    } catch (error) {
      throw new HttpException(
        'Failed to create agent. Please try again later',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllAgents(): Promise<Agent[]> {
    try {
      const allAgents = await this.agentModel.find().exec();
      return allAgents;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch all agents. Please try again later',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAgentById(agentId: string): Promise<Agent> {
    try {
      const agent = await this.agentModel.findById(agentId).exec();
      if (!agent) {
        throw new HttpException('Operator not found', HttpStatus.NOT_FOUND);
      }
      return agent;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch agent. Please try again later',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async suspendAgent(
    agentId: string,
    suspendAgentDto: SuspendAgentDto,
  ): Promise<Agent> {
    try {
      const agent = await this.agentModel.findById(agentId);
      if (!agent) {
        throw new HttpException('Agent not found', HttpStatus.NOT_FOUND);
      }
      agent.isSuspend = suspendAgentDto.isSuspend;
      return await agent.save();
    } catch (error) {
      throw new HttpException(
        'Failed to suspend agent',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
