import express, { Request, Response } from "express";
import bodyParser from "body-parser";

import mycoverai, {
  CustodianComprehensiveForm,
} from "@mycoverai/lab-mca-nodejs-sdk";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const API_KEY = "MCASECK_TEST|72b61e4d-f58a-4d38-82b7-4d4629997605";
mycoverai.setApiKey(API_KEY);

mycoverai.setProducts([
  mycoverai.productsIds.CustodianComprehensive,
  mycoverai.productsIds.WellaHealthMalariaCover,
]);

type HttpStatusSuccess = 200 | 201 | 204;
type HttpStatusFail = 400 | 401 | 404 | 500;

const successResponseHandler = (
  res: Response,
  code: HttpStatusSuccess,
  message: string,
  data: any
) => {
  return res.status(code).json({
    status: "success",
    message,
    data,
  });
};

const failResponseHandler = (
  res: Response,
  code: HttpStatusFail,
  message: string
) => {
  return res.status(code).json({
    status: "fail",
    message,
  });
};

app.get("/all-products", async (req: Request, res: Response) => {
  try {
    const result = await mycoverai.getFullProducts();

    if (result.responseCode === 0)
      return failResponseHandler(
        res,
        <HttpStatusFail>result.statusCode,
        result.responseText
      );

    successResponseHandler(
      res,
      <HttpStatusSuccess>result.statusCode,
      "All Products",
      result.data
    );
  } catch (error) {
    console.log({ error });
    failResponseHandler(res, 500, "Something went wrong");
  }
});

app.post(
  "/purchase/custodian-comprehensive",
  async (req: Request, res: Response) => {
    try {
      const id = mycoverai.productsIds.CustodianComprehensive;
      // const { form } = mycoverai.products.custodianComprehensive;
      // form.first_name = "Kenneth";
      // form.last_name = "Jimmy";
      // form.email = "kenjimmy17@gmail.com";
      // etc...

      // or...
      const form: CustodianComprehensiveForm = req.body;
      mycoverai.products.custodianComprehensive.form = form;

      const result = await mycoverai.purchase(id, form);

      if (result.responseCode === 0)
        return failResponseHandler(
          res,
          <HttpStatusFail>result.statusCode,
          result.responseText
        );

      successResponseHandler(
        res,
        <HttpStatusSuccess>result.statusCode,
        "Successfully purhcased",
        result.data
      );
    } catch (error) {
      console.log({ error });
      failResponseHandler(res, 500, "Something went wrong");
    }
  }
);

const PORT = 9000;
try {
  app.listen(PORT, (): void => {
    console.log(`Server listening on port ${PORT}`);
  });
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
}
