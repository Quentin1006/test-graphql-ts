import * as yup from "yup";

import { IDataResponse, IPayloadSchema, JobOfferPayload } from "../typings";

const schema: yup.SchemaOf<JobOfferPayload> = yup
  .object()
  .shape({
    id: yup.number(),
    salary: yup
      .object()
      .shape({
        minSalary: yup.number().required().positive(),
        maxSalary: yup.number().required().positive(),
      })
      .required(),
    companyId: yup.number().positive().required(),
    position: yup.string().required(),
    startdate: yup.date().required(),
    fields: yup.array().of(yup.string()).default([]),
  })
  .defined();

const validate = async (
  payload: JobOfferPayload
): Promise<IDataResponse<JobOfferPayload>> => {
  try {
    const validatedPayload = (await schema.validate(
      payload
    )) as JobOfferPayload;
    return {
      data: validatedPayload,
    };
  } catch (error: any) {
    return {
      err: new Error(error.errors),
    };
  }
};

const jobPayloadSchema: IPayloadSchema<JobOfferPayload> = {
  validate,
};

export default jobPayloadSchema;
