import { NextApiRequest, NextApiResponse } from "next";
import { TodoId } from "../../../entity";
import { useDatastore } from "../../../hooks/useDatastore";
import { ApiErrorResponse } from "../../../models";

/**
 * TODO restful-api with path-parameter
 * @param req NextApiRequest
 * @param res NextApiResponse
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method,
    body,
  } = req;

  const { selectTodo, updateTodo, deleteTodo } = useDatastore();
  try {
    res.setHeader("Content-Type", "application/json");

    // validation
    const idStr = String(id);
    if (!/^\d+$/.test(idStr)) {
      const error: ApiErrorResponse = {
        statusCode: 400,
        message: "Please enter the todo-id as a number.",
      };
      res.status(400).json(error);
      return;
    }
    const todoId: TodoId = Number(idStr);

    switch (method) {
      case "GET": {
        const { todo } = await selectTodo(todoId);
        res.status(200).json(todo);
        break;
      }
      case "PUT": {
        const { todo } = await updateTodo({
          ...body,
          id: todoId,
        });
        res.status(200).json(todo);
        break;
      }
      case "DELETE": {
        const {} = await deleteTodo(todoId);
        break;
      }
      default: {
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
        break;
      }
    }
  } catch (e) {
    const error: ApiErrorResponse = {
      statusCode: 500,
      message: `Internal server error. ${e}`,
    };
    res.status(500).json(error);
  }
};
