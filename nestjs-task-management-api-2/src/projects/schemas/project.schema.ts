import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ProjectDocument = HydratedDocument<Project>;

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true, trim: true })
  name!: string;

  @Prop({ trim: true })
  description?: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  createdById!: Types.ObjectId;

  @Prop()
  createdAt!: Date;

  @Prop()
  updatedAt!: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
