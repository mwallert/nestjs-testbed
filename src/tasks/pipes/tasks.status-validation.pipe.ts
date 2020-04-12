import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses: string[] = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ];

    transform(value: string, metadata: ArgumentMetadata) {
        value = value.toUpperCase();

        if (!this.isValidStatus(value)) {
            throw new BadRequestException(`Invalid status passed: ${value}`);
        }

        return value;
    }

    private isValidStatus(status: string): boolean {
        return this.allowedStatuses.indexOf(status) !== -1;
    }
}