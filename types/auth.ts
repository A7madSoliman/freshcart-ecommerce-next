export interface SignupInput {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: number;
}

export interface AuthResponse {
  message: string;
  token: string;
}

// {
//   "name": "Ahmed",
//   "email": "test@test.com",
//   "password": "123456",
//   "rePassword": "123456",
//   "phone": "01000000000"
// }
// Response
// json
// Copy code
// {
//   "message": "success",
//   "token": "JWT_TOKEN"
// }
