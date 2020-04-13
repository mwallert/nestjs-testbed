import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { User } from "src/auth/user.entity";
import { Logger, InternalServerErrorException } from "@nestjs/common";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    private logger = new Logger('TaskRepository');

    async createTask(
        dto: CreateTaskDto,
        user: User
    ): Promise<Task> {
        const task: Task = new Task();

        Object.assign(task, {
            ...dto,
            status: TaskStatus.OPEN,
            user
        });

        const savedTask: Task = await task.save();

        delete savedTask.user;

        return savedTask;
    }

    async getTasks(
        filterDto: GetTasksFilterDto,
        user: User
    ): Promise<Task[]> {
        const { status, search } = filterDto,
            query = this.createQueryBuilder('task');

        query.where('task.userId = :userId', { userId: user.id });

        if (status) {
            query.andWhere('task.status = :status', {status});
        }

        if (search) {
            query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', {search: `%${search}%`});
        }

        try {
            return await query.getMany();
        } catch (error) {
            this.logger.error(
                `Failed to get tasks for user ${user.username} , Filters: ${JSON.stringify(filterDto)}`,
                error.stack
            );

            throw new InternalServerErrorException();
        }
    }
}