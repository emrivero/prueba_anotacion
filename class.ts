export default class CreateFlowCommand implements Validable {

  context: Context;
  user: User;
  dto: FlowDTO;

  constructor(
    context: Context,
    user: User,
    dto: FlowDTO) {

    this.context = context;
    this.dto = dto;
    this.user = user;
  }


  /**
   * a method that returns a promise with the errors validation of the dto instance attribute
   */
  doValidation(container: inversify.Container): Promise<errors.CommandError[]> {

    return new Promise<errors.CommandError[]>(async (resolve, reject) => {

      const errors: errors.CommandError[] = Array<errors.CommandError>();

      errors.push(...await this.dto.doValidation(container));

      return resolve(errors);
    });
  }
}
