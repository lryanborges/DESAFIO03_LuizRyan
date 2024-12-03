export function generateLicensePlate(): string {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
  
    let licensePlate = "";
  
    for (let i = 0; i < 3; i++) {
      licensePlate += letters.charAt(Math.floor(Math.random() * letters.length));
    }
  
    for (let i = 0; i < 4; i++) {
      licensePlate += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
  
    return licensePlate;
}