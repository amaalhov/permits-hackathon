import mongoose from "mongoose";

interface PermitAttrs {
  title: string;
  price: number;
  userId: string;
}

interface PermitDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
}

interface PermitModel extends mongoose.Model<PermitDoc> {
  build(attrs: PermitAttrs): PermitDoc;
}

const permitSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
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
