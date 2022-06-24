export class Response {
  code = '';
  data = {};
  message = '';
  meta = {};
  status = 500;


  constructor(data) {
    this.code = data?.code || this.code;
    this.data = data?.data || this.data;
    this.meta = data?.meta || this.meta;
    this.message = data?.message || this.message;
    this.status = data?.status || this.status;
  }

  send(res) {
    res.status(this.status).send(this);
  }
}
