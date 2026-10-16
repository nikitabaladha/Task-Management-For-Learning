export class ApiResponseDTO<T> {
  success: boolean;
  message: string;
  data!: T;
}
