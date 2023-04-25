export class UserDTO {
  constructor(
    private _email: string,
    private _firstname: string,
    private _lastname: string,
    private _image: string | null = null,
    private _pdf: Buffer | boolean | null | string = null,
    private _password: null | string = null,
  ) {
  }
  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get firstname(): string {
    return this._firstname;
  }

  set firstname(value: string) {
    this._firstname = value;
  }

  get lastname(): string {
    return this._lastname;
  }

  set lastname(value: string) {
    this._lastname = value;
  }

  get image(): string | null {
    return this._image;
  }

  set image(value: string | null) {
    this._image = value;
  }

  get pdf(): Buffer | boolean | null | string {
    return this._pdf;
  }

  set pdf(value: Buffer | boolean | null | string) {
    this._pdf = value;
  }

  get password(): string | null {
    return this._password;
  }

  set password(value: string | null) {
    this._password = value;
  }
}
