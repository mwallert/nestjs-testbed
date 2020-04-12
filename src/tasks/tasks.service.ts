import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { DeleteResult } from 'typeorm';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) {}

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
    }

    async deleteTask(id: number): Promise<DeleteResult> {
        const removedTasks: DeleteResult = await this.taskRepository.delete(id);

        if (removedTasks.affected === 0) {
            throw new NotFoundException(`Task with id: ${id} not found.`);
        }

        return removedTasks;
    }

    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        return await this.taskRepository.getTasks(filterDto);
    }

    async getTaskById(id: number): Promise<Task> {
        const foundTask: Task = await this.taskRepository.findOne(id);

        if (!foundTask) {
            throw new NotFoundException(`Task with id: ${id} not found.`);
        }

        return foundTask;
    }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        const task: Task = await this.getTaskById(id);

        task.status = status;

        return await task.save();
    }
}
