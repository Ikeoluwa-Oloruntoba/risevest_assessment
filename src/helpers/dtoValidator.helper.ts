import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class DtoValidator{

    async validateDto<T>(dtoInstance: T, dtoClass: new (data: T) => any): Promise<void> {
        const dto = new dtoClass(dtoInstance);
        const errorMessage = dto.validate();
        if (errorMessage) {
          throw new BadRequestException(errorMessage);
        }
      }
}