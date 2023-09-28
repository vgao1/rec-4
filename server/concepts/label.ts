import { ObjectId } from "mongodb";
import DocCollection, { BaseDoc } from "../framework/doc";
import { NotAllowedError, NotFoundError } from "./errors";

export interface LabelDoc extends BaseDoc {
  // TODO 1: What should the structure of our Label concept look like?
  // Hint: what do we need to keep track of when using labels?
}

export default class LabelConcept {
  public readonly labels = new DocCollection<LabelDoc>("labels");
  
    async create(creator: ObjectId, label: string) {
      const _id = await this.labels.createOne({ label, creator });
      return { msg: "Label successfully created!", label: await this.labels.readOne({ _id }) };
    }

    async read(creator: ObjectId) {
      // TODO 2: How could we get only the labels created by a specific user?
    }
  
    async delete(_id: ObjectId) {
      await this.labels.deleteOne({ _id });
      return { msg: "Label deleted successfully!" };
    }
  
    async isCreator(user: ObjectId, _id: ObjectId) {
      const label = await this.labels.readOne({ _id });
      if (!label) { //You should check if the label exists first!
        throw new NotFoundError(`Label ${_id} does not exist!`);
      }
      if (label.creator.toString() !== user.toString()) { //Then validate if the user is the creator of the label
        throw new LabelAuthorNotMatchError(user, _id); // To maintain modularity, we should return a specific error related to our label concept
      }
    }
  }
  
  export class LabelAuthorNotMatchError extends NotAllowedError {
    constructor(
      public readonly creator: ObjectId,
      public readonly _id: ObjectId,
    ) {
      super("{0} is not the creator of label {1}!", creator, _id);
    }
  }