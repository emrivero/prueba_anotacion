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


  @ApiOperationGet({
    path: "/list/all",
    description: "Get list ai-flows",
    summary: "All flows",
    responses: {
      200: {
        description: "Success",
        model: models.SearchResponseAPI.name,
        options: {
          modelSubstitution: {
            name: "SearchFlowResponseAPI",
            keys: {
              objects: {
                model: ModelAPI.name,
              },
            },
          },
        },
      },
    },
  })
  /**
   *  a controller with a list/all route of type GET, use the commandBus to throw a command and if all is ok response with the status 200.
   * @param req express.Request
   * @param res express.Response,
   */
  @httpGet("/list/all")
  public async listAll(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    if (handlerResponse.hasErrors()) {
      this.setErrorResponse(handlerResponse, req, res);
    } else {
      const response: Flow.Search.Response =
        handlerResponse as Flow.Search.Response;

      res.status(200).json(
        new models.SearchResponseAPI(
          response.flows.map((d) => FlowAPI.fromDomain(d)),
          response.total
        )
      );
    }
  }
}
