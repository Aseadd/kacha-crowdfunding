import jwtDecode from "jwt-decode";

export default class Helper {
  private static AccessTokenKey = "access_token";
  private static RefreshTokenKey = "refresh_token";

  static formatPhone(value: string): string {
    return value.replace(/^(0|251|\+251)?/, "+251");
  }

  static disperseFullName(value: string) {
    const fullName = value.split(" ");
    return {
      firstname: fullName[0],
      lastname: fullName[1],
      middlename: fullName[2],
    };
  }

  static storeCredential({
    refresh_token,
    access_token,
  }: {
    access_token: string;
    refresh_token: string;
  }) {
    localStorage.setItem(this.AccessTokenKey, access_token);
    localStorage.setItem(this.RefreshTokenKey, refresh_token);
  }

  static getRefreshToken(): string | null {
    return localStorage.getItem(this.RefreshTokenKey);
  }

  static getToken(): string | null {
    return localStorage.getItem(this.AccessTokenKey);
  }

  static clearCredentials(): void {
    localStorage.removeItem(this.AccessTokenKey);
    localStorage.removeItem(this.RefreshTokenKey);
  }

  static isRefreshTokenExpired(): boolean {
    const refreshToken = localStorage.getItem(this.RefreshTokenKey);
    if (!refreshToken) return true;
    try {
      const decodedToken: any = jwtDecode(refreshToken);
      const currentTime = Date.now() / 1000 + 60000;

      if (decodedToken.exp < currentTime) return true;
      else return false;
    } catch (error) {
      return true;
    }
  }

  static isTokenExpired(): boolean {
    const token = localStorage.getItem(this.AccessTokenKey);
    if (!token) return true;
    try {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Date.now() / 1000 + 60000;

      if (decodedToken.exp < currentTime) return true;
      else return false;
    } catch (error) {
      return true;
    }
  }

  static userId(): null | string {
    const token = localStorage.getItem(this.AccessTokenKey);
    if (!token) return null;
    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.id;
    } catch (error) {
      return null;
    }
  }

  static async handleCopy(
    value: string
  ): Promise<{ message: string; status: "success" | "error" }> {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(value);
        return Promise.resolve({
          message: "Code copied successfully",
          status: "success",
        });
      } catch (error) {
        try {
          // Create a temporary input element to copy the text from
          const tempInput = document.createElement("input");
          document.body.appendChild(tempInput);
          tempInput.setAttribute("value", value);
          tempInput.select();

          // Copy the text to the clipboard
          document.execCommand("copy");

          // Remove the temporary input element
          document.body.removeChild(tempInput);
          return Promise.resolve({
            message: "Code copied successfully",
            status: "success",
          });
        } catch (error) {
          return Promise.reject({
            message: "Copy not supported on your device",
            status: "error",
          });
        }
      }
    } else {
      return Promise.reject({
        message: "Copy not supported on your device",
        status: "error",
      });
    }
  }

  public static getPercent(value: number, fullValue: number): number {
    return 100 - (100 * Number(value)) / Number(fullValue);
  }
}
