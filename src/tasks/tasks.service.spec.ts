import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';

const mockUser = { username: 'Michael' };

const mockTaskRepository = () => ({
    getTasks: jest.fn(),
});

describe('TaskService', () => {
    let tasksService,
        taskRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                {
                    provide: TaskRepository,
                    useFactory: mockTaskRepository
                },
                TasksService,
            ],
        }).compile();

        tasksService = await module.get<TasksService>(TasksService);
        taskRepository = await module.get<TaskRepository>(TaskRepository);
    });

    describe('getTasks', () => {
        it('gets all tasks from the repository', async () => {
            taskRepository.getTasks.mockResolvedValue('someValue');

            expect(taskRepository.getTasks).not.toHaveBeenCalled();

            const filters: GetTasksFilterDto = { status: TaskStatus.IN_PROGRESS, search: 'Test'};

            const allTasks = await tasksService.getTasks(filters, mockUser);

            expect(taskRepository.getTasks).toHaveBeenCalled();

            expect(allTasks).toEqual('someValue');
        });
    });
});