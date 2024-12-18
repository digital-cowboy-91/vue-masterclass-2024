export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm extends LoginForm {
  confirmedPassword: string
  firstName: string
  lastName: string
  username: string
}
