class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.success = statusCode < 400; // agar <400 hai to success true
    this.data = data;
    this.message = message;
  }
}

export default ApiResponse;
