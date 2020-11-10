import { IEnum } from ".";

/**
 * Page constants
 * @author treetips
 */
export class Page implements IEnum<Page> {
  /**
   * For values() array
   */
  private static _values = new Array<Page>();

  public static readonly TOP = new Page(
    1,
    "Top",
    "Top page",
    "Top page | sample",
    "Feat typescript and next.js and redux and material-ui !!",
    "/"
  );
  public static readonly CONTEXT_API = new Page(
    2,
    "Context API",
    "Context API sample",
    "Context API sample | sample",
    "Basic redux examples with typescript-fsa and immer.",
    "/context-api"
  );
  public static readonly TODO_LIST = new Page(
    10,
    "TODO List",
    "TODO List sample",
    "TODO List sample | sample",
    "The TODO sample application using createAsyncThunk and createEntityAdapter.",
    "/todo"
  );
  public static readonly TODO_DETAIL = new Page(
    11,
    "TODO Detail",
    "TODO Detail sample",
    "TODO Detail sample | sample",
    "The TODO sample application using createAsyncThunk and createEntityAdapter.",
    "/todo/{0}"
  );
  public static readonly TODO_REGISTER = new Page(
    12,
    "TODO Register",
    "TODO Register sample",
    "TODO Register sample | sample",
    "The TODO sample application using createAsyncThunk and createEntityAdapter.",
    "/todo/register"
  );
  public static readonly TODO_EDIT = new Page(
    13,
    "TODO Edit",
    "TODO Edit sample",
    "TODO Edit sample | sample",
    "The TODO sample application using createAsyncThunk and createEntityAdapter.",
    "/todo/{0}/edit"
  );
  public static readonly ERROR_404 = new Page(
    99,
    "404 Not Found",
    "404 Not Found",
    "404 Not Found | sample",
    "404 Not Found.",
    "/404"
  );
  public static readonly ERROR = new Page(
    99,
    "Error",
    "Error",
    "Error | sample",
    "Error.",
    "/_error"
  );

  /**
   * constructor
   * @param number page id
   * @param pageTitle page title
   * @param pageDescription page description
   * @param title seo title
   * @param metaDescription seo meta description
   * @param relativeUrl relative url
   */
  private constructor(
    public readonly id: number,
    public readonly pageTitle: string,
    public readonly pageDescription: string,
    public readonly title: string,
    public readonly metaDescription: string,
    public readonly relativeUrl: string
  ) {
    Page._values.push(this);
  }

  /**
   * Instance array
   */
  static get values(): Page[] {
    return this._values;
  }

  /**
   * @inheritdoc
   */
  equals = (target: Page): boolean => this.id === target.id;

  /**
   * @inheritdoc
   */
  toString = (): string =>
    `${this.id}, ${this.pageTitle}, ${this.pageDescription}`;

  /**
   * get instance
   * @param id id
   */
  static of(id: number): Page {
    return Page.values.filter((e) => id === e.id).find((e) => !!e);
  }

  /**
   * get instance
   * @param relativeUrl relativeUrl
   */
  static ofRelativeUrl(relativeUrl: string): Page {
    return Page.values
      .filter((e) => relativeUrl === e.relativeUrl)
      .find((e) => !!e);
  }

  /**
   * Create dynamic uri
   * @param pathParameters path parameters
   */
  getUri = (...pathParameters: any[]): string => {
    let result = this.relativeUrl;
    pathParameters.forEach((parameter: string, index: number) => {
      result = result.replace(`{${index}}`, parameter);
    });
    return result;
  };
}
