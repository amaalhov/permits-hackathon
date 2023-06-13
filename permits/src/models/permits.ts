import mongoose from "mongoose";

interface PermitAttrs {
  payload: object;
  userId: string;
}

interface PermitDoc extends mongoose.Document {
  payload: object;
  userId: string;
}

interface PermitModel extends mongoose.Model<PermitDoc> {
  build(attrs: PermitAttrs): PermitDoc;
}

const permitSchema = new mongoose.Schema(
  {
    payload: {
      type: Object,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

permitSchema.statics.build = (attrs: PermitAttrs) => {
  return new Permit(attrs);
};

const Permit = mongoose.model<PermitDoc, PermitModel>("Permit", permitSchema);

export { Permit };
