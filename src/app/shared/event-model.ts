export class EventModel {
  id: string;
  name: string;
  date: string;
  pictureURL: string;
  description: string;
  tickets: { [key: string]: string };

  constructor(param?: EventModel) {
    if (param) {
      Object.assign(this, param);
    }
  }

/*  static get emptyEvent(): EventModel {
    return {
      id: '',
      name: '',
      date: '',
      pictureURL: '',
      description: ''
    };
  }*/

}
