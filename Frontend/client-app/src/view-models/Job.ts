
export class Job {
  constructor(id:string, type:string, title:string, publisher:string, reward:string, publishDate:string) {
    this.id = id;
    this.type = type;
    this.title = title;
    this.publisher = publisher;
    this.reward = reward;
    this.publishDate = publishDate;
  }

  id:string;
  type:string;
  title:string;
  publisher:string;
  reward:string;
  publishDate:string;
}