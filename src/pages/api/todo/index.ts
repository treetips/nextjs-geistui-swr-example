import { NextApiRequest, NextApiResponse } from "next";
import { useDatastore } from "../../../hooks/useDatastore";
import { ApiErrorResponse } from "../../../models";

/**
 * TODO restful-api
 * @param req NextApiRequest
 * @param res NextApiResponse
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { _page, _limit },
    method,
    body,
  } = req;
  const { selectTodos, countTodos, insertTodo } = useDatastore();

  // validation
  const pageStr = String(_page || "");
  if (pageStr && !/^\d+$/.test(pageStr)) {
    const error: ApiErrorResponse = {
      statusCode: 400,
      message: "Please enter the page as a number.",
    };
    res.status(400).json(error);
    return;
  }
  const pagePage = Number(pageStr);

  const limitStr = String(_limit || "");
  if (limitStr && !/^\d+$/.test(limitStr)) {
    const error: ApiErrorResponse = {
      statusCode: 400,
      message: "Please enter the limit as a number.",
    };
    res.status(400).json(error);
    return;
  }
  const pageLimit = Number(limitStr);

  try {
    res.setHeader("Content-Type", "application/json");

    switch (method) {
      case "GET": {
        const { todos } = await selectTodos({
          page: pagePage,
          limit: pageLimit,
        });
        res.status(200).json(todos);
        break;
      }
      case "POST": {
        if (!body) {
          const error: ApiErrorResponse = {
            statusCode: 400,
            message: `Request body is required.`,
          };
          res.status(400).json(error);
          return;
        }
        const { todo } = await insertTodo(body);
        res.status(201).json(todo);
        break;
      }
      default: {
        res.setHeader("Allow", ["GET", "POST"]);
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
