import { ITechRepository } from "../../../entities/tech/ITechRepository";
import { Tech } from "../../../entities/tech/Tech";

export class ListTechsUseCase {
  constructor(private techRepository: ITechRepository) {}

  async execute(token: string): Promise<Tech[]> {
    const techs = await this.techRepository.list();
    return techs;
  }
}
