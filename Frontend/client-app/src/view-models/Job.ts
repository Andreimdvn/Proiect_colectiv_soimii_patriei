
export class Job {
  constructor(id:string, type:string, descriptionPreview:string, publisher:string, reward:string, date:string) {
    this.id = id;
    this.type = type;
    this.descriptionPreview = descriptionPreview;
    this.publisher = publisher;
    this.reward = reward;
    this.date = date;
  }

  id:string;
  type:string;
  descriptionPreview:string;
  publisher:string;
  reward:string;
  date:string;
}